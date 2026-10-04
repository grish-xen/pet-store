import { useMemo, useRef, useState } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import FavoritesPage from "./pages/FavoritesPage";
import BrandsPage from "./pages/BrandsPage";
import InfoPage from "./pages/InfoPage";
import NewProductsPage from "./pages/NewProductsPage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import { products, featuredProducts, newProducts } from "./data/products";

function formatPrice(value) {
  return `${value.toLocaleString("ru-RU")} ₽`;
}

function getOrderTotal(items) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal > 0 && subtotal < 3000 ? 500 : 0;
  return subtotal + delivery;
}

const infoPages = new Set(["promos", "reviews", "about", "contacts"]);

function App() {
  const [activeCategory, setActiveCategory] = useState("");
  const [activePage, setActivePage] = useState("home");
  const [cart, setCart] = useState({});
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
    discountOnly: false
  });
  const [favorites, setFavorites] = useState(
    () => new Set(products.filter((product) => product.isFavorite).map((product) => product.id))
  );
  const [orders, setOrders] = useState({
    active: [],
    completed: [
      {
        id: "PAW-1024",
        date: "12.06.2026",
        items: [products[0], products[2]].map((item, index) => ({ ...item, quantity: index + 1 })),
        total: products[0].price + products[2].price * 2
      }
    ]
  });
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quickViewImageIndex, setQuickViewImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(products[0].id);
  const [showCatalog, setShowCatalog] = useState(false);
  const [notice, setNotice] = useState("");
  const noticeTimer = useRef(null);

  const productsById = useMemo(
    () => Object.fromEntries(products.map((product) => [product.id, product])),
    []
  );

  const brands = useMemo(
    () => [...new Set(products.map((product) => product.brand))].sort((first, second) => first.localeCompare(second, "ru")),
    []
  );

  const catalogProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!showCatalog && !activeCategory && !query) {
      return featuredProducts;
    }

    return products.filter((product) => {
      const matchesCategory = activeCategory ? product.petTypes.includes(activeCategory) : true;
      const matchesQuery = query
        ? `${product.name} ${product.category} ${product.text}`.toLowerCase().includes(query)
        : true;

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery, showCatalog]);

  const cartItems = useMemo(
    () => Object.entries(cart)
      .filter(([id]) => productsById[id])
      .map(([id, quantity]) => ({
        ...productsById[id],
        quantity
      })),
    [cart, productsById]
  );

  const favoriteItems = useMemo(
    () => products.filter((product) => favorites.has(product.id)),
    [favorites]
  );

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const minPrice = Number(filters.minPrice) || 0;
    const maxPrice = Number(filters.maxPrice) || Infinity;

    return products.filter((product) => {
      const matchesCategory = filters.category ? product.petTypes.includes(filters.category) : true;
      const matchesBrand = filters.brand ? product.brand === filters.brand : true;
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
      const matchesDiscount = filters.discountOnly ? Boolean(product.oldPrice) : true;
      const matchesQuery = query
        ? `${product.name} ${product.category} ${product.brand} ${product.text}`.toLowerCase().includes(query)
        : true;

      return matchesCategory && matchesBrand && matchesPrice && matchesDiscount && matchesQuery;
    });
  }, [filters, searchQuery]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const selectedProduct = productsById[selectedProductId] || products[0];
  const relatedProducts = products
    .filter((product) => product.id !== selectedProduct.id && (
      product.category === selectedProduct.category ||
      product.petTypes.some((type) => selectedProduct.petTypes.includes(type))
    ))
    .slice(0, 3);

  function showNotice(text) {
    setNotice(text);
    window.clearTimeout(noticeTimer.current);
    noticeTimer.current = window.setTimeout(() => setNotice(""), 1800);
  }

  function addToCart(productId) {
    setCart((current) => ({
      ...current,
      [productId]: (current[productId] || 0) + 1
    }));
    showNotice("Товар добавлен в корзину");
  }

  function changeCartQuantity(productId, quantity) {
    setCart((current) => {
      const next = { ...current };

      if (quantity <= 0) {
        delete next[productId];
      } else {
        next[productId] = quantity;
      }

      return next;
    });
  }

  function toggleFavorite(productId) {
    setFavorites((current) => {
      const next = new Set(current);
      next.has(productId) ? next.delete(productId) : next.add(productId);
      return next;
    });
  }

  function openQuickView(product) {
    setQuickViewProduct(product);
    setQuickViewImageIndex(0);
  }

  function closeQuickView() {
    setQuickViewProduct(null);
    setQuickViewImageIndex(0);
  }

  function openProduct(productId) {
    setSelectedProductId(productId);
    setActivePage("product");
    closeQuickView();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function selectCategory(categoryId) {
    setActiveCategory(categoryId);
    setFilters((current) => ({ ...current, category: categoryId }));
    setActivePage("catalog");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showAllProducts() {
    setActiveCategory("");
    setSearchQuery("");
    setFilters((current) => ({ ...current, category: "" }));
    setActivePage("catalog");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showBrandProducts(brand) {
    setActiveCategory("");
    setSearchQuery("");
    setShowCatalog(true);
    setFilters({
      category: "",
      brand,
      minPrice: "",
      maxPrice: "",
      discountOnly: false
    });
    setActivePage("catalog");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetCatalog() {
    setActiveCategory("");
    setSearchQuery("");
    setShowCatalog(false);
  }

  function submitSearch(event) {
    event.preventDefault();
    setActiveCategory("");
    setShowCatalog(true);
    setActivePage("catalog");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function changeFilter(name, value) {
    setFilters((current) => ({ ...current, [name]: value }));
  }

  function resetFilters() {
    setFilters({
      category: "",
      brand: "",
      minPrice: "",
      maxPrice: "",
      discountOnly: false
    });
    setSearchQuery("");
  }

  function startCheckout(selectedItems) {
    setCheckoutItems(selectedItems);
    setActivePage("checkout");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function submitOrder(items) {
    const order = {
      id: `PAW-${String(Date.now()).slice(-5)}`,
      date: new Date().toLocaleDateString("ru-RU"),
      items,
      total: getOrderTotal(items)
    };

    setOrders((current) => ({
      ...current,
      active: [order, ...current.active]
    }));
    setCart((current) => {
      const next = { ...current };
      items.forEach((item) => {
        delete next[item.id];
      });
      return next;
    });
    setCheckoutItems([]);
    setActivePage("profile");
    showNotice("Заказ оформлен и добавлен в профиль");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function navigate(page, href) {
    if (page === "home") {
      resetCatalog();
    }

    setActivePage(page);

    if (page === "home") {
      requestAnimationFrame(() => {
        if (href && href !== "#home") {
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <div className="app">
      <Header
        cartCount={cartCount}
        favoritesCount={favorites.size}
        currentPage={activePage}
        searchQuery={searchQuery}
        onNavigate={navigate}
        onSearchChange={setSearchQuery}
        onSearchSubmit={submitSearch}
      />
      <main>
        {activePage === "home" ? (
          <HomePage
            activeCategory={activeCategory}
            cart={cart}
            catalogProducts={catalogProducts}
            favorites={favorites}
            searchQuery={searchQuery}
            showCatalog={showCatalog}
            onAddToCart={addToCart}
            onNavigateCatalog={() => navigate("catalog", "#catalog")}
            onNavigateNew={() => navigate("new", "#new")}
            onNavigatePromos={() => navigate("promos", "#promos")}
            onOpenProduct={openProduct}
            onQuickView={openQuickView}
            onResetCatalog={resetCatalog}
            onSelectCategory={selectCategory}
            onShowCatalog={showAllProducts}
            onToggleFavorite={toggleFavorite}
          />
        ) : activePage === "catalog" ? (
          <CatalogPage
            brands={brands}
            cart={cart}
            favorites={favorites}
            filters={filters}
            products={filteredProducts}
            searchQuery={searchQuery}
            onAddToCart={addToCart}
            onFilterChange={changeFilter}
            onOpenProduct={openProduct}
            onQuickView={openQuickView}
            onResetFilters={resetFilters}
            onToggleFavorite={toggleFavorite}
          />
        ) : activePage === "product" ? (
          <ProductPage
            cart={cart}
            favorites={favorites}
            product={selectedProduct}
            relatedProducts={relatedProducts}
            onAddToCart={addToCart}
            onNavigateCatalog={() => navigate("catalog", "#catalog")}
            onNavigateHome={() => navigate("home", "#home")}
            onOpenProduct={openProduct}
            onQuickView={openQuickView}
            onToggleFavorite={toggleFavorite}
          />
        ) : activePage === "cart" ? (
          <CartPage
            cartItems={cartItems}
            favorites={favorites}
            onChangeQuantity={changeCartQuantity}
            onCheckout={startCheckout}
            onNavigateCatalog={() => navigate("catalog", "#catalog")}
            onNavigateHome={() => navigate("home", "#home")}
            onToggleFavorite={toggleFavorite}
          />
        ) : activePage === "checkout" ? (
          <CheckoutPage
            items={checkoutItems}
            onNavigateCart={() => navigate("cart", "#cart")}
            onNavigateHome={() => navigate("home", "#home")}
            onSubmitOrder={submitOrder}
          />
        ) : activePage === "favorites" ? (
          <FavoritesPage
            cart={cart}
            favorites={favorites}
            products={favoriteItems}
            onAddToCart={addToCart}
            onNavigateCatalog={() => navigate("catalog", "#catalog")}
            onNavigateHome={() => navigate("home", "#home")}
            onOpenProduct={openProduct}
            onQuickView={openQuickView}
            onToggleFavorite={toggleFavorite}
          />
        ) : activePage === "profile" ? (
          <ProfilePage
            activeOrders={orders.active}
            completedOrders={orders.completed}
            onNavigateCatalog={() => navigate("catalog", "#catalog")}
            onNavigateHome={() => navigate("home", "#home")}
          />
        ) : activePage === "new" ? (
          <NewProductsPage
            cart={cart}
            favorites={favorites}
            products={newProducts}
            onAddToCart={addToCart}
            onNavigateHome={() => navigate("home", "#home")}
            onOpenProduct={openProduct}
            onQuickView={openQuickView}
            onToggleFavorite={toggleFavorite}
          />
        ) : activePage === "brands" ? (
          <BrandsPage
            products={products}
            onNavigateBrand={showBrandProducts}
            onNavigateHome={() => navigate("home", "#home")}
          />
        ) : infoPages.has(activePage) ? (
          <InfoPage page={activePage} onNavigateHome={() => navigate("home", "#home")} />
        ) : null}
      </main>
      <Footer onNavigate={navigate} />

      {quickViewProduct && (
        <div className="quick-view-backdrop" role="presentation" onClick={closeQuickView}>
          <article className="quick-view" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <button
              className="quick-view__close"
              type="button"
              aria-label="Закрыть быстрый просмотр"
              onClick={closeQuickView}
            >
              ×
            </button>
            <div className="quick-view__media">
              <button
                className="quick-view__arrow quick-view__arrow--prev"
                type="button"
                aria-label="Предыдущее фото"
                onClick={() => setQuickViewImageIndex((current) => (
                  current === 0 ? quickViewProduct.gallery.length - 1 : current - 1
                ))}
              >
                ‹
              </button>
              <img src={quickViewProduct.gallery[quickViewImageIndex]} alt={quickViewProduct.name} />
              <button
                className="quick-view__arrow quick-view__arrow--next"
                type="button"
                aria-label="Следующее фото"
                onClick={() => setQuickViewImageIndex((current) => (
                  current === quickViewProduct.gallery.length - 1 ? 0 : current + 1
                ))}
              >
                ›
              </button>
              <div className="quick-view__dots" aria-label="Изображения товара">
                {quickViewProduct.gallery.map((image, index) => (
                  <button
                    className={quickViewImageIndex === index ? "quick-view__dot--active" : ""}
                    type="button"
                    aria-label={`Показать фото ${index + 1}`}
                    onClick={() => setQuickViewImageIndex(index)}
                    key={`${image}-${index}`}
                  ></button>
                ))}
              </div>
            </div>
            <div className="quick-view__info">
              <h2>{quickViewProduct.name}</h2>
              <p className="quick-view__meta">{quickViewProduct.category} · {quickViewProduct.brand}</p>
              <p className="quick-view__price">
                <strong>{formatPrice(quickViewProduct.price)}</strong>
                {quickViewProduct.oldPrice && <span>{formatPrice(quickViewProduct.oldPrice)}</span>}
              </p>
              <p className="quick-view__text">
                {quickViewProduct.text} Подходит для ежедневного ухода и помогает собрать базовый набор для питомца.
              </p>
              <div className="quick-view__actions">
                <button type="button" onClick={() => addToCart(quickViewProduct.id)}>
                  В корзину
                </button>
                <button type="button" onClick={() => openProduct(quickViewProduct.id)}>
                  Подробнее
                </button>
              </div>
            </div>
          </article>
        </div>
      )}

      {notice && <div className="toast">{notice}</div>}
    </div>
  );
}

export default App;

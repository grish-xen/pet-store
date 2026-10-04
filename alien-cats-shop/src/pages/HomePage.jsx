import Button from "../components/ui/Button";
import ProductCard from "../components/product/ProductCard";
import { images } from "../assets/assets";
import { categories } from "../data/categories";
import { featuredProducts, newProducts } from "../data/products";
import { promos } from "../data/promos";

function HomePage({
  activeCategory,
  cart,
  catalogProducts,
  favorites,
  searchQuery,
  showCatalog,
  onAddToCart,
  onNavigateCatalog,
  onNavigateNew,
  onNavigatePromos,
  onOpenProduct,
  onQuickView,
  onResetCatalog,
  onSelectCategory,
  onShowCatalog,
  onToggleFavorite
}) {
  const catalogTitle = searchQuery || activeCategory || showCatalog ? "Каталог товаров" : "Хиты продаж";

  return (
    <>
      <section className="hero" id="home">
        <img className="hero__banner" src={images.heroBanner} alt="" />
        <div className="hero__content">
          <h1>Земные товары для питомцев всей галактики</h1>
          <p>Корма, игрушки и всё необходимое для вашего маленького пришельца.</p>
          <div className="button-row">
            <Button onClick={onShowCatalog}>Перейти в каталог</Button>
            <Button variant="secondary" onClick={onNavigateNew}>
              Смотреть новинки
            </Button>
          </div>
        </div>
      </section>

      <section className="section" id="categories">
        <div className="section-head">
          <h2>Категории</h2>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <button
              className={`category-card ${activeCategory === category.id ? "category-card--active" : ""}`}
              type="button"
              onClick={() => onSelectCategory(category.id)}
              key={category.id}
            >
              <img src={category.image} alt="" />
              <h3>{category.name}</h3>
              <p>{category.text}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="section" id="catalog">
        <div className="section-head">
          <h2>{catalogTitle}</h2>
          {(searchQuery || activeCategory || showCatalog) ? (
            <button className="outline-link outline-link--button" type="button" onClick={onResetCatalog}>
              Сбросить
            </button>
          ) : (
            <button className="outline-link outline-link--button" type="button" onClick={onNavigateCatalog}>
              В каталог
            </button>
          )}
        </div>
        {catalogProducts.length > 0 ? (
          <div className={`product-grid product-grid--hits ${catalogProducts.length > 4 ? "product-grid--catalog" : ""}`}>
            {catalogProducts.map((product) => (
              <ProductCard
                product={product}
                isFavorite={favorites.has(product.id)}
                quantity={cart[product.id]}
                onAddToCart={onAddToCart}
                onOpenProduct={onOpenProduct}
                onQuickView={onQuickView}
                onToggleFavorite={onToggleFavorite}
                key={product.id}
              />
            ))}
          </div>
        ) : (
          <p className="empty-state">Ничего не нашлось. Попробуйте другой запрос или категорию.</p>
        )}
      </section>

      <section className="section" id="promos">
        <div className="section-head">
          <h2>Акции и скидки</h2>
          <button className="outline-link outline-link--button" type="button" onClick={onNavigatePromos}>
            Все акции
          </button>
        </div>
        <div className="promo-grid">
          {promos.map((promo, index) => (
            <article className="promo-card" key={promo.id}>
              {index === 0 && <img className="promo-mascot" src={images.promoAlienCat} alt="" />}
              <div>
                <h3>{promo.title}</h3>
                <p>{promo.text}</p>
              </div>
              <img src={promo.icon} alt="" />
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="new">
        <div className="section-head">
          <h2>Новинки</h2>
          <button className="outline-link outline-link--button" type="button" onClick={onNavigateNew}>
            Все новинки
          </button>
        </div>
        <div className="product-grid">
          {newProducts.slice(0, 4).map((product) => (
            <ProductCard
              product={product}
              isFavorite={favorites.has(product.id)}
              quantity={cart[product.id]}
              onAddToCart={onAddToCart}
              onOpenProduct={onOpenProduct}
              onQuickView={onQuickView}
              onToggleFavorite={onToggleFavorite}
              key={product.id}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default HomePage;

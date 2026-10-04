import ProductCard from "../components/product/ProductCard";

function FavoritesPage({
  cart,
  favorites,
  products,
  onAddToCart,
  onNavigateCatalog,
  onNavigateHome,
  onOpenProduct,
  onQuickView,
  onToggleFavorite
}) {
  return (
    <section className="favorites-page">
      <nav className="breadcrumbs" aria-label="Путь по сайту">
        <button type="button" onClick={onNavigateHome}>Главная</button>
        <span>→</span>
        <span>Избранное</span>
      </nav>

      <h1 className="catalog-title">Избранное</h1>

      {products.length ? (
        <div className="catalog-grid favorites-grid">
          {products.map((product) => (
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
        <div className="cart-empty">
          <h2>В избранном пока пусто</h2>
          <p>Нажмите на сердечко в карточке товара, и он появится на этой странице.</p>
          <button type="button" onClick={onNavigateCatalog}>Перейти в каталог</button>
        </div>
      )}
    </section>
  );
}

export default FavoritesPage;

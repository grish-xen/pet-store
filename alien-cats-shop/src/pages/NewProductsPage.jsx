import ProductCard from "../components/product/ProductCard";

function NewProductsPage({
  cart,
  favorites,
  products,
  onAddToCart,
  onNavigateHome,
  onOpenProduct,
  onQuickView,
  onToggleFavorite
}) {
  return (
    <section className="new-products-page">
      <nav className="breadcrumbs" aria-label="Путь по сайту">
        <button type="button" onClick={onNavigateHome}>Главная</button>
        <span>→</span>
        <span>Новинки</span>
      </nav>

      <h1 className="page-title-gradient">Новинки</h1>
      <p className="info-intro">
        Свежие товары PAWpi: новые корма, аксессуары, клетки и полезные штуки для маленьких земных и космических питомцев.
      </p>

      {products.length > 0 ? (
        <div className="product-grid product-grid--catalog new-products-grid">
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
        <p className="empty-state">Новинок пока нет.</p>
      )}
    </section>
  );
}

export default NewProductsPage;

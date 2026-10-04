import ProductCard from "../components/product/ProductCard";
import { categories } from "../data/categories";

const categoryOptions = [
  { id: "", name: "Все категории" },
  ...categories
];

function CatalogPage({
  brands,
  cart,
  favorites,
  filters,
  products,
  searchQuery,
  onAddToCart,
  onFilterChange,
  onOpenProduct,
  onQuickView,
  onResetFilters,
  onToggleFavorite
}) {
  return (
    <section className="catalog-page" id="catalog">
      <p className="breadcrumbs">Главная → Каталог</p>
      <h1 className="catalog-title">Каталог товаров</h1>

      <div className="catalog-layout">
        <aside className="filters" aria-label="Фильтры каталога">
          <h2>Фильтры</h2>

          <label>
            <span>Категория</span>
            <select value={filters.category} onChange={(event) => onFilterChange("category", event.target.value)}>
              {categoryOptions.map((category) => (
                <option value={category.id} key={category.id || "all"}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Бренд</span>
            <select value={filters.brand} onChange={(event) => onFilterChange("brand", event.target.value)}>
              <option value="">Все бренды</option>
              {brands.map((brand) => (
                <option value={brand} key={brand}>{brand}</option>
              ))}
            </select>
          </label>

          <fieldset>
            <legend>Цена, ₽</legend>
            <div className="price-fields">
              <input
                type="number"
                min="0"
                placeholder="От 143 ₽"
                value={filters.minPrice}
                onChange={(event) => onFilterChange("minPrice", event.target.value)}
              />
              <input
                type="number"
                min="0"
                placeholder="До 5690 ₽"
                value={filters.maxPrice}
                onChange={(event) => onFilterChange("maxPrice", event.target.value)}
              />
            </div>
          </fieldset>

          <label className="check-row">
            <span>Только со скидкой</span>
            <input
              type="checkbox"
              checked={filters.discountOnly}
              onChange={(event) => onFilterChange("discountOnly", event.target.checked)}
            />
          </label>

          <button className="filters__submit" type="button" onClick={onResetFilters}>
            Сбросить
          </button>
        </aside>

        <div className="catalog-content">
          {searchQuery && <p className="catalog-note">Результаты поиска: {searchQuery}</p>}
          {filters.brand && <p className="catalog-note">Товары бренда: {filters.brand}</p>}

          {products.length > 0 ? (
            <div className="catalog-grid">
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
            <p className="empty-state">По этим фильтрам ничего не нашлось.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default CatalogPage;

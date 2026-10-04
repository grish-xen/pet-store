import { icons } from "../../assets/assets";

function formatPrice(value) {
  return `${value.toLocaleString("ru-RU")} ₽`;
}

function ProductCard({ product, isFavorite, quantity = 0, onAddToCart, onOpenProduct, onQuickView, onToggleFavorite }) {
  return (
    <article className="product-card" onClick={() => onOpenProduct(product.id)}>
      {product.badge && <span className="product-card__badge">{product.badge}</span>}
      <button
        className={`product-card__favorite ${isFavorite ? "product-card__favorite--active" : ""}`}
        type="button"
        aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
        onClick={(event) => {
          event.stopPropagation();
          onToggleFavorite(product.id);
        }}
      >
        <img src={isFavorite ? icons.heartActive : icons.heartDefault} alt="" />
      </button>
      <div className="product-card__image">
        <img src={product.image} alt={product.name} />
        <button
          className="product-card__quick"
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onQuickView(product);
          }}
        >
          Быстрый просмотр
        </button>
      </div>
      <p className="product-card__rating">★★★★★ <span>({product.reviewCount})</span></p>
      <h3>{product.name}</h3>
      <p className="product-card__description">{product.text}</p>
      <div className="product-card__bottom">
        <p className="product-card__price">
          <strong>{formatPrice(product.price)}</strong>
          {product.oldPrice && <span>{formatPrice(product.oldPrice)}</span>}
        </p>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onAddToCart(product.id);
          }}
        >
          {quantity ? `В корзине: ${quantity}` : "В корзину"}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;

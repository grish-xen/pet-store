import { useEffect, useState } from "react";
import ProductCard from "../components/product/ProductCard";
import { icons } from "../assets/assets";

function formatPrice(value) {
  return `${value.toLocaleString("ru-RU")} ₽`;
}

function ProductPage({
  cart,
  favorites,
  product,
  relatedProducts,
  onAddToCart,
  onNavigateCatalog,
  onNavigateHome,
  onOpenProduct,
  onQuickView,
  onToggleFavorite
}) {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setActiveImage(0);
  }, [product.id]);

  const isFavorite = favorites.has(product.id);
  const characteristics = [
    ["Категория", product.category],
    ["Бренд", product.brand],
    ["Питомец", product.petTypes.join(", ")],
    ["Вес/объём", product.name.match(/\d+([.,]\d+)?\s?(кг|г|мл|л|см)/i)?.[0] || "уточняется"],
    ["Рейтинг", `${product.rating} из 5`],
    ["Назначение", product.text]
  ];

  const reviews = [
    {
      name: "Анна",
      rating: "★★★★★",
      text: "Заказываю корм для двух кошек, удобно фильтровать по бренду и весу упаковки."
    },
    {
      name: "Максим",
      rating: "★★★★☆",
      text: "Понравилась карточка товара: сразу видно цену, наличие и варианты доставки."
    },
    {
      name: "Елена",
      rating: "★★★★★",
      text: "Быстро оформила заказ, консультант подсказал подходящий наполнитель."
    }
  ];

  return (
    <section className="product-page">
      <nav className="breadcrumbs" aria-label="Путь по сайту">
        <button type="button" onClick={onNavigateHome}>Главная</button>
        <span>→</span>
        <button type="button" onClick={onNavigateCatalog}>Каталог</button>
        <span>→</span>
        <span>{product.name}</span>
      </nav>

      <h1 className="product-page__title">{product.name}</h1>

      <div className="product-hero">
        <div className="product-gallery">
          <div className="product-gallery__main">
            <img src={product.gallery[activeImage]} alt={product.name} />
          </div>
          <div className="product-gallery__thumbs" aria-label="Фото товара">
            {product.gallery.map((image, index) => (
              <button
                className={activeImage === index ? "product-gallery__thumb--active" : ""}
                type="button"
                onClick={() => setActiveImage(index)}
                key={`${image}-${index}`}
              >
                <img src={image} alt="" />
              </button>
            ))}
          </div>
        </div>

        <article className="product-buy">
          <p className="product-buy__path">Артикул: {product.id} · {product.brand} · В каталоге</p>
          <div className="product-buy__rating">
            <span>{product.badge || "Товар"}</span>
            <div className="product-buy__score">
              <strong>★★★★☆</strong>
              <small>{product.rating} из 5</small>
            </div>
            <b>{product.reviewCount} отзывов</b>
          </div>
          <p className="product-buy__price">
            <strong>{formatPrice(product.price)}</strong>
            {product.oldPrice && <span>{formatPrice(product.oldPrice)}</span>}
          </p>
          <p className="product-buy__text">{product.text} Подходит для ежедневного использования и легко вписывается в базовый набор ухода.</p>
          <button className="product-buy__details-link" type="button" onClick={() => document.querySelector(".product-panel")?.scrollIntoView({ behavior: "smooth" })}>
            Описание и характеристики
          </button>

          <label>
            <span>Размер / объём</span>
            <select defaultValue="default">
              <option value="default">Стандартный вариант</option>
              <option value="small">Маленькая упаковка</option>
              <option value="large">Большая упаковка</option>
            </select>
          </label>

          <label>
            <span>Вкус / цвет</span>
            <select defaultValue="default">
              <option value="default">Основной вариант</option>
              <option value="space">Космический микс</option>
              <option value="classic">Классический</option>
            </select>
          </label>

          <div className="product-buy__actions">
            <button type="button" onClick={() => onAddToCart(product.id)}>
              {cart[product.id] ? `В корзине: ${cart[product.id]}` : "В корзину"}
            </button>
            <button type="button" onClick={onNavigateCatalog}>В каталог</button>
            <button
              className={isFavorite ? "product-buy__favorite product-buy__favorite--active" : "product-buy__favorite"}
              type="button"
              aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
              onClick={() => onToggleFavorite(product.id)}
            >
              <img src={isFavorite ? icons.heartActive : icons.heartDefault} alt="" />
            </button>
          </div>

          <div className="product-benefits">
            <article>
              <h3>Доставка</h3>
              <p>Курьером или самовывозом из ближайшего пункта.</p>
            </article>
            <article>
              <h3>Оплата</h3>
              <p>Картой, наличными или онлайн при оформлении.</p>
            </article>
            <article>
              <h3>Гарантия</h3>
              <p>Возврат товара по правилам магазина.</p>
            </article>
          </div>
        </article>
      </div>

      <section className="product-panel">
        <h2>Описание и характеристики</h2>
        <p>{product.text} Товар выбран для ассортимента PAWpi как практичная позиция для домашнего ухода, прогулок или кормления питомца.</p>
        <table>
          <tbody>
            {characteristics.map(([name, value]) => (
              <tr key={name}>
                <th>{name}</th>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="product-panel product-reviews">
        <h2>Отзывы</h2>
        <p className="product-panel__summary">Средняя оценка: 4.9 из 5 на основе {product.reviewCount} отзывов.</p>
        <div className="reviews-grid">
          {reviews.map((review) => (
            <article key={review.name}>
              <div>
                <strong>{review.name}</strong>
                <span>{review.rating}</span>
              </div>
              <p>{review.text}</p>
            </article>
          ))}
        </div>
        <form className="review-form" onSubmit={(event) => event.preventDefault()}>
          <input type="text" placeholder="Напишите отзыв о товаре" />
          <button type="submit">Отправить отзыв</button>
        </form>
      </section>

      <section className="section product-related">
        <div className="section-head">
          <h2>Похожие товары</h2>
          <button className="outline-link outline-link--button" type="button" onClick={onNavigateCatalog}>
            В каталог
          </button>
        </div>
        <div className="product-grid">
          {relatedProducts.map((item) => (
            <ProductCard
              product={item}
              isFavorite={favorites.has(item.id)}
              quantity={cart[item.id]}
              onAddToCart={onAddToCart}
              onOpenProduct={onOpenProduct}
              onQuickView={onQuickView}
              onToggleFavorite={onToggleFavorite}
              key={item.id}
            />
          ))}
        </div>
      </section>
    </section>
  );
}

export default ProductPage;

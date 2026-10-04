import { promos } from "../data/promos";

const pageContent = {
  promos: {
    title: "Акции",
    intro: "Космические предложения для питомцев и их людей."
  },
  reviews: {
    title: "Отзывы",
    intro: "Покупатели делятся впечатлениями о товарах, доставке и маленьких зелёных помощниках."
  },
  about: {
    title: "О компании",
    intro: "PAWpi - учебный макет зоомагазина про заботу, удобство и инопланетных котиков.",
    cards: [
      ["Идея", "Сделать магазин полезным, понятным и немного сказочным."],
      ["Ассортимент", "Корма, игрушки, переноски, клетки, уход и аксессуары."],
      ["Подход", "Без лишней сложности: карточки, фильтры, корзина и оформление заказа."]
    ]
  },
  contacts: {
    title: "Контакты",
    intro: "Связаться с PAWpi можно любым удобным способом.",
    cards: [
      ["Телефон", "+7 900 123-45-67"],
      ["Email", "hello@zoomarket.example"],
      ["Адрес", "ул. Лапкина, 12, VK TG Share"]
    ]
  }
};

const reviews = [
  {
    name: "Анна",
    product: "Royal Canin Sterilised 37",
    rating: "★★★★★",
    text: "Заказываю корм для двух кошек. Удобно фильтровать по бренду и весу упаковки, заказ собирается быстро."
  },
  {
    name: "Максим",
    product: "Переноска TravelPet",
    rating: "★★★★☆",
    text: "Понравилась карточка товара: сразу видно цену, наличие, отзывы и варианты доставки. Переноска приехала без царапин."
  },
  {
    name: "Елена",
    product: "Клетка HomeBird",
    rating: "★★★★★",
    text: "Быстро оформила заказ, консультант подсказал подходящий размер клетки. Всё аккуратно упаковано."
  },
  {
    name: "Саша",
    product: "Игрушка UFO Mouse",
    rating: "★★★★★",
    text: "Кот оценил игрушку сразу. Очень нравится стиль сайта, будто обычный зоомагазин улетел в маленькую галактику."
  },
  {
    name: "Мария",
    product: "Purina One Sterilcat",
    rating: "★★★★☆",
    text: "Хорошо, что есть скидки и видно старую цену. Добавила несколько товаров в корзину и быстро оформила заказ."
  },
  {
    name: "Кирилл",
    product: "AquaMix Mini",
    rating: "★★★★★",
    text: "Для первого аквариума всё нашлось в одном месте: фильтр, декор и сам аквариум. Страница каталога понятная."
  }
];

function InfoPage({ page, onNavigateHome }) {
  const content = pageContent[page] || pageContent.about;

  return (
    <section className="info-page">
      <nav className="breadcrumbs" aria-label="Путь по сайту">
        <button type="button" onClick={onNavigateHome}>Главная</button>
        <span>→</span>
        <span>{content.title}</span>
      </nav>

      <h1 className="page-title-gradient">{content.title}</h1>
      <p className="info-intro">{content.intro}</p>

      {page === "promos" ? (
        <div className="promo-grid info-promo-grid">
          {promos.map((promo, index) => (
            <article className="promo-card" key={promo.id}>
              <div>
                <h3>{promo.title}</h3>
                <p>{promo.text}</p>
              </div>
              <img src={promo.icon} alt="" />
            </article>
          ))}
        </div>
      ) : page === "reviews" ? (
        <div className="reviews-page-content">
          <section className="reviews-summary" aria-label="Сводка отзывов">
            <article>
              <strong>4.8 из 5</strong>
              <span>Средняя оценка магазина</span>
            </article>
            <article>
              <strong>128+</strong>
              <span>Отзывов о товарах</span>
            </article>
            <article>
              <strong>1 день</strong>
              <span>Средняя скорость доставки</span>
            </article>
          </section>

          <section className="reviews-page-grid" aria-label="Отзывы покупателей">
            {reviews.map((review) => (
              <article className="review-card" key={`${review.name}-${review.product}`}>
                <div>
                  <strong>{review.name}</strong>
                  <span>{review.rating}</span>
                </div>
                <small>{review.product}</small>
                <p>{review.text}</p>
              </article>
            ))}
          </section>

          <form className="reviews-page-form">
            <input type="text" placeholder="Ваше имя" />
            <input type="text" placeholder="О каком товаре отзыв" />
            <textarea placeholder="Напишите отзыв о товаре или магазине"></textarea>
            <button type="button">Отправить отзыв</button>
          </form>
        </div>
      ) : (
        <div className="info-grid">
          {content.cards.map(([title, text]) => (
            <article className="info-card" key={title}>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default InfoPage;

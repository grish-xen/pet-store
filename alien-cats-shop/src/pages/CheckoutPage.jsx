import { useState } from "react";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  address: "",
  comment: "",
  delivery: "courier",
  payment: "online"
};

function CheckoutPage({ items, onNavigateCart, onNavigateHome, onSubmitOrder }) {
  const [agreement, setAgreement] = useState(false);
  const [form, setForm] = useState(initialForm);

  const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const isCourier = form.delivery === "courier";
  const requiredFieldsFilled = Boolean(
    form.name.trim() &&
    form.phone.trim() &&
    form.email.trim() &&
    (!isCourier || form.address.trim())
  );
  const canSubmit = items.length > 0 && agreement && requiredFieldsFilled;

  function changeField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function submitOrder(event) {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    onSubmitOrder(items);
  }

  return (
    <section className="checkout-page">
      <nav className="breadcrumbs" aria-label="Путь по сайту">
        <button type="button" onClick={onNavigateHome}>Главная</button>
        <span>→</span>
        <button type="button" onClick={onNavigateCart}>Корзина</button>
        <span>→</span>
        <span>Оформление заказа</span>
      </nav>

      <h1 className="checkout-title">Оформление заказа</h1>

      {items.length ? (
        <form className="checkout-form" onSubmit={submitOrder}>
          <section>
            <h2>Данные покупателя</h2>
            <div className="checkout-form__row">
              <label>
                <span>ФИО</span>
                <input
                  type="text"
                  placeholder="Иванова Мария Петровна"
                  value={form.name}
                  onChange={(event) => changeField("name", event.target.value)}
                  required
                />
              </label>
              <label>
                <span>Телефон</span>
                <input
                  type="tel"
                  placeholder="+7(900)123-45-67"
                  value={form.phone}
                  onChange={(event) => changeField("phone", event.target.value)}
                  required
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  type="email"
                  placeholder="maria@example.ru"
                  value={form.email}
                  onChange={(event) => changeField("email", event.target.value)}
                  required
                />
              </label>
            </div>
          </section>

          <section>
            <h2>Доставка</h2>
            <div className="checkout-options">
              <label>
                <input
                  type="radio"
                  name="delivery"
                  checked={form.delivery === "courier"}
                  onChange={() => changeField("delivery", "courier")}
                />
                <span>Курьер по городу, сегодня с 18:00 до 21:00</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="delivery"
                  checked={form.delivery === "pickup"}
                  onChange={() => changeField("delivery", "pickup")}
                />
                <span>Самовывоз: ул. Лапкина, 12</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="delivery"
                  checked={form.delivery === "post"}
                  onChange={() => changeField("delivery", "post")}
                />
                <span>Почта России / пункт выдачи</span>
              </label>
            </div>

            {isCourier && (
              <label className="checkout-address">
                <span>Адрес доставки</span>
                <input
                  type="text"
                  placeholder="Например: ул. Лапкина, 12, кв. 7"
                  value={form.address}
                  onChange={(event) => changeField("address", event.target.value)}
                  required
                />
              </label>
            )}
          </section>

          <section>
            <h2>Оплата</h2>
            <div className="checkout-options">
              <label>
                <input
                  type="radio"
                  name="payment"
                  checked={form.payment === "online"}
                  onChange={() => changeField("payment", "online")}
                />
                <span>Онлайн банковской картой</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  checked={form.payment === "onDelivery"}
                  onChange={() => changeField("payment", "onDelivery")}
                />
                <span>Картой при получении</span>
              </label>
            </div>
          </section>

          <label className="checkout-comment">
            <span>Комментарий к заказу</span>
            <textarea
              placeholder="Например: позвонить за час до доставки"
              value={form.comment}
              onChange={(event) => changeField("comment", event.target.value)}
            ></textarea>
          </label>

          <label className="checkout-agreement">
            <input
              type="checkbox"
              checked={agreement}
              onChange={(event) => setAgreement(event.target.checked)}
            />
            <span>Я согласен с условиями покупки, возврата и обработки данных</span>
          </label>

          <button className="checkout-submit" type="submit" disabled={!canSubmit}>
            Подтвердить заказ
          </button>
        </form>
      ) : (
        <div className="cart-empty">
          <h2>Нет товаров для оформления</h2>
          <p>Вернитесь в корзину и отметьте товары, которые нужно оформить. Сейчас выбранных товаров нет.</p>
          <button type="button" onClick={onNavigateCart}>Вернуться в корзину</button>
        </div>
      )}

      {items.length > 0 && (
        <p className="checkout-note">К оформлению выбрано: {itemsCount} товар(ов)</p>
      )}
    </section>
  );
}

export default CheckoutPage;

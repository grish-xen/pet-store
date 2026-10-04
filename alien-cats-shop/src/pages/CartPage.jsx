import { useEffect, useMemo, useRef, useState } from "react";
import { icons } from "../assets/assets";

function formatPrice(value) {
  return `${value.toLocaleString("ru-RU")} ₽`;
}

function formatProductCount(count) {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${count} товаров`;
  }

  if (lastDigit === 1) {
    return `${count} товар`;
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${count} товара`;
  }

  return `${count} товаров`;
}

function CartPage({
  cartItems,
  favorites,
  onChangeQuantity,
  onNavigateCatalog,
  onNavigateHome,
  onToggleFavorite,
  onCheckout
}) {
  const [selectedIds, setSelectedIds] = useState(() => new Set(cartItems.map((item) => item.id)));
  const previousCartIds = useRef(new Set(cartItems.map((item) => item.id)));

  useEffect(() => {
    setSelectedIds((current) => {
      const cartIds = new Set(cartItems.map((item) => item.id));
      const next = new Set([...current].filter((id) => cartIds.has(id)));

      cartItems.forEach((item) => {
        if (!previousCartIds.current.has(item.id)) {
          next.add(item.id);
        }
      });

      previousCartIds.current = cartIds;
      return next;
    });
  }, [cartItems]);

  const selectedItems = useMemo(
    () => cartItems.filter((item) => selectedIds.has(item.id)),
    [cartItems, selectedIds]
  );

  const productsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const selectedProductsCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  const allSelected = cartItems.length > 0 && selectedIds.size === cartItems.length;
  const oldSubtotal = selectedItems.reduce((sum, item) => sum + (item.oldPrice || item.price) * item.quantity, 0);
  const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = oldSubtotal - subtotal;
  const delivery = subtotal > 0 && subtotal < 3000 ? 500 : 0;
  const total = subtotal + delivery;

  function toggleItem(productId) {
    setSelectedIds((current) => {
      const next = new Set(current);
      next.has(productId) ? next.delete(productId) : next.add(productId);
      return next;
    });
  }

  function toggleAll() {
    setSelectedIds((current) => {
      if (current.size === cartItems.length) {
        return new Set();
      }

      return new Set(cartItems.map((item) => item.id));
    });
  }

  function checkoutSelected() {
    onCheckout(selectedItems);
  }

  return (
    <section className="cart-page">
      <nav className="breadcrumbs" aria-label="Путь по сайту">
        <button type="button" onClick={onNavigateHome}>Главная</button>
        <span>→</span>
        <span>Корзина</span>
      </nav>

      <h1 className="cart-title">Корзина</h1>

      <label className="cart-count">
        <input
          type="checkbox"
          checked={allSelected}
          disabled={!cartItems.length}
          onChange={toggleAll}
        />
        <span></span>
        {productsCount ? formatProductCount(productsCount) : "Корзина пустая"}
      </label>

      {cartItems.length ? (
        <div className="cart-layout">
          <div className="cart-list">
            {cartItems.map((item) => {
              const itemOldTotal = (item.oldPrice || item.price) * item.quantity;
              const itemTotal = item.price * item.quantity;
              const isFavorite = favorites.has(item.id);
              const isSelected = selectedIds.has(item.id);

              return (
                <article className={isSelected ? "cart-item" : "cart-item cart-item--muted"} key={item.id}>
                  <label className="cart-item__check">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleItem(item.id)}
                    />
                    <span></span>
                  </label>

                  <img className="cart-item__image" src={item.image} alt={item.name} />

                  <div className="cart-item__info">
                    <h2>{item.name}</h2>
                    <p>{item.category} · {item.brand}</p>
                  </div>

                  <button
                    className={isFavorite ? "cart-item__favorite cart-item__favorite--active" : "cart-item__favorite"}
                    type="button"
                    aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
                    onClick={() => onToggleFavorite(item.id)}
                  >
                    <img src={isFavorite ? icons.heartActive : icons.heartDefault} alt="" />
                  </button>

                  <p className="cart-item__price">
                    <strong>{formatPrice(itemTotal)}</strong>
                    {item.oldPrice && <span>{formatPrice(itemOldTotal)}</span>}
                  </p>

                  <div className="cart-item__quantity" aria-label="Количество товара">
                    <button type="button" onClick={() => onChangeQuantity(item.id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => onChangeQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="cart-summary">
            <h2>Ваша корзина</h2>
            <dl>
              <div>
                <dt>{formatProductCount(selectedProductsCount)}</dt>
                <dd>{formatPrice(oldSubtotal)}</dd>
              </div>
              <div>
                <dt>Скидка</dt>
                <dd className="cart-summary__discount">− {formatPrice(discount)}</dd>
              </div>
              <div>
                <dt>Доставка</dt>
                <dd>{delivery ? formatPrice(delivery) : "0 ₽"}</dd>
              </div>
            </dl>
            <div className="cart-summary__total">
              <span>Итого</span>
              <strong>{formatPrice(total)}</strong>
            </div>
            <input type="text" placeholder="Промокод" />
            <button type="button" disabled={!selectedItems.length} onClick={checkoutSelected}>
              Перейти к оформлению
            </button>
          </aside>
        </div>
      ) : (
        <div className="cart-empty">
          <h2>В корзине пока нет товаров</h2>
          <p>Добавьте товары из каталога, и они появятся здесь с количеством, скидками и итоговой суммой.</p>
          <button type="button" onClick={onNavigateCatalog}>Перейти в каталог</button>
        </div>
      )}
    </section>
  );
}

export default CartPage;

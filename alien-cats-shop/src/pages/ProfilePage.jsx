function formatPrice(value) {
  return `${value.toLocaleString("ru-RU")} ₽`;
}

function OrderList({ orders, title, emptyText }) {
  return (
    <section className="profile-panel">
      <h2>{title}</h2>
      {orders.length ? (
        <div className="profile-orders">
          {orders.map((order) => (
            <article className="profile-order" key={order.id}>
              <div>
                <strong>{order.id}</strong>
                <span>{order.date}</span>
              </div>
              <p>{order.items.reduce((sum, item) => sum + item.quantity, 0)} товар(ов)</p>
              <ul>
                {order.items.slice(0, 3).map((item) => (
                  <li key={item.id}>{item.name} × {item.quantity}</li>
                ))}
              </ul>
              <b>{formatPrice(order.total)}</b>
            </article>
          ))}
        </div>
      ) : (
        <p className="profile-empty">{emptyText}</p>
      )}
    </section>
  );
}

function ProfilePage({ activeOrders, completedOrders, onNavigateCatalog, onNavigateHome }) {
  return (
    <section className="profile-page">
      <nav className="breadcrumbs" aria-label="Путь по сайту">
        <button type="button" onClick={onNavigateHome}>Главная</button>
        <span>→</span>
        <span>Профиль</span>
      </nav>

      <h1 className="page-title-gradient">Профиль</h1>

      <div className="profile-layout">
        <aside className="profile-card">
          <div className="profile-avatar">PA</div>
          <h2>Мария Иванова</h2>
          <p>maria@example.ru</p>
          <p>+7 900 123-45-67</p>
          <button type="button" onClick={onNavigateCatalog}>В каталог</button>
        </aside>

        <div className="profile-content">
          <section className="profile-panel">
            <h2>Личные данные</h2>
            <dl className="profile-data">
              <div>
                <dt>Адрес доставки</dt>
                <dd>ул. Лапкина, 12</dd>
              </div>
              <div>
                <dt>Любимые категории</dt>
                <dd>Корм, игрушки, лежанки</dd>
              </div>
              <div>
                <dt>Бонусы PAWpi</dt>
                <dd>420 космолапок</dd>
              </div>
            </dl>
          </section>

          <OrderList
            title="Активные заказы"
            orders={activeOrders}
            emptyText="Активных заказов пока нет. После оформления заказ появится здесь."
          />

          <OrderList
            title="Завершенные заказы"
            orders={completedOrders}
            emptyText="Завершенные заказы появятся после доставки."
          />
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;

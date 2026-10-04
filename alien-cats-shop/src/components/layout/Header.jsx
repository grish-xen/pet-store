import { navigation, userActions } from "../../data/navigation";
import { images, icons } from "../../assets/assets";

const actionIcons = {
  favorites: icons.favorite,
  profile: icons.profile,
  cart: icons.cart
};

function Header({
  cartCount,
  currentPage,
  favoritesCount,
  searchQuery,
  onNavigate,
  onSearchChange,
  onSearchSubmit
}) {
  const counters = {
    favorites: favoritesCount,
    cart: cartCount
  };

  return (
    <header className="header">
      <nav className="nav" aria-label="Основное меню">
        {navigation.map((item) => (
          <a
            className={currentPage === item.page ? "nav__link--active" : ""}
            href={item.href}
            onClick={(event) => {
              event.preventDefault();
              onNavigate(item.page, item.href);
            }}
            key={item.label}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="header-main">
        <a
          className="logo"
          href="#home"
          aria-label="На главную"
          onClick={(event) => {
            event.preventDefault();
            onNavigate("home", "#home");
          }}
        >
          <img src={images.logoColor} alt="PAWpi" />
        </a>

        <form className="search" onSubmit={onSearchSubmit}>
          <span className="search__icon" aria-hidden="true"></span>
          <input
            type="search"
            placeholder="Найти товар"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
          />
          <button type="submit">Найти</button>
        </form>

        <div className="actions">
          {userActions.map((action) => (
            <button
              className="action-link"
              type="button"
              onClick={() => onNavigate(action.id, `#${action.id}`)}
              key={action.id}
            >
              <span className="action-link__icon">
                <img src={actionIcons[action.id]} alt="" />
                {counters[action.id] > 0 && <span className="action-link__count">{counters[action.id]}</span>}
              </span>
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;

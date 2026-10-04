import { images } from "../../assets/assets";

function Footer({ onNavigate }) {
  function handleNavigate(event, page, href) {
    event.preventDefault();
    onNavigate?.(page, href);
  }

  return (
    <footer className="footer" id="contacts">
      <section>
        <img className="footer__logo" src={images.logoColor} alt="PAWpi" />
        <p>
          Магазин милых и полезных товаров для питомцев: корма, игрушки, лежанки, переноски и аксессуары с космическим настроением.
        </p>
      </section>
      <section>
        <h3>Покупателям</h3>
        <a href="#catalog" onClick={(event) => handleNavigate(event, "catalog", "#catalog")}>Каталог</a>
        <a href="#promos" onClick={(event) => handleNavigate(event, "promos", "#promos")}>Акции</a>
        <a href="#about" onClick={(event) => handleNavigate(event, "about", "#about")}>Возврат и гарантии</a>
        <a href="#contacts" onClick={(event) => handleNavigate(event, "contacts", "#contacts")}>Доставка и оплата</a>
      </section>
      <section>
        <h3>Контакты</h3>
        <p>+7 900 123-45-67</p>
        <p>hello@zoomarket.example</p>
        <p>ул. Лапкина, 12</p>
        <p>VK TG Share</p>
      </section>
    </footer>
  );
}

export default Footer;

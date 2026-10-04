const brandDescriptions = {
  "AquaMix": "Товары для аквариумов: фильтры, декор и всё для аккуратного первого запуска.",
  "CosmoDog": "Одежда и прогулочные аксессуары для собак с ярким космическим настроением.",
  "Grandorf": "Питательные рационы для собак, когда нужен качественный ежедневный корм.",
  "HomeBird": "Клетки и аксессуары для птиц: компактно, удобно и понятно для ухода.",
  "MiniPlanet": "Товары для грызунов: клетки, корм, колёса и маленькие домашние станции.",
  "Monge": "Корма для кошек и собак, включая варианты для чувствительного пищеварения.",
  "Pawpi": "Собственная линейка милых игрушек, ухода и аксессуаров в стиле магазина.",
  "Pro Plan": "Рационы для питомцев с разными потребностями и особенностями питания.",
  "Purina One": "Повседневные корма для базового ухода за кошками.",
  "Rio": "Корма и лакомства для птиц, особенно для попугаев.",
  "Royal Canin": "Рационы для кошек и собак разных возрастов, размеров и потребностей.",
  "SoftPaw": "Мягкие лежанки, миски и уютные вещи для спокойного отдыха питомца.",
  "TerraLight": "Террариумы, обогрев и добавки для рептилий.",
  "TravelPet": "Переноски и дорожные решения для поездок с питомцами.",
  "Walky": "Амуниция для прогулок: шлейки, поводки и удобные базовые аксессуары."
};

function BrandsPage({ products, onNavigateBrand, onNavigateHome }) {
  const brands = [...new Set(products.map((product) => product.brand))]
    .sort((first, second) => first.localeCompare(second, "ru"))
    .map((brand) => {
      const brandProducts = products.filter((product) => product.brand === brand);
      const categories = [...new Set(brandProducts.map((product) => product.category))].slice(0, 4);

      return {
        name: brand,
        count: brandProducts.length,
        categories,
        description: brandDescriptions[brand] || "Товары бренда, которые подходят для базового ухода и ежедневных покупок."
      };
    });

  return (
    <section className="brands-page">
      <nav className="breadcrumbs" aria-label="Путь по сайту">
        <button type="button" onClick={onNavigateHome}>Главная</button>
        <span>→</span>
        <span>Бренды</span>
      </nav>

      <h1 className="page-title-gradient">Бренды</h1>
      <p className="info-intro">
        Все бренды, которые используются в каталоге PAWpi. Можно сразу открыть каталог с товарами выбранного бренда.
      </p>

      <div className="brands-grid">
        {brands.map((brand) => (
          <article className="brand-card" key={brand.name}>
            <div>
              <h2>{brand.name}</h2>
              <p>{brand.description}</p>
            </div>
            <p className="brand-card__meta">
              {brand.count} {brand.count === 1 ? "товар" : "товаров"} · {brand.categories.join(", ")}
            </p>
            <button type="button" onClick={() => onNavigateBrand(brand.name)}>
              Смотреть товары
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default BrandsPage;

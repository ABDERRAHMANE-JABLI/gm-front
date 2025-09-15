import React from 'react';
import styles from './SpiritsPage.module.css';

interface SpiritsPageProps {
  lang: 'fr' | 'en';
}

const SpiritsPage: React.FC<SpiritsPageProps> = ({ lang }) => {
  const texts = {
    fr: {
      title: 'Recherche de spiritueux',
      subtitle: 'Explorez l&apos;univers des spiritueux d&apos;exception sélectionnés par Gault&Millau',
      searchPlaceholder: 'Rechercher un spiritueux, une marque, un âge...',
      searchButton: 'Rechercher',
      categoryLabel: 'Catégorie',
      categoryPlaceholder: 'Toutes les catégories',
      regionLabel: 'Région/Pays',
      regionPlaceholder: 'Toutes les régions',
      ageLabel: 'Âge',
      agePlaceholder: 'Tous les âges',
      brandLabel: 'Marque',
      brandPlaceholder: 'Toutes les marques',
      priceLabel: 'Prix',
      pricePlaceholder: 'Tous les prix',
      alcoholLabel: 'Degré d&apos;alcool',
      alcoholPlaceholder: 'Tous les degrés',
      emptyTitle: 'Aucun spiritueux trouvé',
      emptyText: 'Essayez de modifier vos critères de recherche pour découvrir de nouveaux spiritueux d&apos;exception.'
    },
    en: {
      title: 'Spirits search',
      subtitle: 'Explore the world of exceptional spirits selected by Gault&Millau',
      searchPlaceholder: 'Search for a spirit, brand, age...',
      searchButton: 'Search',
      categoryLabel: 'Category',
      categoryPlaceholder: 'All categories',
      regionLabel: 'Region/Country',
      regionPlaceholder: 'All regions',
      ageLabel: 'Age',
      agePlaceholder: 'All ages',
      brandLabel: 'Brand',
      brandPlaceholder: 'All brands',
      priceLabel: 'Price',
      pricePlaceholder: 'All prices',
      alcoholLabel: 'Alcohol content',
      alcoholPlaceholder: 'All levels',
      emptyTitle: 'No spirits found',
      emptyText: 'Try modifying your search criteria to discover new exceptional spirits.'
    }
  };

  const t = texts[lang];

  return (
    <div className={styles.spiritSearchPage}>
      <div className={styles.container}>
        {/* Page Header */}
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>{t.title}</h1>
          <p className={styles.pageSubtitle}>{t.subtitle}</p>
        </header>

        {/* Search Section */}
        <section className={styles.searchSection}>
          <div className={styles.searchContainer}>
            <div className={styles.searchBox}>
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                className={styles.searchInput}
              />
              <button className={styles.searchButton}>
                {t.searchButton}
              </button>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className={styles.filtersSection}>
          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.categoryLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.categoryPlaceholder}</option>
                <option value="whisky">Whisky</option>
                <option value="cognac">Cognac</option>
                <option value="armagnac">Armagnac</option>
                <option value="rhum">Rhum</option>
                <option value="gin">Gin</option>
                <option value="vodka">Vodka</option>
                <option value="tequila">Tequila</option>
                <option value="liqueur">Liqueur</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.regionLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.regionPlaceholder}</option>
                <option value="ecosse">Écosse</option>
                <option value="irlande">Irlande</option>
                <option value="japon">Japon</option>
                <option value="amerique">Amérique</option>
                <option value="france">France</option>
                <option value="caraibes">Caraïbes</option>
                <option value="mexique">Mexique</option>
                <option value="russie">Russie</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.ageLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.agePlaceholder}</option>
                <option value="no-age">Sans âge</option>
                <option value="3-5">3-5 ans</option>
                <option value="6-10">6-10 ans</option>
                <option value="12">12 ans</option>
                <option value="15">15 ans</option>
                <option value="18">18 ans</option>
                <option value="21">21 ans</option>
                <option value="25+">25 ans et plus</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.brandLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.brandPlaceholder}</option>
                <option value="macallan">Macallan</option>
                <option value="hennessy">Hennessy</option>
                <option value="remy-martin">Rémy Martin</option>
                <option value="bombay">Bombay</option>
                <option value="grey-goose">Grey Goose</option>
                <option value="patron">Patrón</option>
                <option value="havana-club">Havana Club</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.priceLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.pricePlaceholder}</option>
                <option value="0-50">0-50€</option>
                <option value="50-100">50-100€</option>
                <option value="100-200">100-200€</option>
                <option value="200-500">200-500€</option>
                <option value="500-1000">500-1000€</option>
                <option value="1000+">1000€+</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.alcoholLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.alcoholPlaceholder}</option>
                <option value="20-30">20-30%</option>
                <option value="30-40">30-40%</option>
                <option value="40-45">40-45%</option>
                <option value="45-50">45-50%</option>
                <option value="50+">50%+</option>
              </select>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className={styles.resultsSection}>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>Résultats</h2>
            <span className={styles.resultsCount}>0 spiritueux trouvé</span>
          </div>

          {/* Empty State */}
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🥃</div>
            <h3 className={styles.emptyTitle}>{t.emptyTitle}</h3>
            <p className={styles.emptyText}>{t.emptyText}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SpiritsPage;

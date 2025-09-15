import React from 'react';
import styles from './RestaurantsPage.module.css';

interface RestaurantsPageProps {
  lang: 'fr' | 'en';
}

const RestaurantsPage: React.FC<RestaurantsPageProps> = ({ lang }) => {
  const texts = {
    fr: {
      title: 'Recherche de restaurants',
      subtitle: 'Découvrez les meilleurs restaurants sélectionnés par Gault&Millau',
      searchPlaceholder: 'Rechercher un restaurant, une ville, une cuisine...',
      searchButton: 'Rechercher',
      locationLabel: 'Localisation',
      locationPlaceholder: 'Toutes les villes',
      cuisineLabel: 'Type de cuisine',
      cuisinePlaceholder: 'Toutes les cuisines',
      ratingLabel: 'Note Gault&Millau',
      ratingPlaceholder: 'Toutes les notes',
      priceLabel: 'Gamme de prix',
      pricePlaceholder: 'Tous les prix',
      emptyTitle: 'Aucun restaurant trouvé',
      emptyText: 'Essayez de modifier vos critères de recherche pour découvrir de nouveaux établissements.'
    },
    en: {
      title: 'Restaurant search',
      subtitle: 'Discover the best restaurants selected by Gault&Millau',
      searchPlaceholder: 'Search for a restaurant, city, cuisine...',
      searchButton: 'Search',
      locationLabel: 'Location',
      locationPlaceholder: 'All cities',
      cuisineLabel: 'Cuisine type',
      cuisinePlaceholder: 'All cuisines',
      ratingLabel: 'Gault&Millau rating',
      ratingPlaceholder: 'All ratings',
      priceLabel: 'Price range',
      pricePlaceholder: 'All prices',
      emptyTitle: 'No restaurants found',
      emptyText: 'Try modifying your search criteria to discover new establishments.'
    }
  };

  const t = texts[lang];

  return (
    <div className={styles.restaurantSearchPage}>
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
              <label className={styles.filterLabel}>{t.locationLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.locationPlaceholder}</option>
                <option value="paris">Paris</option>
                <option value="lyon">Lyon</option>
                <option value="marseille">Marseille</option>
                <option value="nice">Nice</option>
                <option value="toulouse">Toulouse</option>
                <option value="bordeaux">Bordeaux</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.cuisineLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.cuisinePlaceholder}</option>
                <option value="francaise">Française</option>
                <option value="italienne">Italienne</option>
                <option value="japonaise">Japonaise</option>
                <option value="asiatique">Asiatique</option>
                <option value="mediterraneenne">Méditerranéenne</option>
                <option value="moderne">Moderne</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.ratingLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.ratingPlaceholder}</option>
                <option value="16-20">16-20/20</option>
                <option value="14-16">14-16/20</option>
                <option value="12-14">12-14/20</option>
                <option value="10-12">10-12/20</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.priceLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.pricePlaceholder}</option>
                <option value="€">€ (moins de 30€)</option>
                <option value="€€">€€ (30-60€)</option>
                <option value="€€€">€€€ (60-100€)</option>
                <option value="€€€€">€€€€ (plus de 100€)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className={styles.resultsSection}>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>Résultats</h2>
            <span className={styles.resultsCount}>0 restaurant trouvé</span>
          </div>

          {/* Empty State */}
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🍽️</div>
            <h3 className={styles.emptyTitle}>{t.emptyTitle}</h3>
            <p className={styles.emptyText}>{t.emptyText}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RestaurantsPage;

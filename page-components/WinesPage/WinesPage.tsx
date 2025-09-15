import React from 'react';
import styles from './WinesPage.module.css';

interface WinesPageProps {
  lang: 'fr' | 'en';
}

const WinesPage: React.FC<WinesPageProps> = ({ lang }) => {
  const texts = {
    fr: {
      title: 'Recherche de vins',
      subtitle: 'Découvrez les meilleurs vins sélectionnés par nos experts Gault&Millau',
      searchPlaceholder: 'Rechercher un vin, un domaine, un millésime...',
      searchButton: 'Rechercher',
      regionLabel: 'Région',
      regionPlaceholder: 'Toutes les régions',
      colorLabel: 'Couleur',
      colorPlaceholder: 'Toutes les couleurs',
      grapeLabel: 'Cépage',
      grapePlaceholder: 'Tous les cépages',
      vintageLabel: 'Millésime',
      vintagePlaceholder: 'Tous les millésimes',
      priceLabel: 'Prix',
      pricePlaceholder: 'Tous les prix',
      ratingLabel: 'Note',
      ratingPlaceholder: 'Toutes les notes',
      emptyTitle: 'Aucun vin trouvé',
      emptyText: 'Essayez de modifier vos critères de recherche pour découvrir de nouveaux vins.'
    },
    en: {
      title: 'Wine search',
      subtitle: 'Discover the best wines selected by our Gault&Millau experts',
      searchPlaceholder: 'Search for a wine, estate, vintage...',
      searchButton: 'Search',
      regionLabel: 'Region',
      regionPlaceholder: 'All regions',
      colorLabel: 'Color',
      colorPlaceholder: 'All colors',
      grapeLabel: 'Grape variety',
      grapePlaceholder: 'All grape varieties',
      vintageLabel: 'Vintage',
      vintagePlaceholder: 'All vintages',
      priceLabel: 'Price',
      pricePlaceholder: 'All prices',
      ratingLabel: 'Rating',
      ratingPlaceholder: 'All ratings',
      emptyTitle: 'No wines found',
      emptyText: 'Try modifying your search criteria to discover new wines.'
    }
  };

  const t = texts[lang];

  return (
    <div className={styles.wineSearchPage}>
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
              <label className={styles.filterLabel}>{t.regionLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.regionPlaceholder}</option>
                <option value="bordeaux">Bordeaux</option>
                <option value="bourgogne">Bourgogne</option>
                <option value="champagne">Champagne</option>
                <option value="loire">Loire</option>
                <option value="rhone">Rhône</option>
                <option value="alsace">Alsace</option>
                <option value="provence">Provence</option>
                <option value="languedoc">Languedoc</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.colorLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.colorPlaceholder}</option>
                <option value="rouge">Rouge</option>
                <option value="blanc">Blanc</option>
                <option value="rose">Rosé</option>
                <option value="champagne">Champagne</option>
                <option value="petillant">Pétillant</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.grapeLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.grapePlaceholder}</option>
                <option value="cabernet-sauvignon">Cabernet Sauvignon</option>
                <option value="merlot">Merlot</option>
                <option value="pinot-noir">Pinot Noir</option>
                <option value="syrah">Syrah</option>
                <option value="chardonnay">Chardonnay</option>
                <option value="sauvignon-blanc">Sauvignon Blanc</option>
                <option value="riesling">Riesling</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.vintageLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.vintagePlaceholder}</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="older">Plus ancien</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.priceLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.pricePlaceholder}</option>
                <option value="0-20">0-20€</option>
                <option value="20-50">20-50€</option>
                <option value="50-100">50-100€</option>
                <option value="100-200">100-200€</option>
                <option value="200+">200€+</option>
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
          </div>
        </section>

        {/* Results Section */}
        <section className={styles.resultsSection}>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>Résultats</h2>
            <span className={styles.resultsCount}>0 vin trouvé</span>
          </div>

          {/* Empty State */}
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🍷</div>
            <h3 className={styles.emptyTitle}>{t.emptyTitle}</h3>
            <p className={styles.emptyText}>{t.emptyText}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WinesPage;

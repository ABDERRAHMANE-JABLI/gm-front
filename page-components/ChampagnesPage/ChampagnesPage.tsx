import React from 'react';
import styles from './styles.module.css';

interface ChampagnesPageProps {
  lang: 'fr' | 'en';
}

const ChampagnesPage: React.FC<ChampagnesPageProps> = ({ lang }) => {
  const texts = {
    fr: {
      title: 'Recherche de champagnes',
      subtitle: 'Découvrez les plus prestigieuses maisons de champagne sélectionnées par Gault&Millau',
      searchPlaceholder: 'Rechercher une maison, une cuvée, un millésime...',
      searchButton: 'Rechercher',
      houseLabel: 'Maison',
      housePlaceholder: 'Toutes les maisons',
      typeLabel: 'Type de champagne',
      typePlaceholder: 'Tous les types',
      vintageLabel: 'Millésime',
      vintagePlaceholder: 'Tous les millésimes',
      appellationLabel: 'Appellation',
      appellationPlaceholder: 'Toutes les appellations',
      priceLabel: 'Prix',
      pricePlaceholder: 'Tous les prix',
      dosageLabel: 'Dosage',
      dosagePlaceholder: 'Tous les dosages',
      emptyTitle: 'Aucun champagne trouvé',
      emptyText: 'Essayez de modifier vos critères de recherche pour découvrir de nouvelles cuvées exceptionnelles.'
    },
    en: {
      title: 'Champagne search',
      subtitle: 'Discover the most prestigious champagne houses selected by Gault&Millau',
      searchPlaceholder: 'Search for a house, cuvée, vintage...',
      searchButton: 'Search',
      houseLabel: 'House',
      housePlaceholder: 'All houses',
      typeLabel: 'Champagne type',
      typePlaceholder: 'All types',
      vintageLabel: 'Vintage',
      vintagePlaceholder: 'All vintages',
      appellationLabel: 'Appellation',
      appellationPlaceholder: 'All appellations',
      priceLabel: 'Price',
      pricePlaceholder: 'All prices',
      dosageLabel: 'Dosage',
      dosagePlaceholder: 'All dosages',
      emptyTitle: 'No champagne found',
      emptyText: 'Try modifying your search criteria to discover exceptional new cuvées.'
    }
  };

  const t = texts[lang];

  return (
    <div className={styles.champagneSearchPage}>
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
              <label className={styles.filterLabel}>{t.houseLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.housePlaceholder}</option>
                <option value="moet-chandon">Moët & Chandon</option>
                <option value="veuve-clicquot">Veuve Clicquot</option>
                <option value="dom-perignon">Dom Pérignon</option>
                <option value="krug">Krug</option>
                <option value="louis-roederer">Louis Roederer</option>
                <option value="pol-roger">Pol Roger</option>
                <option value="bollinger">Bollinger</option>
                <option value="perrier-jouet">Perrier-Jouët</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.typeLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.typePlaceholder}</option>
                <option value="brut">Brut</option>
                <option value="extra-brut">Extra Brut</option>
                <option value="sec">Sec</option>
                <option value="demi-sec">Demi-Sec</option>
                <option value="blanc-de-blancs">Blanc de Blancs</option>
                <option value="blanc-de-noirs">Blanc de Noirs</option>
                <option value="rose">Rosé</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.vintageLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.vintagePlaceholder}</option>
                <option value="nv">Non Millésimé</option>
                <option value="2018">2018</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2012">2012</option>
                <option value="2008">2008</option>
                <option value="vintage">Millésimé</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.appellationLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.appellationPlaceholder}</option>
                <option value="champagne">Champagne AOC</option>
                <option value="grand-cru">Grand Cru</option>
                <option value="premier-cru">Premier Cru</option>
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
                <option value="500+">500€+</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.dosageLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.dosagePlaceholder}</option>
                <option value="brut-nature">Brut Nature</option>
                <option value="extra-brut">Extra Brut</option>
                <option value="brut">Brut</option>
                <option value="extra-dry">Extra Dry</option>
                <option value="sec">Sec</option>
                <option value="demi-sec">Demi-Sec</option>
                <option value="doux">Doux</option>
              </select>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className={styles.resultsSection}>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>Résultats</h2>
            <span className={styles.resultsCount}>0 champagne trouvé</span>
          </div>

          {/* Empty State */}
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🥂</div>
            <h3 className={styles.emptyTitle}>{t.emptyTitle}</h3>
            <p className={styles.emptyText}>{t.emptyText}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChampagnesPage;

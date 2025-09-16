import React from 'react';
import styles from './styles.module.css';

interface WineriesPageProps {
  lang: 'fr' | 'en';
}

const WineriesPage: React.FC<WineriesPageProps> = ({ lang }) => {
  const texts = {
    fr: {
      title: 'Recherche de domaines viticoles',
      subtitle: 'Découvrez les plus beaux vignobles et propriétés viticoles d&apos;exception',
      searchPlaceholder: 'Rechercher un domaine, château, vignoble...',
      searchButton: 'Rechercher',
      regionLabel: 'Région viticole',
      regionPlaceholder: 'Toutes les régions',
      typeLabel: 'Type de propriété',
      typePlaceholder: 'Tous les types',
      appellationLabel: 'Appellation',
      appellationPlaceholder: 'Toutes les appellations',
      certificationLabel: 'Certification',
      certificationPlaceholder: 'Toutes les certifications',
      sizeLabel: 'Taille du domaine',
      sizePlaceholder: 'Toutes les tailles',
      experienceLabel: 'Expériences proposées',
      experiencePlaceholder: 'Toutes les expériences',
      emptyTitle: 'Aucun domaine trouvé',
      emptyText: 'Essayez de modifier vos critères de recherche pour découvrir de magnifiques propriétés viticoles.'
    },
    en: {
      title: 'Winery search',
      subtitle: 'Discover the most beautiful vineyards and exceptional wine estates',
      searchPlaceholder: 'Search for an estate, château, vineyard...',
      searchButton: 'Search',
      regionLabel: 'Wine region',
      regionPlaceholder: 'All regions',
      typeLabel: 'Property type',
      typePlaceholder: 'All types',
      appellationLabel: 'Appellation',
      appellationPlaceholder: 'All appellations',
      certificationLabel: 'Certification',
      certificationPlaceholder: 'All certifications',
      sizeLabel: 'Estate size',
      sizePlaceholder: 'All sizes',
      experienceLabel: 'Experiences offered',
      experiencePlaceholder: 'All experiences',
      emptyTitle: 'No wineries found',
      emptyText: 'Try modifying your search criteria to discover magnificent wine estates.'
    }
  };

  const t = texts[lang];

  return (
    <div className={styles.winerySearchPage}>
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
                <option value="loire">Vallée de la Loire</option>
                <option value="rhone">Vallée du Rhône</option>
                <option value="alsace">Alsace</option>
                <option value="provence">Provence</option>
                <option value="languedoc">Languedoc-Roussillon</option>
                <option value="beaujolais">Beaujolais</option>
                <option value="jura">Jura</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.typeLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.typePlaceholder}</option>
                <option value="chateau">Château</option>
                <option value="domaine">Domaine</option>
                <option value="mas">Mas</option>
                <option value="clos">Clos</option>
                <option value="maison">Maison de négoce</option>
                <option value="cooperative">Coopérative</option>
                <option value="vignoble">Vignoble</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.appellationLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.appellationPlaceholder}</option>
                <option value="aoc">AOC</option>
                <option value="aop">AOP</option>
                <option value="igp">IGP</option>
                <option value="grand-cru">Grand Cru</option>
                <option value="premier-cru">Premier Cru</option>
                <option value="cru-classe">Cru Classé</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.certificationLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.certificationPlaceholder}</option>
                <option value="bio">Agriculture Biologique</option>
                <option value="biodynamie">Biodynamie</option>
                <option value="hve">Haute Valeur Environnementale</option>
                <option value="terra-vitis">Terra Vitis</option>
                <option value="demeter">Demeter</option>
                <option value="nature">Vin Nature</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.sizeLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.sizePlaceholder}</option>
                <option value="petit">Petit domaine (&lt; 10 ha)</option>
                <option value="moyen">Domaine moyen (10-50 ha)</option>
                <option value="grand">Grand domaine (50-100 ha)</option>
                <option value="tres-grand">Très grand domaine (&gt; 100 ha)</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.experienceLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.experiencePlaceholder}</option>
                <option value="degustation">Dégustation</option>
                <option value="visite-cave">Visite de cave</option>
                <option value="vendanges">Participation aux vendanges</option>
                <option value="oenotourisme">Œnotourisme</option>
                <option value="restaurant">Restaurant sur place</option>
                <option value="hebergement">Hébergement</option>
                <option value="evenementiel">Événementiel</option>
              </select>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className={styles.resultsSection}>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>Résultats</h2>
            <span className={styles.resultsCount}>0 domaine trouvé</span>
          </div>

          {/* Empty State */}
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🍇</div>
            <h3 className={styles.emptyTitle}>{t.emptyTitle}</h3>
            <p className={styles.emptyText}>{t.emptyText}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WineriesPage;

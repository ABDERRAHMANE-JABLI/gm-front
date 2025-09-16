import React from 'react';
import styles from './styles.module.css';

interface UtensilsPageProps {
  lang: 'fr' | 'en';
}

const UtensilsPage: React.FC<UtensilsPageProps> = ({ lang }) => {
  const texts = {
    fr: {
      title: 'Ustensiles de cuisine',
      subtitle: 'L&apos;art culinaire commence par les bons outils. Découvrez notre sélection d&apos;ustensiles professionnels.',
      searchPlaceholder: 'Rechercher un ustensile, une marque, un type...',
      searchButton: 'Rechercher',
      categoryLabel: 'Catégorie',
      categoryPlaceholder: 'Toutes les catégories',
      brandLabel: 'Marque',
      brandPlaceholder: 'Toutes les marques',
      materialLabel: 'Matériau',
      materialPlaceholder: 'Tous les matériaux',
      priceLabel: 'Prix',
      pricePlaceholder: 'Tous les prix',
      usageLabel: 'Usage',
      usagePlaceholder: 'Tous les usages',
      qualityLabel: 'Qualité',
      qualityPlaceholder: 'Toutes les qualités',
      emptyTitle: 'Aucun ustensile trouvé',
      emptyText: 'Explorez notre catalogue complet d&apos;ustensiles professionnels pour sublimer votre art culinaire.'
    },
    en: {
      title: 'Kitchen utensils',
      subtitle: 'Culinary art begins with the right tools. Discover our selection of professional utensils.',
      searchPlaceholder: 'Search for a utensil, brand, type...',
      searchButton: 'Search',
      categoryLabel: 'Category',
      categoryPlaceholder: 'All categories',
      brandLabel: 'Brand',
      brandPlaceholder: 'All brands',
      materialLabel: 'Material',
      materialPlaceholder: 'All materials',
      priceLabel: 'Price',
      pricePlaceholder: 'All prices',
      usageLabel: 'Usage',
      usagePlaceholder: 'All usages',
      qualityLabel: 'Quality',
      qualityPlaceholder: 'All qualities',
      emptyTitle: 'No utensils found',
      emptyText: 'Explore our complete catalog of professional utensils to enhance your culinary art.'
    }
  };

  const t = texts[lang];

  return (
    <div className={styles.utensilsPage}>
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
                <option value="couteaux">Couteaux</option>
                <option value="casseroles">Casseroles & Poêles</option>
                <option value="ustensiles-preparation">Ustensiles de préparation</option>
                <option value="ustensiles-cuisson">Ustensiles de cuisson</option>
                <option value="ustensiles-patisserie">Ustensiles de pâtisserie</option>
                <option value="electromenager">Électroménager</option>
                <option value="vaisselle">Vaisselle & Service</option>
                <option value="rangement">Rangement</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.brandLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.brandPlaceholder}</option>
                <option value="sabatier">Sabatier</option>
                <option value="global">Global</option>
                <option value="wusthof">Wüsthof</option>
                <option value="staub">Staub</option>
                <option value="le-creuset">Le Creuset</option>
                <option value="kitchenaid">KitchenAid</option>
                <option value="de-buyer">De Buyer</option>
                <option value="matfer">Matfer</option>
                <option value="rösle">Rösle</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.materialLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.materialPlaceholder}</option>
                <option value="inox">Acier inoxydable</option>
                <option value="carbone">Acier carbone</option>
                <option value="fonte">Fonte</option>
                <option value="ceramique">Céramique</option>
                <option value="silicone">Silicone</option>
                <option value="bois">Bois</option>
                <option value="bambou">Bambou</option>
                <option value="verre">Verre</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.priceLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.pricePlaceholder}</option>
                <option value="0-25">0-25€</option>
                <option value="25-50">25-50€</option>
                <option value="50-100">50-100€</option>
                <option value="100-200">100-200€</option>
                <option value="200-500">200-500€</option>
                <option value="500+">500€+</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.usageLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.usagePlaceholder}</option>
                <option value="professionnel">Professionnel</option>
                <option value="domestique">Domestique haut de gamme</option>
                <option value="patisserie">Pâtisserie</option>
                <option value="boucherie">Boucherie</option>
                <option value="service">Service en salle</option>
                <option value="preparation">Préparation</option>
                <option value="cuisson">Cuisson</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.qualityLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.qualityPlaceholder}</option>
                <option value="premium">Premium</option>
                <option value="professionnel">Professionnel</option>
                <option value="artisanal">Artisanal</option>
                <option value="made-in-france">Made in France</option>
                <option value="eco-responsable">Éco-responsable</option>
                <option value="garantie-vie">Garantie à vie</option>
              </select>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className={styles.resultsSection}>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>Catalogue</h2>
            <span className={styles.resultsCount}>Explorez notre sélection</span>
          </div>

          {/* Empty State */}
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔪</div>
            <h3 className={styles.emptyTitle}>{t.emptyTitle}</h3>
            <p className={styles.emptyText}>{t.emptyText}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UtensilsPage;

import React from 'react';
import styles from './PeoplesPage.module.css';

interface PeoplesPageProps {
  lang: 'fr' | 'en';
}

const PeoplesPage: React.FC<PeoplesPageProps> = ({ lang }) => {
  const texts = {
    fr: {
      title: 'Recherche de personnalités',
      subtitle: 'Découvrez les plus grandes figures de la gastronomie et de l&apos;art de vivre français',
      searchPlaceholder: 'Rechercher un chef, critique, sommelier, nom...',
      searchButton: 'Rechercher',
      professionLabel: 'Profession',
      professionPlaceholder: 'Toutes les professions',
      locationLabel: 'Localisation',
      locationPlaceholder: 'Toutes les localisations',
      specialtyLabel: 'Spécialité',
      specialtyPlaceholder: 'Toutes les spécialités',
      awardLabel: 'Distinctions',
      awardPlaceholder: 'Toutes les distinctions',
      experienceLabel: 'Expérience',
      experiencePlaceholder: 'Toute expérience',
      categoryLabel: 'Catégorie',
      categoryPlaceholder: 'Toutes les catégories',
      emptyTitle: 'Aucune personnalité trouvée',
      emptyText: 'Essayez de modifier vos critères de recherche pour découvrir les talents de la gastronomie française.'
    },
    en: {
      title: 'People search',
      subtitle: 'Discover the greatest figures in French gastronomy and art of living',
      searchPlaceholder: 'Search for a chef, critic, sommelier, name...',
      searchButton: 'Search',
      professionLabel: 'Profession',
      professionPlaceholder: 'All professions',
      locationLabel: 'Location',
      locationPlaceholder: 'All locations',
      specialtyLabel: 'Specialty',
      specialtyPlaceholder: 'All specialties',
      awardLabel: 'Awards',
      awardPlaceholder: 'All awards',
      experienceLabel: 'Experience',
      experiencePlaceholder: 'All experience',
      categoryLabel: 'Category',
      categoryPlaceholder: 'All categories',
      emptyTitle: 'No personalities found',
      emptyText: 'Try modifying your search criteria to discover French gastronomy talents.'
    }
  };

  const t = texts[lang];

  return (
    <div className={styles.peopleSearchPage}>
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
              <label className={styles.filterLabel}>{t.professionLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.professionPlaceholder}</option>
                <option value="chef">Chef</option>
                <option value="chef-patissier">Chef pâtissier</option>
                <option value="sommelier">Sommelier</option>
                <option value="critique">Critique culinaire</option>
                <option value="journaliste">Journaliste gastronomique</option>
                <option value="maitre-hotel">Maître d&apos;hôtel</option>
                <option value="restaurateur">Restaurateur</option>
                <option value="producteur">Producteur</option>
                <option value="formateur">Formateur culinaire</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.locationLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.locationPlaceholder}</option>
                <option value="paris">Paris</option>
                <option value="lyon">Lyon</option>
                <option value="marseille">Marseille</option>
                <option value="nice">Nice</option>
                <option value="bordeaux">Bordeaux</option>
                <option value="lille">Lille</option>
                <option value="strasbourg">Strasbourg</option>
                <option value="toulouse">Toulouse</option>
                <option value="international">International</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.specialtyLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.specialtyPlaceholder}</option>
                <option value="haute-gastronomie">Haute gastronomie</option>
                <option value="patisserie">Pâtisserie</option>
                <option value="boulangerie">Boulangerie</option>
                <option value="chocolaterie">Chocolaterie</option>
                <option value="oenologie">Œnologie</option>
                <option value="fromage">Fromage</option>
                <option value="cuisine-regionale">Cuisine régionale</option>
                <option value="cuisine-moderne">Cuisine moderne</option>
                <option value="bistronomie">Bistronomie</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.awardLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.awardPlaceholder}</option>
                <option value="michelin">Étoile(s) Michelin</option>
                <option value="gault-millau">Toque(s) Gault&Millau</option>
                <option value="mof">Meilleur Ouvrier de France</option>
                <option value="bocuse-dor">Bocuse d&apos;Or</option>
                <option value="james-beard">James Beard Award</option>
                <option value="prix-goncourt">Prix littéraire</option>
                <option value="legion-honneur">Légion d&apos;Honneur</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.experienceLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.experiencePlaceholder}</option>
                <option value="jeune-talent">Jeune talent (&lt; 5 ans)</option>
                <option value="confirme">Confirmé (5-15 ans)</option>
                <option value="expert">Expert (15-25 ans)</option>
                <option value="maitre">Maître (&gt; 25 ans)</option>
                <option value="legende">Légende</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.categoryLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.categoryPlaceholder}</option>
                <option value="chef-executif">Chef exécutif</option>
                <option value="chef-proprietaire">Chef propriétaire</option>
                <option value="consultant">Consultant culinaire</option>
                <option value="media">Personnalité médiatique</option>
                <option value="auteur">Auteur culinaire</option>
                <option value="influenceur">Influenceur food</option>
                <option value="entrepreneur">Entrepreneur</option>
              </select>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className={styles.resultsSection}>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>Résultats</h2>
            <span className={styles.resultsCount}>0 personnalité trouvée</span>
          </div>

          {/* Empty State */}
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>👤</div>
            <h3 className={styles.emptyTitle}>{t.emptyTitle}</h3>
            <p className={styles.emptyText}>{t.emptyText}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PeoplesPage;

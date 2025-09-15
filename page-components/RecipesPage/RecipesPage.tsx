import React from 'react';
import styles from './RecipesPage.module.css';

interface RecipesPageProps {
  lang: 'fr' | 'en';
}

const RecipesPage: React.FC<RecipesPageProps> = ({ lang }) => {
  const texts = {
    fr: {
      title: 'Recherche de recettes',
      subtitle: 'Explorez les secrets culinaires des plus grands chefs et restaurants Gault&Millau',
      searchPlaceholder: 'Rechercher une recette, un ingrédient, un chef...',
      searchButton: 'Rechercher',
      categoryLabel: 'Catégorie',
      categoryPlaceholder: 'Toutes les catégories',
      difficultyLabel: 'Difficulté',
      difficultyPlaceholder: 'Toutes les difficultés',
      timeLabel: 'Temps de préparation',
      timePlaceholder: 'Tous les temps',
      ingredientLabel: 'Ingrédient principal',
      ingredientPlaceholder: 'Tous les ingrédients',
      cuisineLabel: 'Type de cuisine',
      cuisinePlaceholder: 'Tous les types',
      dietLabel: 'Régime alimentaire',
      dietPlaceholder: 'Tous les régimes',
      emptyTitle: 'Aucune recette trouvée',
      emptyText: 'Essayez de modifier vos critères de recherche pour découvrir de délicieuses recettes de chefs.'
    },
    en: {
      title: 'Recipe search',
      subtitle: 'Explore the culinary secrets of the greatest chefs and Gault&Millau restaurants',
      searchPlaceholder: 'Search for a recipe, ingredient, chef...',
      searchButton: 'Search',
      categoryLabel: 'Category',
      categoryPlaceholder: 'All categories',
      difficultyLabel: 'Difficulty',
      difficultyPlaceholder: 'All difficulties',
      timeLabel: 'Preparation time',
      timePlaceholder: 'All times',
      ingredientLabel: 'Main ingredient',
      ingredientPlaceholder: 'All ingredients',
      cuisineLabel: 'Cuisine type',
      cuisinePlaceholder: 'All types',
      dietLabel: 'Diet',
      dietPlaceholder: 'All diets',
      emptyTitle: 'No recipes found',
      emptyText: 'Try modifying your search criteria to discover delicious chef recipes.'
    }
  };

  const t = texts[lang];

  return (
    <div className={styles.recipeSearchPage}>
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
                <option value="entrees">Entrées</option>
                <option value="plats">Plats principaux</option>
                <option value="desserts">Desserts</option>
                <option value="amuse-bouches">Amuse-bouches</option>
                <option value="sauces">Sauces</option>
                <option value="accompagnements">Accompagnements</option>
                <option value="cocktails">Cocktails</option>
                <option value="petit-dejeuner">Petit-déjeuner</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.difficultyLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.difficultyPlaceholder}</option>
                <option value="facile">Facile</option>
                <option value="moyen">Moyen</option>
                <option value="difficile">Difficile</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.timeLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.timePlaceholder}</option>
                <option value="15min">Moins de 15 min</option>
                <option value="30min">15-30 min</option>
                <option value="1h">30 min - 1h</option>
                <option value="2h">1-2h</option>
                <option value="3h">2-3h</option>
                <option value="plus">Plus de 3h</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.ingredientLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.ingredientPlaceholder}</option>
                <option value="poisson">Poisson</option>
                <option value="viande">Viande</option>
                <option value="volaille">Volaille</option>
                <option value="legumes">Légumes</option>
                <option value="fruits">Fruits</option>
                <option value="fromage">Fromage</option>
                <option value="chocolat">Chocolat</option>
                <option value="fruits-mer">Fruits de mer</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.cuisineLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.cuisinePlaceholder}</option>
                <option value="francaise">Française</option>
                <option value="italienne">Italienne</option>
                <option value="asiatique">Asiatique</option>
                <option value="japonaise">Japonaise</option>
                <option value="mediterraneenne">Méditerranéenne</option>
                <option value="moderne">Moderne</option>
                <option value="fusion">Fusion</option>
                <option value="traditionnelle">Traditionnelle</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.dietLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.dietPlaceholder}</option>
                <option value="vegetarien">Végétarien</option>
                <option value="vegan">Vegan</option>
                <option value="sans-gluten">Sans gluten</option>
                <option value="sans-lactose">Sans lactose</option>
                <option value="paleo">Paléo</option>
                <option value="keto">Keto</option>
                <option value="leger">Léger</option>
              </select>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className={styles.resultsSection}>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>Résultats</h2>
            <span className={styles.resultsCount}>0 recette trouvée</span>
          </div>

          {/* Empty State */}
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>👨‍🍳</div>
            <h3 className={styles.emptyTitle}>{t.emptyTitle}</h3>
            <p className={styles.emptyText}>{t.emptyText}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RecipesPage;

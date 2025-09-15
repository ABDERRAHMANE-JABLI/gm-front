import React from 'react';
import styles from './BlogsPage.module.css';

type Language = 'fr' | 'en';

interface BlogsPageProps {
  lang: Language;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function BlogsPage({ lang }: BlogsPageProps) {
  return (
    <div className={styles.blogSearchPage}>
      {/* Search Page Container */}
      <div className={styles.container}>
        
        {/* Page Header */}
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Actualités</h1>
          <p className={styles.pageSubtitle}>
            Recherchez dans nos articles et actualités gastronomiques
          </p>
        </header>

        {/* Search Section */}
        <section className={styles.searchSection}>
          <div className={styles.searchContainer}>
            <div className={styles.searchBox}>
              <input 
                type="search" 
                placeholder="Rechercher des articles..."
                className={styles.searchInput}
              />
              <button className={styles.searchButton}>
                Rechercher
              </button>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className={styles.filtersSection}>
          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Catégorie</label>
              <select className={styles.filterSelect}>
                <option value="">Toutes les catégories</option>
                <option value="tables-chefs">Tables & Chefs</option>
                <option value="actus-rendez-vous">Actus & Rendez-vous</option>
                <option value="artisans-savoir-faire">Artisans & Savoir-faire</option>
                <option value="city-guide">City Guide & Balades</option>
              </select>
            </div>
            
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Date</label>
              <select className={styles.filterSelect}>
                <option value="">Toutes les dates</option>
                <option value="today">Aujourd&apos;hui</option>
                <option value="week">Cette semaine</option>
                <option value="month">Ce mois</option>
                <option value="year">Cette année</option>
              </select>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className={styles.resultsSection}>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>Résultats de recherche</h2>
            <div className={styles.resultsCount}>
              Aucun résultat pour le moment
            </div>
          </div>
          
          {/* Empty State */}
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔍</div>
            <h3 className={styles.emptyTitle}>Aucun article trouvé</h3>
            <p className={styles.emptyText}>
              Utilisez les filtres ci-dessus pour rechercher des articles ou actualités.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}

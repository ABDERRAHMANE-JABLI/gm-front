import React from 'react';
import NewsCard from '@/components/cards/NewsCard';
import SingleNewsCard from '@/components/cards/newsUneCard'
import styles from './styles.module.css';
import { NewsCardData, NewsCardHeaderData, SingleNewsCardData } from "@/mocks/NewsData";

type Language = 'fr' | 'en';

interface BlogsPageProps {
  lang: Language;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function BlogsPage({ lang }: BlogsPageProps) {

  return (
    <div className={styles.NewsearchPage}>
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

        <section className={styles.resultsSection}>

          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>Les cartes de la page Actualité</h2>
          </div>


          <div className="infinite-hits-container mb-5">
            {NewsCardData.map((card) => (
              <div key={card.id}>
                <NewsCard lang={lang} card={card} />
              </div>
            ))}
          </div>



          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>Les cartes de la page La PLACE</h2>
          </div>

          <div className='infinite-hits-container mt-5'>
            {NewsCardHeaderData.map((card) => (
              <div key={card.id}>
                <NewsCard lang={lang} card={card} withHeader={true} />
              </div>
            ))}
          </div>

            <div className="infinite-hits-container mt-5">
              <SingleNewsCard lang={lang} card={SingleNewsCardData} withHeader={true} />
            </div>
        </section>

      </div>
    </div>
  );
}

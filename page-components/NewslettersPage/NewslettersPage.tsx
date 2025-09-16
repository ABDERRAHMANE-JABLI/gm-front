'use client'

import React from 'react'
import styles from './styles.module.css'

interface Language {
  fr: string
  en: string
}

interface Props {
  lang: 'fr' | 'en'
}

const content: Record<string, Language> = {
  title: {
    fr: 'Newsletters Gault&Millau',
    en: 'Gault&Millau Newsletters'
  },
  subtitle: {
    fr: 'Restez informé de l\'actualité gastronomique avec nos newsletters exclusives',
    en: 'Stay informed about gastronomic news with our exclusive newsletters'
  },
  searchPlaceholder: {
    fr: 'Rechercher une newsletter, un thème...',
    en: 'Search for a newsletter, theme...'
  },
  searchButton: {
    fr: 'Rechercher',
    en: 'Search'
  },
  categoryLabel: {
    fr: 'Catégorie',
    en: 'Category'
  },
  categoryAll: {
    fr: 'Toutes les catégories',
    en: 'All categories'
  },
  frequencyLabel: {
    fr: 'Fréquence',
    en: 'Frequency'
  },
  frequencyAll: {
    fr: 'Toutes les fréquences',
    en: 'All frequencies'
  },
  statusLabel: {
    fr: 'Statut',
    en: 'Status'
  },
  statusAll: {
    fr: 'Tous les statuts',
    en: 'All statuses'
  },
  regionLabel: {
    fr: 'Région',
    en: 'Region'
  },
  regionAll: {
    fr: 'Toutes les régions',
    en: 'All regions'
  },
  languageLabel: {
    fr: 'Langue',
    en: 'Language'
  },
  languageAll: {
    fr: 'Toutes les langues',
    en: 'All languages'
  },
  emptyTitle: {
    fr: 'Découvrez nos Newsletters',
    en: 'Discover our Newsletters'
  },
  emptyText: {
    fr: 'Abonnez-vous à nos newsletters pour recevoir les dernières actualités gastronomiques, découvertes culinaires et recommandations d\'experts Gault&Millau.',
    en: 'Subscribe to our newsletters to receive the latest gastronomic news, culinary discoveries and expert recommendations from Gault&Millau.'
  }
}

export default function NewslettersPage({ lang }: Props) {
  const t = (key: string) => content[key]?.[lang] || content[key]?.fr || ''

  return (
    <div className={styles.newslettersPage}>
      <div className={styles.container}>
        {/* Page Header */}
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>{t('title')}</h1>
          <p className={styles.pageSubtitle}>{t('subtitle')}</p>
        </header>

        {/* Search Section */}
        <section className={styles.searchSection}>
          <div className={styles.searchContainer}>
            <div className={styles.searchBox}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder={t('searchPlaceholder')}
              />
              <button className={styles.searchButton}>
                {t('searchButton')}
              </button>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className={styles.filtersSection}>
          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t('categoryLabel')}</label>
              <select className={styles.filterSelect}>
                <option value="">{t('categoryAll')}</option>
                <option value="actualites">Actualités Gastronomiques</option>
                <option value="restaurants">Nouveaux Restaurants</option>
                <option value="recettes">Recettes & Techniques</option>
                <option value="vins">Vins & Spiritueux</option>
                <option value="producteurs">Producteurs & Artisans</option>
                <option value="evenements">Événements & Festivals</option>
                <option value="tendances">Tendances Culinaires</option>
                <option value="voyages">Voyages Gastronomiques</option>
                <option value="critiques">Critiques & Tests</option>
                <option value="interviews">Interviews de Chefs</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t('frequencyLabel')}</label>
              <select className={styles.filterSelect}>
                <option value="">{t('frequencyAll')}</option>
                <option value="quotidienne">Quotidienne</option>
                <option value="hebdomadaire">Hebdomadaire</option>
                <option value="bi-hebdomadaire">Bi-hebdomadaire</option>
                <option value="mensuelle">Mensuelle</option>
                <option value="saisonniere">Saisonnière</option>
                <option value="evenementielle">Événementielle</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t('statusLabel')}</label>
              <select className={styles.filterSelect}>
                <option value="">{t('statusAll')}</option>
                <option value="active">Active</option>
                <option value="nouvelle">Nouvelle</option>
                <option value="premium">Premium</option>
                <option value="gratuite">Gratuite</option>
                <option value="abonnes">Abonnés uniquement</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t('regionLabel')}</label>
              <select className={styles.filterSelect}>
                <option value="">{t('regionAll')}</option>
                <option value="nationale">France entière</option>
                <option value="paris">Région Parisienne</option>
                <option value="lyon">Lyon & Région</option>
                <option value="marseille">Marseille & PACA</option>
                <option value="bordeaux">Bordeaux & Aquitaine</option>
                <option value="toulouse">Toulouse & Occitanie</option>
                <option value="strasbourg">Strasbourg & Grand Est</option>
                <option value="lille">Lille & Nord</option>
                <option value="internationale">Internationale</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t('languageLabel')}</label>
              <select className={styles.filterSelect}>
                <option value="">{t('languageAll')}</option>
                <option value="francais">Français</option>
                <option value="anglais">English</option>
                <option value="bilingue">Bilingue</option>
              </select>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className={styles.resultsSection}>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>Newsletters disponibles</h2>
            <span className={styles.resultsCount}>0 newsletter trouvée</span>
          </div>

          {/* Empty State */}
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📧</div>
            <h3 className={styles.emptyTitle}>{t('emptyTitle')}</h3>
            <p className={styles.emptyText}>{t('emptyText')}</p>
          </div>
        </section>
      </div>
    </div>
  )
}

'use client'

import React from 'react'
import styles from './FAQPage.module.css'

interface Language {
  fr: string
  en: string
}

interface Props {
  lang: 'fr' | 'en'
}

const content: Record<string, Language> = {
  title: {
    fr: 'Questions Fréquentes',
    en: 'Frequently Asked Questions'
  },
  subtitle: {
    fr: 'Trouvez rapidement les réponses à vos questions sur Gault&Millau',
    en: 'Quickly find answers to your questions about Gault&Millau'
  },
  searchPlaceholder: {
    fr: 'Rechercher une question, un mot-clé...',
    en: 'Search for a question, keyword...'
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
  popularityLabel: {
    fr: 'Popularité',
    en: 'Popularity'
  },
  popularityAll: {
    fr: 'Toutes les questions',
    en: 'All questions'
  },
  typeLabel: {
    fr: 'Type',
    en: 'Type'
  },
  typeAll: {
    fr: 'Tous les types',
    en: 'All types'
  },
  audienceLabel: {
    fr: 'Audience',
    en: 'Audience'
  },
  audienceAll: {
    fr: 'Toutes les audiences',
    en: 'All audiences'
  },
  complexityLabel: {
    fr: 'Complexité',
    en: 'Complexity'
  },
  complexityAll: {
    fr: 'Tous les niveaux',
    en: 'All levels'
  },
  emptyTitle: {
    fr: 'Centre d\'Aide Gault&Millau',
    en: 'Gault&Millau Help Center'
  },
  emptyText: {
    fr: 'Explorez notre base de connaissances pour trouver des réponses à vos questions sur nos services, critères de notation, utilisation du site et bien plus encore.',
    en: 'Explore our knowledge base to find answers to your questions about our services, rating criteria, website usage and much more.'
  }
}

export default function FAQPage({ lang }: Props) {
  const t = (key: string) => content[key]?.[lang] || content[key]?.fr || ''

  return (
    <div className={styles.faqPage}>
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
                <option value="compte">Compte & Profil</option>
                <option value="notation">Système de Notation</option>
                <option value="restaurants">Restaurants & Établissements</option>
                <option value="recherche">Recherche & Navigation</option>
                <option value="abonnement">Abonnements & Services</option>
                <option value="technique">Problèmes Techniques</option>
                <option value="mobile">Application Mobile</option>
                <option value="partenaires">Partenaires & Professionnels</option>
                <option value="critiques">Critiques & Avis</option>
                <option value="contact">Contact & Support</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t('popularityLabel')}</label>
              <select className={styles.filterSelect}>
                <option value="">{t('popularityAll')}</option>
                <option value="tres-populaire">Très populaire</option>
                <option value="populaire">Populaire</option>
                <option value="frequent">Fréquent</option>
                <option value="recent">Récent</option>
                <option value="tendance">En tendance</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t('typeLabel')}</label>
              <select className={styles.filterSelect}>
                <option value="">{t('typeAll')}</option>
                <option value="guide">Guide d&apos;utilisation</option>
                <option value="tutoriel">Tutoriel</option>
                <option value="depannage">Dépannage</option>
                <option value="information">Information générale</option>
                <option value="procedure">Procédure</option>
                <option value="conseil">Conseil</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t('audienceLabel')}</label>
              <select className={styles.filterSelect}>
                <option value="">{t('audienceAll')}</option>
                <option value="particuliers">Particuliers</option>
                <option value="professionnels">Professionnels</option>
                <option value="restaurateurs">Restaurateurs</option>
                <option value="journalistes">Journalistes</option>
                <option value="partenaires">Partenaires</option>
                <option value="nouveaux">Nouveaux utilisateurs</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t('complexityLabel')}</label>
              <select className={styles.filterSelect}>
                <option value="">{t('complexityAll')}</option>
                <option value="debutant">Débutant</option>
                <option value="intermediaire">Intermédiaire</option>
                <option value="avance">Avancé</option>
                <option value="expert">Expert</option>
              </select>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className={styles.resultsSection}>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>Questions & Réponses</h2>
            <span className={styles.resultsCount}>0 question trouvée</span>
          </div>

          {/* Empty State */}
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>❓</div>
            <h3 className={styles.emptyTitle}>{t('emptyTitle')}</h3>
            <p className={styles.emptyText}>{t('emptyText')}</p>
          </div>
        </section>
      </div>
    </div>
  )
}

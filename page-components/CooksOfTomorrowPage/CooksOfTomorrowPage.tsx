'use client'

import React from 'react'
import styles from './CooksOfTomorrowPage.module.css'

interface Language {
  fr: string
  en: string
}

interface Props {
  lang: 'fr' | 'en'
}

const content: Record<string, Language> = {
  title: {
    fr: 'Cuisiniers de Demain',
    en: 'Cooks of Tomorrow'
  },
  subtitle: {
    fr: 'Découvrez les talents culinaires de demain, futurs grands noms de la gastronomie française',
    en: 'Discover the culinary talents of tomorrow, future great names in French gastronomy'
  },
  searchPlaceholder: {
    fr: 'Rechercher un jeune chef, une école, une spécialité...',
    en: 'Search for a young chef, school, specialty...'
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
  levelLabel: {
    fr: 'Niveau',
    en: 'Level'
  },
  levelAll: {
    fr: 'Tous les niveaux',
    en: 'All levels'
  },
  ageLabel: {
    fr: 'Tranche d\'âge',
    en: 'Age range'
  },
  ageAll: {
    fr: 'Tous les âges',
    en: 'All ages'
  },
  specialtyLabel: {
    fr: 'Spécialité',
    en: 'Specialty'
  },
  specialtyAll: {
    fr: 'Toutes les spécialités',
    en: 'All specialties'
  },
  regionLabel: {
    fr: 'Région',
    en: 'Region'
  },
  regionAll: {
    fr: 'Toutes les régions',
    en: 'All regions'
  },
  statusLabel: {
    fr: 'Statut',
    en: 'Status'
  },
  statusAll: {
    fr: 'Tous les statuts',
    en: 'All statuses'
  },
  emptyTitle: {
    fr: 'L\'Avenir de la Gastronomie',
    en: 'The Future of Gastronomy'
  },
  emptyText: {
    fr: 'Explorez les profils des jeunes talents culinaires prometteurs. Étudiants brillants, apprentis passionnés et jeunes chefs qui façonneront la gastronomie de demain.',
    en: 'Explore the profiles of promising young culinary talents. Brilliant students, passionate apprentices and young chefs who will shape tomorrow\'s gastronomy.'
  }
}

export default function CooksOfTomorrowPage({ lang }: Props) {
  const t = (key: string) => content[key]?.[lang] || content[key]?.fr || ''

  return (
    <div className={styles.cooksOfTomorrowPage}>
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
                <option value="etudiants">Étudiants en cuisine</option>
                <option value="apprentis">Apprentis</option>
                <option value="jeunes-chefs">Jeunes chefs</option>
                <option value="commis">Commis de cuisine</option>
                <option value="chefs-partie">Chefs de partie</option>
                <option value="sous-chefs">Sous-chefs</option>
                <option value="patissiers">Jeunes pâtissiers</option>
                <option value="boulangers">Jeunes boulangers</option>
                <option value="sommeliers">Jeunes sommeliers</option>
                <option value="entrepreneurs">Entrepreneurs culinaires</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t('levelLabel')}</label>
              <select className={styles.filterSelect}>
                <option value="">{t('levelAll')}</option>
                <option value="debutant">Débutant</option>
                <option value="intermediaire">Intermédiaire</option>
                <option value="confirme">Confirmé</option>
                <option value="expert">Expert</option>
                <option value="prodige">Prodige</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t('ageLabel')}</label>
              <select className={styles.filterSelect}>
                <option value="">{t('ageAll')}</option>
                <option value="16-20">16-20 ans</option>
                <option value="21-25">21-25 ans</option>
                <option value="26-30">26-30 ans</option>
                <option value="31-35">31-35 ans</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t('specialtyLabel')}</label>
              <select className={styles.filterSelect}>
                <option value="">{t('specialtyAll')}</option>
                <option value="cuisine-francaise">Cuisine française</option>
                <option value="patisserie">Pâtisserie</option>
                <option value="boulangerie">Boulangerie</option>
                <option value="cuisine-moleculaire">Cuisine moléculaire</option>
                <option value="cuisine-vegetale">Cuisine végétale</option>
                <option value="cuisine-fusion">Cuisine fusion</option>
                <option value="cuisine-regionale">Cuisine régionale</option>
                <option value="chocolaterie">Chocolaterie</option>
                <option value="glacerie">Glacerie</option>
                <option value="sommellerie">Sommellerie</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t('regionLabel')}</label>
              <select className={styles.filterSelect}>
                <option value="">{t('regionAll')}</option>
                <option value="ile-de-france">Île-de-France</option>
                <option value="auvergne-rhone-alpes">Auvergne-Rhône-Alpes</option>
                <option value="provence-alpes-cote-azur">Provence-Alpes-Côte d&apos;Azur</option>
                <option value="nouvelle-aquitaine">Nouvelle-Aquitaine</option>
                <option value="occitanie">Occitanie</option>
                <option value="grand-est">Grand Est</option>
                <option value="bourgogne-franche-comte">Bourgogne-Franche-Comté</option>
                <option value="bretagne">Bretagne</option>
                <option value="normandie">Normandie</option>
                <option value="pays-de-la-loire">Pays de la Loire</option>
                <option value="hauts-de-france">Hauts-de-France</option>
                <option value="centre-val-de-loire">Centre-Val de Loire</option>
                <option value="corse">Corse</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t('statusLabel')}</label>
              <select className={styles.filterSelect}>
                <option value="">{t('statusAll')}</option>
                <option value="formation">En formation</option>
                <option value="stage">En stage</option>
                <option value="emploi">En emploi</option>
                <option value="entrepreneur">Entrepreneur</option>
                <option value="concours">En concours</option>
                <option value="recherche">En recherche</option>
              </select>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className={styles.resultsSection}>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>Talents de demain</h2>
            <span className={styles.resultsCount}>0 profil trouvé</span>
          </div>

          {/* Empty State */}
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>👨‍🍳</div>
            <h3 className={styles.emptyTitle}>{t('emptyTitle')}</h3>
            <p className={styles.emptyText}>{t('emptyText')}</p>
          </div>
        </section>
      </div>
    </div>
  )
}

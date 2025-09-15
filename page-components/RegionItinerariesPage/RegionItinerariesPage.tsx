'use client'

import React from 'react'
import styles from './RegionItinerariesPage.module.css'

interface Language {
  fr: string
  en: string
}

interface Props {
  lang: 'fr' | 'en'
  region: string
}

const content: Record<string, Language> = {
  title: {
    fr: 'Itinéraires Gastronomiques',
    en: 'Gastronomic Itineraries'
  },
  subtitle: {
    fr: 'Découvrez les routes des saveurs et circuits gourmands de la région',
    en: 'Discover the flavor routes and gourmet circuits of the region'
  },
  searchPlaceholder: {
    fr: 'Rechercher un itinéraire dans la région...',
    en: 'Search for an itinerary in the region...'
  },
  searchButton: {
    fr: 'Rechercher',
    en: 'Search'
  },
  backToAll: {
    fr: '← Tous les itinéraires',
    en: '← All itineraries'
  },
  themeLabel: {
    fr: 'Thème',
    en: 'Theme'
  },
  themeAll: {
    fr: 'Tous les thèmes',
    en: 'All themes'
  },
  durationLabel: {
    fr: 'Durée',
    en: 'Duration'
  },
  durationAll: {
    fr: 'Toutes les durées',
    en: 'All durations'
  },
  difficultyLabel: {
    fr: 'Difficulté',
    en: 'Difficulty'
  },
  difficultyAll: {
    fr: 'Tous les niveaux',
    en: 'All levels'
  },
  seasonLabel: {
    fr: 'Saison',
    en: 'Season'
  },
  seasonAll: {
    fr: 'Toutes les saisons',
    en: 'All seasons'
  },
  transportLabel: {
    fr: 'Transport',
    en: 'Transport'
  },
  transportAll: {
    fr: 'Tous les moyens',
    en: 'All means'
  },
  emptyTitle: {
    fr: 'Explorez la Région',
    en: 'Explore the Region'
  },
  emptyText: {
    fr: 'Partez à la découverte des trésors gastronomiques de cette région. Des circuits gourmands et routes des saveurs vous attendent.',
    en: 'Discover the gastronomic treasures of this region. Gourmet circuits and flavor routes await you.'
  }
}

// Region display names
const regionNames: Record<string, Language> = {
  'auvergne-rhone-alpes': {
    fr: 'Auvergne-Rhône-Alpes',
    en: 'Auvergne-Rhône-Alpes'
  },
  'bourgogne-franche-comte': {
    fr: 'Bourgogne-Franche-Comté',
    en: 'Burgundy-Franche-Comté'
  },
  'bretagne': {
    fr: 'Bretagne',
    en: 'Brittany'
  },
  'centre-val-de-loire': {
    fr: 'Centre-Val de Loire',
    en: 'Centre-Val de Loire'
  },
  'corse': {
    fr: 'Corse',
    en: 'Corsica'
  },
  'grand-est': {
    fr: 'Grand Est',
    en: 'Grand Est'
  },
  'hauts-de-france': {
    fr: 'Hauts-de-France',
    en: 'Hauts-de-France'
  },
  'ile-de-france': {
    fr: 'Île-de-France',
    en: 'Île-de-France'
  },
  'normandie': {
    fr: 'Normandie',
    en: 'Normandy'
  },
  'nouvelle-aquitaine': {
    fr: 'Nouvelle-Aquitaine',
    en: 'Nouvelle-Aquitaine'
  },
  'occitanie': {
    fr: 'Occitanie',
    en: 'Occitanie'
  },
  'pays-de-la-loire': {
    fr: 'Pays de la Loire',
    en: 'Pays de la Loire'
  },
  'provence-alpes-cote-azur': {
    fr: 'Provence-Alpes-Côte d\'Azur',
    en: 'Provence-Alpes-Côte d\'Azur'
  }
}

export default function RegionItinerariesPage({ lang, region }: Props) {
  const t = (key: string) => content[key]?.[lang] || content[key]?.fr || ''
  const regionName = regionNames[region]?.[lang] || regionNames[region]?.fr || region

  return (
    <div className={styles.regionItinerariesPage}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <a href={`/${lang}/itineraries`} className={styles.breadcrumbLink}>
            {t('backToAll')}
          </a>
        </nav>

        {/* Page Header */}
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>
            {t('title')} <span className={styles.regionName}>{regionName}</span>
          </h1>
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
              <label className={styles.filterLabel}>{t('themeLabel')}</label>
              <select className={styles.filterSelect}>
                <option value="">{t('themeAll')}</option>
                <option value="terroir">Terroir et Tradition</option>
                <option value="vins">Route des Vins</option>
                <option value="fromages">Fromages d&apos;Exception</option>
                <option value="marches">Marchés et Producteurs</option>
                <option value="etoiles">Restaurants Étoilés</option>
                <option value="bistrots">Bistrots Authentiques</option>
                <option value="patisserie">Art de la Pâtisserie</option>
                <option value="mer">Saveurs de la Mer</option>
                <option value="montagne">Cuisine de Montagne</option>
                <option value="champagne">Route du Champagne</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t('durationLabel')}</label>
              <select className={styles.filterSelect}>
                <option value="">{t('durationAll')}</option>
                <option value="half-day">Demi-journée</option>
                <option value="full-day">Journée complète</option>
                <option value="weekend">Week-end</option>
                <option value="week">Semaine</option>
                <option value="extended">Séjour prolongé</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t('difficultyLabel')}</label>
              <select className={styles.filterSelect}>
                <option value="">{t('difficultyAll')}</option>
                <option value="easy">Facile</option>
                <option value="moderate">Modéré</option>
                <option value="challenging">Exigeant</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t('seasonLabel')}</label>
              <select className={styles.filterSelect}>
                <option value="">{t('seasonAll')}</option>
                <option value="spring">Printemps</option>
                <option value="summer">Été</option>
                <option value="autumn">Automne</option>
                <option value="winter">Hiver</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t('transportLabel')}</label>
              <select className={styles.filterSelect}>
                <option value="">{t('transportAll')}</option>
                <option value="car">Voiture</option>
                <option value="bike">Vélo</option>
                <option value="walking">À pied</option>
                <option value="public">Transport public</option>
                <option value="boat">Bateau</option>
              </select>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className={styles.resultsSection}>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>Itinéraires en {regionName}</h2>
            <span className={styles.resultsCount}>0 itinéraire trouvé</span>
          </div>

          {/* Empty State */}
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🗺️</div>
            <h3 className={styles.emptyTitle}>{t('emptyTitle')}</h3>
            <p className={styles.emptyText}>{t('emptyText')}</p>
          </div>
        </section>
      </div>
    </div>
  )
}

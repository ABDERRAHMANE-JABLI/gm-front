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
    fr: 'Itinéraires Gastronomiques',
    en: 'Gastronomic Itineraries'
  },
  subtitle: {
    fr: 'Découvrez les plus belles routes des saveurs et circuits gourmands de France',
    en: 'Discover the most beautiful flavor routes and gourmet circuits in France'
  },
  searchPlaceholder: {
    fr: 'Rechercher un itinéraire, une région, un thème...',
    en: 'Search for an itinerary, region, theme...'
  },
  searchButton: {
    fr: 'Rechercher',
    en: 'Search'
  },
  regionLabel: {
    fr: 'Région',
    en: 'Region'
  },
  regionAll: {
    fr: 'Toutes les régions',
    en: 'All regions'
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
    fr: 'Explorez nos Itinéraires',
    en: 'Explore our Itineraries'
  },
  emptyText: {
    fr: 'Partez à la découverte des plus beaux circuits gastronomiques et routes des saveurs. Des escapades gourmandes vous attendent dans toute la France.',
    en: 'Discover the most beautiful gastronomic circuits and flavor routes. Gourmet getaways await you throughout France.'
  }
}

export default function ItinerariesPage({ lang }: Props) {
  const t = (key: string) => content[key]?.[lang] || content[key]?.fr || ''

  return (
    <div className={styles.itinerariesPage}>
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
              <label className={styles.filterLabel}>{t('regionLabel')}</label>
              <select className={styles.filterSelect}>
                <option value="">{t('regionAll')}</option>
                <option value="auvergne-rhone-alpes">Auvergne-Rhône-Alpes</option>
                <option value="bourgogne-franche-comte">Bourgogne-Franche-Comté</option>
                <option value="bretagne">Bretagne</option>
                <option value="centre-val-de-loire">Centre-Val de Loire</option>
                <option value="corse">Corse</option>
                <option value="grand-est">Grand Est</option>
                <option value="hauts-de-france">Hauts-de-France</option>
                <option value="ile-de-france">Île-de-France</option>
                <option value="normandie">Normandie</option>
                <option value="nouvelle-aquitaine">Nouvelle-Aquitaine</option>
                <option value="occitanie">Occitanie</option>
                <option value="pays-de-la-loire">Pays de la Loire</option>
                <option value="provence-alpes-cote-azur">Provence-Alpes-Côte d&apos;Azur</option>
              </select>
            </div>

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
            <h2 className={styles.resultsTitle}>Itinéraires disponibles</h2>
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

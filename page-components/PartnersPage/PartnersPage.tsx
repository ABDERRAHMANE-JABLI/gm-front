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
    fr: 'Nos Partenaires',
    en: 'Our Partners'
  },
  subtitle: {
    fr: 'Découvrez les établissements d\'exception et artisans passionnés qui partagent notre vision de l\'excellence gastronomique',
    en: 'Discover the exceptional establishments and passionate artisans who share our vision of gastronomic excellence'
  },
  searchPlaceholder: {
    fr: 'Rechercher un partenaire, une marque, une région...',
    en: 'Search for a partner, brand, region...'
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
  regionLabel: {
    fr: 'Région',
    en: 'Region'
  },
  regionAll: {
    fr: 'Toutes les régions',
    en: 'All regions'
  },
  typeLabel: {
    fr: 'Type de partenariat',
    en: 'Partnership type'
  },
  typeAll: {
    fr: 'Tous les types',
    en: 'All types'
  },
  sectorLabel: {
    fr: 'Secteur',
    en: 'Sector'
  },
  sectorAll: {
    fr: 'Tous les secteurs',
    en: 'All sectors'
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
    fr: 'Nos Partenaires d\'Excellence',
    en: 'Our Partners of Excellence'
  },
  emptyText: {
    fr: 'Explorez notre réseau de partenaires prestigieux. Restaurants étoilés, producteurs artisanaux, marques d\'exception qui incarnent l\'art de vivre à la française.',
    en: 'Explore our network of prestigious partners. Starred restaurants, artisanal producers, exceptional brands that embody the French art of living.'
  }
}

export default function PartnersPage({ lang }: Props) {
  const t = (key: string) => content[key]?.[lang] || content[key]?.fr || ''

  return (
    <div className={styles.partnersPage}>
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
                <option value="restaurants">Restaurants</option>
                <option value="hotels">Hôtels & Maisons d&apos;hôtes</option>
                <option value="producteurs">Producteurs & Artisans</option>
                <option value="vignerons">Vignerons & Domaines</option>
                <option value="epicerie">Épicerie fine</option>
                <option value="equipement">Équipement culinaire</option>
                <option value="formation">Écoles & Formation</option>
                <option value="media">Médias & Édition</option>
                <option value="evenements">Événements</option>
                <option value="technology">Technologies</option>
              </select>
            </div>

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
                <option value="international">International</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t('typeLabel')}</label>
              <select className={styles.filterSelect}>
                <option value="">{t('typeAll')}</option>
                <option value="premium">Partenaire Premium</option>
                <option value="officiel">Partenaire Officiel</option>
                <option value="recommande">Établissement Recommandé</option>
                <option value="labellise">Établissement Labellisé</option>
                <option value="collaborateur">Collaborateur</option>
                <option value="fournisseur">Fournisseur Agréé</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t('sectorLabel')}</label>
              <select className={styles.filterSelect}>
                <option value="">{t('sectorAll')}</option>
                <option value="gastronomie">Gastronomie</option>
                <option value="vins-spiritueux">Vins & Spiritueux</option>
                <option value="hotellerie">Hôtellerie</option>
                <option value="equipement">Équipement</option>
                <option value="formation">Formation</option>
                <option value="tourisme">Tourisme Gastronomique</option>
                <option value="media">Médias</option>
                <option value="distribution">Distribution</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t('statusLabel')}</label>
              <select className={styles.filterSelect}>
                <option value="">{t('statusAll')}</option>
                <option value="actif">Actif</option>
                <option value="nouveau">Nouveau Partenaire</option>
                <option value="exclusif">Partenariat Exclusif</option>
                <option value="strategique">Partenaire Stratégique</option>
              </select>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className={styles.resultsSection}>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>Partenaires</h2>
            <span className={styles.resultsCount}>0 partenaire trouvé</span>
          </div>

          {/* Empty State */}
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🤝</div>
            <h3 className={styles.emptyTitle}>{t('emptyTitle')}</h3>
            <p className={styles.emptyText}>{t('emptyText')}</p>
          </div>
        </section>
      </div>
    </div>
  )
}

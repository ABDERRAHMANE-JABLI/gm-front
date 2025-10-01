/**
 * @fileoverview Page de recherche et liste des artisans
 * @description Composant principal pour afficher la page de recherche des artisans avec filtres et résultats
 * @author Gault&Millau Development Team
 * @version 1.0.0
 */

import React from 'react';
import styles from './styles.module.css';
import { ArtisanData } from '@/FakeData';
import ArtisanCard from '@/components/cards/artisanCard';

/**
 * Props pour le composant ArtisansPage
 * @interface ArtisansPageProps
 */
interface ArtisansPageProps {
  /** 
   * Langue de l'interface utilisateur
   * @description Détermine la langue d'affichage de tous les textes de la page
   * @example 'fr' | 'en'
   */
  lang: 'fr' | 'en';
}

/**
 * Composant principal de la page de recherche des artisans
 * @description Affiche une page avec filtres de recherche et liste des artisans correspondants
 * @param {ArtisansPageProps} props - Les propriétés du composant
 * @returns {JSX.Element} La page complète de recherche d'artisans
 * @example
 * ```tsx
 * <ArtisansPage lang="fr" />
 * ```
 */
const ArtisansPage: React.FC<ArtisansPageProps> = ({ lang }) => {
  /**
   * Textes multilingues pour l'interface utilisateur
   * @description Contient tous les textes affichés selon la langue sélectionnée
   */
  const texts = {
    /** Textes en français */
    fr: {
      /** Titre principal de la page */
      title: 'Recherche d&apos;artisans',
      /** Sous-titre descriptif */
      subtitle: 'Découvrez les maîtres artisans des métiers de bouche qui perpétuent l&apos;excellence française',
      /** Placeholder pour le champ de recherche principal */
      searchPlaceholder: 'Rechercher un artisan, une spécialité, une ville...',
      /** Texte du bouton de recherche */
      searchButton: 'Rechercher',
      /** Label pour le filtre métier */
      craftLabel: 'Métier',
      /** Placeholder pour le filtre métier */
      craftPlaceholder: 'Tous les métiers',
      /** Label pour le filtre localisation */
      locationLabel: 'Localisation',
      /** Placeholder pour le filtre localisation */
      locationPlaceholder: 'Toutes les villes',
      /** Label pour le filtre spécialité */
      specialtyLabel: 'Spécialité',
      /** Placeholder pour le filtre spécialité */
      specialtyPlaceholder: 'Toutes les spécialités',
      /** Label pour le filtre certification */
      certificationLabel: 'Certification',
      /** Placeholder pour le filtre certification */
      certificationPlaceholder: 'Toutes les certifications',
      /** Label pour le filtre prix */
      priceLabel: 'Gamme de prix',
      /** Placeholder pour le filtre prix */
      pricePlaceholder: 'Tous les prix',
      /** Label pour le filtre services */
      serviceLabel: 'Services',
      /** Placeholder pour le filtre services */
      servicePlaceholder: 'Tous les services',
      /** Titre affiché quand aucun résultat */
      emptyTitle: 'Aucun artisan trouvé',
      /** Message affiché quand aucun résultat */
      emptyText: 'Essayez de modifier vos critères de recherche pour découvrir de talentueux artisans près de chez vous.'
    },
    /** Textes en anglais */
    en: {
      title: 'Artisan search',
      subtitle: 'Discover master artisans of food crafts who perpetuate French excellence',
      searchPlaceholder: 'Search for an artisan, specialty, city...',
      searchButton: 'Search',
      craftLabel: 'Craft',
      craftPlaceholder: 'All crafts',
      locationLabel: 'Location',
      locationPlaceholder: 'All cities',
      specialtyLabel: 'Specialty',
      specialtyPlaceholder: 'All specialties',
      certificationLabel: 'Certification',
      certificationPlaceholder: 'All certifications',
      priceLabel: 'Price range',
      pricePlaceholder: 'All prices',
      serviceLabel: 'Services',
      servicePlaceholder: 'All services',
      emptyTitle: 'No artisans found',
      emptyText: 'Try modifying your search criteria to discover talented artisans near you.'
    }
  };

  const t = texts[lang];

  return (
    <div className={styles.artisanSearchPage}>
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
              <label className={styles.filterLabel}>{t.craftLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.craftPlaceholder}</option>
                <option value="boulanger">Boulanger</option>
                <option value="patissier">Pâtissier</option>
                <option value="chocolatier">Chocolatier</option>
                <option value="confiseur">Confiseur</option>
                <option value="glacier">Glacier</option>
                <option value="charcutier">Charcutier</option>
                <option value="fromager">Fromager</option>
                <option value="traiteur">Traiteur</option>
                <option value="epicier">Épicier fin</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.locationLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.locationPlaceholder}</option>
                <option value="paris">Paris</option>
                <option value="lyon">Lyon</option>
                <option value="marseille">Marseille</option>
                <option value="toulouse">Toulouse</option>
                <option value="nice">Nice</option>
                <option value="bordeaux">Bordeaux</option>
                <option value="lille">Lille</option>
                <option value="strasbourg">Strasbourg</option>
                <option value="montpellier">Montpellier</option>
                <option value="nantes">Nantes</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.specialtyLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.specialtyPlaceholder}</option>
                <option value="pain-tradition">Pain tradition</option>
                <option value="viennoiserie">Viennoiserie</option>
                <option value="patisserie-francaise">Pâtisserie française</option>
                <option value="chocolat-artisanal">Chocolat artisanal</option>
                <option value="macarons">Macarons</option>
                <option value="fromages-affines">Fromages affinés</option>
                <option value="charcuterie-fine">Charcuterie fine</option>
                <option value="glaces-sorbets">Glaces & sorbets</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.certificationLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.certificationPlaceholder}</option>
                <option value="mof">Meilleur Ouvrier de France</option>
                <option value="maitre-artisan">Maître Artisan</option>
                <option value="artisan-qualite">Artisan de Qualité</option>
                <option value="label-rouge">Label Rouge</option>
                <option value="aoc">AOC/AOP</option>
                <option value="bio">Agriculture Biologique</option>
                <option value="commerce-equitable">Commerce Équitable</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.priceLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.pricePlaceholder}</option>
                <option value="accessible">Accessible (€)</option>
                <option value="modere">Modéré (€€)</option>
                <option value="premium">Premium (€€€)</option>
                <option value="luxe">Luxe (€€€€)</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.serviceLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.servicePlaceholder}</option>
                <option value="vente-directe">Vente directe</option>
                <option value="livraison">Livraison</option>
                <option value="commande-ligne">Commande en ligne</option>
                <option value="cours-ateliers">Cours & ateliers</option>
                <option value="evenementiel">Événementiel</option>
                <option value="entreprises">Vente aux entreprises</option>
                <option value="export">Export</option>
              </select>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className={styles.resultsSection}>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>Résultats</h2>
            <span className={styles.resultsCount}>0 artisan trouvé</span>
          </div>

          {/* Empty State 
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>👨‍🍳</div>
            <h3 className={styles.emptyTitle}>{t.emptyTitle}</h3>
            <p className={styles.emptyText}>{t.emptyText}</p>
          </div>
          */}
          <div className="infinite-hits-container mt-5">
              {ArtisanData.map((data, i) => (
                  <ArtisanCard lang={lang} Artisan={data} key={i}/>
              ))}
          </div>   
        </section>
      </div>
    </div>
  );
};

export default ArtisansPage;

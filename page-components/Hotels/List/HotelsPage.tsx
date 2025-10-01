import React from 'react';
import styles from './styles.module.css';
import HotelCard from '@/components/cards/hotelCard';
import { hotelData } from '@/mocks/HotelsData';
import HorizontalHotelCard from '@/components/cards/hotelCard/HorizontalCard';

interface HotelsPageProps {
  lang: 'fr' | 'en';
}

const HotelsPage: React.FC<HotelsPageProps> = ({ lang }) => {
  const texts = {
    fr: {
      title: 'Recherche d&apos;hôtels',
      subtitle: 'Découvrez les plus beaux établissements où l&apos;art de vivre rencontre la gastronomie',
      searchPlaceholder: 'Rechercher un hôtel, une destination, une ville...',
      searchButton: 'Rechercher',
      locationLabel: 'Destination',
      locationPlaceholder: 'Toutes les destinations',
      categoryLabel: 'Catégorie',
      categoryPlaceholder: 'Toutes les catégories',
      starsLabel: 'Nombre d&apos;étoiles',
      starsPlaceholder: 'Toutes les étoiles',
      amenitiesLabel: 'Services',
      amenitiesPlaceholder: 'Tous les services',
      priceLabel: 'Gamme de prix',
      pricePlaceholder: 'Tous les prix',
      restaurantLabel: 'Restaurant gastronomique',
      restaurantPlaceholder: 'Indifférent',
      emptyTitle: 'Aucun hôtel trouvé',
      emptyText: 'Essayez de modifier vos critères de recherche pour découvrir de somptueux établissements.'
    },
    en: {
      title: 'Hotel search',
      subtitle: 'Discover the most beautiful establishments where art of living meets gastronomy',
      searchPlaceholder: 'Search for a hotel, destination, city...',
      searchButton: 'Search',
      locationLabel: 'Destination',
      locationPlaceholder: 'All destinations',
      categoryLabel: 'Category',
      categoryPlaceholder: 'All categories',
      starsLabel: 'Star rating',
      starsPlaceholder: 'All ratings',
      amenitiesLabel: 'Amenities',
      amenitiesPlaceholder: 'All amenities',
      priceLabel: 'Price range',
      pricePlaceholder: 'All prices',
      restaurantLabel: 'Gastronomic restaurant',
      restaurantPlaceholder: 'Any',
      emptyTitle: 'No hotels found',
      emptyText: 'Try modifying your search criteria to discover sumptuous establishments.'
    }
  };

  const t = texts[lang];

  return (
    <div className={styles.hotelSearchPage}>
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
              <label className={styles.filterLabel}>{t.locationLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.locationPlaceholder}</option>
                <option value="paris">Paris</option>
                <option value="lyon">Lyon</option>
                <option value="nice">Nice</option>
                <option value="cannes">Cannes</option>
                <option value="bordeaux">Bordeaux</option>
                <option value="strasbourg">Strasbourg</option>
                <option value="marseille">Marseille</option>
                <option value="biarritz">Biarritz</option>
                <option value="deauville">Deauville</option>
                <option value="megeve">Megève</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.categoryLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.categoryPlaceholder}</option>
                <option value="palace">Palace</option>
                <option value="grand-hotel">Grand Hôtel</option>
                <option value="boutique">Hôtel Boutique</option>
                <option value="resort">Resort</option>
                <option value="chateau">Château-Hôtel</option>
                <option value="relais">Relais & Châteaux</option>
                <option value="maison-hotes">Maison d&apos;Hôtes</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.starsLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.starsPlaceholder}</option>
                <option value="palace">Palace (5★★)</option>
                <option value="5">5 étoiles</option>
                <option value="4">4 étoiles</option>
                <option value="3">3 étoiles</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.amenitiesLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.amenitiesPlaceholder}</option>
                <option value="spa">Spa</option>
                <option value="piscine">Piscine</option>
                <option value="golf">Golf</option>
                <option value="plage">Accès plage</option>
                <option value="fitness">Centre de fitness</option>
                <option value="parking">Parking</option>
                <option value="wifi">WiFi gratuit</option>
                <option value="animaux">Animaux acceptés</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.priceLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.pricePlaceholder}</option>
                <option value="100-200">100-200€</option>
                <option value="200-400">200-400€</option>
                <option value="400-600">400-600€</option>
                <option value="600-1000">600-1000€</option>
                <option value="1000+">1000€+</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{t.restaurantLabel}</label>
              <select className={styles.filterSelect}>
                <option value="">{t.restaurantPlaceholder}</option>
                <option value="etoile-michelin">Restaurant étoilé Michelin</option>
                <option value="gault-millau">Restaurant Gault&Millau</option>
                <option value="gastronomique">Restaurant gastronomique</option>
                <option value="bistronomie">Bistronomie</option>
              </select>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className={styles.resultsSection}>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>Résultats</h2>
            <span className={styles.resultsCount}>0 hôtel trouvé</span>
          </div>

          <div className="infinite-hits-container mt-5">
              {hotelData.map((data, i) => (
                <HotelCard lang={lang}  Hotel={data} key={i}/>
              ))}
          </div>     

          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>Les cartes de la page La Place</h2>
          </div>
          <div className="infinite-hits-container mt-5">
              <HorizontalHotelCard lang={lang}  Hotel={hotelData[0]}/>
          </div>     
        </section>
      </div>
    </div>
  );
};

export default HotelsPage;

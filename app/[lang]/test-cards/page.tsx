import { Metadata } from "next";
import RestaurantCard from "@/components/cards/restaurantCard";
import HotelCard from "@/components/cards/hotelCard";
import ArtisanCard from "@/components/cards/artisanCard";
import PeopleCard from "@/components/cards/peopleCard";
import NewsCard from "@/components/cards/NewsCard";
import NewsSecondCard from "@/components/cards/newsSecondCard";
import SingleNewsCard from "@/components/cards/newsUneCard";
import { WineryCard } from "@/components/cards/wineryCard";
import { RecipeCard } from "@/components/cards/recipeCard";
import { ThePlaceCard } from "@/components/cards/thePlaceCard";
import { ChampagneCard } from "@/components/cards/products/champagneCard";
import { WineCard } from "@/components/cards/products/wineCard";
import { WhiskyCard } from "@/components/cards/products/whiskyCard";
import { CognacCard } from "@/components/cards/products/cognacCard";
import { ArmagnacCard } from "@/components/cards/products/armagnacCard";
import { CalvadosCard } from "@/components/cards/products/calvadosCard";
import { RumCard } from "@/components/cards/products/rumCard";

import { RestaurantData } from "@/mocks/RestaurantData";
import { hotelData } from "@/mocks/HotelsData";
import { ArtisanData } from "@/mocks/ArtisanData";
import { PeopleData } from "@/mocks/Peoples";
import { NewsCardData, SingleNewsCardData } from "@/mocks/NewsData";
import { WineriesData } from "@/mocks/WineriesData";
import { RecipesData } from "@/mocks/RecipesData";
import { PlacesData } from "@/mocks/PlacesData";
import { 
  ChampagnesData, 
  WinesData, 
  WhiskiesData, 
  CognacsData, 
  ArmagnacsData, 
  CalvadosData, 
  RumsData 
} from "@/mocks/SpiritsData";

import styles from "./styles.module.css";

export const metadata: Metadata = {
  title: "Test Cards - Gault&Millau",
  description: "Page de test pour tous les composants de cartes",
};

interface PageProps {
  params: {
    lang: 'fr' | 'en';
  };
}

export default function TestCardsPage({ params }: PageProps) {
  const { lang } = params;

  return (
    <div className={styles.testCardsPage}>
      {/* Header */}
      <header className={styles.header}>
        <h1>🎨 Test des Composants Cards</h1>
        <p>Visualisation de tous les composants de cartes avec données mockées</p>
      </header>

      {/* Info Box */}
      <div className={styles.infoBox}>
        <p>
          <strong>Note :</strong> Cette page présente tous les composants de cartes utilisés dans l&apos;application. 
          Les données sont mockées pour faciliter les tests visuels et fonctionnels.
        </p>
      </div>

      {/* Restaurant Cards */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          🍽️ Restaurant Cards
          <span className={styles.badge}>{RestaurantData.length}</span>
        </h2>
        <div className={styles.cardsGrid}>
          {RestaurantData.slice(0, 4).map((restaurant, index) => (
            <RestaurantCard key={`restaurant-${index}`} lang={lang} restaurant={restaurant} />
          ))}
        </div>
      </section>

      {/* Hotel Cards */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          🏨 Hotel Cards
          <span className={styles.badge}>{hotelData.length}</span>
        </h2>
        <div className={styles.cardsGrid}>
          {hotelData.map((hotel, index) => (
            <HotelCard key={`hotel-${index}`} lang={lang} Hotel={hotel} />
          ))}
        </div>
      </section>

      {/* Artisan Cards */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          👨‍🍳 Artisan Cards
          <span className={styles.badge}>{ArtisanData.length}</span>
        </h2>
        <div className={styles.cardsGrid}>
          {ArtisanData.slice(0, 4).map((artisan, index) => (
            <ArtisanCard key={`artisan-${index}`} lang={lang} Artisan={artisan} />
          ))}
        </div>
      </section>

      {/* People Cards */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          👤 People Cards
          <span className={styles.badge}>{PeopleData.length}</span>
        </h2>
        <div className={styles.cardsGrid}>
          {PeopleData.map((people, index) => (
            <PeopleCard key={`people-${index}`} lang={lang} People={people} />
          ))}
        </div>
      </section>

      {/* News Cards */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          📰 News Cards (Standard)
          <span className={styles.badge}>{NewsCardData.length}</span>
        </h2>
        <div className={styles.cardsGrid}>
          {NewsCardData.slice(0, 4).map((news, index) => (
            <NewsCard key={`news-${index}`} lang={lang} news={news} />
          ))}
        </div>
      </section>

      {/* News Une Card */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          📰 News Une Card (Large)
        </h2>
        <div className={styles.newsCardsGrid}>
          <SingleNewsCard lang={lang} news={SingleNewsCardData} />
        </div>
      </section>

      {/* News Second Card */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          📰 News Second Card
        </h2>
        <div className={styles.cardsGrid}>
          {NewsCardData.slice(0, 2).map((news, index) => (
            <NewsSecondCard key={`news-second-${index}`} lang={lang} news={news} />
          ))}
        </div>
      </section>

      {/* Winery Cards */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          🍇 Winery Cards
          <span className={styles.badge}>{WineriesData.length}</span>
        </h2>
        <div className={styles.cardsGrid}>
          {WineriesData.map((winery, index) => (
            <WineryCard key={`winery-${index}`} {...winery} />
          ))}
        </div>
      </section>

      {/* Recipe Cards */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          📖 Recipe Cards
          <span className={styles.badge}>{RecipesData.length}</span>
        </h2>
        <div className={styles.infoBox}>
          <p>⚠️ RecipeCard n&apos;est pas encore implémenté - affichage du composant par défaut</p>
        </div>
        <div className={styles.cardsGrid}>
          {RecipesData.map((recipe, index) => (
            <RecipeCard key={`recipe-${index}`} />
          ))}
        </div>
      </section>

      {/* Place Cards */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          📍 The Place Cards
          <span className={styles.badge}>{PlacesData.length}</span>
        </h2>
        <div className={styles.infoBox}>
          <p>⚠️ ThePlaceCard n&apos;est pas encore implémenté - affichage du composant par défaut</p>
        </div>
        <div className={styles.cardsGrid}>
          {PlacesData.map((place, index) => (
            <ThePlaceCard key={`place-${index}`} />
          ))}
        </div>
      </section>

      {/* Product Cards - Champagnes */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          🥂 Champagne Cards
          <span className={styles.badge}>{ChampagnesData.length}</span>
        </h2>
        <div className={styles.infoBox}>
          <p>⚠️ ChampagneCard n&apos;est pas encore implémenté - affichage du composant par défaut</p>
        </div>
        <div className={styles.cardsGrid}>
          {ChampagnesData.map((champagne, index) => (
            <ChampagneCard key={`champagne-${index}`} />
          ))}
        </div>
      </section>

      {/* Product Cards - Wines */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          🍷 Wine Cards
          <span className={styles.badge}>{WinesData.length}</span>
        </h2>
        <div className={styles.infoBox}>
          <p>⚠️ WineCard n&apos;est pas encore implémenté - affichage du composant par défaut</p>
        </div>
        <div className={styles.cardsGrid}>
          {WinesData.map((wine, index) => (
            <WineCard key={`wine-${index}`} />
          ))}
        </div>
      </section>

      {/* Product Cards - Whiskies */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          🥃 Whisky Cards
          <span className={styles.badge}>{WhiskiesData.length}</span>
        </h2>
        <div className={styles.infoBox}>
          <p>⚠️ WhiskyCard n&apos;est pas encore implémenté - affichage du composant par défaut</p>
        </div>
        <div className={styles.cardsGrid}>
          {WhiskiesData.map((whisky, index) => (
            <WhiskyCard key={`whisky-${index}`} />
          ))}
        </div>
      </section>

      {/* Product Cards - Cognacs */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          🍸 Cognac Cards
          <span className={styles.badge}>{CognacsData.length}</span>
        </h2>
        <div className={styles.infoBox}>
          <p>⚠️ CognacCard n&apos;est pas encore implémenté - affichage du composant par défaut</p>
        </div>
        <div className={styles.cardsGrid}>
          {CognacsData.map((cognac, index) => (
            <CognacCard key={`cognac-${index}`} />
          ))}
        </div>
      </section>

      {/* Product Cards - Armagnacs */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          🥃 Armagnac Cards
          <span className={styles.badge}>{ArmagnacsData.length}</span>
        </h2>
        <div className={styles.infoBox}>
          <p>⚠️ ArmagnacCard n&apos;est pas encore implémenté - affichage du composant par défaut</p>
        </div>
        <div className={styles.cardsGrid}>
          {ArmagnacsData.map((armagnac, index) => (
            <ArmagnacCard key={`armagnac-${index}`} />
          ))}
        </div>
      </section>

      {/* Product Cards - Calvados */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          🍎 Calvados Cards
          <span className={styles.badge}>{CalvadosData.length}</span>
        </h2>
        <div className={styles.infoBox}>
          <p>⚠️ CalvadosCard n&apos;est pas encore implémenté - affichage du composant par défaut</p>
        </div>
        <div className={styles.cardsGrid}>
          {CalvadosData.map((calvados, index) => (
            <CalvadosCard key={`calvados-${index}`} />
          ))}
        </div>
      </section>

      {/* Product Cards - Rums */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          🍹 Rum Cards
          <span className={styles.badge}>{RumsData.length}</span>
        </h2>
        <div className={styles.infoBox}>
          <p>⚠️ RumCard n&apos;est pas encore implémenté - affichage du composant par défaut</p>
        </div>
        <div className={styles.cardsGrid}>
          {RumsData.map((rum, index) => (
            <RumCard key={`rum-${index}`} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '2rem', color: '#6c757d' }}>
        <p>Page de test des composants - Gault&Millau © 2025</p>
      </footer>
    </div>
  );
}

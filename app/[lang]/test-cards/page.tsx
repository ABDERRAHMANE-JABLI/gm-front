import { Metadata } from "next";
import RestaurantCard from "@/components/cards/restaurantCard";
import HorizontalRestauCard from "@/components/cards/restaurantCard/HorizontalCard";
import HotelCard from "@/components/cards/hotelCard";
import HorizontalHotelCard from "@/components/cards/hotelCard/HorizontalCard";
import ArtisanCard from "@/components/cards/artisanCard";
import PeopleCard from "@/components/cards/peopleCard";
import NewsCard from "@/components/cards/NewsCard";
import NewsSecondCard from "@/components/cards/newsSecondCard";
import SingleNewsCard from "@/components/cards/newsUneCard";
import  WineryCard  from "@/components/cards/wineryCard";
import { RecipeCard } from "@/components/cards/recipeCard";
import { ThePlaceCard } from "@/components/cards/thePlaceCard";
import ChampagneCard from "@/components/cards/products/champagneCard";
import WineCard from "@/components/cards/products/wineCard";
import WhiskyCard from "@/components/cards/products/whiskyCard";
import CognacCard from "@/components/cards/products/cognacCard";
import ArmagnacCard from "@/components/cards/products/armagnacCard";
import CalvadosCard from "@/components/cards/products/calvadosCard";
import RumCard from "@/components/cards/products/rumCard";
import UtensilCard from "@/components/cards/utensilCard";

// Import centralisé de toutes les données mockées via le fichier index
import { 
  RestaurantData,
  HorizontalRestauData,
  hotelData,
  HorizontalHotelData,
  ArtisanData,
  PeopleData,
  NewsCardData,
  SingleNewsCardCollection,
  NewsSecondCardCollection,
  WineriesData,
  RecipesData,
  PlacesData,
  ChampagnesData,
  WinesData,
  WhiskiesData,
  CognacsData,
  ArmagnacsData,
  CalvadosData,
  RumsData,
  RestaurantCardDatas
} from "@/FakeData";
import { UtensilsData } from "@/FakeData";

import styles from "./styles.module.css";
import SvgDemo from "@/components/SvgDemo";
import { tree } from "next/dist/build/templates/app-page";

export const metadata: Metadata = {
  title: "Test Cards - Gault&Millau",
  description: "Page de test pour tous les composants de cartes",
};

interface PageProps {
  params: Promise<{
    lang: 'fr' | 'en';
  }>;
}

export default async function TestCardsPage({ params }: PageProps) {
  const { lang } = await params;

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

      {/* SVG Import Demo */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          🎨 SVG Import Demo
        </h2>
        <div className={styles.cardGrid}>
          <SvgDemo size={32} color="#5335ffff" />
        </div>
      </section>

      {/* Restaurant Cards */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          🍽️ Restaurant Cards
          <span className={styles.badge}>{RestaurantCardDatas.length}</span>
        </h2>
        <div className={styles.cardsGrid}>
          {RestaurantCardDatas.map((restaurant, index) => (
            <RestaurantCard key={`restaurant-${index}`} lang={lang} restaurant={restaurant} />
          ))}
        </div>
      </section>

      {/* Horizontal Restaurant Card */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          🍽️ Horizontal Restaurant Card
          <span className={styles.badge}>1</span>
        </h2>
        <div className={styles.cardsGrid}>
          <HorizontalRestauCard lang={lang} restaurant={HorizontalRestauData} />
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

      {/* Horizontal Hotel Card */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          🏨 Horizontal Hotel Card
          <span className={styles.badge}>1</span>
        </h2>
        <div className={styles.cardsGrid}>
          <HorizontalHotelCard lang={lang} Hotel={HorizontalHotelData}  />
        </div>
      </section>

      {/* Artisan Cards */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          👨‍🍳 Artisan Cards
          <span className={styles.badge}>{ArtisanData.length}</span>
        </h2>
        <div className={styles.cardsGrid}>
          {ArtisanData.map((artisan, index) => (
            <ArtisanCard key={`artisan-${index}`} lang={lang} Artisan={artisan}/>
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
          {NewsCardData.map((news, index) => (
            <NewsCard key={`news-${index}`} lang={lang} news={news} />
          ))}
        </div>
      </section>

      {/* News Une Card */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          📰 News Une Card (Large (Taille 3/3) )
          <span className={styles.badge}>{SingleNewsCardCollection.length}</span>
        </h2>
        <div className={styles.cardsGrid}>
          {SingleNewsCardCollection.map((news, index) => (
            <SingleNewsCard key={`news-une-${index}`} lang={lang} news={news} />
          ))}
        </div>
      </section>

      {/* News Second Card */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          📰 News Second Card (Taille 2/3)
          <span className={styles.badge}>{NewsSecondCardCollection.length}</span>
        </h2>
        <div className={styles.cardsGrid}>
          {NewsSecondCardCollection.map((news, index) => (
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
            <WineryCard key={`winery-${index}`} Winery={winery} lang={lang} />
          ))}
        </div>
      </section>

      {/* Recipe Cards */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          📖 Recipe Cards
          <span className={styles.badge}>{RecipesData.length}</span>
        </h2>
        <div className={styles.cardsGrid}>
          {RecipesData.map((recipe, index) => (
            <RecipeCard key={`recipe-${index}`} lang={lang} Recipe={recipe} />
          ))}
        </div>
      </section>

      {/* Place Cards */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          📍 The Place Cards
          <span className={styles.badge}>{PlacesData.length}</span>
        </h2>
        <div className={styles.cardsGrid}>

          {hotelData.slice(0, 3).map((hotel, index) => (
              <HotelCard key={`hotelPlace-${index}`} lang={lang} Hotel={hotel} withHeader={true} />
          ))}
          {RestaurantData.slice(0, 3).map((restaurant, index) => (
            <RestaurantCard key={`restauran-${index}`} lang={lang} restaurant={restaurant} withHeader={true} />
          ))}
          {ArtisanData.slice(0,3).map((artisan, index) => (
            <ArtisanCard key={`artisans-${index}`} lang={lang} Artisan={artisan} withHeader={true}/>
          ))}

          {NewsCardData.slice(0,3).map((news, index) => (
            <NewsCard key={`new-${index}`} lang={lang} news={news} withHeader={true}/>
          ))}

          {PeopleData.slice(0,3).map((people, index) => (
            <PeopleCard key={`peoples-${index}`} lang={lang} People={people}  withHeader={true} />
          ))}

          {WineriesData.slice(0,3).map((winery, index) => (
            <WineryCard key={`winerys-${index}`} Winery={winery} lang={lang} withHeader={true}/>
          ))}

          <ChampagneCard 
              key="champagneHeader" 
              lang={lang} 
              ChampagneProduct={ChampagnesData[7]}
              withHeader={true}
            />

            <WineCard 
              key="wineheader" 
              lang={lang} 
              WineProduct={WinesData[0]}
              withHeader={true}
            />

            <WhiskyCard 
              key="whisky-${index}" 
              lang={lang} 
              WhiskyProduct={WhiskiesData[0]}
              withHeader={true}
            />

            <CognacCard 
              key="cognac-${index}" 
              lang={lang} 
              CognacProduct={CognacsData[0]}
              withHeader={true} 
            />

              <ArmagnacCard 
              key="armagnac-${index}" 
              lang={lang} 
              ArmagnacProduct={ArmagnacsData[0]}
              withHeader={true} 
            />
            <CalvadosCard 
              key="calvados-${index}" 
              lang={lang} 
              CalvadosProduct={CalvadosData[0]} 
              withHeader={true}
            />
            <RumCard 
              key="rum-${index}" 
              lang={lang} 
              RumProduct={RumsData[2]}
              withHeader={true}
            />

        </div>
      </section>

      {/* Product Cards - Champagnes */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          🥂 Champagne Cards
          <span className={styles.badge}>{ChampagnesData.length}</span>
        </h2>
        <div className={styles.cardsGrid}>
          {ChampagnesData.map((champagne, index) => (
            <ChampagneCard 
              key={`champagne-${index}`} 
              lang={lang} 
              ChampagneProduct={champagne} 
            />
          ))}
        </div>
      </section>

      {/* Product Cards - Wines */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          🍷 Wine Cards
          <span className={styles.badge}>{WinesData.length}</span>
        </h2>
        <div className={styles.cardsGrid}>
          {WinesData.map((wine, index) => (
            <WineCard 
              key={`wine-${index}`} 
              lang={lang} 
              WineProduct={wine} 
            />
          ))}
        </div>
      </section>

      {/* Product Cards - Whiskies */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          🥃 Whisky Cards
          <span className={styles.badge}>{WhiskiesData.length}</span>
        </h2>
        <div className={styles.cardsGrid}>
          {WhiskiesData.map((whisky, index) => (
            <WhiskyCard 
              key={`whisky-${index}`} 
              lang={lang} 
              WhiskyProduct={whisky} 
            />
          ))}
        </div>
      </section>

      {/* Product Cards - Cognacs */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          🍸 Cognac Cards
          <span className={styles.badge}>{CognacsData.length}</span>
        </h2>
        <div className={styles.cardsGrid}>
          {CognacsData.map((cognac, index) => (
            <CognacCard 
              key={`cognac-${index}`} 
              lang={lang} 
              CognacProduct={cognac} 
            />
          ))}
        </div>
      </section>

      {/* Product Cards - Armagnacs */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          🥃 Armagnac Cards
          <span className={styles.badge}>{ArmagnacsData.length}</span>
        </h2>
        <div className={styles.cardsGrid}>
          {ArmagnacsData.map((armagnac, index) => (
            <ArmagnacCard 
              key={`armagnac-${index}`} 
              lang={lang} 
              ArmagnacProduct={armagnac} 
            />
          ))}
        </div>
      </section>

      {/* Product Cards - Calvados */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          🍎 Calvados Cards
          <span className={styles.badge}>{CalvadosData.length}</span>
        </h2>
        <div className={styles.cardsGrid}>
          {CalvadosData.map((calvados, index) => (
            <CalvadosCard 
              key={`calvados-${index}`} 
              lang={lang} 
              CalvadosProduct={calvados} 
            />
          ))}
        </div>
      </section>

      {/* Product Cards - Rums */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          🍹 Rum Cards
          <span className={styles.badge}>{RumsData.length}</span>
        </h2>
        <div className={styles.cardsGrid}>
          {RumsData.map((rum, index) => (
            <RumCard 
              key={`rum-${index}`} 
              lang={lang} 
              RumProduct={rum} 
            />
          ))}
        </div>
      </section>

      {/* Utensils */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          🍴 Utensils
          <span className={styles.badge}>{UtensilsData.length}</span>
        </h2>
        <div className={styles.cardsGrid}>
          {UtensilsData.map((ute, index) => (
             <UtensilCard 
                key={`utensil-${index}`} 
                lang={lang} 
                Utensil={ute} 
            />
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

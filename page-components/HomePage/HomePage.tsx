import React from 'react';
import styles from './styles.module.css';
import Image from 'next/image';

/**
 * Language type definition
 * @description Supported languages for the application
 */
type Language = 'fr' | 'en';

/**
 * Properties for the home page component
 * @description Props for the main homepage component with internationalization support
 * @example
 * ```tsx
 * <HomePage 
 *   lang="fr" 
 *   country="FR" 
 *   locale="fr-FR" 
 *   hostname="gaultmillau.fr" 
 * />
 * ```
 */
interface HomePageProps {
  /** @description Current language for content localization */
  lang: Language;
  /** @description Country code for region-specific content (optional, defaults to 'FR') */
  country?: string;
  /** @description Locale for formatting and display (optional, defaults to 'en-US') */
  locale?: string;
  /** @description Current hostname for URL generation (optional, defaults to empty string) */
  hostname?: string;
}

/**
 * Main homepage component for Gault&Millau website
 * @description Displays the homepage with hero section, featured restaurants, and content sections
 * @param props - Component props
 * @param props.lang - Language for content localization
 * @param props.country - Country code for region-specific content
 * @param props.locale - Locale for formatting and display
 * @param props.hostname - Current hostname for URL generation
 * @returns Complete homepage with all sections
 * @example
 * ```tsx
 * // Basic usage
 * <HomePage lang="fr" />
 * 
 * // With full configuration
 * <HomePage 
 *   lang="en"
 *   country="US"
 *   locale="en-US"
 *   hostname="gaultmillau.com"
 * />
 * ```
 */
export default function HomePage({ 
  lang, 
  country = 'FR', 
  locale = 'en-US', 
  hostname = '' 
}: HomePageProps) {
  // You can now use country, locale, and hostname in your component
  console.log('Page data:', { lang, country, locale, hostname });

  return (
    <div className={styles.homepage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Gault&Millau</h1>
          <p className={styles.heroSubtitle}>
            Le guide de référence de la gastronomie française
          </p>
        </div>
      </section>

      {/* Les nouveaux restaurants - Exact GM structure */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Les nouveaux restaurants</h2>
        </div>
        
        <div className={styles.restaurantList}>
          <div className={styles.restaurantItem}>
            <div className={styles.restaurantStatus}>Ouvert</div>
            <div className={styles.restaurantImageContainer}>
              <Image
                src="https://assets.gaultmillau.com/assets/bf5436b0-a63e-4810-aa42-0b9e288ff54b?width=666&height=444&fit=cover&format=avif"
                alt="L'Itinérance"
                width={666}
                height={444}
              />
            </div>
            <div className={styles.restaurantDetails}>
              <div className={styles.ratingRow}>
                <span className={styles.rating}>14 / 20</span>
                <span className={styles.category}>Table de Chef</span>
                <span className={styles.name}>L&apos;Itinérance</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Lieu</span>
                <span className={styles.location}>80350 MERS-LES-BAINS</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Chef</span>
                <span className={styles.chef}>Victor Benoit</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Cuisine</span>
                <span className={styles.cuisine}>Français | Local</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Budget</span>
                <span className={styles.budget}>59 € à 95 €</span>
              </div>
              <a href="#" className={styles.restaurantLink}>L&apos;Itinérance</a>
            </div>
          </div>

          <div className={styles.restaurantItem}>
            <div className={styles.restaurantStatus}>Ouvert</div>
            <div className={styles.restaurantImageContainer}>
              <Image
                src="https://assets.gaultmillau.com/assets/679d9d7a-b2e9-42d7-8709-9f4356066580?width=666&height=444&fit=cover&format=avif"
                alt="La Ferme du Pré"
                width={666}
                height={444}
              />
            </div>
            <div className={styles.restaurantDetails}>
              <div className={styles.ratingRow}>
                <span className={styles.rating}>14 / 20</span>
                <span className={styles.category}>Table de Chef</span>
                <span className={styles.name}>La Ferme du Pré</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Lieu</span>
                <span className={styles.location}>75016 PARIS</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Chef</span>
                <span className={styles.chef}>Frédéric Anton</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Cuisine</span>
                <span className={styles.cuisine}>Français | Local</span>
              </div>
              <a href="#" className={styles.restaurantLink}>La Ferme du Pré</a>
            </div>
          </div>

          <div className={styles.restaurantItem}>
            <div className={styles.restaurantStatus}>Ouvert</div>
            <div className={styles.restaurantImageContainer}>
              <Image
                src="https://assets.gaultmillau.com/assets/7761474d-084a-423e-957a-106bf81a2954?width=666&height=444&fit=cover&format=avif"
                alt="Mes Élises à Table"
                width={666}
                height={444}
              />
            </div>
            <div className={styles.restaurantDetails}>
              <div className={styles.ratingRow}>
                <span className={styles.rating}>11 / 20</span>
                <span className={styles.category}>Table Gourmande</span>
                <span className={styles.name}>Mes Élises à Table</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Lieu</span>
                <span className={styles.location}>05000 GAP</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Chef</span>
                <span className={styles.chef}>David Castoldi</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Cuisine</span>
                <span className={styles.cuisine}>Français | Local</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Budget</span>
                <span className={styles.budget}>24 € à 34 €</span>
              </div>
              <a href="#" className={styles.restaurantLink}>Mes Élises à Table</a>
            </div>
          </div>

          <div className={styles.restaurantItem}>
            <div className={styles.restaurantStatus}>Ouvert</div>
            <div className={styles.restaurantImageContainer}>
              <Image
                src="https://assets.gaultmillau.com/assets/374ef800-90e4-404f-b536-d503c7f0935d?width=666&height=444&fit=cover&format=avif"
                alt="Irwin"
                width={666}
                height={444}
              />
            </div>
            <div className={styles.restaurantDetails}>
              <div className={styles.ratingRow}>
                <span className={styles.rating}>15 / 20</span>
                <span className={styles.category}>Table Remarquable</span>
                <span className={styles.name}>Irwin</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Lieu</span>
                <span className={styles.location}>75008 PARIS</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Chef</span>
                <span className={styles.chef}>Irwin Durand</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Cuisine</span>
                <span className={styles.cuisine}>Français | Gastronomique</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Budget</span>
                <span className={styles.budget}>68 € à 160 €</span>
              </div>
              <a href="#" className={styles.restaurantLink}>Irwin</a>
            </div>
          </div>

          <div className={styles.moreRestaurants}>
            <a href="#">En découvrir plus</a>
          </div>
        </div>
      </section>

      {/* Les people de la gastronomie */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Les people de la gastronomie</h2>
          <div className={styles.peopleGrid}>
            <div className={styles.peopleCard}>
              <Image src="https://fr.gaultmillau.com/images/peoples/la_cuisine.jpg" alt="La cuisine" width={300} height={200} />
              <h3>La cuisine</h3>
              <a href="#" className={styles.btn}>LES DÉCOUVRIR</a>
            </div>
            <div className={styles.peopleCard}>
              <Image src="https://fr.gaultmillau.com/images/peoples/les_vins.jpg" alt="Le vin" width={300} height={200} />
              <h3>Le vin</h3>
              <a href="#" className={styles.btn}>LES DÉCOUVRIR</a>
            </div>
            <div className={styles.peopleCard}>
              <Image src="https://fr.gaultmillau.com/images/peoples/la_salle.jpg" alt="La salle" width={300} height={200} />
              <h3>La salle</h3>
              <a href="#" className={styles.btn}>LES DÉCOUVRIR</a>
            </div>
            <div className={styles.peopleCard}>
              <Image src="https://fr.gaultmillau.com/images/peoples/la_patisserie.jpg" alt="La pâtisserie" width={300} height={200} />
              <h3>La pâtisserie</h3>
              <a href="#" className={styles.btn}>LES DÉCOUVRIR</a>
            </div>
          </div>
        </div>
      </section>

      {/* Les cuisiniers de demain */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Les cuisiniers de demain</h2>
          <div className={styles.cuisiniersGrid}>
            <div className={styles.cuisinierCard}>
              <Image 
                src="https://assets.gaultmillau.com/assets/10238744-04ae-44e5-b377-98f267324da6?transforms=%5B%5B%22resize%22%2C%7B%22width%22%3A230%2C%22height%22%3A400%2C%22fit%22%3A%22cover%22%2C%22background%22%3A%5B255%2C255%2C255%2C0%5D%7D%5D%5D&format=avif"
                alt="Gault&Millau Tour Provence-Alpes-Côte d'Azur-Corse-Monaco 2025"
                width={230}
                height={400}
              />
              <h3>Gault&Millau Tour Provence-Alpes-Côte d&apos;Azur-Corse-Monaco 2025</h3>
            </div>
            <div className={styles.cuisinierCard}>
              <Image 
                src="https://assets.gaultmillau.com/assets/ea2d26ea-aca0-48e2-b13b-b58f239ff136?transforms=%5B%5B%22resize%22%2C%7B%22width%22%3A230%2C%22height%22%3A400%2C%22fit%22%3A%22cover%22%2C%22background%22%3A%5B255%2C255%2C255%2C0%5D%7D%5D%5D&format=avif"
                alt="Gault&Millau Tour Centre-Val de Loire"
                width={230}
                height={400}
              />
              <h3>Gault&Millau Tour Centre-Val de Loire - Pays de la Loire 2025</h3>
            </div>
            <div className={styles.cuisinierCard}>
              <Image 
                src="https://assets.gaultmillau.com/assets/b865d4ee-a998-44f5-bc07-5e575af884ed?transforms=%5B%5B%22resize%22%2C%7B%22width%22%3A230%2C%22height%22%3A400%2C%22fit%22%3A%22cover%22%2C%22background%22%3A%5B255%2C255%2C255%2C0%5D%7D%5D%5D&format=avif"
                alt="Dotation Jeunes Talents Nord-Ouest 2025"
                width={230}
                height={400}
              />
              <h3>Dotation Jeunes Talents Nord-Ouest 2025</h3>
            </div>
          </div>
          <div className={styles.moreRestaurants}>
            <a href="#">En découvrir plus</a>
          </div>
        </div>
      </section>

      {/* Les recettes des chefs */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Les recettes des chefs</h2>
          <div className={styles.recipeGrid}>
            <div className={styles.recipeCard}>
              <Image 
                src="https://assets.gaultmillau.com/assets/cbd92074-163c-4a2f-88db-a477fb39cb90?width=666&height=444&fit=cover&format=avif"
                alt="Tartare de langoustines"
                width={666}
                height={444}
              />
              <div className={styles.content}>
                <div className={styles.category}>Entrée</div>
                <h3>Tartare de langoustines, fine gelée et tête croustillante</h3>
                <p>Pour sublimer ce fruit de mer estival, le chef Christopher Coutanceau l&apos;imagine en trois textures...</p>
                <a href="#" className={styles.chef}>Chef Christopher Coutanceau</a>
              </div>
            </div>
          </div>
          <div className={styles.moreRestaurants}>
            <a href="#">En découvrir plus</a>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.productsGrid}>
            <div className={styles.productCard}>
              <Image src="https://fr.gaultmillau.com/images/products/champagne5.jpg" alt="Champagnes" width={300} height={200} />
              <div className={styles.content}>
                <h3>CHAMPAGNES</h3>
                <p className={styles.subtitle}>Notre sélection</p>
                <a href="#" className={styles.btn}>DÉCOUVRIR</a>
              </div>
            </div>
            <div className={styles.productCard}>
              <Image src="https://fr.gaultmillau.com/images/products/wine5.jpg" alt="Vins" width={300} height={200} />
              <div className={styles.content}>
                <h3>VINS</h3>
                <p className={styles.subtitle}>Notre sélection</p>
                <a href="#" className={styles.btn}>DÉCOUVRIR</a>
              </div>
            </div>
            <div className={styles.productCard}>
              <Image src="https://fr.gaultmillau.com/images/products/spirit5.jpg" alt="Spiritueux" width={300} height={200} />
              <div className={styles.content}>
                <h3>SPIRITUEUX</h3>
                <p className={styles.subtitle}>Notre sélection</p>
                <a href="#" className={styles.btn}>DÉCOUVRIR</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>ACTUALITÉS</h2>
          <div className={styles.newsGrid}>
            <div className={styles.newsCard}>
              <Image 
                src="https://assets.gaultmillau.com/assets/0074d3e8-212f-433f-943e-6206877ef7f5?width=666&height=444&fit=cover&format=avif"
                alt="Le croque-monsieur, son histoire et nos meilleures adresses"
                width={666}
                height={444}
              />
              <div className={styles.content}>
                <div className={styles.category}>Tables & Chefs</div>
                <h3>Le croque-monsieur, son histoire et nos meilleures adresses</h3>
                <p>Pain, jambon, fromage : le croque-monsieur est un classique indémodable et apprécié de tous...</p>
              </div>
            </div>
          </div>
          <div className={styles.moreNews}>
            <a href="#">Voir plus d&apos;actualités</a>
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * Supported application languages
 * @description Union type for internationalization support
 * @example
 * ```typescript
 * const currentLang: Language = 'fr';
 * const supportedLangs: Language[] = ['fr', 'en'];
 * ```
 */
export type Language = 'fr' | 'en';

/**
 * Base properties for all page components
 * @description Common properties that all page components receive
 * @example
 * ```typescript
 * interface MyPageProps extends BaseProps {
 *   title: string;
 * }
 * 
 * function MyPage({ lang, title }: MyPageProps) {
 *   return <h1>{title}</h1>;
 * }
 * ```
 */
export interface BaseProps {
  /** @description Current language for the page */
  lang: Language;
}

/**
 * Properties for pages with a single slug parameter
 * @description Extends BaseProps with a slug for dynamic routing
 * @example
 * ```typescript
 * // For route: /[lang]/restaurant/[slug]
 * function RestaurantPage({ lang, slug }: SlugProps) {
 *   // slug contains the restaurant identifier
 *   return <div>Restaurant: {slug}</div>;
 * }
 * ```
 */
export interface SlugProps extends BaseProps {
  /** @description URL slug identifier for the resource */
  slug: string;
}

/**
 * Properties for pages with region and slug parameters
 * @description Used for nested routes with regional organization
 * @example
 * ```typescript
 * // For route: /[lang]/region/[regionSlug]/itinerary/[slug]
 * function ItineraryPage({ lang, regionSlug, slug }: RegionSlugProps) {
 *   return <div>Region: {regionSlug}, Itinerary: {slug}</div>;
 * }
 * ```
 */
export interface RegionSlugProps extends BaseProps {
  /** @description URL slug for the region */
  regionSlug: string;
  /** @description URL slug for the specific resource within the region */
  slug: string;
}

/**
 * Properties for pages with winery and slug parameters
 * @description Used for wine-related routes nested under wineries
 * @example
 * ```typescript
 * // For route: /[lang]/winery/[winerySlug]/wine/[slug]
 * function WinePage({ lang, winerySlug, slug }: WinerySlugProps) {
 *   return <div>Winery: {winerySlug}, Wine: {slug}</div>;
 * }
 * ```
 */
export interface WinerySlugProps extends BaseProps {
  /** @description URL slug for the winery */
  winerySlug: string;
  /** @description URL slug for the wine within the winery */
  slug: string;
}

/**
 * Restaurant entity interface
 * @description Represents a restaurant with all its properties
 * @example
 * ```typescript
 * const restaurant: Restaurant = {
 *   id: 'rest-123',
 *   slug: 'chez-pierre',
 *   name: 'Chez Pierre',
 *   description: 'Authentic French cuisine',
 *   address: '123 Rue de la Paix, Paris',
 *   cuisine: 'French',
 *   priceRange: '€€€',
 *   rating: 4.5
 * };
 * ```
 */
export interface Restaurant {
  /** @description Unique identifier for the restaurant */
  id: string;
  /** @description URL-friendly slug for routing */
  slug: string;
  /** @description Restaurant name */
  name: string;
  /** @description Optional detailed description */
  description?: string;
  /** @description Optional physical address */
  address?: string;
  /** @description Optional cuisine type (e.g., 'French', 'Italian') */
  cuisine?: string;
  /** @description Optional price range indicator (e.g., '€', '€€', '€€€') */
  priceRange?: string;
  /** @description Optional rating from 0-5 */
  rating?: number;
}

/**
 * Blog post entity interface
 * @description Represents a blog article with metadata
 * @example
 * ```typescript
 * const blogPost: Blog = {
 *   id: 'blog-456',
 *   slug: 'champagne-guide-2024',
 *   title: 'Complete Champagne Guide 2024',
 *   excerpt: 'Everything you need to know about Champagne',
 *   content: 'Full article content...',
 *   author: 'Jean Dupont',
 *   publishedAt: '2024-01-15T10:00:00Z'
 * };
 * ```
 */
export interface Blog {
  /** @description Unique identifier for the blog post */
  id: string;
  /** @description URL-friendly slug for routing */
  slug: string;
  /** @description Blog post title */
  title: string;
  /** @description Optional short excerpt for previews */
  excerpt?: string;
  /** @description Optional full content (HTML or markdown) */
  content?: string;
  /** @description Optional author name */
  author?: string;
  /** @description Optional publication date (ISO string) */
  publishedAt?: string;
}

/**
 * Hotel entity interface
 * @description Represents a hotel with booking information
 * @example
 * ```typescript
 * const hotel: Hotel = {
 *   id: 'hotel-789',
 *   slug: 'grand-hotel-paris',
 *   name: 'Grand Hotel Paris',
 *   description: 'Luxury hotel in the heart of Paris',
 *   address: '456 Champs-Élysées, Paris',
 *   rating: 5,
 *   priceRange: '€€€€'
 * };
 * ```
 */
export interface Hotel {
  /** @description Unique identifier for the hotel */
  id: string;
  /** @description URL-friendly slug for routing */
  slug: string;
  /** @description Hotel name */
  name: string;
  /** @description Optional detailed description */
  description?: string;
  /** @description Optional physical address */
  address?: string;
  /** @description Optional star rating (1-5) */
  rating?: number;
  /** @description Optional price range indicator */
  priceRange?: string;
}

/**
 * Travel itinerary entity interface
 * @description Represents a travel itinerary within a specific region
 * @example
 * ```typescript
 * const itinerary: Itinerary = {
 *   id: 'itin-012',
 *   slug: 'champagne-route',
 *   regionSlug: 'champagne',
 *   title: 'Champagne Discovery Route',
 *   description: '3-day tour of Champagne houses',
 *   duration: '3 days',
 *   difficulty: 'Easy'
 * };
 * ```
 */
export interface Itinerary {
  /** @description Unique identifier for the itinerary */
  id: string;
  /** @description URL-friendly slug for routing */
  slug: string;
  /** @description Region slug this itinerary belongs to */
  regionSlug: string;
  /** @description Itinerary title */
  title: string;
  /** @description Optional detailed description */
  description?: string;
  /** @description Optional duration (e.g., '3 days', '1 week') */
  duration?: string;
  /** @description Optional difficulty level (e.g., 'Easy', 'Moderate', 'Hard') */
  difficulty?: string;
}

/**
 * Person entity interface
 * @description Represents an individual (chef, sommelier, etc.)
 * @example
 * ```typescript
 * const person: Person = {
 *   id: 'person-345',
 *   slug: 'chef-martin',
 *   name: 'Chef Martin Dubois',
 *   bio: 'Michelin-starred chef with 20 years experience',
 *   role: 'Head Chef',
 *   specialty: 'Modern French Cuisine'
 * };
 * ```
 */
export interface Person {
  /** @description Unique identifier for the person */
  id: string;
  /** @description URL-friendly slug for routing */
  slug: string;
  /** @description Person's full name */
  name: string;
  /** @description Optional biographical information */
  bio?: string;
  /** @description Optional job title or role */
  role?: string;
  /** @description Optional area of expertise */
  specialty?: string;
}

/**
 * Recipe entity interface
 * @description Represents a cooking recipe with instructions
 * @example
 * ```typescript
 * const recipe: Recipe = {
 *   id: 'recipe-678',
 *   slug: 'coq-au-vin',
 *   title: 'Coq au Vin',
 *   description: 'Classic French braised chicken',
 *   ingredients: ['1 whole chicken', '750ml red wine', '...'],
 *   instructions: ['Cut chicken into pieces', 'Marinate in wine', '...'],
 *   difficulty: 'Intermediate',
 *   cookingTime: 180
 * };
 * ```
 */
export interface Recipe {
  /** @description Unique identifier for the recipe */
  id: string;
  /** @description URL-friendly slug for routing */
  slug: string;
  /** @description Recipe title */
  title: string;
  /** @description Optional recipe description */
  description?: string;
  /** @description Optional array of ingredients */
  ingredients?: string[];
  /** @description Optional array of cooking instructions */
  instructions?: string[];
  /** @description Optional difficulty level */
  difficulty?: string;
  /** @description Optional cooking time in minutes */
  cookingTime?: number;
}

/**
 * Spirit entity interface
 * @description Represents an alcoholic spirit (cognac, armagnac, etc.)
 * @example
 * ```typescript
 * const spirit: Spirit = {
 *   id: 'spirit-901',
 *   slug: 'hennessy-xo',
 *   name: 'Hennessy XO',
 *   description: 'Premium cognac aged for decades',
 *   type: 'Cognac',
 *   origin: 'Cognac, France',
 *   abv: 40
 * };
 * ```
 */
export interface Spirit {
  /** @description Unique identifier for the spirit */
  id: string;
  /** @description URL-friendly slug for routing */
  slug: string;
  /** @description Spirit name */
  name: string;
  /** @description Optional detailed description */
  description?: string;
  /** @description Optional spirit category (e.g., 'Cognac', 'Armagnac') */
  type?: string;
  /** @description Optional region or country of origin */
  origin?: string;
  /** @description Optional alcohol by volume percentage */
  abv?: number;
}

/**
 * Winery entity interface
 * @description Represents a wine-producing establishment
 * @example
 * ```typescript
 * const winery: Winery = {
 *   id: 'winery-234',
 *   slug: 'domaine-de-la-romanee',
 *   name: 'Domaine de la Romanée',
 *   description: 'Historic Burgundy winery',
 *   region: 'Burgundy',
 *   established: 1760
 * };
 * ```
 */
export interface Winery {
  /** @description Unique identifier for the winery */
  id: string;
  /** @description URL-friendly slug for routing */
  slug: string;
  /** @description Winery name */
  name: string;
  /** @description Optional detailed description */
  description?: string;
  /** @description Optional wine region */
  region?: string;
  /** @description Optional year the winery was established */
  established?: number;
}

/**
 * Wine entity interface
 * @description Represents a wine produced by a specific winery
 * @example
 * ```typescript
 * const wine: Wine = {
 *   id: 'wine-567',
 *   slug: 'chablis-premier-cru',
 *   winerySlug: 'domaine-de-la-romanee',
 *   name: 'Chablis Premier Cru',
 *   description: 'Elegant white wine with mineral notes',
 *   vintage: 2020,
 *   type: 'White',
 *   rating: 4.2
 * };
 * ```
 */
export interface Wine {
  /** @description Unique identifier for the wine */
  id: string;
  /** @description URL-friendly slug for routing */
  slug: string;
  /** @description Slug of the producing winery */
  winerySlug: string;
  /** @description Wine name */
  name: string;
  /** @description Optional detailed description */
  description?: string;
  /** @description Optional vintage year */
  vintage?: number;
  /** @description Optional wine type (e.g., 'Red', 'White', 'Rosé', 'Sparkling') */
  type?: string;
  /** @description Optional rating from 0-5 */
  rating?: number;
}

/**
 * Artisan entity interface
 * @description Represents a local craftsperson or artisan
 * @example
 * ```typescript
 * const artisan: Artisan = {
 *   id: 'artisan-890',
 *   slug: 'marie-chocolatier',
 *   name: 'Marie Dubois',
 *   description: 'Master chocolatier creating handcrafted chocolates',
 *   specialty: 'Artisanal Chocolates',
 *   location: 'Lyon, France'
 * };
 * ```
 */
export interface Artisan {
  /** @description Unique identifier for the artisan */
  id: string;
  /** @description URL-friendly slug for routing */
  slug: string;
  /** @description Artisan's name or business name */
  name: string;
  /** @description Optional detailed description of their work */
  description?: string;
  /** @description Optional area of craftsmanship */
  specialty?: string;
  /** @description Optional location or region */
  location?: string;
}

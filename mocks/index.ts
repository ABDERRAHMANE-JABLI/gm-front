/**
 * @fileoverview Index des fichiers mock pour les tests
 * @description Centralise tous les exports des données mockées
 */

// Exports des données existantes
export { RestaurantData, HorizontalRestauData } from './RestaurantData';
export { hotelData } from './HotelsData';
export { ArtisanData } from './ArtisanData';
export { PeopleData } from './Peoples';
export { NewsCardData, SingleNewsCardData, NewsCardHeaderData } from './NewsData';

// Exports des nouvelles données mockées
export { WineriesData } from './WineriesData';
export { RecipesData } from './RecipesData';
export type { RecipeProps } from './RecipesData';
export { PlacesData } from './PlacesData';
export type { PlaceProps } from './PlacesData';
export {
  ChampagnesData,
  WinesData,
  WhiskiesData,
  CognacsData,
  ArmagnacsData,
  CalvadosData,
  RumsData,
} from './SpiritsData';
export type { SpiritProps } from './SpiritsData';

/**
 * Compteur du nombre total de mocks disponibles
 */
export const MOCK_STATS = {
  restaurants: 6,
  hotels: 4,
  artisans: 9,
  people: 4,
  news: 7,
  wineries: 4,
  recipes: 4,
  places: 3,
  champagnes: 2,
  wines: 2,
  whiskies: 2,
  cognacs: 2,
  armagnacs: 1,
  calvados: 1,
  rums: 2,
  get total(): number {
    return Object.values(this).filter(v => typeof v === 'number').reduce((a, b) => a + b, 0);
  }
};

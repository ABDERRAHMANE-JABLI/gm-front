/**
 * @fileoverview Index des fichiers mock pour les tests
 * @description Centralise tous les exports des données mockées
 */

// Exports des données existantes
export { RestaurantData, RestaurantCardDatas, HorizontalRestauData } from './RestaurantData';
export { hotelData, HorizontalHotelData } from './HotelsData';
export { ArtisanData } from './ArtisanData';
export { PeopleData } from './Peoples';
export { 
  NewsCardData, 
  SingleNewsCardData, 
  NewsCardHeaderData,
  SingleNewsCardCollection,
  NewsSecondCardCollection
} from './NewsData';

// Exports des nouvelles données mockées
export { WineriesData } from './WineriesData';
export { RecipesData } from './RecipesData';
export type { RecipeProps } from './RecipesData';
export { PlacesData } from './PlacesData';
export type { PlaceProps } from './PlacesData';
export { UtensilsData } from './UtensilsData';
export {
  ChampagnesData,
  WinesData,
  WhiskiesData,
  CognacsData,
  ArmagnacsData,
  CalvadosData,
  RumsData,
} from './SpiritsData';

/**
 * Compteur du nombre total de mocks disponibles
 */
export const MOCK_STATS = {
  restaurants: 6,
  hotels: 4,
  artisans: 9,
  people: 4,
  news: 41,  // 8 SingleNewsCard + 12 NewsSecondCard + 6 NewsCardHeader + 15 NewsCard
  wineries: 15,
  recipes: 4,
  places: 3,
  champagnes: 8,
  wines: 11,
  whiskies: 9,
  cognacs: 7,
  armagnacs: 6,
  calvados: 6,
  rums: 8,
  utensils: 10,
  get total(): number {
    return Object.values(this).filter(v => typeof v === 'number').reduce((a, b) => a + b, 0);
  }
};

import { OpeningPeriods } from "./Time";

/**
 * Interface représentant les propriétés d'un hôtel
 * @description Contient toutes les informations nécessaires pour afficher une carte hôtel
 * @example
 * {
 *   title: "Hôtel Plaza Athénée",
 *   slug: "hotel-plaza-athenee-paris",
 *   isGmSelected: true,
 *   nbStars: 5,
 *   restaurantNbtoques: 3
 * }
 */
export interface HotelProps {
    /** 
     * Nom de l'hôtel
     * @example "Hôtel Plaza Athénée"
     */
    title: string;
    
    /** 
     * Identifiant unique pour l'URL (slug)
     * @example "hotel-plaza-athenee-paris"
     */
    slug: string;
    
    /** 
     * Indique si l'hôtel est sélectionné par Gault&Millau
     * @description false = 'Sponsorisé', true = sélectionné par GM
     * @example true
     */
    isGmSelected: boolean;
    
    /** 
     * Nombre d'étoiles de l'hôtel
     * @description 0 = 'Sélectionné', 1-5 = nombre d'étoiles standard
     * @min 0
     * @max 5
     * @example 5
     */
    nbStars: number;
    
    /** 
     * Description du nombre d'étoiles
     * @description Texte explicatif pour les cas particuliers
     * @example "hors classement, hôtel remarquable"
     * @optional
     */
    nbStarsDescription?: string;
    isSponsorised?: boolean;
    
    /** 
     * Nombre de toques du meilleur restaurant de l'hôtel
     * @description Nombre de toques du restaurant lié à l'hôtel ayant la meilleure note
     * @min 1
     * @max 6
     * @example 3
     * @optional
     */
    restaurantNbtoques?: number;
    
    /** 
     * Identifiant de l'image miniature
     * @description ID de l'image au format 666x444 avec fit=cover
     * @example "img_11111"
     * @optional
     */
    thumbId?: string;
    
    /** 
     * Horaires d'ouverture de l'hôtel
     * @description Horaires pour chaque jour de la semaine (réception, services)
     * @optional
     */
    openingPeriods?: OpeningPeriods;
    
    /** 
     * Adresse complète de l'hôtel
     * @example "25 Avenue Montaigne, 75008 Paris"
     * @optional
     */
    address?: string;
    
    /** 
     * Services proposés par l'hôtel
     * @description Liste des services disponibles (spa, piscine, wifi, etc.)
     * @example ["spa", "piscine", "wifi gratuit", "service en chambre"]
     * @optional
     */
    services?: string[];
    
    /** 
     * Information sur le budget/prix
     * @description Texte décrivant la gamme de prix
     * @example "€€€€€"
     * @optional
     */
    budget?: string;
    
    /** 
     * Indique si l'hôtel peut être mis en favori
     * @description Permet l'affichage de l'icône cœur
     * @default false
     * @optional
     */
    supportfavorite?: boolean;

    /** 
     * Distance par rapport à la position actuelle
     * @description Affiche la distance en km si fournie, fonctionne avec 'Autour de moi'
     * @example "1.2 km"
     * @optional
     */
    distance?: string;
}


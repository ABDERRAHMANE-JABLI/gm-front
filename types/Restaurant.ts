
/**
 * Interface représentant les propriétés d'un restaurant
 * @description Contient toutes les informations nécessaires pour afficher une carte restaurant
 * @example
 * {
 *   title: "Le Bernardin",
 *   slug: "le-bernardin-paris",
 *   nbToques: 4,
 *   note: "18/20",
 *   noteDescription: "Table de prestige"
 * }
 */

import { OpeningPeriods } from "./Time";

export interface RestaurantProps {
    /** 
     * Nom du restaurant
     * @example "Le Bernardin"
     */
    title: string;
    
    /** 
     * Identifiant unique pour l'URL (slug)
     * @example "le-bernardin-paris"
     */
    slug: string;
    
    /** 
     * Nombre de toques du restaurant
     * @description -1 = sponsorisé, 1-5 = nombre de toques standard, 6 = toques d'or
     * @min -1
     * @max 6
     * @example 4
     */
    nbToques: number;
    
    /** 
     * Note du restaurant
     * @description Note sur 20 ou autre système de notation
     * @example "18/20"
     * @optional
     */
    note?: string;
    
    /** 
     * Description de la note ou du statut
     * @description Texte explicatif comme "Table de prestige", "Sponsorisé", etc.
     * @example "Table de prestige"
     * @optional
     */
    noteDescription?: string;
    
    /** 
     * Identifiant de l'image miniature
     * @description ID de l'image au format 666x444 avec fit=cover
     * @example "img_12345"
     * @optional
     */
    thumbId?: string;
    
    /** 
     * Horaires d'ouverture du restaurant
     * @description Horaires pour chaque jour de la semaine
     * @optional
     */
    openingPeriods?: OpeningPeriods;
    
    /** 
     * Adresse complète du restaurant
     * @example "75 Rue de la Paix, 75001 Paris"
     * @optional
     */
    address?: string;
    
    /** 
     * Nom du chef principal
     * @example "Eric Ripert"
     * @optional
     */
    chief?: string;
    
    /** 
     * Types de cuisine proposés
     * @description Liste des types de cuisine (français, italien, asiatique, etc.)
     * @example ["français", "gastronomique"]
     * @optional
     */
    cuisines?: string[];
    
    /** 
     * Information sur le budget/prix
     * @description Texte décrivant la gamme de prix
     * @example "€€€€"
     * @optional
     */
    budget?: string;
    
    /** 
     * Indique si le restaurant peut être mis en favori
     * @description Permet l'affichage de l'icône cœur
     * @default false
     * @optional
     */
    supportfavorite?: boolean;
    
    /** 
     * Distance par rapport à la position actuelle
     * @description Affiche la distance en km si fournie, fonctionne avec 'Autour de moi'
     * @example "2.5 km"
     * @optional
     */
    distance?: string;
}

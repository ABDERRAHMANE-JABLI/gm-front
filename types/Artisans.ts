import { OpeningPeriods } from "./Time";

/**
 * Interface représentant les propriétés d'un artisan
 * @description Contient toutes les informations nécessaires pour afficher une carte artisan
 * @example
 * {
 *   title: "Boulangerie Martin",
 *   slug: "boulangerie-martin-lyon",
 *   isGmSelected: true,
 *   primaryActivity: "boulanger"
 * }
 */
export interface ArtisanProps {
    /** 
     * Nom de l'artisan ou de l'établissement
     * @example "Boulangerie Martin"
     */
    title: string;
    
    /** 
     * Identifiant unique pour l'URL (slug)
     * @example "boulangerie-martin-lyon"
     */
    slug: string;
    
    /** 
     * Indique si l'artisan est sélectionné par Gault&Millau
     * @description false = 'Sponsorisé', true = sélectionné par GM
     * @example true
     */
    isGmSelected: boolean;
    
    /** 
     * Activité principale de l'artisan
     * @description Métier principal (boucher, fromager, boulanger, etc.)
     * @example "boucher"
     */
    primaryActivity: string;
    
    /** 
     * Activités secondaires de l'artisan
     * @description Liste des activités secondaires (l'activité principale ne fait pas partie de ce tableau)
     * @example ["charcutier", "traiteur"]
     * @optional
     */
    otherActivities?: string[];
    
    /** 
     * Identifiant de l'image miniature
     * @description ID de l'image au format 666x444 avec fit=cover
     * @example "img_67890"
     * @optional
     */
    thumbId?: string;
    
    /** 
     * Horaires d'ouverture de l'artisan
     * @description Horaires pour chaque jour de la semaine
     * @optional
     */
    openingPeriods?: OpeningPeriods;
    
    /** 
     * Adresse complète de l'artisan
     * @example "12 Rue du Commerce, 69001 Lyon"
     * @optional
     */
    address?: string;
    
    /** 
     * Services proposés par l'artisan
     * @description Liste des services disponibles (livraison, commande en ligne, etc.)
     * @example ["livraison", "commande en ligne", "vente à emporter"]
     * @optional
     */
    services?: string[];

    /** 
     * Distance par rapport à la position actuelle
     * @description Affiche la distance en km si fournie, fonctionne avec 'Autour de moi'
     * @example "5.0 km"
     * @optional
     */
    distance?: string;
}
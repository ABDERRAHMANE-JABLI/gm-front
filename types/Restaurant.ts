
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
import people from "@/types/Peoples";
import { ImageProps } from "./Image";



export interface RestaurantCardProps {
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

export interface RestaurantProps extends RestaurantCardProps {

    /** 
     * Galerie de photos du restaurant
     * @description Liste d'identifiants d'images supplémentaires
     * @example ["img_12345", "img_67890"]
     * @optional
     */
    carousel?: ImageProps[];
    
    peoples?: people[];
    
     /** 
     * Types de service proposés
     * @description Liste des types de service (livraison, sur place, à emporter, etc.)
     * @example ["livraison", "sur place"]
     * @optional
     */
    services?: string[];

     /** 
     * Types d'ambiance proposés
     * @description Liste des types d'ambiance (décontractée, romantique, familiale, etc.)
     * @example ["Entre amis", "Décontracté"]
     * @optional
     */
    moments?: string[];
    
    /** 
     * Indique si le restaurant propose un hébergement
     * @description Permet de savoir si l'établissement est aussi un hôtel
     * @default false
     * @optional
     */
    hasHotel?: boolean;

    /** 
     * Année de la dernière revue du restaurant
     * @description Indique l'année de la dernière évaluation ou revue
     * @example 2023
     * @optional
     */
    reviewYear?: number;

    /** 
     * Texte de la dernière revue du restaurant
     * @description Brève description ou extrait de la dernière revue
     * @example "Un repas exceptionnel avec un service impeccable."
     * @optional
     */
    review? : string;

    /** 
     * Lien de réservation en ligne
     * @description URL pour réserver une table en ligne
     * @example "https://reservation.lebernardin.com"
     * @optional
     */
    bookingLink?: string;

    /** 
     * Indique si le numéro de téléphone doit être masqué
     * @description Utile pour les restaurants sans ligne téléphonique publique
     * @default false
     * @optional
     */
    noPhone?: boolean;

    /** 
     * Numéro de téléphone du restaurant
     * @description Numéro à afficher pour les réservations ou informations
     * @example "+33 1 23 45 67 89"
     * @optional
     */
    phone?: string;

    /** 
     * Site web du restaurant
     * @description URL du site officiel du restaurant
     * @example "https://www.lebernardin.com"
     * @optional
     */
    website?: string;

    /** 
     * Réseaux sociaux du restaurant
     * @description Liste des profils sur les réseaux sociaux
     * @example [{ platform: "instagram", link: "https://instagram.com/lebernardin" }]
     * @optional
     */
    socialNetworks?: 
        {
            platform: "instagram" | "facebook" | "twitter" | "linkedin";
            link: string;
        }[];

    /** 
     * Coordonnées géographiques du restaurant
     * @description Latitude et longitude pour la localisation sur une carte
     * @example { lat: 48.8566, lng: 2.3522 }
     * @optional
     */
    geo?: {
        lat: number;
        lng: number;
    };

    /** 
     * Formules de menu proposées
     * @description Liste des formules de menu avec titre, prix et indication si boisson incluse
     * @example [{ title: "Menu Déjeuner", price: "35€", isDrinkIncluded: true }]
     * @optional
     */
    menuFormulas?: {
        title: string;
        price: string;
        isDrinkIncluded?: boolean;
    }[];

    /** 
     * Menu
     * @description Menu du restaurant
     * @example [{ kind: "Entrée", dishes: [{ title: "Entrée 1", price: "10€" }, { title: "Entrée 2", price: "20€" }] }]
     * @optional
     */
    menu?:
        {
            kind?: string;
            dishes:
                {
                    title: string;
                    price?: string;
                    isSignature?: boolean;
                }[]
        }[]
}

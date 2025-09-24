
/**
 * @fileoverview Types and interfaces for card components in the Gault&Millau website
 * @description Définit tous les types utilisés pour les cartes (restaurants, artisans, hôtels, vignerons)
 * @author Gault&Millau Development Team
 * @version 1.0.0
 */

/**
 * Type représentant une heure valide au format 24h (00-23)
 * @description Utilisé pour garantir que seules les heures valides sont acceptées
 * @example '09', '14', '23'
 */
type Hour = '00' | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | 
           '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | 
           '20' | '21' | '22' | '23';

/**
 * Type représentant une minute valide (00-59)
 * @description Utilisé pour garantir que seules les minutes valides sont acceptées
 * @example '00', '15', '30', '45'
 */
type AnyMinute = '00' | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' |
                '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' |
                '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' |
                '30' | '31' | '32' | '33' | '34' | '35' | '36' | '37' | '38' | '39' |
                '40' | '41' | '42' | '43' | '44' | '45' | '46' | '47' | '48' | '49' |
                '50' | '51' | '52' | '53' | '54' | '55' | '56' | '57' | '58' | '59';

/**
 * Format d'heure strict au format HH:MM
 * @description Template literal type qui combine Hour et AnyMinute pour créer un format d'heure valide
 * @example '09:30', '14:00', '23:45'
 */
type TimeFormat = `${Hour}:${AnyMinute}`;

/**
 * Interface représentant une plage horaire d'ouverture
 * @description Définit une période d'ouverture avec heure de début et de fin
 * @example { begin: '11:30', end: '14:00' }
 */
export interface OpeningHours {
    /** 
     * Heure de début au format HH:MM
     * @example '11:30'
     */
    begin: TimeFormat;
    
    /** 
     * Heure de fin au format HH:MM
     * @example '14:00'
     */
    end: TimeFormat;
}

/**
 * Interface représentant les horaires d'ouverture pour toute la semaine
 * @description Contient les horaires d'ouverture pour chaque jour de la semaine
 * @example 
 * {
 *   monday: [{ begin: '11:30', end: '14:00' }, { begin: '19:00', end: '22:00' }],
 *   tuesday: [{ begin: '11:30', end: '14:00' }],
 *   // ... autres jours
 * }
 */
export interface OpeningPeriods {
    /** 
     * Horaires du lundi - tableau de plages horaires, pas de chevauchement autorisé
     * @example [{ begin: '11:30', end: '14:00' }, { begin: '19:00', end: '22:00' }]
     */
    monday: OpeningHours[];
    
    /** Horaires du mardi */
    tuesday: OpeningHours[];
    
    /** Horaires du mercredi */
    wednesday: OpeningHours[];
    
    /** Horaires du jeudi */
    thursday: OpeningHours[];
    
    /** Horaires du vendredi */
    friday: OpeningHours[];
    
    /** Horaires du samedi */
    saturday: OpeningHours[];
    
    /** Horaires du dimanche */
    sunday: OpeningHours[];
}

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

/**
 * Énumération des types de produits pour les vignerons
 * @description Définit les catégories de produits que peut produire un vigneron
 */
export enum ProductKind {
    /** Production de vin */
    WINE = 'wine',
    /** Production de champagne */
    CHAMPAGNE = 'champagne',
}

/**
 * Interface représentant les propriétés d'un vigneron/cave
 * @description Contient toutes les informations nécessaires pour afficher une carte vigneron
 * @example
 * {
 *   title: "Domaine de la Côte",
 *   slug: "domaine-de-la-cote-bourgogne",
 *   isGmSelected: true,
 *   producerCategory: ProductKind.WINE
 * }
 */
export interface WineryProps {
    /** 
     * Nom du domaine/cave/vigneron
     * @example "Domaine de la Côte"
     */
    title: string;
    
    /** 
     * Identifiant unique pour l'URL (slug)
     * @example "domaine-de-la-cote-bourgogne"
     */
    slug: string;
    
    /** 
     * Indique si le vigneron est sélectionné par Gault&Millau
     * @description false = 'Sponsorisé', true = sélectionné par GM
     * @example true
     */
    isGmSelected: boolean;
    
    /** 
     * Catégorie de production principale
     * @description Type de produit principal (wine, champagne) - permet l'affichage de la petite icône à côté du titre
     * @example ProductKind.WINE
     * @optional
     */
    producerCategory?: ProductKind;
    
    /** 
     * Identifiant de l'image miniature
     * @description ID de l'image au format 666x444 avec fit=cover
     * @example "img_22222"
     * @optional
     */
    thumbId?: string;
    
    /** 
     * Horaires d'ouverture du domaine
     * @description Horaires pour chaque jour de la semaine (visites, dégustation)
     * @optional
     */
    openingPeriods?: OpeningPeriods;
    
    /** 
     * Adresse complète du domaine
     * @example "Route des Grands Crus, 21220 Gevrey-Chambertin"
     * @optional
     */
    address?: string;
    
    /** 
     * Types de production
     * @description Liste des types de vins/spiritueux produits
     * @example ["rouge", "blanc", "rosé", "effervescent"]
     * @optional
     */
    productions?: string[];
    
    /** 
     * Services proposés par le domaine
     * @description Liste des services disponibles (dégustation, visite, vente directe, etc.)
     * @example ["dégustation", "visite guidée", "vente directe", "expédition"]
     * @optional
     */
    services?: string[];

    /**
     * Distance par rapport à la position actuelle
     * @description Affiche la distance en km si fournie, fonctionne avec 'Autour de moi'
     * @example "3.4 km"
     * @optional
     */
    distance?: string;
}

// types for blog Card : 
/*
export interface BlogCardHeader {
  title: string;            // ex: "ACTUALITÉS"
  subtitle?: string;        // ex: "Actus & Rendez-vous"
  moreHref?: string;        // lien "VOIR PLUS"
}

export interface BlogCardProps {
  id: string;
  title: string;
  resume: string;
  href: string;
  theme?: string;           // badge jaune
  thumbSrc: { id: string };
  header?: BlogCardHeader;  // présent sur Home, absent sur page Blogs
}
*/


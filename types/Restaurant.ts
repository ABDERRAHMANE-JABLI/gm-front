export type Hour = '00' | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | 
           '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | 
           '20' | '21' | '22' | '23';

/**
 * Type représentant une minute valide (00-59)
 * @description Utilisé pour garantir que seules les minutes valides sont acceptées

 */
export type AnyMinute = '00' | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' |
                '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' |
                '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' |
                '30' | '31' | '32' | '33' | '34' | '35' | '36' | '37' | '38' | '39' |
                '40' | '41' | '42' | '43' | '44' | '45' | '46' | '47' | '48' | '49' |
                '50' | '51' | '52' | '53' | '54' | '55' | '56' | '57' | '58' | '59';

/**
 * Format d'heure strict au format HH:MM
 * @description Template literal type qui combine Hour et AnyMinute pour créer un format d'heure valide
 */
export type TimeFormat = `${Hour}:${AnyMinute}`;

/**
 * Interface représentant une plage horaire d'ouverture
 * @description Définit une période d'ouverture avec heure de début et de fin
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

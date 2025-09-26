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

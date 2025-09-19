

type Hour = '00' | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | 
           '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | 
           '20' | '21' | '22' | '23';

type AnyMinute = '00' | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' |
                '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' |
                '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' |
                '30' | '31' | '32' | '33' | '34' | '35' | '36' | '37' | '38' | '39' |
                '40' | '41' | '42' | '43' | '44' | '45' | '46' | '47' | '48' | '49' |
                '50' | '51' | '52' | '53' | '54' | '55' | '56' | '57' | '58' | '59';

// Create the time format mask
type TimeFormat = `${Hour}:${AnyMinute}`;

export interface OpeningHours {
    begin : TimeFormat; // '11:30'
    end : TimeFormat; // '14:00'
}

export interface OpeningPeriods {
    monday: OpeningHours[]; // ['11:30-14:00', '19:00-22:00'], pas de chevauchement
    tuesday: OpeningHours[];
    wednesday: OpeningHours[];
    thursday: OpeningHours[];
    friday: OpeningHours[];
    saturday: OpeningHours[];
    sunday: OpeningHours[];
}

export interface RestaurantProps{
    title: string;
    slug: string;
    nbToques : number; // -1 = sponsorisé / 6 = toques d'or
    note?: string;
    noteDescription?: string; // Table de prestige ... ou Sponsorisé
    thumbId?: string; // Id image miniature (666x444 fit=cover)
    openingPeriods?: OpeningPeriods; // horaires d'ouvertures voir ci-dessous
    address?: string;
    chief?: string; // Nom du chef
    cuisines?: string[]; // Types de cuisine voir ci-dessous
    budget?: string; // Texte prix
    supportfavorite?: boolean; // permet l'affichage de l'icône coeur
    distance?: string | number; // affiche la distance en km si la donnée est fournie, fonctionne avec 'Autour de moi'
    
}

export interface ArtisanProps{
    title: string;
    slug: string;
    isGmSelected : boolean; // false = 'Sponsorisé'
    primaryActivity : string; // Activité principale (boucher, fromager, ...)
    otherActivities? : string[]; // Activités secondaires (la principale ne faisant pas partie de ce tableau) voir ci-dessous
    thumbId?: string; // Id image miniature (666x444 fit=cover)
    openingPeriods?: OpeningPeriods; // horaires d'ouvertures voir ci-dessous
    address?: string;
    services? : string[]; // Services de l'artisan voir ci-dessous
}

export interface HotelProps{
    title: string;
    slug: string;
    isGmSelected : boolean; // false = 'Sponsorisé'
    nbStars : number; // nombre d'étoiles 0 = 'Sélectionné'
    nbStarsDescription?: string; // 'hors classement, hôtel remarquable'
    restaurantNbtoques?: number; // nombre de toque du meilleur restaurant lié à l'hôtel
    thumbId?: string; // Id image miniature (666x444 fit=cover)
    openingPeriods?: OpeningPeriods; // horaires d'ouvertures voir ci-dessous
    address?: string;
    services? : string[]; // Services de l'hôtel voir ci-dessous
    budget?: string; // Texte prix
    supportfavorite?: boolean; // permet l'affichage de l'icône coeur
}

export enum ProductKind {
    WINE = 'wine',
    CHAMPAGNE = 'champagne',
}

export interface WineryProps {
    title: string;
    slug: string;
    isGmSelected : boolean; // false = 'Sponsorisé'
    producerCategory? : ProductKind; // wine, champagne  (permet l'affichage de la petite icône à côté du title)
    thumbId?: string; // Id image miniature (666x444 fit=cover)
    openingPeriods?: OpeningPeriods; // horaires d'ouvertures voir ci-dessous
    address?: string;
    productions? : string[]; // types de production
    services? : string[]; // Services
}


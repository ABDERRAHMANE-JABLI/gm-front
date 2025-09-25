export default interface RumCardProps {
    /**
     * Marque du rhum
     * @description Nom de la distillerie / marque
     * @example "Don Papa", "Renegade", "Arhumatic"
     */
    brand: string;

    /** 
     * Titre du rhum
     * @description Nom de la cuvée / référence
     * @example "Cuvée Nova", "Jamrock", "Arabica coffee cask finish", "Gayuma"
     */
    title: string;

    /** 
     * Note du rhum
     * @description Note sur 100 ou autre système de notation
     * @example "92", "95"
     * @optional
     */
    note?: string;

    /** 
     * Identifiant de l'image miniature
     * @description ID de l'image utilisant une transformation de type resize au format 240x500 avec fit=contain et background transparent
     * @example "cdd12ef0-945c-4da5-aece-e112cf218a0a"
     * @optional
     */
    thumbId?: string;

    /**
     * Rhum en vedette
     * @description Indique si le rhum est mis en avant
     * @example true, false
     * @default false
     */
    featured: boolean;

     /** 
     * Pays d'origine du rhum
     * @description Pays de production du rhum
     * @example "Martinique", "Guadeloupe", "Venezuela", "Jamaïque"
     * @optional
     */
    originCountry?: string;

    /** 
     * Région de production
     * @description Région spécifique dans le pays d'origine
     * @example "Fort-de-France", "Marie-Galante", "Barranquilla"
     * @optional
     */
    region?: string;

    /**
     * la règle d'affichage pour l'origineCountry et la region: 
     * A : afficher origineCountry / region si les 2 propriétés existent
     * B : afficher origineCountry si la propriété existe
     * C : afficher region si la propriété existe
     * maximum 2 lignes avec ellipsis si nécessaire
    */

     /** 
     * Appellation du rhum
     * @description Appellation ou désignation officielle
     * @example "AOC Martinique", "Rhum Agricole", "Ron de Venezuela"
     * @optional
     */
    appellation?: string;

    /** 
     * Matière première
     * @description Type de matière première utilisée
     * @example "Canne à sucre", "Mélasse", "Jus de canne frais"
     * @optional
     */
    rawMaterial?: string;

    /** 
     * Âge ou millésime du rhum
     * @description Âge en années ou millésime selon le type de rhum
     * @example { label: "Âge", value: "12 ans" }, { label: "Millésime", value: "2015" }
     * @optional
     */
    vintage?: {
        label: string;
        value: string;
    };

    /** 
     * Mention spéciale
     * @description Mention particulière ou certification
     * @example "Bio", "Vieux", "Hors d'âge", "Single Cask"
     * @optional
     */
    mention?: string;

    /**
     * Gamme de prix du rhum
     * @description Indique la gamme de prix du rhum
     * @example "30-50€", "50-80€", "80-150€"
     * @optional
     */
    priceRange?: string;
}
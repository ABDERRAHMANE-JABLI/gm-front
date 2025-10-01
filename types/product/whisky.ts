export default interface WhiskyCardProps {
    slug: string;
    
    /**
     * Marque du whisky
     * @description Nom de la distillerie / marque
     * @example "Distillerie Warenghem"
     */
    brand: string;

    /** 
     * Titre du whisky
     * @description Nom de la cuvée
     * @example "Armorik Double Maturation"
     */
    title: string;

    /** 
     * Note du whisky
     * @description Note sur 100 ou autre système de notation
     * @example "92", "96"
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
     * Whisky en vedette
     * @description Indique si le whisky est mis en avant
     * @example true, false
     * @default false
     */
    featured: boolean;

    /** 
     * Pays d'origine du whisky
     * @description Pays de production du whisky
     * @example "Écosse", "Irlande", "États-Unis", "Japon", "Canada"
     * @optional
     */
    originCountry?: string;

    /** 
     * Région de production
     * @description Région spécifique dans le pays d'origine
     * @example "Speyside", "Islay", "Highlands", "Kentucky", "Tennessee"
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
     * Classification du whisky
     * @description Type ou classification du whisky
     * @example "Single Malt", "Blended", "Bourbon", "Rye", "Irish Whiskey"
     * @optional
     */
    classification?: string;

    /** 
     * Matière première du whisky
     * @description Céréales utilisées dans la production
     * @example "Orge maltée", "Maïs", "Seigle", "Blé", "Mélange de céréales"
     * @optional
     */
    rawMaterial?: string;

    /** 
     * Degré d'alcool
     * @description Teneur en alcool du whisky
     * @example "40%", "43%", "46%", "Cask Strength 57.3%"
     * @optional
     */
    alcoholVolume?: string;

    /**
     * Gamme de prix du whisky
     * @description Indique la gamme de prix du whisky
     * @example "50-80€", "80-150€", "150-400€"
     * @optional
     */
    priceRange?: string;
}
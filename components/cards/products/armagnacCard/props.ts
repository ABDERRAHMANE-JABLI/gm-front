export default interface ArmagnacCardProps {
    /**
     * Marque de l'armagnac
     * @description Nom de la maison d'armagnac / domaine
     * @example "Domaine de Saoubis", "Chateau Beauvallon", "Chateau de Pellehaut"
     */
    brand: string;

    /** 
     * Titre de l'armagnac
     * @description Nom de la cuvée / millésime / références
     * @example "Sauvis XO", "VSOP", "Millésime 1986"
     */
    title: string;

    /** 
     * Note de l'armagnac
     * @description Note sur 100 ou autre système de notation
     * @example "94", "92"
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
     * Armagnac en vedette
     * @description Indique si l'armagnac est mis en avant
     * @example true, false
     * @default false
     */
    featured: boolean;

    /** 
     * Âge ou millésime de l'armagnac
     * @description Âge en années ou millésime selon le type d'armagnac
     * @example "15 ans", "1990", "VSOP", "XO", "Hors d'âge"
     * @optional
     */
    vintage?: string;

    /** 
     * Pays d'origine de l'armagnac
     * @description Pays de production (généralement France)
     * @example "France"
     * @optional
     */
    originCountry?: string;

    /** 
     * Région de production
     * @description Région spécifique en Gascogne
     * @example "Bas-Armagnac", "Ténarèze", "Haut-Armagnac"
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
     * Appellation de l'armagnac
     * @description Appellation d'origine contrôlée
     * @example "Armagnac", "Bas-Armagnac"
     * @optional
     */
    appellation?: string;

    /** 
     * Cépages de l'armagnac
     * @description Cépages utilisés dans la distillation avec pourcentage
     * Dans le cas d'un mono-cépage, c'est forcément 100% de ce cépage. La carte affiche uniquement le nom du cépage sans écrire 100%
     * @example { "Ugni Blanc": 70, "Baco": 20, "Colombard": 10 }
     * @optional
     */
    varieties?: Record<string, number>;

    /** 
     * Degré d'alcool
     * @description Teneur en alcool de l'armagnac
     * @example "40%", "42%", "45%"
     * @optional
     */
    alcoholVolume?: string;

    /**
     * Gamme de prix de l'armagnac
     * @description Indique la gamme de prix de l'armagnac
     * @example "50-80€", "80-150€", "150-300€"
     * @optional
     */
    priceRange?: string;
}
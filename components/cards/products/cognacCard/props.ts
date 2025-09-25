export default interface CognacCardProps {
    /**
     * Marque du cognac
     * @description Nom de la maison de cognac
     * @example "Coutanseaux Aîné", "Leopold Gourmel", "Ragnaud Sabourin"
     */
    brand: string;

    /** 
     * Titre du cognac
     * @description Nom de la cuvée / classification
     * @example "Grande champagne xo", "Age des épices", "Fontvieille n°35"
     */
    title: string;

    /** 
     * Note du cognac
     * @description Note sur 100 ou autre système de notation
     * @example "94", "90"
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
     * Cognac en vedette
     * @description Indique si le cognac est mis en avant
     * @example true, false
     * @default false
     */
    featured: boolean;

    /** 
     * Pays d'origine du cognac
     * @description Pays de production (généralement France)
     * @example "France"
     * @optional
     */
    originCountry?: string;

    /** 
     * Région de production
     * @description Région spécifique en Charente
     * @example "Grande Champagne", "Petite Champagne", "Borderies", "Fins Bois"
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
     * Appellation du cognac
     * @description Appellation d'origine contrôlée
     * @example "Cognac", "Cognac Fins Bois", "Cognac Grande Champagne"
     * @optional
     */
    appellation?: string;

    /** 
     * Cépages du cognac
     * @description Cépages utilisés dans la distillation avec pourcentage
     * Dans le cas d'un mono-cépage, c'est forcément 100% de ce cépage. La carte affiche uniquement le nom du cépage sans écrire 100%
     * @example { "Ugni Blanc": 90, "Folle Blanche": 8, "Colombard": 2 }
     * @optional
     */
    varieties?: Record<string, number>;

    /** 
     * Degré d'alcool
     * @description Teneur en alcool du cognac
     * @example "40%", "41%", "43%"
     * @optional
     */
    alcoholVolume?: string;

    /**
     * Gamme de prix du cognac
     * @description Indique la gamme de prix du cognac
     * @example "60-100€", "100-200€", "200-500€"
     * @optional
     */
    priceRange?: string;
}
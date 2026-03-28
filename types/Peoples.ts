export default interface PeopleProps {
    /** 
     * Slug de la personne
     * @description Identifiant unique pour l'URL
     * @example "alexandre-gauthier", "didier-gimonnet"
     */
    slug: string;

    /** 
     * Titre complet formaté
     * @description Nom complet formaté pour l'affichage (Prénom + NOM)
     * @example "Alexandre Gauthier", "Didier Gimonnet"
     */
    title: string;

    /** 
     * Identifiant de l'image miniature
     * @description ID de l'image de profil utilisant une transformation 666x444 avec fit=cover
     * @example "74198782-e378-43eb-a730-e9802752558b"
     * @optional
     */
    thumbId?: string;

    /** 
     * Activités
     * @description Rôle principal de la personne (affiché en majuscules sous le nom)
     * @example ["CHEF"], ["PÂTISSIER"], ["SOMMELIER", "DIRECTEUR DE SALLE"]
     */
    role?: string[]|string;

    /** 
     * Nombre de toques
     * @description Nombre de toques Gault&Millau (-1 à 6)
     * @example 4, 5
     * @optional
     */
    nbToques?: number;

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
     * Distinction principale
     * @description Prix, titre ou distinction obtenue
     * @example "Cuisinier(ère) de l'Année", "Meilleur Ouvrier de France"
     * @optional
     */
    distinction?: string[];

    chefAt?: { name: string }[]

}

import { useClientTranslation } from '@/lib/i18n/client';
import './toques.css'
import ToqueIcon from '@/public/icons/toque.svg'

/**
 *
 * @description
 * Le composant `Toques` est utilisé pour afficher la distinction Gault&Millau
 * (nombre de toques, note et description associée). Il est réutilisable dans
 * plusieurs cartes (RestaurantCard, HotelCard, etc.) et adapte son rendu
 * selon les paramètres fournis.
 *
 * @example
 * // Exemple d'utilisation dans une carte Restaurant
 * <Toques
 *   nbToques={restaurant.nbToques}
 *   note={restaurant.note}
 *   description={restaurant.noteDescription}
 * />
 *
 * @example
 * // Exemple d'utilisation dans une carte Hotel
 * 
 * <Toques 
 *    nbToques={Hotel.restaurantNbtoques} 
 *    withDescription={false} 
 *      tailleSmall={true}
 *  />
 * 
 * @property {number} nbToques - Nombre total de toques à afficher (ex. 6).
 * @property {string | number} [note] - Note  associée (ex. "18,5/20").
 * @property {string} [description] - Description liée au nombre de toques : "Membre de l'Académie Gault&Millau"
 * @property {boolean} [withDescription=true] - Contrôle l'affichage de la description :
 *   - `true` : affiche la description (comportement par défaut, utilisé pour les Restaurants).
 *   - `false` : masque la description (utile pour les Hotels, ex. afficher seulement les toques Gold sans description).
 * @property {boolean} [tailleSmall=false] - Contrôle la taille des icônes de toques :
 *   - `true` : affiche des petites toques (spécifique aux cartes Hotels).
 *   - `false` : affiche des toques standard (par défaut).
 */


type Language = "fr" | "en";

type ToquesProps = {
  nbToques: number;
  note?: string | number;
  description?: string;
  withDescription? : boolean;
  tailleSmall? : boolean; // tailleSmall : true ---> Petit toques pour le composant HotelCards
  lang? : Language; //par defaut "fr"
};


export default function Toques({ nbToques, note, description, withDescription=true, tailleSmall=false, lang}: ToquesProps) {
  const { t } = useClientTranslation(lang);
  
  if (nbToques === 0)
    return (
        <div className="notation">
          <div className={`toques ${tailleSmall ? 'sm' : ''}`}>
            <div className="toque-wrapper">
              <span>{t("common.selected")}</span>
            </div>
          </div>
        </div>
    );

  if (nbToques === -1)
    return (
      <div className="notation">
        <div className={`toques sponsored ${tailleSmall ? 'sm' : ''}`}><div className="toque-wrapper"><span>{t("common.sponsored")}</span></div></div>
      </div>
    );

  if (nbToques === 6)
    return (
      <div className="notation">
        <div className={`toques gold ${tailleSmall ? 'sm' : ''}`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div className="toque-wrapper" key={i}><ToqueIcon width="15" height="21" className="toque" style={{ color: "#D7A949"}} /></div>
            ))}
            </div>
          {withDescription && (<span className="descriptionGold">{t("common.gold")}</span>)}
      </div>
    );

  if (nbToques > 0 && nbToques <= 5)
    return (
      <div className="notation">
        <div className={`toques ${tailleSmall ? 'sm' : ''}`}>
          {Array.from({ length: nbToques }).map((_, i) => (
            <div className="toque-wrapper" key={i}><ToqueIcon width="14" height="20" className="toque" style={{ color: "#000000"}}/></div>
          ))}
        </div>
        <div className="note-and-description">
          {note !== undefined && (
            <div className="note"><div className="text-wrapper">{note}</div><div className="element">/ 20</div></div>
          )}
          {description && <span className="description">{description}</span>}
        </div>
      </div>
    );

  return null;
}

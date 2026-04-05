
import { useClientTranslation } from '@/lib/i18n/client';
import './stars.css'
import StarIcon from '@/public/icons/star.svg'

type Language = "fr" | "en";

type StarsProps = {
  nbStars: number;
  description?: string;
  isSponsorised?: boolean;
  lang? : Language;
};

function descriptionFromStars(n: number): string {
  if (n === 5) return "Hôtel d'exception";
  if (n === 4) return 'Hôtel de Prestige';
  if (n === 3) return 'Hôtel remarquable';
  if (n === 2) return 'Hôtel Confort';
  if (n === 1) return '';
  return 'Hors-classement';
}

export default function Stars({ nbStars, description, isSponsorised, lang}: StarsProps) {
  const { t } = useClientTranslation(lang);
  const resolvedDescription = description || descriptionFromStars(nbStars);

  if (isSponsorised)
    return (
        <div className="hotelRating" >
          <div className="stars sponsored">
              <div className="stars-wrapper">
                  <span>{t("common.sponsored")}</span>
              </div>
          </div>
        </div>
    );

  if (nbStars === -1)
    return (
        <div className="hotelRating" >
          <div className="stars">
              <div className="stars-wrapper">
                  <span>{t("common.selected")}</span>
              </div>
          </div>
          <span className="description">{resolvedDescription}</span>
        </div>
    );

  if (nbStars >= 1 && nbStars <= 5)
    return (
      <div className="hotelRating">
          <div className="stars">
              {Array.from({ length: nbStars }).map((_, i) => (
              <div className="stars-wrapper" key={i}><StarIcon width="12" height="12" style={{ color: "#000000"}}/></div>
            ))}
          </div>
          <span className="description">{resolvedDescription}</span>
      </div>
    );

  return null;
}

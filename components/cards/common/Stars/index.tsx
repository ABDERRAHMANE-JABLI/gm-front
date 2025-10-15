
import { useClientTranslation } from '@/lib/i18n/client';
import './stars.css'
import StarIcon from '@/public/icons/star.svg'

type Language = "fr" | "en";

type StarsProps = {
  nbStars: number;
  description: string;
  lang? : Language;
};


export default function Stars({ nbStars, description, lang}: StarsProps) {
  const { t } = useClientTranslation(lang);
  if (nbStars === 0)
    return (
        <div className="hotelRating" >
          <div className="stars">
              <div className="stars-wrapper">
                  <span>{t("common.selected")}</span>
              </div>
          </div>
          <span className="description">{description}</span>
        </div>
    );

  if (nbStars === -1)
    return (
        <div className="hotelRating" >
          <div className="stars sponsored">
              <div className="stars-wrapper">
                  <span>{t("common.sponsored")}</span>
              </div>
          </div>
          <span className="description">{description}</span>
        </div>
    );

  if (nbStars > 0 && nbStars <= 5)
    return (
      <div className="hotelRating">
          <div className="stars">
              {Array.from({ length: nbStars }).map((_, i) => (
              <div className="stars-wrapper" key={i}><StarIcon width="12" height="12" style={{ color: "#000000"}}/></div>
            ))}     
          </div>
          <span className="description">{description}</span>
      </div>
    );

  return null;
}


import { useClientTranslation } from '@/lib/i18n/client';
import './stars.css'

type Language = "fr" | "en";

type StarsProps = {
  nbStars: number;
  description: string;
  lang? : Language;
};

const Star = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><mask id="mask0_10034_11328" maskUnits="userSpaceOnUse" x="0" y="0" width="12" height="12"><path fillRule="evenodd" clipRule="evenodd" d="M0.019043 0.0568848H11.9809V11.4684H0.019043V0.0568848Z" fill="white"></path></mask><g mask="url(#mask0_10034_11328)"><path fillRule="evenodd" clipRule="evenodd" d="M5.7998 9.31695L2.72429 11.4055C2.4482 11.5929 2.08893 11.3319 2.18196 11.0114L3.21786 7.44101C3.25857 7.30076 3.20954 7.14988 3.09412 7.06034L0.157463 4.78072C-0.106177 4.57605 0.0310632 4.15375 0.364583 4.14319L4.08035 4.02504C4.22634 4.02042 4.35469 3.92711 4.40422 3.78973L5.6648 0.29234C5.77798 -0.0216002 6.22196 -0.0216002 6.33513 0.29234L7.59571 3.78973C7.64524 3.92711 7.77359 4.02043 7.91958 4.02504L11.6353 4.14319C11.9689 4.15375 12.1061 4.57604 11.8425 4.78072L8.90574 7.06034C8.79039 7.14988 8.74136 7.30076 8.78207 7.44101L9.81797 11.0114C9.91093 11.3319 9.55174 11.5929 9.27564 11.4055L6.20013 9.31695C6.07926 9.2349 5.92061 9.2349 5.7998 9.31695Z" fill="black"></path></g>
  </svg>
);


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
              <div className="stars-wrapper" key={i}><Star/></div>
            ))}     
          </div>
          <span className="description">{description}</span>
      </div>
    );

  return null;
}

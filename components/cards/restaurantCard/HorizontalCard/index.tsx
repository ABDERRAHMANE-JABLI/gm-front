"use client";

import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import styles from "./horizontalRestau.module.css";
import { useClientTranslation } from "@/lib/i18n/client";
import { RestaurantProps } from "@/types/Restaurant";
import Toques from "../../common/Toques";

type Language = "fr" | "en";

type Props = {
  lang: Language;
  restaurant: RestaurantProps;
};

export default function HorizontalRestauCard({ lang, restaurant }: Props) {
  const { t } = useClientTranslation(lang);
  const imageId = restaurant?.thumbId ?? "";


  return (
    <div className={`${styles["cardkind-horizontal-empty"]} ${styles["cardkind-horizontal-blog"]}`}>
      <Link href={`/${lang}/restaurant/${restaurant?.slug}`} aria-label={restaurant.title} title={restaurant.title}>
        <span className={styles.stretchedLink} aria-hidden="true" />
      </Link>
      <div className={styles["thumbnail-wrapper"]}>
        <SmartImage id={imageId} alt={restaurant.title} width={400} height={270} fit="cover" lazyload/>
      </div>

      <div className={styles.rightContent}>
        <div className={styles.divToques}>
          <Toques nbToques={restaurant.nbToques} isSponsorised={restaurant.isSponsorised} description={restaurant.noteDescription} note={restaurant.note} lang={lang}/>
        </div>
        
        <div>
          <span className={`${styles["card-title"]} ${styles.horizontal}`}>
            {restaurant.title}
          </span>
        </div>
    
        <div className={`${styles["horizontal-container"]}`}>
          <div className={`${styles.cardPaddingContainer} ${styles.details}`}>
                    {restaurant.address && (
                        <div className={styles.cardDetailHor}>
                            <span className={`${styles.figmaCaption} ${styles.ellipsis}`}>{t("common.address")}</span>
                            <span className={`${styles.figmaCaptionValue} ${styles.ellipsis}`} title={restaurant.address}>{restaurant.address}</span>
                        </div>
                    )}
                    {restaurant.chief && (
                        <div className={styles.cardDetailHor}>
                            <span className={`${styles.figmaCaption} ${styles.ellipsis}`}>{t("common.chef")}</span>
                            <span className={`${styles.figmaCaptionValue} ${styles.ellipsis}`} title={restaurant.chief}>{restaurant.chief}</span>
                        </div>
                    )}
                    {!!restaurant.cuisines?.length && (
                        <div className={styles.cardDetailHor}>
                            <span className={`${styles.figmaCaption} ${styles.ellipsis}`}>{t("common.cooking")}</span>
                            <span className={`${styles.figmaCaptionValue} ${styles.ellipsis} ${styles.outlined}`}>{restaurant.cuisines.join(" | ")}</span>
                        </div>
                    )}
                    {restaurant.budget && (
                        <div className={styles.cardDetailHor}>
                            <span className={`${styles.figmaCaption} ${styles.ellipsis}`}>{t("common.budget")}</span>
                            <span className={`${styles.figmaCaptionValue} ${styles.ellipsis}`}>{restaurant.budget}</span>
                        </div>
                    )}
          </div>
          <div className={`${styles["button-container"]}`}>
            <Link
              className={`${styles["figma-cardButton"]} ${styles.horizontal} ${styles["clamp-1"]}`}
              title={restaurant.title}
              aria-label={restaurant.title}
              href={`/${lang}/restaurant/${restaurant.slug}`}
            >
              <span className={`text-uppercase ${styles.ellipsis}`}>
                {t("common.discover")}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


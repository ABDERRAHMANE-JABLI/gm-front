"use client";

import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import styles from "./horizontalHotel.module.css";
import { useClientTranslation } from "@/lib/i18n/client";
import { HotelProps } from "@/types/Hotels";
import Stars from "../../common/Stars";

type Language = "fr" | "en";

type Props = {
  lang: Language;
  Hotel: HotelProps;
};

export default function HorizontalHotelCard({ lang, Hotel }: Props) {

  const { t } = useClientTranslation(lang);
  const imageId = Hotel?.thumbId ?? "";


  return (
    <div className={`${styles["cardkind-horizontal-empty"]} ${styles["cardkind-horizontal-blog"]}`}>
      <Link href={`/${lang}/hotels/${Hotel?.slug}`} aria-label={Hotel.title} title={Hotel.title}>
        <span className={styles.stretchedLink} aria-hidden="true" />
      </Link>
      <div className={styles["thumbnail-wrapper"]}>
        <SmartImage id={imageId} alt={Hotel.title} width={400} height={270} fit="cover" lazyload/>
      </div>
      <div className={styles.rightContent}>
        <div className={styles.divToques}>
          <Stars nbStars={Hotel.nbStars} description={Hotel.nbStarsDescription}/>
        </div>

        <div className={`${styles["title-container"]}`}>
          <span className={`${styles["card-title"]} ${styles.horizontal}`}>
            {Hotel.title}
          </span>
        </div>

        <div className={`${styles["horizontal-container"]}`}>
          <div className={`${styles.cardPaddingContainer} ${styles.details}`}>
                    {Hotel.address && (
                        <div className={styles.cardDetailHor}>
                            <span className={`${styles.figmaCaption} ${styles.ellipsis}`}>Lieu</span>
                            <span className={`${styles.figmaCaptionValue} ${styles.ellipsis}`} title={Hotel.address}>{Hotel.address}</span>
                        </div>
                    )}
                    {!!Hotel.services?.length && (
                        <div className={styles.cardDetailHor}>
                            <span className={`${styles.figmaCaption} ${styles.ellipsis}`}>Truc en +</span>
                            <span className={`${styles.figmaCaptionValue} ${styles["clamp-2"]}`}>{Hotel.services.join(", ")}</span>
                        </div>
                    )}
                    {Hotel.budget && (
                        <div className={styles.cardDetailHor}>
                            <span className={`${styles.figmaCaption} ${styles.ellipsis}`}>budget</span>
                            <span className={`${styles.figmaCaptionValue} ${styles.ellipsis}`}>{Hotel.budget}</span>
                        </div>
                    )}
          </div>
          <div className={`${styles["button-container"]}`}>
            <Link
              className={`${styles["figma-cardButton"]} ${styles.horizontal} ${styles["clamp-1"]}`}
              title={Hotel.title}
              href={`/${lang}/hotels/${Hotel.slug}`}
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


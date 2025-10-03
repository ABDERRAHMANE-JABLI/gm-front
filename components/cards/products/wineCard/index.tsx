"use client";

import styles from "../base.module.css";
import React from "react";
import BaseComponent from "../baseComponent";
import WineCardProps from "@/types/product/wine";
import { getColorHex } from "@/utils/getColor";
import { useClientTranslation } from "@/lib/i18n/client";

type Language = 'fr' | 'en';

type Props = {
  lang: Language
  WineProduct: WineCardProps
};

export default function WineCardComponent({ lang, WineProduct }: Props) {

  const { t } = useClientTranslation(lang);

  return (
    <BaseComponent
      brand={WineProduct.brand}
      title={WineProduct.title}
      note={WineProduct.note ?? ""}
      typeProduct={t('products.wine')}
      thumbId={WineProduct.thumbId}
      hrefProduct={`/${lang}/wineries/${WineProduct.domainSlug}/${WineProduct.slug}`}>
      
      <div className={styles.details}>
        {
          WineProduct.vintage && (
            <div className={styles.cardDetailVer}>
              <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
                {t("libelle.vintage")} :
              </span>
              <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles["clamp-2"]} ${styles.sm}`}>
                {WineProduct.vintage}
              </span>
            </div> 
          )
        }
        {
          WineProduct.appellation && (
            <div className={styles.cardDetailVer}>
              <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
                {t("libelle.appellation")} :
              </span>
              <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles["clamp-2"]} ${styles.sm}`}>
                {WineProduct.appellation}
              </span>
            </div>
          )
        }
        {WineProduct.colorCode && (
          <div className={styles.cardDetailVer}>
            <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
              {t("libelle.color")} :
            </span>
            <div className={styles.colors}>
                <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles["clamp-2"]} ${styles.sm}`}>{WineProduct.colorCode}</span>
                <div className={styles.figmaColor}>
                    <svg width="15px" height="15px" viewBox="0 0 100 100" fill={getColorHex(WineProduct.colorCode)} stroke="#B5B5B5" strokeWidth="5px" aria-hidden="true"><circle cx="50" cy="50" r="40"></circle></svg>
                </div>
            </div>
          </div>
        )}
        
        {WineProduct.varieties && (
          <div className={styles.cardDetailVer}>
            <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
              {t("libelle.varieties")} :
            </span>
            <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles["clamp-2"]} ${styles.sm}`}>
              {Object.entries(WineProduct.varieties || {})
                  .map(([key, value]) => (value === 100 ? key : `${key} ${value}%`))
                  .join(" | ")
              }
            </span>
          </div>
        )}
        {WineProduct.priceRange && (
          <div className={`${styles.cardDetailVer} ${styles.mtAuto}`}>
            <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
              {t("libelle.priceRange")} :
            </span>
            <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
              {WineProduct.priceRange}
            </span>
          </div>
        )}
      </div>

    </BaseComponent>
  );
}

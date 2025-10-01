"use client";

import styles from "../base.module.css";
import React from "react";
import RumCardProps from "@/types/product/rum";
import BaseComponent from "../baseComponent";
import { useClientTranslation } from "@/lib/i18n/client";

type Language = 'fr' | 'en';

type Props = {
  lang: Language
  RumProduct: RumCardProps
};

export default function RumCardComponent({ lang, RumProduct }: Props) {

  const { t } = useClientTranslation(lang);

  //on peut avoir des produit avec region et/ou pays seulement
  // donc on doit construire cette chaine :  
  const spanCountry = `${RumProduct.originCountry ? t("libelle.country") : ""}${RumProduct.region ? " / "+t("libelle.region") : ""} :`;

 


  return (

    <BaseComponent
      brand={RumProduct.brand}
      title={RumProduct.title}
      note={RumProduct.note ?? ""}
      typeProduct={t('products.rum')}
      thumbId={RumProduct.thumbId}
      hrefProduct={`/${lang}/bottles/${RumProduct.slug}`}>

      <div className={styles.details}>
        {
          RumProduct.originCountry && (
            <div className={styles.cardDetailVer}>
              <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
                {spanCountry}
              </span>
              <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles["clamp-2"]} ${styles.sm}`}>
                {RumProduct.originCountry} {RumProduct.region && ` / ${RumProduct.region}`}
              </span>
            </div>
          )
        }
        {
          RumProduct.appellation && (
            <div className={styles.cardDetailVer}>
              <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
                {t("libelle.appellation")} :
              </span>
              <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles["clamp-2"]} ${styles.sm}`}>
                {RumProduct.appellation}
              </span>
            </div>
          )
        }
        {RumProduct.rawMaterial && (
          <div className={styles.cardDetailVer}>
            <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
              {t("libelle.rawMaterial")} :
            </span>
            <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles["clamp-2"]} ${styles.sm}`}>
              {RumProduct.rawMaterial}
            </span>
          </div>
        )}
        {
          RumProduct.vintage && (
            <div className={styles.cardDetailVer}>
              <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
                {RumProduct.vintage.label+" :"}
              </span>
              <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles["clamp-2"]} ${styles.sm}`}>
                {RumProduct.vintage.value}
              </span>
            </div>
          )
        }
        
        {RumProduct.priceRange && (
          <div className={`${styles.cardDetailVer} ${styles.mtAuto}`}>
            <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
              {t("libelle.priceRange")} :
            </span>
            <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
              {RumProduct.priceRange}
            </span>
          </div>
        )}
      </div>

    </BaseComponent>
  );
}


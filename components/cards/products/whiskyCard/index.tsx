"use client";

import styles from "../base.module.css";
import React from "react";
import BaseComponent from "../baseComponent";
import WhiskyCardProps from "@/types/product/whisky";
import { useClientTranslation } from "@/lib/i18n/client";

type Language = 'fr' | 'en';

type Props = {
  lang: Language
  WhiskyProduct: WhiskyCardProps
};

export default function WhiskyCardComponent({ lang, WhiskyProduct }: Props) {

  const { t } = useClientTranslation(lang);
  // on peut avoir des produit avec region et/ou pays seulement
  const spanCountry = `${WhiskyProduct.originCountry ? t("libelle.country") : ""}${WhiskyProduct.region ? " / "+t("libelle.region") : ""} :`;

  return (

    <BaseComponent
      brand={WhiskyProduct.brand}
      title={WhiskyProduct.title}
      note={WhiskyProduct.note ?? ""}
      typeProduct={t('products.whisky')}
      thumbId={WhiskyProduct.thumbId}
      hrefProduct={`/${lang}/bottles/${WhiskyProduct.slug}`}>

      <div className={styles.details}>
        {
          WhiskyProduct.originCountry && (
            <div className={styles.cardDetailVer}>
              {/*on peut avoir des rum avec region et/ou pays seulement*/}
              <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
                {spanCountry}
              </span>
              <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles["clamp-2"]} ${styles.sm}`}>
                {WhiskyProduct.originCountry} {WhiskyProduct.region && ` / ${WhiskyProduct.region}`}
              </span>
            </div>
          )
        }
        {
          WhiskyProduct.classification && (
            <div className={styles.cardDetailVer}>
              <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
                {t("libelle.classification")} :
              </span>
              <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles["clamp-2"]} ${styles.sm}`}>
                {WhiskyProduct.classification}
              </span>
            </div>
          )
        }
        {WhiskyProduct.rawMaterial && (
          <div className={styles.cardDetailVer}>
            <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
              {t("libelle.rawMaterial")} :
            </span>
            <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles["clamp-2"]} ${styles.sm}`}>
              {WhiskyProduct.rawMaterial}
            </span>
          </div>
        )}
        {
          WhiskyProduct.alcoholVolume && (
            <div className={styles.cardDetailVer}>
              <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
                {t("libelle.alcoholVolume")} :
              </span>
              <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles["clamp-2"]} ${styles.sm}`}>
                {WhiskyProduct.alcoholVolume}
              </span>
            </div>
          )
        }
        
        {WhiskyProduct.priceRange && (
          <div className={`${styles.cardDetailVer} ${styles.mtAuto}`}>
            <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
              {t("libelle.priceRange")} :
            </span>
            <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
              {WhiskyProduct.priceRange}
            </span>
          </div>
        )}
      </div>

    </BaseComponent>
  );
}

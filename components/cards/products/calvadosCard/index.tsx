"use client";

import styles from "../base.module.css";
import React from "react";
import BaseComponent from "../baseComponent";
import CalvadosCardProps from "@/types/product/calvados";
import { useClientTranslation } from "@/lib/i18n/client";

type Language = 'fr' | 'en';

type Props = {
  lang: Language
  CalvadosProduct: CalvadosCardProps
};


export default function CalvadosCardComponent({ lang, CalvadosProduct }: Props) {

  const { t } = useClientTranslation(lang);
  // on peut avoir des produit avec region et/ou pays seulement
  const spanCountry = `${CalvadosProduct.originCountry ? t("libelle.country") : ""}${CalvadosProduct.region ? " / "+t("libelle.region") : ""} :`;
  
  return (

    <BaseComponent
      brand={CalvadosProduct.brand}
      title={CalvadosProduct.title}
      note={CalvadosProduct.note ?? ""}
      typeProduct={t('products.calvados')}
      thumbId={CalvadosProduct.thumbId}
      hrefProduct={`/${lang}/bottles/${CalvadosProduct.slug}`}>

      <div className={styles.details}>
        {
          CalvadosProduct.originCountry && (
            <div className={styles.cardDetailVer}>
              {/*on peut avoir des rum avec region et/ou pays seulement*/}
              <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
                {spanCountry}
              </span>
              <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles["clamp-2"]} ${styles.sm}`}>
                {CalvadosProduct.originCountry} {CalvadosProduct.region && ` / ${CalvadosProduct.region}`}
              </span>
            </div>
          )
        }
        {
          CalvadosProduct.appellation && (
            <div className={styles.cardDetailVer}>
              <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
                {t("libelle.appellation")} :
              </span>
              <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles["clamp-2"]} ${styles.sm}`}>
                {CalvadosProduct.appellation}
              </span>
            </div>
          )
        }
        {CalvadosProduct.rawMaterial && (
          <div className={styles.cardDetailVer}>
            <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
              {t("libelle.rawMaterial")} :
            </span>
            <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles["clamp-2"]} ${styles.sm}`}>
              {CalvadosProduct.rawMaterial}
            </span>
          </div>
        )}
        {
          CalvadosProduct.alcoholVolume && (
            <div className={styles.cardDetailVer}>
              <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
                {t("libelle.alcoholVolume")} :
              </span>
              <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles["clamp-2"]} ${styles.sm}`}>
                {CalvadosProduct.alcoholVolume}
              </span>
            </div>
          )
        }
        
        {CalvadosProduct.priceRange && (
          <div className={`${styles.cardDetailVer} ${styles.mtAuto}`}>
            <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
              {t("libelle.priceRange")} :
            </span>
            <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
              {CalvadosProduct.priceRange}
            </span>
          </div>
        )}
      </div>
    </BaseComponent>
  );
}

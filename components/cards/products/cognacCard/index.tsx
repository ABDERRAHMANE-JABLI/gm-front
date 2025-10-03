"use client";

import styles from "../base.module.css";
import React from "react";
import BaseComponent from "../baseComponent";
import CognacCardProps from "@/types/product/cognac";
import { useClientTranslation } from "@/lib/i18n/client";

type Language = 'fr' | 'en';

type Props = {
  lang: Language
  CognacProduct: CognacCardProps
};

export default function CognacCardComponent({ lang, CognacProduct }: Props) {
 
  const { t } = useClientTranslation(lang);
  // on peut avoir des produit avec region et/ou pays seulement
  const spanCountry = `${CognacProduct.originCountry ? t("libelle.country") : ""}${CognacProduct.region ? " / "+t("libelle.region") : ""} :`;
 
  return (
    <BaseComponent
      brand={CognacProduct.brand}
      title={CognacProduct.title}
      note={CognacProduct.note ?? ""}
      typeProduct={t('products.cognac')}
      thumbId={CognacProduct.thumbId}
      hrefProduct={`/${lang}/bottles/${CognacProduct.slug}`}>

      <div className={styles.details}>
        {
          CognacProduct.originCountry && (
            <div className={styles.cardDetailVer}>
              {/*on peut avoir des rum avec region et/ou pays seulement*/}
              <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
                {spanCountry}
              </span>
              <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles["clamp-2"]} ${styles.sm}`}>
                {CognacProduct.originCountry} {CognacProduct.region && ` / ${CognacProduct.region}`}
              </span>
            </div>
          )
        }
        {
          CognacProduct.appellation && (
            <div className={styles.cardDetailVer}>
              <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
                {t("libelle.appellation")} :
              </span>
              <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles["clamp-2"]} ${styles.sm}`}>
                {CognacProduct.appellation}
              </span>
            </div>
          )
        }
        {CognacProduct.varieties && (
          <div className={styles.cardDetailVer}>
            <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
              {t("libelle.varieties")} :
            </span>
            <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles["clamp-2"]} ${styles.sm}`}>
              {Object.entries(CognacProduct.varieties || {})
                  .map(([key, value]) => (value === 100 ? key : `${key} ${value}%`))
                  .join(" | ")
              }
            </span>
          </div>
        )}
        {
          CognacProduct.alcoholVolume && (
            <div className={styles.cardDetailVer}>
              <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
                {t("libelle.alcoholVolume")} :
              </span>
              <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles["clamp-2"]} ${styles.sm}`}>
                {CognacProduct.alcoholVolume}
              </span>
            </div>
          )
        }
        
        {CognacProduct.priceRange && (
          <div className={`${styles.cardDetailVer} ${styles.mtAuto}`}>
            <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
              {t("libelle.priceRange")} :
            </span>
            <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
              {CognacProduct.priceRange}
            </span>
          </div>
        )}
      </div>

    </BaseComponent>
  );
}

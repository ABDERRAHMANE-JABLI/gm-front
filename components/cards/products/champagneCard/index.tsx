"use client";

import styles from "../base.module.css";
import React from "react";
import BaseComponent from "../baseComponent";
import ChampagneCardProps from "@/types/product/champagne";
import { useClientTranslation } from "@/lib/i18n/client";

type Language = 'fr' | 'en';

type Props = {
  lang: Language
  ChampagneProduct: ChampagneCardProps
};

export default function ChampagneCardComponent({ lang, ChampagneProduct }: Props) {

  const { t } = useClientTranslation(lang);
 
  return (
    <BaseComponent
      brand={ChampagneProduct.brand}
      title={ChampagneProduct.title}
      note={ChampagneProduct.note ?? ""}
      typeProduct={t('products.champagne')}
      thumbId={ChampagneProduct.thumbId}
      hrefProduct={`/${lang}/wineries/${ChampagneProduct.domainSlug}/${ChampagneProduct.slug}`}>

      <div className={styles.details}>
        {
          ChampagneProduct.vintage && (
            <div className={styles.cardDetailVer}>
              <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
                {t("libelle.vintage")} :
              </span>
              <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles["clamp-2"]} ${styles.sm}`}>
                {ChampagneProduct.vintage}
              </span>
            </div>
          )
        }
        {ChampagneProduct.type && (
          <div className={styles.cardDetailVer}>
            <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
              {t("libelle.type")} :
            </span>
            <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles["clamp-2"]} ${styles.sm}`}>
              {ChampagneProduct.type}
            </span>
          </div>
        )}
        {ChampagneProduct.classification && (
          <div className={styles.cardDetailVer}>
            <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
              {t("libelle.classification")} :
            </span>
            <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles["clamp-2"]} ${styles.sm}`}>
              {ChampagneProduct.classification}
            </span>
          </div>
        )}
        {ChampagneProduct.varieties && (
          <div className={styles.cardDetailVer}>
            <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
              {t("libelle.varieties")} :
            </span>
            <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles["clamp-2"]} ${styles.sm}`}>
              {Object.entries(ChampagneProduct.varieties || {}).map(([key, value]) => `${key} ${value}%`).join(" ")}
            </span>
          </div>
        )}
        {ChampagneProduct.priceRange && (
          <div className={`${styles.cardDetailVer} ${styles.mtAuto}`}>
            <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
              {t("libelle.priceRange")} :
            </span>
            <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
              {ChampagneProduct.priceRange}
            </span>
          </div>
        )}
      </div>
    </BaseComponent>
  );
}


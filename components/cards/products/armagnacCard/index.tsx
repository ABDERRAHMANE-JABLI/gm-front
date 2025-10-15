"use client";

import styles from "../base.module.css";
import React from "react";
import BaseComponent from "../baseComponent";
import ArmagnacCardProps from "@/types/product/armagnac";
import { useClientTranslation } from "@/lib/i18n/client";
import CardHeader from "../../common/HeaderCard";
import SpiritIcon from "@/public/icons/menu/spirit.svg";

type Language = 'fr' | 'en';

type Props = {
  lang: Language
  ArmagnacProduct: ArmagnacCardProps
  withHeader?:boolean
};

export default function ArmagnacCardComponent({ lang, ArmagnacProduct, withHeader}: Props) {
  
  const { t } = useClientTranslation(lang);
  // on peut avoir des produit avec region et/ou pays seulement
  const spanCountry = `${ArmagnacProduct.originCountry ? t("libelle.country") : ""}${ArmagnacProduct.region ? " / "+t("libelle.region") : ""} :`;

  return (
    <BaseComponent
      brand={ArmagnacProduct.brand}
      title={ArmagnacProduct.title}
      note={ArmagnacProduct.note ?? ""}
      typeProduct={t('products.armagnac')}
      thumbId={ArmagnacProduct.thumbId}
      hrefProduct={`/${lang}/bottles/${ArmagnacProduct.slug}`}
      header={withHeader && (<CardHeader title={t('products.armagnac')} href={`/${lang}/spirits/`} seeMoreLabel={t("common.see_more")} icon={<SpiritIcon width={28} height={28} />}/>)}>

      <div className={styles.details}>
        {
          ArmagnacProduct.originCountry && (
            <div className={styles.cardDetailVer}>
              <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
                {spanCountry}
              </span>
              <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles["clamp-2"]} ${styles.sm}`}>
                {ArmagnacProduct.originCountry} {ArmagnacProduct.region && ` / ${ArmagnacProduct.region}`}
              </span>
            </div>
          )
        }
        {
          ArmagnacProduct.appellation && (
            <div className={styles.cardDetailVer}>
              <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
                Appelation
              </span>
              <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles["clamp-2"]} ${styles.sm}`}>
                {ArmagnacProduct.appellation}
              </span>
            </div>
          )
        }
        {ArmagnacProduct.varieties && (
          <div className={styles.cardDetailVer}>
            <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
              Cépagnes :
            </span>
            <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles["clamp-2"]} ${styles.sm}`}>
              {Object.entries(ArmagnacProduct.varieties || {})
                  .map(([key, value]) => (value === 100 ? key : `${key} ${value}%`))
                  .join(" | ")
              }
            </span>
          </div>
        )}
        {
          ArmagnacProduct.alcoholVolume && (
            <div className={styles.cardDetailVer}>
              <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
                Teneur en Alcool
              </span>
              <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles["clamp-2"]} ${styles.sm}`}>
                {ArmagnacProduct.alcoholVolume}
              </span>
            </div>
          )
        }
        {ArmagnacProduct.priceRange && (
          <div className={`${styles.cardDetailVer} ${styles.mtAuto}`}>
            <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
              budget :
            </span>
            <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
              {ArmagnacProduct.priceRange}
            </span>
          </div>
        )}
      </div>
    </BaseComponent>
  );
}

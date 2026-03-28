"use client";

import React, { useState } from "react";
import { SmartImage } from "@/components/SmartImage";
import styles from "./UtensilHorizontal.module.css";
import { UtensilItemProps } from "@/types/Utensils";
import { useClientTranslation } from "@/lib/i18n/client";

type Language = "fr" | "en";

interface Props {
  lang:    Language;
  utensil: UtensilItemProps;
}

export default function UtensilHorizontalCard({ lang, utensil }: Props) {
  const [seeMore, setSeeMore] = useState(false);
  const { t } = useClientTranslation(lang);

  return (
    <article className={styles.card} aria-label={utensil.title} title={utensil.title}>

      <div className={styles.imageContainer}>
        <SmartImage
          id={utensil.thumbId ?? ''}
          alt={utensil.title}
          width={225}
          fit="contain"
          lazyload
        />
      </div>

      <div className={styles.details}>
        <div className={styles.cardPaddingContainer}>
          {utensil.code && (
            <p className={styles.code}>{utensil.code}</p>
          )}
          <h3 className={styles.cardTitle}>{utensil.title}</h3>
        </div>

        {utensil.description && (
          <div className={styles.cardPaddingContainer}>
            <p className={`${styles.description} ${seeMore ? '' : styles.HideDetails}`}>
              {utensil.description}
            </p>
          </div>
        )}

        <div className={styles.cardPaddingContainer}>
          <button
            type="button"
            className={styles.readMoreBtn}
            aria-label={`Discover ${utensil.title}`}
            onClick={() => setSeeMore((prev) => !prev)}
          >
            <span className={styles.readMoreBtnText}>
              {seeMore ? t("common.read_less") : t("common.read_more")}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}

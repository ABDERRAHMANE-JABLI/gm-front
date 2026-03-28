"use client";

import React from "react";
import Link from "next/link";
import styles from "./utensilCard.module.css";
import { UtensilProps } from "@/types/Utensils";
import { SmartImage } from "@/components/SmartImage";
import CardHeader from "../common/HeaderCard";
import { useClientTranslation } from '@/lib/i18n/client';
import UtensilIcon from "@/public/icons/menu/utensil.svg";

type Language = "fr" | "en";

type UtensilCardProps = {
  lang:        Language;
  Utensil:     UtensilProps;
  WithHeader?: boolean;
};

export default function UtensilCard({ lang, Utensil, WithHeader }: UtensilCardProps) {
  const href = `/${lang}/utensils/${Utensil.slug}`;
  const { t } = useClientTranslation(lang);

  return (
    <article className={`${styles.card} ${styles.categoryUtensil} ${WithHeader ? styles.cardWithHeather : ''}`}>
      <Link href={href} aria-label={Utensil.title} title={Utensil.title}>
        <span className={styles.stretchedLink} aria-hidden="true" />
      </Link>

      {WithHeader && (
        <CardHeader
          title={t('navigation.utensils')}
          href={`/${lang}/utensils`}
          seeMoreLabel={t("common.see_more")}
          icon={<UtensilIcon width={28} height={28} />}
        />
      )}

      <div className={styles.thumbWrapper}>
        <SmartImage id={Utensil.thumbId ?? ''} alt={Utensil.title} width={225} fit="cover" lazyload />
      </div>

      <div className={styles.cardPaddingContainer}>
        <p className={styles.categoryUtensilCollection}>
          {t("libelle.collection")}
        </p>
        <p className={styles.categoryUtensilTitle}>
          {Utensil.title}
        </p>
      </div>

      <div className={styles.cardPaddingContainer}>
        <Link href={href} className={styles.discoverButton} aria-label={Utensil.title} title={Utensil.title}>
          <span className={styles.discoverButtonText}>{t("common.discover")}</span>
        </Link>
      </div>
    </article>
  );
}

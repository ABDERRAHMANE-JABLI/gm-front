"use client";

import React from "react";
import Link from "next/link";
import styles from "./utensilCard.module.css";
import { UtensilProps } from "@/types/Utensils";
import { SmartImage } from "@/components/SmartImage";


type Language = "fr" | "en";

type UtensilCardProps = {
  lang : Language;
  Ustensil : UtensilProps,
  WithHeader?:boolean
};


export default function UtensilCard({ lang, Ustensil }: UtensilCardProps) {
  const href = `/${lang}/${Ustensil.slug}`;
  return (
    <div className={`${styles.card} ${styles.categoryUtensil}`}>
      <div className={styles.thumbWrapper}>
        <SmartImage id={Ustensil.thumbId} alt={Ustensil.title} width={225}  fit="cover" lazyload/>
      </div>

      <div className={styles.cardPaddingContainer}>
        <p className={styles.categoryUtensilCollection}>
            La Collection
        </p>
      <h5 className={styles.categoryUtensilTitle}>
        {Ustensil.title}
      </h5>
      </div>
      

      <div className={styles.cardPaddingContainer}>
        <Link href={href} className={styles.discoverButton}>
          <span className={styles.discoverText}>Décourvir</span>
        </Link>
      </div>
      
    </div>
  );
}

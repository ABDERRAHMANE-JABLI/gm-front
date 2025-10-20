"use client";

/**
 * 
 * @description Composant utilisé pour ajouter un header aux cartes, lorsqu'on veut les appeler dans la page LA PLACE
 * 
 */

import Link from "next/link";
import styles from "./header.module.css";
import { ReactNode } from "react";

type CardHeaderProps = {
  title: string; // ACTUALITE
  href: string; // /lang/blogs/
  icon: ReactNode; // IconNews, HotelIcon ...
  seeMoreLabel: string; // pour afficher le texte traduit
  subtitle?: string; // "Actus & rendez Vous", "Meilleur Chefs", .... optionel
};

export default function CardHeader({title, href, icon, seeMoreLabel, subtitle,}: CardHeaderProps) {

  return (
    <div className={styles.cardHeader}>
      <div className={styles.headerLeft}>
        <span className={styles.iconWrapper}>{icon}</span>
        <div className={styles.headerTexts}>
          <span className={styles.headerTitle}>{title}</span>
          {subtitle && <span className={styles.headerSubtitle}>{subtitle}</span>}
        </div>
      </div>
      <Link href={href} className={styles.moreBtn} aria-label={title} title={title}>
        {seeMoreLabel}
      </Link>
    </div>
  );
}

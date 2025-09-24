// components/RestaurantCard.tsx
import React from "react";
import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import { RestaurantProps } from "@/types/Restaurant";
import styles from "./RestaurantCard.module.css";
import { M_PLUS_1 } from "next/font/google";

const ToqueIcon = () => (
  <svg
    width="15"
    height="21"
    viewBox="0 0 15 21"
    fill="currentColor"
    className={styles.toque}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.6084 7.22049C13.462 9.23333 12.7358 11.3654 12.5022 12.6683C12.3613 13.446 12.2334 14.9196 12.209 16.242..."
      fill="#D7A949"
    ></path>
    <path
      d="M12.5022 12.6683L12.6498 12.695L12.6499 12.6947L12.5022 12.6683ZM12.209 16.242L12.2507 16.386L12.3569 16.3553..."
      fill="#D7A949"
    ></path>
  </svg>
);

const RestaurantCard: React.FC<RestaurantProps> = ({
  title,
  slug,
  nbToques,
  thumbId,
  openingPeriods,
  budget,
  address,
  cuisines,
}) => {
  const isOpen = true; // Placeholder until dynamic logic is added

  const getToques = () => {
    if (nbToques === -1)
      return <span className={`${styles.ChiefHats} ${styles.sponsored}`}>Sponsorisé</span>;
    if (nbToques === 6)
      return (
        <span className={`${styles.ChiefHats} ${styles.toqueOr}`}>
          <ToqueIcon />
        </span>
      );
    if (nbToques >= 1 && nbToques <= 5) {
      return (
        <span className={styles.ChiefHats}>
          {[...Array(nbToques)].map((_, i) => (
            <ToqueIcon key={i} />
          ))}
        </span>
      );
    }
    return null;
  };

  return (
    <Link href={`/restaurants/${slug}`} className={`card ${styles.cardkindRestaurant}`}>
      <div className={styles.thumbnailWrapper}>
        {thumbId && (
          <SmartImage
            id={thumbId}
            alt={title}
            width={666}
            height={444}
          />
        )}

        <div className={`${styles.openingHours} ${styles.isOpen} ${isOpen ? styles.show : ""}`}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="white">
            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none" />
            <path d="M12 6v6l4 2" stroke="white" strokeWidth="2" fill="none" />
          </svg>
          <span>Ouvert</span>
        </div>
      </div>

      <div className={styles.details}>
        <h3 className={styles.title}>{title}</h3>
        {getToques()}

        {Array.isArray(cuisines) && cuisines.length > 0 && (
          <p className={styles.synopsis}>
            {cuisines.slice(0, 3).join(" | ")}
            {cuisines.length > 3 ? "..." : ""}
          </p>
        )}

        {budget && (
          <div className={styles.Budget}>
            <div className={styles.currency}>{budget}</div>
            <div className={styles.text}>
              <div className={styles.rowPrice}>Prix</div>
              <div className={styles.rowLabel}>Gamme de prix</div>
            </div>
          </div>
        )}

        {address && <p className={styles.address}>{address}</p>}
      </div>
    </Link>
  );
};

export default RestaurantCard;

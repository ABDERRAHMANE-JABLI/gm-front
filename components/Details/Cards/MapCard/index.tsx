"use client";

import React from "react";
import styles from "./plan.module.css";
import LocationIcon from "@/public/icons/position.svg";
import ArrowIcon from "@/public/icons/ArrowCircle.svg";
import Link from "next/link";

interface MapCardProps {
  address?: string;
  latitude?: number;
  longitude?: number;
  mapsIframe?: string | null;
}

export default function MapCard({ address, latitude, longitude, mapsIframe }: MapCardProps) {
  const hasCoords = !!(latitude && longitude);
  const googleMapsUrl = hasCoords
    ? `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
    : undefined;

  const iframeSrc = mapsIframe
    ?? (latitude && longitude ? `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed` : null);

  return (
    <div className={styles.MapCard}>
      <div className={styles.headerContent}>
        <LocationIcon width={24} height={24} />
        <span className={styles.headerTitle}>PLAN</span>
      </div>

      {iframeSrc ? (
        <iframe
          src={iframeSrc}
          className={styles.mapImage}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          title={`Carte pour ${address}`}
        />
      ) : (
        <div className={styles.mapPlaceholder}>Plan non renseigné</div>
      )}

      <div className={styles.bodyContent}>
        <div className={styles.addressWrapper}>
          <span className={styles.addressLabel}>Adresse</span>
          <span className={styles.address}>{address}</span>
        </div>

        {hasCoords ? (
          <Link
            href={googleMapsUrl!}
            className={styles.CardButtonLink}
            title="Je m'y rends"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.CardButtonLinkText}><ArrowIcon width={20} height={20} /> JE M'Y RENDS</span>
          </Link>
        ) : (
          <button className={`${styles.CardButtonLink} ${styles.CardButtonLinkDisabled}`} disabled>
            <span className={styles.CardButtonLinkText}><ArrowIcon width={20} height={20} /> JE M'Y RENDS</span>
          </button>
        )}
      </div>
    </div>
  );
}

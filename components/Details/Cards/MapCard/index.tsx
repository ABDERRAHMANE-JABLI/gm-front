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
}

export default function MapCard({ address, latitude, longitude }: MapCardProps) {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const mapboxBase = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l+E40524(${longitude},${latitude})/${longitude},${latitude},14`;

  const imgUrl = `${mapboxBase}/480x330?access_token=${accessToken}`;
  const imgUrlMobile = `${mapboxBase}/480x360?access_token=${accessToken}`;
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;


  return (
    <div className={styles.MapCard}>
      <div className={styles.headerContent}>
        <LocationIcon width={24} height={24} />
        <span className={styles.headerTitle}>PLAN</span>
      </div>

      <picture>
        <source media="(max-width: 480px)" srcSet={imgUrlMobile} />
        <img className={styles.mapImage} src={imgUrl} alt={`Carte pour ${address}`} />
      </picture>

      <div className={styles.bodyContent}>
        <div className={styles.addressWrapper}>
          <span className={styles.addressLabel}>Adresse</span>
          <span className={styles.address}>{address}</span>
        </div>

        <Link
          href={googleMapsUrl}
          className={styles.CardButtonLink}
          title="Je m'y rends"
          target="_blank"
          rel="noopener noreferrer"
        >
            <span className={styles.CardButtonLinkText}><ArrowIcon width={20} height={20} /> JE M'Y RENDS</span>
        </Link>
      </div>
    </div>
  );
}

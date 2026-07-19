"use client";

import React from "react";
import styles from "./plan.module.css";
import LocationIcon from "@/public/icons/position.svg";
import ArrowIcon from "@/public/icons/ArrowCircle.svg";
import Link from "next/link";
import { useClientTranslation, Language } from "@/lib/i18n/client";

interface MapCardProps {
  lang?: Language;
  address?: string;
  latitude?: number;
  longitude?: number;
  mapsIframe?: string | null;
}

// Le backend encode parfois l'apostrophe des noms (« Domaine D'aghbalou ») en
// entité HTML &#39;. Le & et le # de cette entité coupent l'URL Google → token
// pb invalide → 400. On la remplace par une apostrophe littérale, que Google accepte.
function normalizeMapSrc(src: string): string {
  return src.replace(/&#0*39;|&#x0*27;|&apos;/gi, "'");
}

// Sécurité : après décodage, on n'injecte l'URL dans l'iframe QUE si c'est bien
// une URL https vers un domaine Google Maps. Bloque les schémas dangereux
// (javascript:, data:) qu'un décodage d'entités pourrait « réveiller ».
const ALLOWED_MAP_HOSTS = new Set(['www.google.com', 'maps.google.com', 'google.com']);

function isSafeMapSrc(src: string): boolean {
  try {
    const u = new URL(src);
    return u.protocol === 'https:' && ALLOWED_MAP_HOSTS.has(u.hostname.toLowerCase());
  } catch {
    return false;
  }
}

export default function MapCard({ lang = "fr", address, latitude, longitude, mapsIframe }: MapCardProps) {
  const { t } = useClientTranslation(lang);
  const hasCoords = !!(latitude && longitude);
  const googleMapsUrl = hasCoords
    ? `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
    : undefined;

  // On utilise une vérif "truthy + trim" et NON `??` : si l'API renvoie une
  // chaîne vide "" pour mapsIframe (au lieu de null), `??` la garderait et la
  // carte resterait vide. Là, "" → on bascule sur le fallback coordonnées.
  const decodedIframe = (mapsIframe && mapsIframe.trim())
    ? normalizeMapSrc(mapsIframe.trim())
    : '';
  const coordsSrc = (latitude && longitude)
    ? `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`
    : null;
  // On n'accepte l'iframe backend que s'il passe la validation de sécurité,
  // sinon on retombe sur l'embed par coordonnées (construit par nos soins).
  const iframeSrc = (decodedIframe && isSafeMapSrc(decodedIframe)) ? decodedIframe : coordsSrc;

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

      <div className={`${styles.bodyContent} ${!hasCoords ? styles.bodyContentCentered : ''}`}>
        <div className={styles.addressWrapper}>
          <span className={styles.addressLabel}>Adresse</span>
          <span className={styles.address}>{address}</span>
        </div>

        {hasCoords && (
          <Link
            href={googleMapsUrl!}
            className={styles.CardButtonLink}
            title={t("common.get_directions")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.CardButtonLinkText}><ArrowIcon width={20} height={20} /> {t("common.get_directions")}</span>
          </Link>
        )}
      </div>
    </div>
  );
}

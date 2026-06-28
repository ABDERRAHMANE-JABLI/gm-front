'use client'

import React, { useState, useRef, useEffect } from 'react'
import styles from '@/page-components/Restaurants/Detail/styles.module.css'
import Triptych from '@/components/Details/Triptych'
import HeaderPage from '@/components/Details/HeaderPage'
import Stars from '@/components/cards/common/Stars'
import RowDetails from '@/components/Details/RowDetails'
import MapCard from '@/components/Details/Cards/MapCard'
import { SmartImage } from '@/components/SmartImage'
import { ApiHotelDetail } from '@/types/api/Hotel'
import { Language } from '@/lib/types'
import { ApiPartner } from '@/types/api/Partner'
import PartenairesSection from '@/components/cards/partners'
import HotelIcon from '@/public/icons/menu/hotel.svg'
import RestaurantIcon from '@/public/icons/menu/restaurant.svg'
import HorizontalRestauCard from '@/components/cards/restaurantCard/HorizontalCard'
import { useClientTranslation } from '@/lib/i18n/client'

export interface HotelDetailPageProps {
  lang: Language;
  hotel: ApiHotelDetail;
  partners?: ApiPartner[];
}

export default function HotelDetailPage({ lang, hotel, partners = [] }: HotelDetailPageProps) {
  const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? '';
  const [avisExpanded, setAvisExpanded] = useState(false);
  const [avisTruncated, setAvisTruncated] = useState(false);
  const avisTextRef = useRef<HTMLParagraphElement>(null);
  const { t } = useClientTranslation(lang);
  useEffect(() => {
    const el = avisTextRef.current;
    if (!el) return;
    const timer = setTimeout(() => {
      setAvisTruncated(el.scrollHeight > el.clientHeight + 2);
    }, 50);
    return () => clearTimeout(timer);
  }, [hotel.avisGM]);

  const address = [hotel.adresse, hotel.city?.cityName].filter(Boolean).join(', ');

  const budget = hotel.budgetMin != null
    ? `${hotel.budgetMin}${hotel.budgetMax != null ? ` – ${hotel.budgetMax}` : ''} MAD`
    : undefined;

  const links = {
    phone:     hotel.tel      ?? undefined,
    siteWeb:   hotel.website  ?? undefined,
    instagram: hotel.instagram ?? undefined,
  };

  const allImages = [
    hotel.thumbId ? `${s3}/${hotel.thumbId}` : null,
    ...hotel.imagesSecondaire.map((img) => `${s3}/${img}`),
  ].filter(Boolean) as string[];

  const triptychImages = allImages.map((id) => ({ id }));

  const lat = hotel.latitude  ? parseFloat(hotel.latitude)  : undefined;
  const lng = hotel.longitude ? parseFloat(hotel.longitude) : undefined;

  const year = new Date(hotel.createdAt ?? Date.now()).getFullYear();

  return (
    <div className={styles.restaurantDetailPage}>
      <div className={styles.container}>

        {/* Header */}
        <header>
          <HeaderPage title={hotel.name} subTitle={address}>
            <Stars nbStars={hotel.nbrStars} isSponsorised={hotel.isSponsorised} lang={lang} />
          </HeaderPage>
        </header>

        {/* Images */}
        {triptychImages.length <= 1 && (
          <section className={styles.sectionTriptych}>
            <div className={styles.singleImage}>
              <SmartImage id={triptychImages[0]?.id ?? null} alt={hotel.name} fit="fill" typeImage={"hotel"} />
            </div>
          </section>
        )}
        {triptychImages.length > 1 && (
          <section className={styles.sectionTriptych}>
            <Triptych images={triptychImages} title={hotel.name} />
          </section>
        )}

        {/* Row Details */}
        <section className={styles.sectionTriptych}>
          <RowDetails links={links} budget={budget} budgetDescription={t('common.budget_hotel')}>
            {hotel.styles.length > 0 && (
              <div className="cardDetailHor">
                <span className="figmaCaption ellipsis">Style</span>
                <span className="figmaCaptionValue ellipsis">{hotel.styles.join(' | ')}</span>
              </div>
            )}
            {hotel.services.length > 0 && (
              <div className="cardDetailHor">
                <span className="figmaCaption ellipsis">Services</span>
                <span className="figmaCaptionValue ellipsis">{hotel.services.join(', ')}</span>
              </div>
            )}
            {hotel.restaurant && (
              <div className="cardDetailHor">
                <span className="figmaCaption ellipsis">Restaurant</span>
                <span className="figmaCaptionValue ellipsis">{hotel.restaurant.name}</span>
              </div>
            )}
          </RowDetails>
        </section>

        {/* ── 3-column cards ── */}
        <section className={`${styles.cardsRow} ${avisExpanded ? styles.cardsRowExpanded : ''}`}>

          {/* Avis GM */}
          {(hotel.avisGM) && (
            <div className={avisExpanded ? styles.avisCardFull : styles.avisCardWide}>
              <div className={styles.avisHeader}>
                <span className={styles.avisIcon}><HotelIcon width={40} height={40} /></span>
                <div>
                  <p className={styles.avisTitle}>L&apos;avis de Gault&amp;Millau</p>
                  <p className={styles.avisYear}>{year}</p>
                </div>
              </div>
              <p ref={avisTextRef} className={`${styles.avisText} ${avisExpanded ? styles.avisTextExpanded : ''}`}>
                {hotel.avisGM}
              </p>
              {(avisTruncated || avisExpanded) && (
                <button className={styles.CardButtonLink} onClick={() => setAvisExpanded((v) => !v)}>
                  <span className={styles.CardButtonLinkText}>{avisExpanded ? 'LIRE MOINS' : 'LIRE PLUS'}</span>
                </button>
              )}
            </div>
          )}

          {/* Plan — affiché si on a un mapsIframe OU des coordonnées */}
          {(hotel.mapsIframe || (lat != null && lng != null)) && (
            <div className={styles.mapWrapper}>
              <MapCard address={address} latitude={lat} longitude={lng} mapsIframe={hotel.mapsIframe} />
            </div>
          )}

        </section>

        {/* Restaurant de l'hôtel */}
        {hotel.restaurant && (() => {
          const r = hotel.restaurant!;
          const restoBudget = r.budgetMin != null && r.budgetMax != null
            ? `${r.budgetMin} – ${r.budgetMax} MAD`
            : r.budgetMin != null ? `${r.budgetMin} MAD` : undefined;

          const restoProps = {
            title:           r.name,
            slug:            r.slug,
            thumbId:         r.thumbId ? `${s3}/${r.thumbId}` : undefined,
            nbToques:        r.nbrToques,
            isSponsorised:   r.isSponsorised,
            note:            r.noteGM != null ? String(r.noteGM) : undefined,
            cuisines:        r.cuisines,
            chief:           r.chef ?? undefined,
            budget:          restoBudget,
          };

          return (
            <section style={{ marginTop: '30px' }}>
              <div className={styles.relatedSection}>
                <div className={styles.relatedHeader}>
                  <RestaurantIcon width={36} height={36} />
                  <p className={styles.relatedTitle}>Découvrez le restaurant de l&apos;Hôtel</p>
                </div>
              </div>
              <HorizontalRestauCard lang={lang} restaurant={restoProps} />
            </section>
          );
        })()}

      </div>

      <PartenairesSection partners={partners} />
    </div>
  )
}

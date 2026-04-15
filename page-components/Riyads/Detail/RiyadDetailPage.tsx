'use client'

import React, { useState, useRef, useEffect } from 'react'
import styles from '@/page-components/Restaurants/Detail/styles.module.css'
import Triptych from '@/components/Details/Triptych'
import HeaderPage from '@/components/Details/HeaderPage'
import Stars from '@/components/cards/common/Stars'
import RowDetails from '@/components/Details/RowDetails'
import MapCard from '@/components/Details/Cards/MapCard'
import { SmartImage } from '@/components/SmartImage'
import { ApiRiyadDetail } from '@/types/api/Riyad'
import { Language } from '@/lib/types'
import RiyadIcon from '@/public/icons/menu/winery.svg'
import RestaurantIcon from '@/public/icons/menu/restaurant.svg'
import HorizontalRestauCard from '@/components/cards/restaurantCard/HorizontalCard'
import PartenairesSection from '@/components/cards/partners'
import { ApiPartner } from '@/types/api/Partner'

export interface RiyadDetailPageProps {
  lang: Language;
  riyad: ApiRiyadDetail;
  partners?: ApiPartner[];
}

export default function RiyadDetailPage({ lang, riyad, partners = [] }: RiyadDetailPageProps) {
  const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? '';
  const [avisExpanded, setAvisExpanded] = useState(false);
  const [avisTruncated, setAvisTruncated] = useState(false);
  const avisTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = avisTextRef.current;
    if (!el) return;
    const timer = setTimeout(() => {
      setAvisTruncated(el.scrollHeight > el.clientHeight + 2);
    }, 50);
    return () => clearTimeout(timer);
  }, [riyad.avisGM]);

  const address = [riyad.adresse, riyad.city?.cityName].filter(Boolean).join(', ');

  const budget = riyad.budgetMin != null
    ? `${riyad.budgetMin} MAD`
    : undefined;

  const links = {
    phone:     riyad.tel       ?? undefined,
    siteWeb:   riyad.website   ?? undefined,
    instagram: riyad.instagram ?? undefined,
  };

  const allImages = [
    riyad.thumbId ? `${s3}/${riyad.thumbId}` : null,
    ...riyad.imagesSecondaire.map((img) => `${s3}/${img}`),
  ].filter(Boolean) as string[];

  const triptychImages = allImages.map((id) => ({ id }));

  const lat = riyad.latitude  ? parseFloat(riyad.latitude)  : undefined;
  const lng = riyad.longitude ? parseFloat(riyad.longitude) : undefined;

  const year = new Date(riyad.createdAt ?? Date.now()).getFullYear();

  return (
    <div className={styles.restaurantDetailPage}>
      <div className={styles.container}>

        {/* Header */}
        <header>
          <HeaderPage title={riyad.name} subTitle={address} reservationLink={riyad.reservationLink}>
            <Stars nbStars={riyad.nbrStars} isSponsorised={riyad.isSponsorised} lang={lang} />
          </HeaderPage>
        </header>

        {/* Images */}
        {triptychImages.length === 1 && (
          <section className={styles.sectionTriptych}>
            <div className={styles.singleImage}>
              <SmartImage id={triptychImages[0].id} alt={riyad.name} fit="cover" />
            </div>
          </section>
        )}
        {triptychImages.length > 1 && (
          <section className={styles.sectionTriptych}>
            <Triptych images={triptychImages} title={riyad.name} />
          </section>
        )}

        {/* Row Details */}
        <section className={styles.sectionTriptych}>
          <RowDetails links={links} budget={budget} budgetDescription="Par nuit sans petit-déjeuner">
            {riyad.budgetMin != null && (
              <div className="cardDetailHor">
                <span className="figmaCaption ellipsis">Budget min</span>
                <span className="figmaCaptionValue ellipsis">{riyad.budgetMin} MAD / nuit</span>
              </div>
            )}
            {riyad.styles.length > 0 && (
              <div className="cardDetailHor">
                <span className="figmaCaption ellipsis">Style</span>
                <span className="figmaCaptionValue ellipsis">{riyad.styles.join(' | ')}</span>
              </div>
            )}
            {riyad.services.length > 0 && (
              <div className="cardDetailHor">
                <span className="figmaCaption ellipsis">Services</span>
                <span className="figmaCaptionValue ellipsis">{riyad.services.join(', ')}</span>
              </div>
            )}
            {riyad.restaurant && (
              <div className="cardDetailHor">
                <span className="figmaCaption ellipsis">Restaurant</span>
                <span className="figmaCaptionValue ellipsis">{riyad.restaurant.name}</span>
              </div>
            )}
          </RowDetails>
        </section>

        {/* ── 3-column cards ── */}
        <section className={`${styles.cardsRow} ${avisExpanded ? styles.cardsRowExpanded : ''}`}>

          {/* Avis GM */}
          {riyad.avisGM && (
            <div className={avisExpanded ? styles.avisCardFull : styles.avisCardWide}>
              <div className={styles.avisHeader}>
                <span className={styles.avisIcon}><RiyadIcon width={40} height={40} /></span>
                <div>
                  <p className={styles.avisTitle}>L'avis de Gault&Millau</p>
                  <p className={styles.avisYear}>{year}</p>
                </div>
              </div>
              <p ref={avisTextRef} className={`${styles.avisText} ${avisExpanded ? styles.avisTextExpanded : ''}`}>
                {riyad.avisGM}
              </p>
              {(avisTruncated || avisExpanded) && (
                <button className={styles.CardButtonLink} onClick={() => setAvisExpanded((v) => !v)}>
                  <span className={styles.CardButtonLinkText}>{avisExpanded ? 'LIRE MOINS' : 'LIRE PLUS'}</span>
                </button>
              )}
            </div>
          )}

          {/* Plan */}
          {lat != null && lng != null && (
            <div className={styles.mapWrapper}>
              <MapCard
                address={address}
                latitude={lat}
                longitude={lng}
                mapsIframe={riyad.mapsIframe}
              />
            </div>
          )}

        </section>

        {/* Restaurant du riyad */}
        {riyad.restaurant && (() => {
          const r = riyad.restaurant!;
          const restoBudget = r.budgetMin != null && r.budgetMax != null
            ? `${r.budgetMin} – ${r.budgetMax} MAD`
            : r.budgetMin != null ? `${r.budgetMin} MAD` : undefined;

          const restoProps = {
            title:         r.name,
            slug:          r.slug,
            thumbId:       r.thumbId ? `${s3}/${r.thumbId}` : undefined,
            nbToques:      r.nbrToques,
            isSponsorised: r.isSponsorised,
            note:          r.noteGM != null ? String(r.noteGM) : undefined,
            cuisines:      r.cuisines,
            chief:         r.chef ?? undefined,
            budget:        restoBudget,
          };

          return (
            <section style={{ marginTop: '30px' }}>
              <div className={styles.avisHeader} style={{ marginBottom: '16px' }}>
                <span className={styles.avisIcon}>
                  <RestaurantIcon width={28} height={28} />
                </span>
                <p className={styles.avisTitle}>Découvrez le restaurant du riyad</p>
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

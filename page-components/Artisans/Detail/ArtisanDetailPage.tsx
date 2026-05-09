'use client'

import React, { useState, useRef, useEffect } from 'react'
import styles from '@/page-components/Restaurants/Detail/styles.module.css'
import Triptych from '@/components/Details/Triptych'
import HeaderPage from '@/components/Details/HeaderPage'
import RowDetails from '@/components/Details/RowDetails'
import MapCard from '@/components/Details/Cards/MapCard'
import { SmartImage } from '@/components/SmartImage'
import { ApiArtisanDetail } from '@/types/api/Artisan'
import { Language } from '@/lib/types'
import ArtisanIcon from '@/public/icons/menu/artisan.svg'
import PartenairesSection from '@/components/cards/partners'
import { ApiPartner } from '@/types/api/Partner'

export interface ArtisanDetailPageProps {
  lang: Language;
  artisan: ApiArtisanDetail;
  partners?: ApiPartner[];
}

export default function ArtisanDetailPage({ artisan, partners = [] }: ArtisanDetailPageProps) {
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
  }, [artisan.avisGM]);

  const address = [artisan.adresse, artisan.city?.cityName].filter(Boolean).join(', ');

  const activities = [
    artisan.mainActivity.libelle,
    ...(artisan.otherActivities ?? []),
  ].join(' · ');

  const links = {
    phone:     artisan.tel       ?? undefined,
    siteWeb:   artisan.website   ?? undefined,
    instagram: artisan.instagram ?? undefined,
  };

  const allImages = [
    artisan.thumbId ? `${s3}/${artisan.thumbId}` : null,
    ...artisan.imagesSecondaire.map((img) => `${s3}/${img}`),
  ].filter(Boolean) as string[];

  const triptychImages = allImages.map((id) => ({ id }));

  const lat = artisan.latitude  ? parseFloat(artisan.latitude)  : undefined;
  const lng = artisan.longitude ? parseFloat(artisan.longitude) : undefined;

  return (
    <div className={styles.restaurantDetailPage}>
      <div className={styles.container}>

        {/* Header */}
        <header>
          <HeaderPage title={artisan.title} subTitle={address}>
            <div className={styles.avisHeader} style={{ marginBottom: 0 }}>
              <span className={styles.avisIcon}><ArtisanIcon width={28} height={28} /></span>
              <p className={styles.avisTitle}>{activities}</p>
            </div>
          </HeaderPage>
        </header>

        {/* Images */}
        {triptychImages.length === 1 && (
          <section className={styles.sectionTriptych}>
            <div className={styles.singleImage}>
              <SmartImage id={triptychImages[0].id} alt={artisan.title} fit="cover" />
            </div>
          </section>
        )}
        {triptychImages.length > 1 && (
          <section className={styles.sectionTriptych}>
            <Triptych images={triptychImages} title={artisan.title} />
          </section>
        )}

        {/* Row Details */}
        <section className={styles.sectionTriptych}>
          <RowDetails links={links}>
            {artisan.mainActivity && (
              <div className="cardDetailHor">
                <span className="figmaCaption ellipsis">Activité</span>
                <span className="figmaCaptionValue ellipsis">{artisan.mainActivity.libelle}</span>
              </div>
            )}
            {artisan.otherActivities.length > 0 && (
              <div className="cardDetailHor">
                <span className="figmaCaption ellipsis">Autres activités</span>
                <span className="figmaCaptionValue ellipsis">{artisan.otherActivities.join(' · ')}</span>
              </div>
            )}
            {artisan.services.length > 0 && (
              <div className="cardDetailHor">
                <span className="figmaCaption ellipsis">Services</span>
                <span className="figmaCaptionValue ellipsis">{artisan.services.join(', ')}</span>
              </div>
            )}
          </RowDetails>
        </section>

        {/* ── Avis + Plan ── */}
        <section className={`${styles.cardsRow} ${avisExpanded ? styles.cardsRowExpanded : ''}`}>

          {/* Avis GM */}
          <div className={avisExpanded ? styles.avisCardFull : styles.avisCardWide}>
            <div className={styles.avisHeader}>
              <span className={styles.avisIcon}><ArtisanIcon width={40} height={40} /></span>
              <div>
                <p className={styles.avisTitle}>L'avis de Gault&Millau</p>
              </div>
            </div>
            {artisan.avisGM ? (
              <>
                <p ref={avisTextRef} className={`${styles.avisText} ${avisExpanded ? styles.avisTextExpanded : ''}`}>
                  {artisan.avisGM}
                </p>
                {(avisTruncated || avisExpanded) && (
                  <button className={styles.CardButtonLink} onClick={() => setAvisExpanded((v) => !v)}>
                    <span className={styles.CardButtonLinkText}>{avisExpanded ? 'LIRE MOINS' : 'LIRE PLUS'}</span>
                  </button>
                )}
              </>
            ) : (
              <p className={styles.hoursEmpty}>Avis non renseigné</p>
            )}
          </div>

          {/* Plan */}
          <div className={styles.mapWrapper}>
            <MapCard
              address={address}
              latitude={lat}
              longitude={lng}
              mapsIframe={artisan.mapsIframe}
            />
          </div>

        </section>

      </div>

      <PartenairesSection partners={partners} />
    </div>
  )
}

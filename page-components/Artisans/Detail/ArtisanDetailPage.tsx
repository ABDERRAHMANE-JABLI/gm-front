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

export default function ArtisanDetailPage({ lang, artisan, partners = [] }: ArtisanDetailPageProps) {
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

  // Code postal + ville fusionnés ("20000 Casablanca"), puis "adresse, 20000 Casablanca"
  const cityLine = [artisan.codePostale, artisan.city?.cityName].filter(Boolean).join(' ');
  const address  = [artisan.adresse, cityLine].filter(Boolean).join(', ');


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
            <div className={styles.avisHeader} style={{ marginBottom: 0, padding: 0 }}>
              <span className={styles.artisanIconbg}><svg fill="#9B9465" version="1.1" id="Layer_1" width="800px" height="800px" viewBox="0 0 512 512" enableBackground="new 0 0 512 512"  stroke="#989162" strokeWidth="0.00512"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="7.168000000000001"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M256,0C114.609,0,0,114.609,0,256s114.609,256,256,256s256-114.609,256-256S397.391,0,256,0z M256,472 c-119.297,0-216-96.703-216-216S136.703,40,256,40s216,96.703,216,216S375.297,472,256,472z"></path> <polygon points="224.391,224.469 231.359,196.641 144.359,144.438 196.547,231.438 "></polygon> <polygon points="315.281,231.172 367.125,144 280.5,196.406 287.5,224.344 "></polygon> <polygon points="287.688,287.453 280.828,315.344 368,367.219 315.469,280.391 "></polygon> <polygon points="196.547,280.672 144.359,367.656 231.547,315.312 224.516,287.641 "></polygon> <path d="M256,128l-25.594,102.391L128,256l102.5,25.625L256.5,384l25.234-102.547L384,255.5l-102.422-25.203L256,128z M256,272 c-8.828,0-16-7.172-16-16s7.172-16,16-16s16,7.172,16,16S264.828,272,256,272z"></path> </g> </g></svg></span>
              <div>
                <p className={styles.artisanTitle}>{artisan.mainActivity?.libelle ?? ""}</p>
                <p className={styles.artisanTitlesub}> {artisan.isSelected   ? "Selected"  : artisan.isSponsorised  ? "Sponsorised" : ""} </p>
              </div>
            </div>
          </HeaderPage>
        </header>

        {/* Images */}
        {triptychImages.length <= 1 && (
          <section className={styles.sectionTriptych}>
            <div className={styles.singleImage}>
              <SmartImage id={triptychImages[0]?.id ?? null} alt={artisan.title} fit="fill" typeImage={"artisan"}/>
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
                <p className={styles.avisTitle}>L&apos;avis de Gault&amp;Millau</p>
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
              lang={lang}
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

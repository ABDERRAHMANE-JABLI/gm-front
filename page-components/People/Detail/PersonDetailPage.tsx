'use client'

import React, { useState, useRef, useEffect } from 'react'
import styles from './personDetail.module.css'
import { SmartImage } from '@/components/SmartImage'
import ToqueIcon from '@/public/icons/toque.svg'
import { ApiTalentDetail } from '@/types/api/Talent'
import { Language } from '@/lib/types'
import RestaurantCard from '@/components/cards/restaurantCard'
import PartenairesSection from '@/components/cards/partners'
import { ApiPartner } from '@/types/api/Partner'
import RestaurantIcon from '@/public/icons/menu/restaurant.svg'
import HotelCard      from '@/components/cards/hotelCard'
import ArtisanCard    from '@/components/cards/artisanCard'

export interface PersonDetailPageProps {
  lang: Language;
  person: ApiTalentDetail;
  partners?: ApiPartner[];
}

export default function PersonDetailPage({ lang, person, partners = [] }: PersonDetailPageProps) {
  const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? '';
  const imageUrl = person.thumbId ? `${s3}/${person.thumbId}` : null;

  const [presExpanded, setPresExpanded] = useState(false);
  const [presTruncated, setPresTruncated] = useState(false);
  const presBodyRef = useRef<HTMLDivElement>(null);
  const bioTrackRef = useRef<HTMLDivElement>(null);
  const [bioOverflows, setBioOverflows] = useState(false);

  useEffect(() => {
    const el = bioTrackRef.current;
    if (!el) return;
    const check = () => setBioOverflows(el.scrollWidth > el.clientWidth + 2);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [person.biographie]);

  const scrollBio = (dir: 'prev' | 'next') => {
    const el = bioTrackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'next' ? 194 : -194, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = presBodyRef.current;
    if (!el) return;
    const timer = setTimeout(() => {
      setPresTruncated(el.scrollHeight > el.clientHeight + 2);
    }, 50);
    return () => clearTimeout(timer);
  }, [person.resume, person.presentation]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* ── Section 1 : photo + identité ── */}
        <section className={styles.heroSection}>

          {/* Col 1 : photo */}
          <div className={styles.photoCol}>
            <div className={styles.photoInner}>
                <SmartImage id={imageUrl} alt={person.fullName} fit="fill" width={400} height={500} typeImage={"chef"}/>
            </div>
          </div>

          {/* Col 2 : identité */}
          <div className={styles.infoCol}>
            {person.nbrToques === -1 && (
              <div className={`${styles.toquesRow} ${styles.toquesRowYellow}`}>
                <span className={styles.toqueBadge}>Sélectionné</span>
              </div>
            )}
            {person.nbrToques === 6 && (
              <div className={styles.toquesRow}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <ToqueIcon key={i} width={22} height={30} fill="#D7A949" />
                ))}
              </div>
            )}
            {person.nbrToques != null && person.nbrToques > 0 && person.nbrToques <= 5 && (
              <div className={`${styles.toquesRow} ${styles.toquesRowYellow}`}>
                {Array.from({ length: person.nbrToques }).map((_, i) => (
                  <ToqueIcon key={i} width={22} height={30} fill="#000000" />
                ))}
              </div>
            )}
            <h1 className={styles.name}>{person.fullName}</h1>
            {person.roles.length > 0 && (
              <p className={styles.roles}>{person.roles.join(' · ')}</p>
            )}
          </div>

        </section>

        {/* ── Section 2 : résumé / présentation ── */}
        {(person.resume || person.presentation) && (
          <section className={presExpanded ? styles.presentationSectionFull : styles.presentationSection}>
            <div className={styles.presentationHeader}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 512 512" aria-hidden="true">
                <path d="M512 0C460.22 3.56 96.44 38.2 71.01 287.61c-3.09 26.66-4.84 53.44-5.99 80.24l178.87-178.69c6.25-6.25 16.4-6.25 22.65 0s6.25 16.38 0 22.63L7.04 471.03c-9.38 9.37-9.38 24.57 0 33.94s24.59 9.37 33.98 0l57.13-57.07c42.09-.14 84.15-2.53 125.96-7.36c53.48-5.44 97.02-26.47 132.58-56.54H255.74l146.79-48.88c11.25-14.89 21.37-30.71 30.45-47.12h-81.14l106.54-53.21C500.29 132.86 510.19 26.26 512 0"/>
              </svg>
              <p className={styles.presentationTitle}>Présentation</p>
            </div>
            <div
              ref={presBodyRef}
              className={presExpanded ? styles.presBodyExpanded : styles.presBody}
            >
              {person.resume && <p className={styles.resume}>{person.resume}</p>}
              {person.presentation && (
                <div
                  className={styles.presentation}
                  dangerouslySetInnerHTML={{ __html: person.presentation }}
                />
              )}
            </div>
            {(presTruncated || presExpanded) && (
              <button className={styles.lirePlusBtn} onClick={() => setPresExpanded(v => !v)}>
                {presExpanded ? 'LIRE MOINS' : 'LIRE PLUS'}
              </button>
            )}
          </section>
        )}

        {/* ── Section 3 : biographie ── */}
        {person.biographie && person.biographie.length > 0 && (
          <section className={styles.bioSection}>
            <div className={styles.sectionHeader}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 512 512" aria-hidden="true">
                <path d="M464 256a208 208 0 1 1-416 0a208 208 0 1 1 416 0M0 256a256 256 0 1 0 512 0a256 256 0 1 0-512 0m232-136v136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24"/>
              </svg>
              <h2 className={styles.sectionTitle}>Biographie &amp; Distinctions</h2>
              {bioOverflows && (
                <div className={styles.bioNavRow}>
                  <button className={styles.bioNavBtn} onClick={() => scrollBio('prev')} aria-label="Précédent">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                  </button>
                  <button className={styles.bioNavBtn} onClick={() => scrollBio('next')} aria-label="Suivant">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                  </button>
                </div>
              )}
            </div>
            <div className={styles.bioCarousel}>
              <div ref={bioTrackRef} className={styles.bioTrack}>
                {person.biographie.map((b, i) => (
                  <div key={i} className={styles.bioCard}>
                    <span className={styles.bioYear}>{b.year}</span>
                    <p className={styles.bioText}>{b.libelle}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Section 4 : restaurants ── */}
        {person.chefAt.length > 0 && (
          <section className={styles.restoSection}>
            <div className={styles.sectionHeader}>
              <RestaurantIcon width={36} height={36} />
              <h2 className={styles.sectionTitle}>Ses Restaurants</h2>
            </div>
            <div className={styles.restoGrid}>
              {person.chefAt.map((r) => {
                const budget = r.budgetMin != null && r.budgetMax != null
                  ? `${r.budgetMin} – ${r.budgetMax} MAD`
                  : r.budgetMin != null ? `${r.budgetMin} MAD` : undefined;
                return (
                  <RestaurantCard
                    key={r.slug}
                    lang={lang}
                    restaurant={{
                      title:         r.name,
                      slug:          r.slug,
                      thumbId:       r.thumbId ? `${s3}/${r.thumbId}` : undefined,
                      nbToques:      r.nbrToques,
                      isSponsorised: r.isSponsorised,
                      note:          r.noteGM != null ? String(r.noteGM) : undefined,
                      cuisines:      r.cuisines,
                      budget,
                    }}
                  />
                );
              })}
            </div>
          </section>
        )}

        {/* ── Section 5 : workplace ── */}
        {person.workplace && (() => {
          const wp = person.workplace!;

          const budget = wp.budgetMin != null && wp.budgetMax != null
            ? `${wp.budgetMin} – ${wp.budgetMax} MAD`
            : wp.budgetMin != null ? `${wp.budgetMin} MAD` : undefined;

          return (
            <section className={styles.restoSection}>
              <div className={styles.sectionHeader}>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 64 64" aria-hidden="true">
                  <rect width="64" height="64" rx="18" fill="#FF7B08"/>
                  <g fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 26 H48"/><path d="M40 18 L48 26"/>
                    <path d="M48 38 H16"/><path d="M24 46 L16 38"/>
                  </g>
                </svg>
                <h2 className={styles.sectionTitle}>En relation avec le Talent</h2>
              </div>
              <div className={styles.restoGrid}>
                {(wp.type === 'restaurant') && (
                  <RestaurantCard
                    lang={lang}
                    restaurant={{
                      title:         wp.name,
                      slug:          wp.slug,
                      thumbId:       wp.thumbId ? `${s3}/${wp.thumbId}` : undefined,
                      nbToques:      wp.nbrToques ?? 0,
                      isSponsorised: wp.isSponsorised ?? false,
                      note:          wp.noteGM != null ? String(wp.noteGM) : undefined,
                      cuisines:      [],
                      budget,
                    }}
                    withHeader={true}
                  />
                )}
                {(wp.type === 'hotel' || wp.type === 'riyad') && (
                  <HotelCard
                    lang={lang}
                    headerTitle={wp.type === 'riyad' ? 'Riad' : 'Hotel'}
                    Hotel={{
                      title:         wp.name,
                      slug:          wp.slug,
                      thumbId:       wp.thumbId ? `${s3}/${wp.thumbId}` : undefined,
                      isGmSelected:  !(wp.isSponsorised ?? false),
                      isSponsorised: wp.isSponsorised ?? false,
                      nbStars:       wp.nbrStars ?? 0,
                      address:       wp.lieu,
                      budget:        wp.budget != null ? `${wp.budget} MAD` : undefined,
                      services:      wp.services ?? [],
                    }}
                    withHeader={true}
                  />
                )}
                {wp.type === 'artisan' && (
                  <ArtisanCard
                    lang={lang}
                    Artisan={{
                      title:           wp.name,
                      slug:            wp.slug,
                      thumbId:         wp.thumbId ? `${s3}/${wp.thumbId}` : undefined,
                      isGmSelected:    !(wp.isSponsorised ?? false),
                      primaryActivity: wp.activity ?? '',
                      otherActivities: wp.activities ?? [],
                      address:         wp.lieu,
                      services:        wp.services ?? [],
                    }}
                    withHeader={true}
                  />
                )}
              </div>
            </section>
          );
        })()}

      </div>

      <PartenairesSection partners={partners} />
    </div>
  )
}

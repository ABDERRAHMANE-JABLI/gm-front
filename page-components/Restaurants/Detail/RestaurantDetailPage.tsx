'use client'

import React, { useState, useRef, useEffect } from 'react'
import styles from './styles.module.css'
import Triptych from '@/components/Details/Triptych'
import HeaderPage from '@/components/Details/HeaderPage'
import Toques from '@/components/cards/common/Toques'
import RowDetails from '@/components/Details/RowDetails'
import { useClientTranslation } from '@/lib/i18n/client'
import MapCard from '@/components/Details/Cards/MapCard'
import { ApiRestaurantDetail } from '@/types/api/Restaurant'
import { SmartImage } from '@/components/SmartImage'
import { parseApiTime, DayOfWeek } from '@/types/Time'
import GmIcon from '@/public/icons/menu/restaurant.svg'
import ToqueIcon from '@/public/icons/toque.svg'
import PubCard from '@/components/Details/Cards/PubCard'
import PartenairesSection from '@/components/cards/partners'
import { ApiPartner } from '@/types/api/Partner'

type Language = 'fr' | 'en';

export interface Props {
  lang: Language;
  restaurant: ApiRestaurantDetail;
  partners?: ApiPartner[];
}

const DAY_MAP: Record<DayOfWeek, string> = {
  'Lun': 'LU', 'Mar': 'MA', 'Mer': 'ME',
  'Jeu': 'JE', 'Ven': 'VE', 'Sam': 'SA', 'Dim': 'DI',
};

const TODAY_INDEX = new Date().getDay(); // 0=dim, 1=lun...
const TODAY_API: DayOfWeek[] = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const TODAY_DAY = TODAY_API[TODAY_INDEX];

function fmt(iso: string | null): string | null {
  const t = parseApiTime(iso);
  if (!t) return null;
  return t.replace(':', 'h').replace(/^(\d{2})h00$/, '$1h');
}

function formatHours(hour: ApiRestaurantDetail['openingHour'][number]): string {
  const open        = fmt(hour.lunchOpeningTime);
  const lunchClose  = fmt(hour.lunchClosingTime);
  const dinnerOpen  = fmt(hour.dinnerOpeningTime);
  const close       = fmt(hour.dinnerClosingTime);

  if (!open && !close) return 'Fermé';

  // Service continu : lunchClosingTime et dinnerOpeningTime sont null
  if (!lunchClose && !dinnerOpen) {
    return `${open} - ${close}`;
  }

  // Service avec pause : midi + soir
  const lunch  = open && lunchClose  ? `${open} - ${lunchClose}`   : null;
  const dinner = dinnerOpen && close ? `${dinnerOpen} - ${close}`  : null;

  return [lunch, dinner].filter(Boolean).join(' | ');
}

export default function RestaurantDetailPage({ lang, restaurant, partners = [] }: Props) {
  const { t } = useClientTranslation(lang);
  const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? '';
  const [avisExpanded, setAvisExpanded] = useState(false);
  const [menuExpanded, setMenuExpanded] = useState(false);
  const [avisTruncated, setAvisTruncated] = useState(false);
  const avisTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = avisTextRef.current;
    if (!el) return;
    const timer = setTimeout(() => {
      setAvisTruncated(el.scrollHeight > el.clientHeight + 2);
    }, 50);
    return () => clearTimeout(timer);
  }, [restaurant.avisGM]);

  const address = [restaurant.adresse, restaurant.city?.cityName].filter(Boolean).join(', ');

  const budget = restaurant.budgetMin != null && restaurant.budgetMax != null
    ? `${restaurant.budgetMin} – ${restaurant.budgetMax}`
    : undefined;

  const links = {
    phone:     restaurant.tel      ?? undefined,
    siteWeb:   restaurant.website  ?? undefined,
    instagram: restaurant.instagram ?? undefined,
  };

  const allImages = [
    restaurant.thumbId ? `${s3}/${restaurant.thumbId}` : null,
    ...restaurant.imagesSecondaire.map((img) => `${s3}/${img}`),
  ].filter(Boolean) as string[];

  const triptychImages = allImages.map((id) => ({ id }));

  const lat = restaurant.latitude  ? parseFloat(restaurant.latitude)  : undefined;
  const lng = restaurant.longitude ? parseFloat(restaurant.longitude) : undefined;

  const year = new Date(restaurant.createdAt ?? Date.now()).getFullYear();

  return (
    <div className={styles.restaurantDetailPage}>
      <div className={styles.container}>

        {/* Header */}
        <header>
          <HeaderPage title={restaurant.name} subTitle={address} reservationLink={restaurant.reservationLink}>
            <Toques
              nbToques={restaurant.nbrToques}
              isSponsorised={restaurant.isSponsorised}
              note={restaurant.noteGM ?? undefined}
              lang={lang}
            />
          </HeaderPage>
        </header>

        {/* Images */}
        {triptychImages.length === 1 && (
          <section className={styles.sectionTriptych}>
            <div className={styles.singleImage}>
              <SmartImage id={triptychImages[0].id} alt={restaurant.name} fit="cover" />
            </div>
          </section>
        )}
        {triptychImages.length > 1 && (
          <section className={styles.sectionTriptych}>
            <Triptych images={triptychImages} title={restaurant.name} />
          </section>
        )}

        {/* Row Details */}
        <section className={styles.sectionTriptych}>
          <RowDetails links={links} budget={budget} budgetDescription={t('common.budget_note')}>
            {restaurant.chef && (
              <div className="cardDetailHor">
                <span className="figmaCaption ellipsis">{t('common.chef')}</span>
                <span className="figmaCaptionValue ellipsis">{restaurant.chef.fullName}</span>
              </div>
            )}
            {restaurant.cuisines.length > 0 && (
              <div className="cardDetailHor">
                <span className="figmaCaption ellipsis">{t('common.cooking')}</span>
                <span className="figmaCaptionValue ellipsis outlined">{restaurant.cuisines.join(' | ')}</span>
              </div>
            )}
            {restaurant.services.length > 0 && (
              <div className="cardDetailHor">
                <span className="figmaCaption ellipsis">{t('common.services')}</span>
                <span className="figmaCaptionValue ellipsis">{restaurant.services.join(', ')}</span>
              </div>
            )}
            {restaurant.styles.length > 0 && (
              <div className="cardDetailHor">
                <span className="figmaCaption ellipsis">{t('common.styles')}</span>
                <span className="figmaCaptionValue ellipsis">{restaurant.styles.join(', ')}</span>
              </div>
            )}
          </RowDetails>
        </section>

        {/* ── 3-column cards ── */}
        <section className={styles.cardsRow}>

          {/* Avis GM */}
          {restaurant.avisGM && (
            <div className={avisExpanded ? styles.avisCardFull : styles.avisCard}>
              <div className={styles.avisHeader}>
                <span className={styles.avisIcon}><GmIcon width={40} height={40} /></span>
                <div>
                  <p className={styles.avisTitle}>L'avis de Gault&Millau</p>
                  <p className={styles.avisYear}>{year}</p>
                </div>
              </div>
              <p ref={avisTextRef} className={`${styles.avisText} ${avisExpanded ? styles.avisTextExpanded : ''}`}>
                {restaurant.avisGM}
              </p>
              {avisTruncated && (
                <button className={styles.CardButtonLink} onClick={() => setAvisExpanded((v) => !v)}>
                  <span className={styles.CardButtonLinkText}>{avisExpanded ? 'LIRE MOINS' : 'LIRE PLUS'}</span>
                </button>
              )}
            </div>
          )}

          {/* Plan */}
          {lat != null && lng != null && (
            <div className={styles.mapWrapper}>
              <MapCard address={address} latitude={lat} longitude={lng} mapsIframe={restaurant.mapsIframe} />
            </div>
          )}

          {/* Horaires */}
          {restaurant.openingHour.length > 0 && (
            <div className={styles.hoursCard}>
              <div className={styles.hoursHeader}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span className={styles.hoursTitle}>Horaires</span>
              </div>
              <ul className={styles.hoursList}>
                {restaurant.openingHour.map((h) => (
                  <li
                    key={h.dayOfWeek}
                    className={`${styles.hoursRow} ${h.dayOfWeek === TODAY_DAY ? styles.hoursRowActive : ''}`}
                  >
                    <span className={styles.hoursDay}>{DAY_MAP[h.dayOfWeek]}</span>
                    <span className={styles.hoursTime}>{formatHours(h)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </section>

        {/* ── Peoples + Menu ── */}
        {(restaurant.chef || restaurant.employes.length > 0 || restaurant.menuItems.length > 0) && (
          <section className={styles.bottomRow}>

            {/* Peoples */}
            {!menuExpanded && (restaurant.chef || restaurant.employes.length > 0) && (
              <div className={styles.peoplesCard}>
                <div className={styles.peoplesHeader}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  LES PEOPLES
                </div>

                {/* Chef */}
                {restaurant.chef && (
                  <div className={styles.personRow}>
                    <div className={styles.personThumb}>
                      {restaurant.chef.thumbId
                        ? <SmartImage id={`${s3}/${restaurant.chef.thumbId}`} alt={restaurant.chef.fullName} fit="cover" />
                        : <div className={styles.personThumbDefault}><ToqueIcon width={32} height={32} aria-hidden="true" /></div>
                      }
                    </div>
                    <div>
                      <p className={styles.personName}>{restaurant.chef.fullName}</p>
                      <p className={styles.personRole}>Chef</p>
                    </div>
                  </div>
                )}

                {/* Employés */}
                {restaurant.employes.map((emp) => (
                  <div key={emp.slug} className={styles.personRow}>
                    <div className={styles.personThumb}>
                      {emp.thumbId
                        ? <SmartImage id={`${s3}/${emp.thumbId}`} alt={emp.fullName} fit="cover" />
                        : <div className={styles.personThumbDefault}><ToqueIcon width={32} height={32} aria-hidden="true" /></div>
                      }
                    </div>
                    <div>
                      <p className={styles.personName}>{emp.fullName}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Menu */}
            {restaurant.menuItems.length > 0 && (() => {
              const FORMULE_TYPE = 'formule';
              const carteItems   = restaurant.menuItems.filter(m => m.type !== FORMULE_TYPE);
              const formuleItems = restaurant.menuItems.filter(m => m.type === FORMULE_TYPE);

              // Regrouper les items "carte" par type
              const carteGroups = carteItems.reduce<Record<string, typeof restaurant.menuItems>>((acc, item) => {
                (acc[item.type] ??= []).push(item);
                return acc;
              }, {});

              const menuIcon = <svg xmlns="http://www.w3.org/2000/svg" width="21" height="35" viewBox="0 0 21 35" fill="none" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M20.459 34.8662H20.458H0V5.55859L13.6123 0V5.55859H20.459V34.8652L20.459 34.8662ZM12.8633 11.813C12.626 11.813 12.3731 11.9839 12.3731 12.2998V18.1597V20.2036V21.8521V26.9942V29.042C12.3731 29.4375 12.6953 29.7593 13.0908 29.7593C13.4863 29.7593 13.8076 29.4375 13.8076 29.042V26.9942V22.2652C14.4736 22.1177 14.9531 21.7515 15.2344 21.1763C16.2735 19.0615 14.4668 14.5777 13.2969 12.0933C13.2149 11.9175 13.0528 11.813 12.8633 11.813L12.8633 11.813ZM5.43849 11.8135C5.14943 11.8135 4.91408 12.0488 4.91408 12.3384V16.71V16.791V16.98C4.91408 18.126 5.68166 19.1474 6.78029 19.4648V29.042C6.78029 29.4375 7.10158 29.7593 7.49709 29.7593C7.8926 29.7593 8.21486 29.4375 8.21486 29.042V19.4648C9.31252 19.1474 10.0801 18.126 10.0801 16.98V16.791V16.71V12.3384C10.0801 12.0488 9.84572 11.8135 9.55568 11.8135C9.26662 11.8135 9.03029 12.0488 9.03029 12.3384V15.8984V16.2866C9.03029 16.5649 8.8047 16.791 8.52638 16.791C8.24806 16.791 8.02247 16.5649 8.02247 16.2866V15.8984V12.3384C8.02247 12.0488 7.78614 11.8135 7.49708 11.8135C7.20704 11.8135 6.97267 12.0488 6.97267 12.3384V15.8984V16.2866C6.97267 16.5649 6.74611 16.791 6.46779 16.791C6.19142 16.791 5.96779 16.5649 5.96779 16.2866V15.8984V12.3384C5.96779 12.0488 5.73049 11.8135 5.43849 11.8135Z" fill="black"/></svg>;

              return (
                <div className={menuExpanded ? styles.menuCardFull : styles.menuCard}>
                  <div className={styles.menuHeader}>
                    {menuIcon}
                    <p className={styles.menuHeaderTitle}>MENU</p>
                  </div>
                  <div className={`${styles.menuBody} ${menuExpanded ? styles.menuBodyExpanded : ''}`}>

                    {/* ── A LA CARTE ── */}
                    {carteItems.length > 0 && (
                      <div className={styles.menuSection}>
                        <p className={styles.menuSectionLabel}>A LA CARTE</p>
                        <div className={styles.menuCarteGrid}>
                          {Object.entries(carteGroups).map(([type, items]) => (
                            <div key={type} className={styles.menuTypeCol}>
                              <p className={styles.menuTypeTitle}>{type.toUpperCase()}</p>
                              {items.map((item, i) => (
                                <div key={i} className={styles.menuItem}>
                                  {i > 0 && <span className={styles.menuDot}>•</span>}
                                  <p className={styles.menuItemName}>{item.formuleName}</p>
                                  <p className={styles.menuItemPrice}>{parseFloat(item.price).toFixed(0)} €</p>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ── FORMULES ── */}
                    {formuleItems.length > 0 && (
                      <div className={styles.menuSection}>
                        <p className={styles.menuSectionLabel}>FORMULES</p>
                        <div className={styles.menuFormuleList}>
                          {formuleItems.map((item, i) => (
                            <div key={i} className={styles.menuItem}>
                              {i > 0 && <span className={styles.menuDot}>•</span>}
                              <p className={styles.menuItemName}>{item.formuleName}</p>
                              <p className={styles.menuItemPrice}>{parseFloat(item.price).toFixed(0)} €</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                  <button className={styles.CardButtonLink} onClick={() => setMenuExpanded((v) => !v)}>
                    <span className={styles.CardButtonLinkText}>{menuExpanded ? 'LIRE MOINS' : 'LIRE LA SUITE...'}</span>
                  </button>
                </div>
              );
            })()}

            {/* Pub */}
            {!menuExpanded && (
              <div className={styles.pubCard}>
                <PubCard items={[]} />
              </div>
            )}

          </section>
        )}

        <PartenairesSection partners={partners} />

      </div>
    </div>
  )
}

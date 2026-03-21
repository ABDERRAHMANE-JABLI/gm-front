'use client'

import React from 'react'
import styles from './styles.module.css'
import Triptych from '@/components/Details/Triptych'
import { RestaurantData } from '@/FakeData'
import HeaderPage from '@/components/Details/HeaderPage'
import Toques from '@/components/cards/common/Toques'
import RowDetails from '@/components/Details/RowDetails'
import { useClientTranslation } from '@/lib/i18n/client'
import MapCard from '@/components/Details/Cards/MapCard'

type Language = 'fr' | 'en';

interface Props {
  lang: Language
  slug: string
}

export default function RestaurantDetailPage({ lang }: Props) {

  const { t } = useClientTranslation(lang);
  const links={phone: "+33123456789", siteWeb: "https://gaultmillau.fr", mail: "contact@gaultmillau.fr", facebook: "https://facebook.com/gaultmillau", instagram: "https://instagram.com/gaultmillau"};
  
  return (
    <div className={styles.restaurantDetailPage}>
      <div className={styles.container}>

        {/* Restaurant Header */}
        <header>
          <HeaderPage title={RestaurantData[0].title} subTitle={RestaurantData[0].address || ''}>
            <Toques nbToques={RestaurantData[0].nbToques} note={RestaurantData[0].note} description={RestaurantData[0].noteDescription} />
          </HeaderPage>
        </header>
        {/* Restaurant Triptych */}
        <section className={styles.sectionTriptych}>
          <Triptych images={RestaurantData[0].carousel || []} title={RestaurantData[0].title} />
        </section>

        {/* Restaurant ROW Details */}
        <section className={styles.sectionTriptych}>
          <RowDetails links={links} budget={RestaurantData[0].budget} budgetDescription="Budget à titre indicatif par personne (hors boissons)">
                  {RestaurantData[0].chief && (
                        <div className="cardDetailHor">
                            <span className="figmaCaption ellipsis">{t("common.chef")}</span>
                            <span className="figmaCaptionValue ellipsis" title={RestaurantData[0].chief}>{RestaurantData[0].chief}</span>
                        </div>
                    )}
                    {!!RestaurantData[0].cuisines?.length && (
                        <div className="cardDetailHor">
                            <span className="figmaCaption ellipsis">{t("common.cooking")}</span>
                            <span className="figmaCaptionValue ellipsis outlined">{RestaurantData[0].cuisines.join(" | ")}</span>
                        </div>
                    )}
                    {RestaurantData[0].budget && (
                        <div className="cardDetailHor">
                            <span className="figmaCaption ellipsis">{t("common.budget")}</span>
                            <span className="figmaCaptionValue ellipsis">{RestaurantData[0].budget}</span>
                        </div>
                    )}
          </RowDetails>
        </section>


        {/* Restaurant Content */}
        <main className={styles.restaurantContent}>
          <div className={styles.mainContent}>
            {/* Description Section */}
            <section className={styles.section}>
              <div className={styles.description}>
                    <MapCard address={RestaurantData[0].address} latitude={RestaurantData[0].geo?.lat} longitude={RestaurantData[0].geo?.lng}/>
              </div>
            </section>

            {/* Menu Section */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{t('menu')}</h2>
              <div className={styles.menu}>
                <p>Menu et carte à venir...</p>
              </div>
            </section>

            {/* Photos Section */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{t('photos')}</h2>
              <div className={styles.photos}>
                <p>Galerie photos à venir...</p>
              </div>
            </section>

            {/* Reviews Section */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{t('reviews')}</h2>
              <div className={styles.reviews}>
                <p>Avis et critiques à venir...</p>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            {/* Contact Info */}
            <div className={styles.infoCard}>
              <h3 className={styles.cardTitle}>Informations pratiques</h3>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>{t('address')}</span>
                <span className={styles.infoValue}>Adresse à définir</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>{t('phone')}</span>
                <span className={styles.infoValue}>Téléphone à définir</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>{t('website')}</span>
                <span className={styles.infoValue}>Site web à définir</span>
              </div>
            </div>

            {/* Opening Hours */}
            <div className={styles.infoCard}>
              <h3 className={styles.cardTitle}>{t('hours')}</h3>
              <div className={styles.hours}>
                <p>Horaires à définir</p>
              </div>
            </div>

            {/* Services */}
            <div className={styles.infoCard}>
              <h3 className={styles.cardTitle}>{t('services')}</h3>
              <div className={styles.services}>
                <p>Services à définir</p>
              </div>
            </div>
          </aside>
        </main>

        {/* Loading State */}
        <div className={styles.loadingState}>
          <div className={styles.loadingIcon}>🍽️</div>
          <h3 className={styles.loadingTitle}>{t('loadingTitle')}</h3>
          <p className={styles.loadingText}>{t('loadingText')}</p>
        </div>
      </div>
    </div>
  )
}

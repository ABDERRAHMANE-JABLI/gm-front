'use client'

import React from 'react'
import styles from './styles.module.css'

interface Language {
  fr: string
  en: string
}

interface Props {
  lang: 'fr' | 'en'
  slug: string
}

const content: Record<string, Language> = {
  backToRestaurants: {
    fr: '← Retour aux restaurants',
    en: '← Back to restaurants'
  },
  rating: {
    fr: 'Note Gault&Millau',
    en: 'Gault&Millau Rating'
  },
  cuisine: {
    fr: 'Type de cuisine',
    en: 'Cuisine type'
  },
  price: {
    fr: 'Gamme de prix',
    en: 'Price range'
  },
  address: {
    fr: 'Adresse',
    en: 'Address'
  },
  phone: {
    fr: 'Téléphone',
    en: 'Phone'
  },
  website: {
    fr: 'Site web',
    en: 'Website'
  },
  hours: {
    fr: 'Horaires',
    en: 'Opening hours'
  },
  services: {
    fr: 'Services',
    en: 'Services'
  },
  description: {
    fr: 'Description',
    en: 'Description'
  },
  menu: {
    fr: 'Menu',
    en: 'Menu'
  },
  photos: {
    fr: 'Photos',
    en: 'Photos'
  },
  reviews: {
    fr: 'Avis',
    en: 'Reviews'
  },
  booking: {
    fr: 'Réserver',
    en: 'Book'
  },
  share: {
    fr: 'Partager',
    en: 'Share'
  },
  favorite: {
    fr: 'Ajouter aux favoris',
    en: 'Add to favorites'
  },
  loadingTitle: {
    fr: 'Chargement du restaurant...',
    en: 'Loading restaurant...'
  },
  loadingText: {
    fr: 'Nous récupérons les informations de ce restaurant pour vous.',
    en: 'We are retrieving information about this restaurant for you.'
  }
}

export default function RestaurantDetailPage({ lang, slug }: Props) {
  const t = (key: string) => content[key]?.[lang] || content[key]?.fr || ''
  
  // Convert slug to display name
  const restaurantName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

  return (
    <div className={styles.restaurantDetailPage}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <a href={`/${lang}/restaurants`} className={styles.breadcrumbLink}>
            {t('backToRestaurants')}
          </a>
        </nav>

        {/* Restaurant Header */}
        <header className={styles.restaurantHeader}>
          <div className={styles.headerContent}>
            <h1 className={styles.restaurantName}>{restaurantName}</h1>
            <div className={styles.restaurantMeta}>
              <div className={styles.rating}>
                <span className={styles.ratingLabel}>{t('rating')}</span>
                <span className={styles.ratingValue}>--/20</span>
              </div>
              <div className={styles.cuisine}>
                <span className={styles.cuisineLabel}>{t('cuisine')}</span>
                <span className={styles.cuisineValue}>Cuisine française</span>
              </div>
              <div className={styles.price}>
                <span className={styles.priceLabel}>{t('price')}</span>
                <span className={styles.priceValue}>€€€</span>
              </div>
            </div>
          </div>
          <div className={styles.actions}>
            <button className={styles.bookingButton}>{t('booking')}</button>
            <button className={styles.favoriteButton}>{t('favorite')}</button>
            <button className={styles.shareButton}>{t('share')}</button>
          </div>
        </header>

        {/* Restaurant Content */}
        <main className={styles.restaurantContent}>
          <div className={styles.mainContent}>
            {/* Description Section */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{t('description')}</h2>
              <div className={styles.description}>
                <p>Informations détaillées sur le restaurant à venir...</p>
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

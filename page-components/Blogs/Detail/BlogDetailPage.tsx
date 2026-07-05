import React from 'react'
import styles from './blogDetail.module.css'
import { sanitizeHtml } from '@/lib/utils/sanitizeHtml'
import { SmartImage } from '@/components/SmartImage'
import { ApiArticleDetail } from '@/types/api/Article'
import { ApiPartner } from '@/types/api/Partner'
import { Language } from '@/lib/types'
import { getTranslation } from '@/lib/i18n'
import PartenairesSection from '@/components/cards/partners'
import ShareButton from '@/components/ShareButton'
import RestaurantCard from '@/components/cards/restaurantCard'
import PeopleCard from '@/components/cards/peopleCard'
import HotelCard from '@/components/cards/hotelCard'
import ArtisanCard from '@/components/cards/artisanCard'

export interface BlogDetailPageProps {
  lang: Language;
  article: ApiArticleDetail;
  partners?: ApiPartner[];
}

export default function BlogDetailPage({ lang, article, partners = [] }: BlogDetailPageProps) {
  const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? ''
  const imageUrl = article.thumbId ? `${s3}/${article.thumbId}` : null

  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString(
      lang === 'fr' ? 'fr-FR' : 'en-GB',
      { day: 'numeric', month: 'long', year: 'numeric' }
    )

  const formattedCreated = formatDate(article.createdAt)
  const formattedUpdated = article.updatedAt ? formatDate(article.updatedAt) : null
  const showUpdated = formattedUpdated !== null && formattedUpdated !== formattedCreated

  const hasRelated = article.talent || article.restaurant || article.hotel || article.riyad || article.artisan

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* ── Title ── */}
        <h1 className={styles.pageTitle}>{article.title}</h1>

        {/* ── Hero image ── */}
        {imageUrl && (
          <div className={styles.heroImage}>
            <SmartImage id={imageUrl} alt={article.title} fit="cover" width={1000} height={480} />
          </div>
        )}

        <div className={styles.meta}>
          {article.theme && <span className={styles.theme}>{article.theme}</span>}
          <span className={styles.date}>
            {getTranslation('common.published_on', lang)} {formattedCreated}
            {showUpdated && ` | ${getTranslation('common.updated_on', lang)} ${formattedUpdated}`}
          </span>
          <ShareButton title={article.title} text={article.resume} />
        </div>

        {/* ── Resume + contenu (même cadre / ombre latérale) ── */}
        {(article.resume || article.content) && (
          <div className={styles.body}>
            {article.resume && <p className={styles.resume}>{article.resume}</p>}
            {article.content && (
              <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.content) }}
              />
            )}
          </div>
        )}

        {/* ── Related entities ── */}
        {hasRelated && (
          <div className={styles.relatedSection}>
            <div className={styles.relatedHeader}>
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 64 64" aria-hidden="true">
                <rect width="64" height="64" rx="18" fill="#FF7B08"/>
                <g fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 26 H48"/>
                  <path d="M40 18 L48 26"/>
                  <path d="M48 38 H16"/>
                  <path d="M24 46 L16 38"/>
                </g>
              </svg>
              <p className={styles.relatedTitle}>En relation avec cet article</p>
            </div>
            <div className={styles.relatedGrid}>

              {article.talent && (
                <PeopleCard
                  lang={lang}
                  People={{
                    title:       article.talent.fullName,
                    slug:        article.talent.slug,
                    thumbId:     article.talent.thumbId ? `${s3}/${article.talent.thumbId}` : undefined,
                    nbToques:    article.talent.nbrToques ?? undefined,
                    note:        article.talent.noteGM != null ? String(article.talent.noteGM) : undefined,
                    roles:       article.talent.roles ?? [],
                    distinction: article.talent.awards ?? [],
                    chefAt:      [],
                  }}
                  withHeader={true}
                />
              )}

              {article.restaurant && (
                <RestaurantCard
                  lang={lang}
                  restaurant={{
                    title:         article.restaurant.name,
                    slug:          article.restaurant.slug,
                    thumbId:       article.restaurant.thumbId ? `${s3}/${article.restaurant.thumbId}` : undefined,
                    nbToques:      article.restaurant.nbrToques,
                    isSponsorised: article.restaurant.isSponsorised,
                    note:          article.restaurant.noteGM != null ? String(article.restaurant.noteGM) : undefined,
                    cuisines:      article.restaurant.cuisines,
                    chef:         article.restaurant.chef,
                    budget:        article.restaurant.budgetMin != null && article.restaurant.budgetMax != null
                                     ? `${article.restaurant.budgetMin} – ${article.restaurant.budgetMax} MAD`
                                     : article.restaurant.budgetMin != null
                                       ? `${article.restaurant.budgetMin} MAD`
                                       : undefined,
                  }}
                  withHeader={true}
                />
              )}

              {article.hotel && (
                <HotelCard
                  lang={lang}
                  Hotel={{
                    title:              article.hotel.name,
                    slug:               article.hotel.slug,
                    thumbId:            article.hotel.thumbId ? `${s3}/${article.hotel.thumbId}` : undefined,
                    isGmSelected:       !(article.hotel.isSponsorised ?? false),
                    isSponsorised:      article.hotel.isSponsorised ?? false,
                    nbStars:            article.hotel.nbrStars ?? 0,
                    restaurantNbtoques: article.hotel.nbrToques ?? undefined,
                    address:            article.hotel.lieu,
                    budget:             article.hotel.budgetMin != null ? `${article.hotel.budgetMin} MAD` : undefined,
                    services:           article.hotel.services ?? [],
                  }}
                  withHeader={true}
                />
              )}

              {article.riyad && (
                <HotelCard
                  lang={lang}
                  headerTitle="Riad"
                  Hotel={{
                    title:              article.riyad.name,
                    slug:               article.riyad.slug,
                    thumbId:            article.riyad.thumbId ? `${s3}/${article.riyad.thumbId}` : undefined,
                    isGmSelected:       !(article.riyad.isSponsorised ?? false),
                    isSponsorised:      article.riyad.isSponsorised ?? false,
                    nbStars:            article.riyad.nbrStars ?? 0,
                    restaurantNbtoques: article.riyad.nbrToques ?? undefined,
                    address:            article.riyad.lieu,
                    budget:             article.riyad.budgetMin != null ? `${article.riyad.budgetMin} MAD` : undefined,
                    services:           article.riyad.services ?? [],
                  }}
                  withHeader={true}
                />
              )}

              {article.artisan && (
                <ArtisanCard
                  lang={lang}
                  Artisan={{
                    title:           article.artisan.title,
                    slug:            article.artisan.slug,
                    thumbId:         article.artisan.thumbId ? `${s3}/${article.artisan.thumbId}` : undefined,
                    isGmSelected:    article.artisan.isSelected ?? !(article.artisan.isSponsorised ?? false),
                    primaryActivity: article.artisan.mainActivity?.libelle ?? '',
                    otherActivities: article.artisan.otherActivities ?? [],
                    address:         article.artisan.lieu,
                    services:        article.artisan.services ?? [],
                  }}
                  withHeader={true}
                />
              )}

            </div>
          </div>
        )}

      </div>

      <PartenairesSection partners={partners} />
    </div>
  )
}

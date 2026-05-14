import React from 'react'
import styles from './recipeDetail.module.css'
import { SmartImage } from '@/components/SmartImage'
import { ApiRecipeDetail } from '@/types/api/Recipe'
import { ApiPartner } from '@/types/api/Partner'
import { Language } from '@/lib/types'
import PartenairesSection from '@/components/cards/partners'
import ShareButton from '@/components/ShareButton'
import RestaurantCard from '@/components/cards/restaurantCard'
import PeopleCard from '@/components/cards/peopleCard'

export interface RecipeDetailPageProps {
  lang: Language;
  recipe: ApiRecipeDetail;
  partners?: ApiPartner[];
}

export default function RecipeDetailPage({ lang, recipe, partners = [] }: RecipeDetailPageProps) {
  const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? ''
  const imageUrl = recipe.thumbId ? `${s3}/${recipe.thumbId}` : null
  const hasRelated = recipe.chef || recipe.restaurant

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* ── Title ── */}
        <h1 className={styles.title}>{recipe.title}</h1>

        {/* ── Hero image ── */}
        {imageUrl && (
          <div className={styles.heroImage}>
            <SmartImage id={imageUrl} alt={recipe.title} fit="cover" width={1000} height={480} />
          </div>
        )}

        {/* ── Meta ── */}
        <div className={styles.meta}>
          {recipe.typeRecipe && <span className={styles.badge}>{recipe.typeRecipe}</span>}
          {recipe.difficulty && <span className={styles.badgeDifficulty}>{recipe.difficulty}</span>}
          <ShareButton title={recipe.title} text={recipe.resume ?? undefined} />
        </div>

        {/* ── Resume ── */}
        {recipe.resume && <p className={styles.resume}>{recipe.resume}</p>}

        {/* ── Content HTML ── */}
        {recipe.content && (
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: recipe.content }}
          />
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
              <p className={styles.relatedTitle}>En relation avec cette recette</p>
            </div>
            <div className={styles.relatedGrid}>

              {recipe.chef && (
                <PeopleCard
                  lang={lang}
                  People={{
                    title:       recipe.chef.fullName,
                    slug:        recipe.chef.slug,
                    thumbId:     recipe.chef.thumbId ? `${s3}/${recipe.chef.thumbId}` : undefined,
                    nbToques:    recipe.chef.nbrToques ?? undefined,
                    note:        recipe.chef.noteGM != null ? String(recipe.chef.noteGM) : undefined,
                    roles:       recipe.chef.roles ?? [],
                    distinction: recipe.chef.awards ?? [],
                    chefAt:      [],
                  }}
                  withHeader
                />
              )}

              {recipe.restaurant && (
                <RestaurantCard
                  lang={lang}
                  restaurant={{
                    title:         recipe.restaurant.name,
                    slug:          recipe.restaurant.slug,
                    thumbId:       recipe.restaurant.thumbId ? `${s3}/${recipe.restaurant.thumbId}` : undefined,
                    nbToques:      recipe.restaurant.nbrToques,
                    isSponsorised: recipe.restaurant.isSponsorised,
                    note:          recipe.restaurant.noteGM != null ? String(recipe.restaurant.noteGM) : undefined,
                    cuisines:      recipe.restaurant.cuisines,
                    chief:         recipe.restaurant.chef,
                    budget:        recipe.restaurant.budgetMin != null && recipe.restaurant.budgetMax != null
                                     ? `${recipe.restaurant.budgetMin} – ${recipe.restaurant.budgetMax} MAD`
                                     : recipe.restaurant.budgetMin != null
                                       ? `${recipe.restaurant.budgetMin} MAD`
                                       : undefined,
                  }}
                  withHeader
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

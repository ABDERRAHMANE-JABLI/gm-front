'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ApiPartner } from '@/types/api/Partner'
import { Language } from '@/lib/i18n/client'
import styles from './styles.module.css'

const CATEGORIES = [
  { key: 'all', label: 'Tous' },
  { key: 'P', label: 'Platinum' },
  { key: 'G', label: 'Gold' },
  { key: 'S', label: 'Silver' },
  { key: 'B', label: 'Bronze' },
] as const

type CatKey = typeof CATEGORIES[number]['key']

interface Props {
  lang: Language
  partners: ApiPartner[]
}

const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? ''

const INTRO = {
  fr: [
    "Produit de bouche, équipement de cuisine, art de la table, solution de service... Retrouvez la liste complète des partenaires qui font confiance à Gault&Millau.",
    "Qu'ils souhaitent promouvoir leurs produits et services en région lors du Gault&Millau Tour, ou qu'ils soutiennent de jeunes chefs dans l'ouverture de leur premier établissement grâce à la Dotation Jeunes Talents, leur but est commun : célébrer ensemble la gastronomie Marocaine et récompenser les talents sur tout le territoire.",
  ],
  en: [
    "Food products, kitchen equipment, table arts, service solutions... Find the complete list of partners who trust Gault&Millau.",
    "Whether they wish to promote their products and services at the regional Gault&Millau Tour, or support young chefs in opening their first establishment through the Jeunes Talents Grant, their goal is shared: to celebrate Moroccan gastronomy together and reward talent across the country.",
  ],
}

const PAGE_SIZE = 9

export default function PartnersPage({ lang, partners }: Props) {
  const available = CATEGORIES.filter((c) =>
    c.key === 'all' || partners.some((p) => p.categorie === c.key)
  )

  const [active, setActive] = useState<CatKey>('all')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const filtered = active === 'all' ? partners : partners.filter((p) => p.categorie === active)
  const displayed = filtered.slice(0, visible)
  const hasMore = visible < filtered.length

  function handleTabChange(key: CatKey) {
    setActive(key)
    setVisible(PAGE_SIZE)
  }

  const title = lang === 'en' ? 'Our partners' : 'Nos partenaires'
  const seeMore = lang === 'en' ? 'See more' : 'Voir plus'

  return (
    <div className={styles.page}>
      <div className={styles.bgLayer} aria-hidden="true" />
      <div className={styles.container}>

        <h1 className={styles.title}>{title}</h1>

        <div className={styles.intro}>
          {INTRO[lang].map((para, i) => (
            <p key={i} className={styles.introPara}>{para}</p>
          ))}
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {available.map((c) => (
            <button
              key={c.key}
              className={`${styles.tab} ${active === c.key ? styles.tabActive : ''}`}
              onClick={() => handleTabChange(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Section title */}
        {active !== 'all' && (
          <h2 className={styles.sectionTitle}>
            {CATEGORIES.find((c) => c.key === active)?.label}
          </h2>
        )}

        {/* Grid */}
        <div className={styles.grid}>
          {displayed.map((partner) => (
            <a
              key={partner.name}
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
            >
              <div className={styles.imgWrapper}>
                <Image
                  src={`${s3}/${partner.thumbId}`}
                  alt={partner.name}
                  fill
                  className={styles.img}
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
                />
              </div>
              <p className={styles.name}>{partner.name}</p>
            </a>
          ))}
        </div>

        {/* Voir plus */}
        {hasMore && (
          <div className={styles.loadMore}>
            <button
              className={styles.loadMoreBtn}
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
            >
              {seeMore}
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

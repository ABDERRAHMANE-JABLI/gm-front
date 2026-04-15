'use client'

import Link from 'next/link'
import styles from './pubCard.module.css'

export interface PubItem {
  imageUrl: string
  linkUrl:  string
  alt?:     string
}

interface Props {
  items: PubItem[]
}

export default function PubCard({ items }: Props) {
  if (!items.length) return null

  return (
    <div className={styles.pubCard}>
      {items.map((item, i) => (
        <Link
          key={i}
          href={item.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.pubItem}
          aria-label={item.alt ?? 'Publicité'}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.imageUrl}
            alt={item.alt ?? ''}
            className={styles.pubImage}
          />
        </Link>
      ))}
    </div>
  )
}

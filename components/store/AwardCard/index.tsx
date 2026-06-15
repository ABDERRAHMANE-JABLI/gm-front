'use client';
import { useState } from 'react';
import styles from './AwardCard.module.css';
import { Award } from '@/types/Store';

interface Props {
  award: Award;
  onAdd: (award: Award) => void;
}

export default function AwardCard({ award, onAdd }: Props) {
  const [added, setAdded] = useState(false);

  function handleAdd(e: React.MouseEvent) {
    e.stopPropagation();
    onAdd(award);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {award.thumbUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={award.thumbUrl} alt={award.title} />
        ) : (
          <div className={styles.placeholder}>
            <svg className={styles.placeholderIcon} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1C1917" strokeWidth="0.8">
              <circle cx="12" cy="8" r="6"/>
              <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
            </svg>
            <span className={styles.placeholderLabel}>Award</span>
          </div>
        )}

        <div className={styles.overlay}>
          <button
            className={`${styles.cartBtn} ${added ? styles.added : ''}`}
            onClick={handleAdd}
            aria-label={added ? 'Ajouté au panier' : 'Ajouter au panier'}
          >
            <span className={styles.cartBtnLabel}>
              {added ? (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  Ajouté
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 01-8 0"/>
                  </svg>
                  Ajouter
                </>
              )}
            </span>
          </button>
        </div>
      </div>

      <div className={styles.info}>
        <p className={styles.title}>{award.title}</p>
        <p className={styles.price}>{award.price.toLocaleString('fr-FR')} MAD</p>
      </div>
    </div>
  );
}

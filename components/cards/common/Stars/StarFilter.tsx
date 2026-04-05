"use client";

import styles from './StarFilter.module.css';

interface StarFilterProps {
  stars: number[];        // valeurs disponibles depuis l'API (ex: [0, 3, 4, 5])
  selected: number[];     // valeurs actives
  onToggle: (star: number) => void;
}

export default function StarFilter({ stars, selected, onToggle }: StarFilterProps) {
  return (
    <ul className={styles.list}>
      {stars.map((star) => {
        const isActive = selected.includes(star);

        return (
          <li key={star}>
            <button
              className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
              onClick={() => onToggle(star)}
              aria-pressed={isActive}
            >
              {star === -1 ? (
                <span className={styles.selectedLabel}>Sélectionné</span>
              ) : (
                <span className={styles.starIcon}>{'★'.repeat(star)}</span>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

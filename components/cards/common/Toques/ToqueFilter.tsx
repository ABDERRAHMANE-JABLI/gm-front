"use client";

import styles from './ToqueFilter.module.css';
import ToqueSvg from '@/public/icons/toque.svg';

interface ToqueFilterProps {
  toques: number[];           // valeurs disponibles depuis l'API
  selected: number[];         // valeurs actives
  onToggle: (toque: number) => void;
}

function ToqueRow({ count, isGold }: { count: number; isGold: boolean }) {
  return (
    <span className={styles.toqueRow}>
      {Array.from({ length: count }).map((_, i) => (
        <ToqueSvg
          key={i}
          className={`${styles.toqueIcon} ${isGold ? styles.toqueGold : ''}`}
          width={13}
          height={19}
        />
      ))}
    </span>
  );
}

export default function ToqueFilter({ toques, selected, onToggle }: ToqueFilterProps) {
  return (
    <ul className={styles.list}>
      {toques.map((toque) => {
        const isActive = selected.includes(toque);
        const isGold = toque === 6;

        return (
          <li key={toque}>
            <button
              className={`${isGold ? styles.itemGold : styles.item} ${isActive ? styles.itemActive : ''}`}
              onClick={() => onToggle(toque)}
              aria-pressed={isActive}
            >
              {toque === 0 ? (
                <span className={styles.selectedLabel}>Sélectionné</span>
              ) : toque === 6 ? (
                <ToqueRow count={5} isGold={true} />
              ) : (
                <ToqueRow count={toque} isGold={false} />
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

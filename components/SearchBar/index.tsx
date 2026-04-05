'use client';

import styles from './SearchBar.module.css';
import SearchIcon from '@/public/icons/search.svg';

export type SearchBarType = 'actualite' | 'hotel' | 'riyad' | 'talent' | 'restaurant' | 'artisan' | 'recette';

interface Config {
  label:       string;
  placeholder: string;
}

const CONFIG: Record<SearchBarType, Config> = {
  actualite:  { label: 'Actualités',  placeholder: 'Rechercher une actualité, un événement, un sujet...' },
  hotel:      { label: 'Hôtels',      placeholder: 'Rechercher un hôtel...' },
  riyad:      { label: 'Riyads',      placeholder: 'Rechercher un riyad...' },
  talent:     { label: 'Talents',     placeholder: 'Rechercher un chef, un talent...' },
  restaurant: { label: 'Restaurants', placeholder: 'Rechercher un restaurant...' },
  artisan:    { label: 'Artisans',    placeholder: 'Rechercher un artisan...' },
  recette:    { label: 'Recettes',    placeholder: 'Rechercher une recette, un chef...' },
};

interface SearchBarProps {
  type:     SearchBarType;
  value:    string;
  onChange: (value: string) => void;
}

export default function SearchBar({ type, value, onChange }: SearchBarProps) {
  const { label, placeholder } = CONFIG[type];

  return (
    <div className={styles.bar}>
      <SearchIcon className={styles.searchIcon} />
      <div className={styles.searchText}>
        <span className={styles.searchLabel}>{label}</span>
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={styles.searchInput}
        />
      </div>
    </div>
  );
}

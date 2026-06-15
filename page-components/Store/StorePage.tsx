'use client';

import { useState } from 'react';
import styles from './styles.module.css';
import AwardCard from '@/components/store/AwardCard';
import { useCartContext } from '@/lib/context/CartContext';
import { Award, AwardCategory, AwardSubcategory } from '@/types/Store';

const S3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? '';

const AWARDS: Award[] = [
  {
    id: 'artisan-1',
    title: 'Artisan Sélectionné',
    ref: 'Pas123422EFI3F',
    price: 3000,
    category: 'plaques',
    subcategory: 'artisan',
    thumbUrl: `${S3}/plaques/6a30034270d1b.png`,
  },
  {
    id: 'domaine-1',
    title: 'Domaine Sélectionné',
    price: 3000,
    category: 'plaques',
    subcategory: 'domaine',
    thumbUrl: `${S3}/plaques/6a3003ee37c7a.png`,
  },
  {
    id: 'hotel-1',
    title: 'Hôtel Sélectionné',
    price: 3000,
    category: 'plaques',
    subcategory: 'hotel',
    thumbUrl: `${S3}/plaques/6a300442c6baa.png`,
  },
  {
    id: 'riyad-1',
    title: 'Riad Sélectionné',
    price: 3000,
    category: 'plaques',
    subcategory: 'riyad',
    thumbUrl: `${S3}/plaques/6a300484d007d.png`,
  },
  {
    id: 'table-gourmande-1',
    title: 'Table Gourmande',
    price: 3000,
    category: 'plaques',
    subcategory: 'table-gourmande',
    thumbUrl: `${S3}/plaques/6a30073ee97ba.png`,
  },
  {
    id: 'table-chef-1',
    title: 'Table De Chef',
    price: 3000,
    category: 'plaques',
    subcategory: 'table-chef',
    thumbUrl: `${S3}/plaques/6a3004bb04ea6.png`,
  },
  {
    id: 'remarquable-1',
    title: 'Table Remarquable',
    price: 3000,
    category: 'plaques',
    subcategory: 'remarquable',
    thumbUrl: `${S3}/plaques/6a30079a9c4e9.png`,
  },
  {
    id: 'prestige-1',
    title: 'Table De Prestige',
    price: 3000,
    category: 'plaques',
    subcategory: 'prestige',
    thumbUrl: `${S3}/plaques/6a30078028dbc.png`,
  },
];

type NavSubcategory = AwardSubcategory | 'restaurant';

const SUBCATEGORIES: { key: NavSubcategory; label: string }[] = [
  { key: 'hotel',       label: 'Hôtel' },
  { key: 'riyad',       label: 'Riad' },
  { key: 'artisan',     label: 'Artisan' },
  { key: 'domaine',     label: 'Domaine' },
  { key: 'restaurant',  label: 'Restaurant' },
];

const RESTAURANT_SUBS: AwardSubcategory[] = ['table-gourmande', 'table-chef', 'remarquable', 'prestige'];

export default function StorePage() {
  const { addItem } = useCartContext();
  const [category, setCategory]         = useState<AwardCategory>('plaques');
  const [subcategory, setSubcategory]   = useState<NavSubcategory | null>(null);
  const [plaquesOpen, setPlaquesOpen]   = useState(false);

  function selectCategory(cat: AwardCategory) {
    setCategory(cat);
    if (cat !== 'plaques') setSubcategory(null);
    setPlaquesOpen(false);
  }

  function selectSubcategory(sub: NavSubcategory) {
    setCategory('plaques');
    setSubcategory(sub);
    setPlaquesOpen(false);
  }

  const filtered = AWARDS.filter(a => {
    if (a.category !== category) return false;
    if (category === 'plaques' && subcategory) {
      if (subcategory === 'restaurant') return RESTAURANT_SUBS.includes(a.subcategory as AwardSubcategory);
      return a.subcategory === subcategory;
    }
    return true;
  });

  const sectionLabel =
    category === 'guide'     ? 'Nos Guides' :
    category === 'magazines' ? 'Magazines' :
    subcategory
      ? SUBCATEGORIES.find(s => s.key === subcategory)?.label ?? 'Plaques'
      : 'Toutes les Plaques';

  return (
    <div className={styles.page}>

      {/* ── Category nav ── */}
      <nav className={styles.categoryNav}>

        <button
          className={`${styles.navItem} ${category === 'guide' ? styles.navItemActive : ''}`}
          onClick={() => selectCategory('guide')}
        >
          <span className={styles.navIcon}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
            </svg>
          </span>
          Guide
        </button>

        <div
          className={styles.submenuWrapper}
          onMouseEnter={() => setPlaquesOpen(true)}
          onMouseLeave={() => setPlaquesOpen(false)}
        >
          <button
            className={`${styles.navItem} ${category === 'plaques' ? styles.navItemActive : ''}`}
            onClick={() => { setCategory('plaques'); setSubcategory(null); setPlaquesOpen(v => !v); }}
          >
            <span className={styles.navIcon}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="8" r="6"/>
                <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
              </svg>
            </span>
            Plaques
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: 2 }}>
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>

          {plaquesOpen && (
            <>
              <div className={styles.submenuBackdrop} onClick={() => setPlaquesOpen(false)} />
              <div className={styles.submenu}>
                {SUBCATEGORIES.map(s => (
                  <button
                    key={s.key}
                    className={`${styles.submenuItem} ${subcategory === s.key && category === 'plaques' ? styles.submenuItemActive : ''}`}
                    onClick={() => selectSubcategory(s.key)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <button
          className={`${styles.navItem} ${category === 'magazines' ? styles.navItemActive : ''}`}
          onClick={() => selectCategory('magazines')}
        >
          <span className={styles.navIcon}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
            </svg>
          </span>
          Magazines
        </button>

      </nav>

      {/* ── Products ── */}
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionDash} />
          <p className={styles.sectionTitle}>{sectionLabel}</p>
        </div>

        {filtered.length === 0 ? (
          <p className={styles.empty}>Aucun produit disponible.</p>
        ) : (
          <div className={styles.grid}>
            {filtered.map(award => (
              <AwardCard key={award.id} award={award} onAdd={addItem} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

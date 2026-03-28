"use client";

import { useState } from 'react';
import styles from '@/styles/listPage.module.css';
import HotelCard from '@/components/cards/hotelCard';
import SearchIcon from '@/public/icons/search.svg';
import { HotelProps } from '@/types/Hotels';
import { ApiPagination } from '@/types/api/Article';
import { ApiRiyadFilters } from '@/types/api/Riyad';
import type { FetchRiyadsOptions } from '@/lib/api/riyads';
import { loadMoreRiyads } from '@/lib/actions/riyads';
import ToqueFilter from '@/components/cards/common/Toques/ToqueFilter';
import StarFilter from '@/components/cards/common/Stars/StarFilter';

type Language = 'fr' | 'en';

interface RiyadsContentProps {
  lang: Language;
  initialRiyads: HotelProps[];
  initialPagination: ApiPagination;
  filters: ApiRiyadFilters;
}

interface ActiveFilters {
  city:     string;
  stars:    number[];
  toques:   number[];
  styles:   string[];
  services: string[];
}

const EMPTY_FILTERS: ActiveFilters = {
  city: '', stars: [], toques: [], styles: [], services: [],
};

export default function RiyadsContent({
  lang,
  initialRiyads,
  initialPagination,
  filters,
}: RiyadsContentProps) {
  const [riyads, setRiyads]         = useState<HotelProps[]>(initialRiyads);
  const [pagination, setPagination] = useState<ApiPagination>(initialPagination);
  const [loading, setLoading]       = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [active, setActive]         = useState<ActiveFilters>(EMPTY_FILTERS);

  const hasMore = pagination.page < pagination.total_pages;

  async function applyFilters(next: ActiveFilters, page = 1) {
    setLoading(true);
    const opts: FetchRiyadsOptions = {
      page,
      limit:    9,
      city:     next.city             || undefined,
      stars:    next.stars.length     ? next.stars    : undefined,
      toques:   next.toques.length    ? next.toques   : undefined,
      styles:   next.styles.length    ? next.styles   : undefined,
      services: next.services.length  ? next.services : undefined,
    };
    const result = await loadMoreRiyads(opts);
    if (page === 1) {
      setRiyads(result.riyads);
    } else {
      setRiyads((prev) => {
        const seen = new Set(prev.map((r) => r.slug));
        return [...prev, ...result.riyads.filter((r) => !seen.has(r.slug))];
      });
    }
    setPagination(result.pagination);
    setLoading(false);
  }

  function handleFilterChange<K extends keyof ActiveFilters>(key: K, value: ActiveFilters[K]) {
    const next = { ...active, [key]: value };
    setActive(next);
    setSearchQuery('');
    applyFilters(next);
  }

  function toggleNumber(key: 'stars' | 'toques', val: number) {
    const arr = active[key];
    const next = arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
    handleFilterChange(key, next);
  }

  function toggleSlug(key: 'styles' | 'services', slug: string) {
    const arr = active[key];
    const next = arr.includes(slug) ? arr.filter((s) => s !== slug) : [...arr, slug];
    handleFilterChange(key, next);
  }

  function resetFilters() {
    setActive(EMPTY_FILTERS);
    setSearchQuery('');
    applyFilters(EMPTY_FILTERS);
  }

  async function loadMore() {
    if (loading || !hasMore) return;
    await applyFilters(active, pagination.page + 1);
  }

  const displayed = searchQuery.trim()
    ? riyads.filter(
        (h) =>
          h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          h.address?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : riyads;

  const hasActiveFilters = Boolean(
    active.city || active.stars.length || active.toques.length || active.styles.length || active.services.length
  );

  return (
    <div className={styles.listPage}>

      {/* ── Search bar ── */}
      <div className={styles.searchBar}>
        <div className={styles.searchInner}>
          <SearchIcon width={18} height={18} className={styles.searchIcon} />
          <input
            type="search"
            placeholder="Rechercher un riyad, une ville..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* ── Body : filters + cards ── */}
      <div className={styles.body}>

        {/* ── Sidebar ── */}
        <aside className={styles.sidebar}>

          {hasActiveFilters && (
            <button className={styles.resetBtn} onClick={resetFilters}>
              Réinitialiser
            </button>
          )}

          {/* Villes */}
          {filters.cities.length > 0 && (
            <>
              <p className={styles.sidebarTitle}>Ville</p>
              <ul className={styles.filterList}>
                <li>
                  <button
                    className={`${styles.filterItem} ${active.city === '' ? styles.filterItemActive : ''}`}
                    onClick={() => handleFilterChange('city', '')}
                  >
                    Toutes
                  </button>
                </li>
                {filters.cities.map(({ cityName, slug }) => (
                  <li key={slug}>
                    <button
                      className={`${styles.filterItem} ${active.city === slug ? styles.filterItemActive : ''}`}
                      onClick={() => handleFilterChange('city', slug)}
                    >
                      {cityName}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Étoiles */}
          {filters.stars.length > 0 && (
            <>
              <p className={`${styles.sidebarTitle} ${styles.sidebarTitleGap}`}>Étoiles</p>
              <StarFilter
                stars={filters.stars}
                selected={active.stars}
                onToggle={(s) => toggleNumber('stars', s)}
              />
            </>
          )}

          {/* Toques */}
          {filters.toques.length > 0 && (
            <>
              <p className={`${styles.sidebarTitle} ${styles.sidebarTitleGap}`}>Toques</p>
              <ToqueFilter
                toques={filters.toques}
                selected={active.toques}
                onToggle={(t) => toggleNumber('toques', t)}
              />
            </>
          )}

          {/* Styles */}
          {filters.styles.length > 0 && (
            <>
              <p className={`${styles.sidebarTitle} ${styles.sidebarTitleGap}`}>Style</p>
              <ul className={styles.filterList}>
                {filters.styles.map(({ libelle, slug }) => (
                  <li key={slug}>
                    <button
                      className={`${styles.filterItem} ${active.styles.includes(slug) ? styles.filterItemActive : ''}`}
                      onClick={() => toggleSlug('styles', slug)}
                    >
                      {libelle}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Services */}
          {filters.services.length > 0 && (
            <>
              <p className={`${styles.sidebarTitle} ${styles.sidebarTitleGap}`}>Services</p>
              <ul className={styles.filterList}>
                {filters.services.map(({ libelle, slug }) => (
                  <li key={slug}>
                    <button
                      className={`${styles.filterItem} ${active.services.includes(slug) ? styles.filterItemActive : ''}`}
                      onClick={() => toggleSlug('services', slug)}
                    >
                      {libelle}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

        </aside>

        {/* ── Cards area ── */}
        <div className={styles.cardsArea}>

          {loading && riyads.length === 0 ? (
            <p className={styles.loadingText}>Chargement...</p>
          ) : displayed.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyTitle}>Aucun riyad trouvé</p>
              <p className={styles.emptyText}>Essayez d&apos;autres critères de recherche.</p>
            </div>
          ) : (
            <>
              <div className={styles.cardsGrid}>
                {displayed.map((riyad) => (
                  <HotelCard key={riyad.slug} lang={lang} Hotel={riyad} />
                ))}
              </div>

              {hasMore && !searchQuery && (
                <div className={styles.loadMoreWrapper}>
                  <button
                    className={styles.loadMoreButton}
                    onClick={loadMore}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className={styles.loadingDots}>
                        <span /><span /><span />
                      </span>
                    ) : (
                      'Voir plus'
                    )}
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}

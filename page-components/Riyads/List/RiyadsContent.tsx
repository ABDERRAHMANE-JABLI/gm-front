"use client";

import { useState } from 'react';
import styles from '@/styles/listPage.module.css';
import HotelCard from '@/components/cards/hotelCard';
import SearchBar from '@/components/SearchBar';
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
  const [filtersOpen, setFiltersOpen] = useState(false);
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
      <div className={styles.searchBarContainer}>
        <div className={styles.searchBarWrapper}>
          <div className={styles.searchBarBox}>
            <SearchBar type="riyad" value={searchQuery} onChange={setSearchQuery} />
          </div>
          <button
            className={styles.filterToggleBtn}
            onClick={() => setFiltersOpen((v) => !v)}
            aria-label="Filtres"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" color="black"><g fill="none" fillRule="evenodd"><path d="m12.594 23.258-.012.002-.071.035-.02.004-.014-.004-.071-.036q-.016-.004-.024.006l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427q-.004-.016-.016-.018m.264-.113-.014.002-.184.093-.01.01-.003.011.018.43.005.012.008.008.201.092q.019.005.029-.008l.004-.014-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014-.034.614q.001.018.017.024l.015-.002.201-.093.01-.008.003-.011.018-.43-.003-.012-.01-.01z"/><path fill="currentColor" d="M16 15c1.306 0 2.418.835 2.83 2H20a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H4a1 1 0 1 1 0-2h9.17A3 3 0 0 1 16 15m0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2M8 9a3 3 0 0 1 2.762 1.828l.067.172H20a1 1 0 0 1 .117 1.993L20 13h-9.17a3.001 3.001 0 0 1-5.592.172L5.17 13H4a1 1 0 0 1-.117-1.993L4 11h1.17A3 3 0 0 1 8 9m0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2m8-8c1.306 0 2.418.835 2.83 2H20a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H4a1 1 0 0 1 0-2h9.17A3 3 0 0 1 16 3m0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/></g></svg>
          </button>
        </div>
      </div>

      {/* ── Body : filters + cards ── */}
      <div className={styles.body}>

        {/* ── Sidebar ── */}
        <aside className={`${styles.sidebar} ${filtersOpen ? styles.sidebarOpen : styles.sidebarHidden}`}>

          <div className={styles.sidebarHeader}>
            <span className={styles.sidebarHeaderTitle}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" color="black"><g fill="none" fillRule="evenodd"><path d="m12.594 23.258-.012.002-.071.035-.02.004-.014-.004-.071-.036q-.016-.004-.024.006l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427q-.004-.016-.016-.018m.264-.113-.014.002-.184.093-.01.01-.003.011.018.43.005.012.008.008.201.092q.019.005.029-.008l.004-.014-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014-.034.614q.001.018.017.024l.015-.002.201-.093.01-.008.003-.011.018-.43-.003-.012-.01-.01z"/><path fill="currentColor" d="M16 15c1.306 0 2.418.835 2.83 2H20a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H4a1 1 0 1 1 0-2h9.17A3 3 0 0 1 16 15m0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2M8 9a3 3 0 0 1 2.762 1.828l.067.172H20a1 1 0 0 1 .117 1.993L20 13h-9.17a3.001 3.001 0 0 1-5.592.172L5.17 13H4a1 1 0 0 1-.117-1.993L4 11h1.17A3 3 0 0 1 8 9m0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2m8-8c1.306 0 2.418.835 2.83 2H20a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H4a1 1 0 0 1 0-2h9.17A3 3 0 0 1 16 3m0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/></g></svg>
            </span>
            <button
              className={`${styles.resetBtn} ${hasActiveFilters ? '' : styles.resetBtnHidden}`}
              onClick={resetFilters}
            >
              Effacer les filtres ×
            </button>
          </div>

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

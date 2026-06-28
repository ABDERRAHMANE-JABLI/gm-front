"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from '@/styles/listPage.module.css';
import HotelCard from '@/components/cards/hotelCard';
import SearchBar from '@/components/SearchBar';
import { HotelProps } from '@/types/Hotels';
import { ApiPagination } from '@/types/api/Article';
import { ApiHotelFilters } from '@/types/api/Hotel';
import type { FetchHotelsOptions } from '@/lib/api/hotels';
import { loadMoreHotels, searchHotels, HotelSearchResult } from '@/lib/actions/hotels';
import ToqueFilter from '@/components/cards/common/Toques/ToqueFilter';
import StarFilter from '@/components/cards/common/Stars/StarFilter';
import HotelIcon from '@/public/icons/menu/hotel.svg';
import { sanitizeSearch } from '@/lib/utils/sanitize';

import { useClientTranslation } from '@/lib/i18n/client';

type Language = 'fr' | 'en';

interface HotelsContentProps {
  lang: Language;
  initialHotels: HotelProps[];
  initialPagination: ApiPagination;
  filters: ApiHotelFilters;
}

interface ActiveFilters {
  type:     string;
  city:     string;
  stars:    number[];
  toques:   number[];
  styles:   string[];
  services: string[];
}

const EMPTY_FILTERS: ActiveFilters = {
  type: '', city: '', stars: [], toques: [], styles: [], services: [],
};

export default function HotelsContent({
  lang,
  initialHotels,
  initialPagination,
  filters,
}: HotelsContentProps) {
  const { t } = useClientTranslation(lang);
  const [hotels, setHotels]         = useState<HotelProps[]>(initialHotels);
  const [pagination, setPagination] = useState<ApiPagination>(initialPagination);
  const [loading, setLoading]       = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [active, setActive]         = useState<ActiveFilters>(EMPTY_FILTERS);
  const [searchResults, setSearchResults] = useState<HotelSearchResult[] | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const debounceRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);

  const hasMore = pagination.page < pagination.total_pages;

  async function applyFilters(next: ActiveFilters, page = 1) {
    setLoading(true);
    const opts: FetchHotelsOptions = {
      page,
      limit:    9,
      type:     next.type             || undefined,
      city:     next.city             || undefined,
      stars:    next.stars.length     ? next.stars    : undefined,
      toques:   next.toques.length    ? next.toques   : undefined,
      styles:   next.styles.length    ? next.styles   : undefined,
      services: next.services.length  ? next.services : undefined,
    };
    const result = await loadMoreHotels(opts);
    if (page === 1) {
      setHotels(result.hotels);
    } else {
      setHotels((prev) => {
        const seen = new Set(prev.map((r) => r.slug));
        return [...prev, ...result.hotels.filter((r) => !seen.has(r.slug))];
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

  // On n'affiche dans le filtre que les étoiles -1 (hors classement) et 1 à 5
  const visibleStars = filters.stars.filter((s) => s === -1 || (s >= 1 && s <= 5));

  // Le backend hôtels accepte une recherche dès 2 caractères
  const showDropdown = searchQuery.length >= 2;

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (searchQuery.length < 2) {
      setSearchResults(null);
      setSearchLoading(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      const id = ++requestIdRef.current;
      setSearchLoading(true);
      // On scope la recherche sur le type sélectionné dans le filtre (hotel/riad), sinon tous
      const results = await searchHotels(sanitizeSearch(searchQuery), active.type || undefined);
      if (id !== requestIdRef.current) return;
      setSearchResults(results);
      setSearchLoading(false);
    }, 300);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [searchQuery, active.type]);

  const hasActiveFilters = Boolean(
    active.type || active.city || active.stars.length || active.toques.length || active.styles.length || active.services.length
  );
  const hasFilters = filters.types.length > 0 || filters.cities.length > 0 || filters.stars.length > 0 || filters.toques.length > 0 || filters.styles.length > 0 || filters.services.length > 0;

  if (initialHotels.length === 0 && !hasFilters) {
    return (
      <div className={styles.emptyPage}>
        <p className={styles.emptyPageTitle}>{t('empty.no_records')}</p>
        <p className={styles.emptyPageSub}>{t('empty.subtitle_hotels')}</p>
      </div>
    );
  }

  return (
    <div className={styles.listPage}>

      {/* ── Search bar ── */}
      <div className={styles.searchBarContainer}>
        <div className={styles.searchBarWrapper}>
          <div className={styles.searchBarBox}>
            <SearchBar type="hotel" value={searchQuery} onChange={setSearchQuery} />
          </div>
          {hasFilters && (
            <button
              className={styles.filterToggleBtn}
              onClick={() => setFiltersOpen((v) => !v)}
              aria-label="Filtres"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" color="black"><g fill="none" fillRule="evenodd"><path d="m12.594 23.258-.012.002-.071.035-.02.004-.014-.004-.071-.036q-.016-.004-.024.006l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427q-.004-.016-.016-.018m.264-.113-.014.002-.184.093-.01.01-.003.011.018.43.005.012.008.008.201.092q.019.005.029-.008l.004-.014-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014-.034.614q.001.018.017.024l.015-.002.201-.093.01-.008.003-.011.018-.43-.003-.012-.01-.01z"/><path fill="currentColor" d="M16 15c1.306 0 2.418.835 2.83 2H20a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H4a1 1 0 1 1 0-2h9.17A3 3 0 0 1 16 15m0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2M8 9a3 3 0 0 1 2.762 1.828l.067.172H20a1 1 0 0 1 .117 1.993L20 13h-9.17a3.001 3.001 0 0 1-5.592.172L5.17 13H4a1 1 0 0 1-.117-1.993L4 11h1.17A3 3 0 0 1 8 9m0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2m8-8c1.306 0 2.418.835 2.83 2H20a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H4a1 1 0 0 1 0-2h9.17A3 3 0 0 1 16 3m0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/></g></svg>
            </button>
          )}

          {showDropdown && (
            <div className={styles.searchDropdown}>
              <div className={styles.dropdownHeader}>
                <HotelIcon width={25} height={25} />
                <span className={styles.dropdownLabel}>Hôtels & Riads</span>
                <button className={styles.dropdownClose} onClick={() => setSearchQuery('')}>Fermer ×</button>
              </div>
              {searchLoading ? (
                <p className={styles.dropdownLoading}>Recherche en cours…</p>
              ) : !searchResults || searchResults.length === 0 ? (
                <p className={styles.dropdownEmpty}>Aucun résultat trouvé</p>
              ) : (
                <div className={styles.dropdownList}>
                  {searchResults.map((h) => (
                    <Link key={h.slug} href={`/${lang}/hotels/${h.slug}`} className={styles.dropdownItem} onClick={() => setSearchQuery('')}>
                      <div className={styles.dropdownThumb}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        {h.thumbId && <img src={h.thumbId} alt={h.title} />}
                      </div>
                      <div className={styles.dropdownInfo}>
                        <p className={styles.dropdownTitle}>{h.title}</p>
                        {h.entityType && <span className={styles.dropdownTag}>{h.entityType === 'riad' ? 'Riad' : 'Hôtel'}</span>}
                        {h.address && <span className={styles.dropdownLocation}>{h.address}</span>}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Body : filters + cards ── */}
      {filtersOpen && <div className={styles.sidebarBackdrop} onClick={() => setFiltersOpen(false)} />}
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
            <button className={styles.sidebarCloseBtn} onClick={() => setFiltersOpen(false)} aria-label="Fermer"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg></button>
          </div>

          {/* Type */}
          {filters.types.length > 0 && (
            <>
              <p className={styles.sidebarTitle}>Type</p>
              <ul className={styles.filterList}>
                <li>
                  <button
                    className={`${styles.filterItem} ${active.type === '' ? styles.filterItemActive : ''}`}
                    onClick={() => handleFilterChange('type', '')}
                  >
                    Tous
                  </button>
                </li>
                {filters.types.map((type) => (
                  <li key={type}>
                    <button
                      className={`${styles.filterItem} ${active.type === type ? styles.filterItemActive : ''}`}
                      onClick={() => handleFilterChange('type', type)}
                    >
                      {type === 'hotel' ? 'Hôtel' : type === 'riad' ? 'Riad' : type}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Villes */}
          {filters.cities.length > 0 && (
            <>
              <p className={`${styles.sidebarTitle} ${styles.sidebarTitleGap}`}>Ville</p>
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
          {visibleStars.length > 0 && (
            <>
              <p className={`${styles.sidebarTitle} ${styles.sidebarTitleGap}`}>Étoiles</p>
              <StarFilter
                stars={visibleStars}
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

          {loading && hotels.length === 0 ? (
            <p className={styles.loadingText}>Chargement...</p>
          ) : hotels.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyTitle}>Aucun hôtel trouvé</p>
              <p className={styles.emptyText}>Essayez d&apos;autres critères de recherche.</p>
            </div>
          ) : (
            <>
              <div className={styles.cardsGrid}>
                {hotels.map((hotel) => (
                  <HotelCard key={hotel.slug} lang={lang} Hotel={hotel} />
                ))}
              </div>

              {hasMore && (
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

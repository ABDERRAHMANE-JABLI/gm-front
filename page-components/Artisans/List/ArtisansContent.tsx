"use client";

import { useState } from 'react';
import styles from '@/styles/listPage.module.css';
import ArtisanCard from '@/components/cards/artisanCard';
import SearchIcon from '@/public/icons/search.svg';
import { ArtisanProps } from '@/types/Artisans';
import { ApiPagination } from '@/types/api/Article';
import { ApiArtisanFilters } from '@/types/api/Artisan';
import type { FetchArtisansOptions } from '@/lib/api/artisans';
import { loadMoreArtisans } from '@/lib/actions/artisans';

type Language = 'fr' | 'en';

interface ArtisansContentProps {
  lang: Language;
  initialArtisans: ArtisanProps[];
  initialPagination: ApiPagination;
  filters: ApiArtisanFilters;
}

interface ActiveFilters {
  city:       string;
  activities: string[];
  services:   string[];
}

const EMPTY_FILTERS: ActiveFilters = { city: '', activities: [], services: [] };

export default function ArtisansContent({
  lang,
  initialArtisans,
  initialPagination,
  filters,
}: ArtisansContentProps) {
  const [artisans, setArtisans]       = useState<ArtisanProps[]>(initialArtisans);
  const [pagination, setPagination]   = useState<ApiPagination>(initialPagination);
  const [loading, setLoading]         = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [active, setActive]           = useState<ActiveFilters>(EMPTY_FILTERS);

  const hasMore = pagination.page < pagination.total_pages;

  async function applyFilters(next: ActiveFilters, page = 1) {
    setLoading(true);
    const opts: FetchArtisansOptions = {
      page,
      limit:      9,
      city:       next.city             || undefined,
      activities: next.activities.length ? next.activities : undefined,
      services:   next.services.length   ? next.services   : undefined,
    };
    const result = await loadMoreArtisans(opts);
    if (page === 1) {
      setArtisans(result.artisans);
    } else {
      setArtisans((prev) => [...prev, ...result.artisans]);
    }
    setPagination(result.pagination);
    setLoading(false);
  }

  function handleCityChange(city: string) {
    const next = { ...active, city };
    setActive(next);
    setSearchQuery('');
    applyFilters(next);
  }

  function toggleSlug(key: 'activities' | 'services', slug: string) {
    const arr  = active[key];
    const next = { ...active, [key]: arr.includes(slug) ? arr.filter((s) => s !== slug) : [...arr, slug] };
    setActive(next);
    setSearchQuery('');
    applyFilters(next);
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
    ? artisans.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.primaryActivity.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : artisans;

  const hasActiveFilters = Boolean(
    active.city || active.activities.length || active.services.length
  );

  return (
    <div className={styles.listPage}>

      {/* ── Search bar ── */}
      <div className={styles.searchBar}>
        <div className={styles.searchInner}>
          <SearchIcon width={18} height={18} className={styles.searchIcon} />
          <input
            type="search"
            placeholder="Rechercher un artisan, une activité, une ville..."
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
                    onClick={() => handleCityChange('')}
                  >
                    Toutes
                  </button>
                </li>
                {filters.cities.map(({ cityName, slug }) => (
                  <li key={slug}>
                    <button
                      className={`${styles.filterItem} ${active.city === slug ? styles.filterItemActive : ''}`}
                      onClick={() => handleCityChange(slug)}
                    >
                      {cityName}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Activités */}
          {filters.activities.length > 0 && (
            <>
              <p className={`${styles.sidebarTitle} ${styles.sidebarTitleGap}`}>Activités</p>
              <ul className={styles.filterList}>
                {filters.activities.map(({ libelle, slug }) => (
                  <li key={slug}>
                    <button
                      className={`${styles.filterItem} ${active.activities.includes(slug) ? styles.filterItemActive : ''}`}
                      onClick={() => toggleSlug('activities', slug)}
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

          {loading && artisans.length === 0 ? (
            <p className={styles.loadingText}>Chargement...</p>
          ) : displayed.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyTitle}>Aucun artisan trouvé</p>
              <p className={styles.emptyText}>Essayez d&apos;autres critères de recherche.</p>
            </div>
          ) : (
            <>
              <div className={styles.cardsGrid}>
                {displayed.map((artisan) => (
                  <ArtisanCard key={artisan.slug} lang={lang} Artisan={artisan} />
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

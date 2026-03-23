"use client";

import { useState } from 'react';
import styles from './styles.module.css';
import RestaurantCard from '@/components/cards/restaurantCard';
import SearchIcon from '@/public/icons/search.svg';
import { RestaurantCardProps } from '@/types/Restaurant';
import { ApiPagination } from '@/types/api/Article';
import { ApiRestaurantFilters } from '@/types/api/Restaurant';
import { fetchRestaurants, FetchRestaurantsOptions } from '@/lib/api/restaurants';
import ToqueFilter from '@/components/cards/common/Toques/ToqueFilter';

type Language = 'fr' | 'en';

interface RestaurantsContentProps {
  lang: Language;
  initialRestaurants: RestaurantCardProps[];
  initialPagination: ApiPagination;
  filters: ApiRestaurantFilters;
}

interface ActiveFilters {
  city:     string;
  toques:   number[];
  cuisines: string[];
  styles:   string[];
  service:  string;
}

const EMPTY_FILTERS: ActiveFilters = {
  city: '', toques: [], cuisines: [], styles: [], service: '',
};

export default function RestaurantsContent({
  lang,
  initialRestaurants,
  initialPagination,
  filters,
}: RestaurantsContentProps) {
  const [restaurants, setRestaurants] = useState<RestaurantCardProps[]>(initialRestaurants);
  const [pagination, setPagination]   = useState<ApiPagination>(initialPagination);
  const [loading, setLoading]         = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [active, setActive]           = useState<ActiveFilters>(EMPTY_FILTERS);

  const hasMore = pagination.page < pagination.total_pages;

  async function applyFilters(next: ActiveFilters, page = 1) {
    setLoading(true);
    const opts: FetchRestaurantsOptions = {
      page,
      limit:    9,
      city:     next.city              || undefined,
      cuisines: next.cuisines.length   ? next.cuisines : undefined,
      styles:   next.styles.length     ? next.styles   : undefined,
      toques:   next.toques.length     ? next.toques   : undefined,
      service:  next.service           || undefined,
    };
    const result = await fetchRestaurants(opts);
    if (page === 1) {
      setRestaurants(result.restaurants);
    } else {
      setRestaurants((prev) => [...prev, ...result.restaurants]);
    }
    setPagination(result.pagination);
    setLoading(false);
  }

  function handleFilterChange<K extends keyof ActiveFilters>(
    key: K,
    value: ActiveFilters[K]
  ) {
    const next = { ...active, [key]: value };
    setActive(next);
    setSearchQuery('');
    applyFilters(next);
  }

  function toggleToque(toque: number) {
    const next = active.toques.includes(toque)
      ? active.toques.filter((t) => t !== toque)
      : [...active.toques, toque];
    handleFilterChange('toques', next);
  }

  function toggleCuisine(slug: string) {
    const next = active.cuisines.includes(slug)
      ? active.cuisines.filter((c) => c !== slug)
      : [...active.cuisines, slug];
    handleFilterChange('cuisines', next);
  }

  function toggleStyle(slug: string) {
    const next = active.styles.includes(slug)
      ? active.styles.filter((s) => s !== slug)
      : [...active.styles, slug];
    handleFilterChange('styles', next);
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
    ? restaurants.filter(
        (r) =>
          r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.address?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : restaurants;

  const hasActiveFilters =
    active.city || active.toques.length || active.cuisines.length || active.styles.length || active.service;

  return (
    <div className={styles.blogsPage}>

      {/* ── Search bar ── */}
      <div className={styles.searchBar}>
        <div className={styles.searchInner}>
          <SearchIcon width={18} height={18} className={styles.searchIcon} />
          <input
            type="search"
            placeholder="Rechercher un restaurant, une ville..."
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
          {filters.cities.length > 0 && <p className={styles.sidebarTitle}>Ville</p>}
          {filters.cities.length > 0 && (
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
          )}

          {filters.toques.length > 0 && (
            <>
              <p className={`${styles.sidebarTitle} ${styles.sidebarTitleGap}`}>Toques</p>
              <ToqueFilter
                toques={filters.toques}
                selected={active.toques}
                onToggle={toggleToque}
              />
            </>
          )}

          {filters.cuisines.length > 0 && (
            <>
              <p className={`${styles.sidebarTitle} ${styles.sidebarTitleGap}`}>Cuisine</p>
              <ul className={styles.filterList}>
                {filters.cuisines.map(({ libelle, slug }) => (
                  <li key={slug}>
                    <button
                      className={`${styles.filterItem} ${active.cuisines.includes(slug) ? styles.filterItemActive : ''}`}
                      onClick={() => toggleCuisine(slug)}
                    >
                      {libelle}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          {filters.styles.length > 0 && (
            <>
              <p className={`${styles.sidebarTitle} ${styles.sidebarTitleGap}`}>Style</p>
              <ul className={styles.filterList}>
                {filters.styles.map(({ libelle, slug }) => (
                  <li key={slug}>
                    <button
                      className={`${styles.filterItem} ${active.styles.includes(slug) ? styles.filterItemActive : ''}`}
                      onClick={() => toggleStyle(slug)}
                    >
                      {libelle}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          {filters.services.length > 0 && (
            <>
              <p className={`${styles.sidebarTitle} ${styles.sidebarTitleGap}`}>Services</p>
              <ul className={styles.filterList}>
                {filters.services.map(({ libelle, slug }) => (
                  <li key={slug}>
                    <button
                      className={`${styles.filterItem} ${active.service === slug ? styles.filterItemActive : ''}`}
                      onClick={() => handleFilterChange('service', slug)}
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

          {loading && restaurants.length === 0 ? (
            <p className={styles.loadingText}>Chargement...</p>
          ) : displayed.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyTitle}>Aucun restaurant trouvé</p>
              <p className={styles.emptyText}>Essayez d&apos;autres critères de recherche.</p>
            </div>
          ) : (
            <>
              <div className={styles.cardsGrid}>
                {displayed.map((restaurant) => (
                  <RestaurantCard key={restaurant.slug} lang={lang} restaurant={restaurant} />
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

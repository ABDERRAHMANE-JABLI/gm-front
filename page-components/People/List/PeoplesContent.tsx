"use client";

import { useState } from 'react';
import styles from '@/styles/listPage.module.css';
import PeopleCard from '@/components/cards/peopleCard';
import SearchIcon from '@/public/icons/search.svg';
import PeopleProps from '@/types/Peoples';
import { ApiPagination } from '@/types/api/Article';
import { ApiTalentFilters } from '@/types/api/Talent';
import type { FetchTalentsOptions } from '@/lib/api/talents';
import { loadMoreTalents } from '@/lib/actions/talents';
import ToqueFilter from '@/components/cards/common/Toques/ToqueFilter';

type Language = 'fr' | 'en';

interface PeoplesContentProps {
  lang: Language;
  initialTalents: PeopleProps[];
  initialPagination: ApiPagination;
  filters: ApiTalentFilters;
}

interface ActiveFilters {
  toques: number[];
  role:   string[];
  award:  string[];
}

const EMPTY_FILTERS: ActiveFilters = { toques: [], role: [], award: [] };

export default function PeoplesContent({
  lang,
  initialTalents,
  initialPagination,
  filters,
}: PeoplesContentProps) {
  const [talents, setTalents]         = useState<PeopleProps[]>(initialTalents);
  const [pagination, setPagination]   = useState<ApiPagination>(initialPagination);
  const [loading, setLoading]         = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [active, setActive]           = useState<ActiveFilters>(EMPTY_FILTERS);

  const hasMore = pagination.page < pagination.total_pages;

  async function applyFilters(next: ActiveFilters, page = 1) {
    setLoading(true);
    const opts: FetchTalentsOptions = {
      page,
      limit:  9,
      toques: next.toques.length ? next.toques : undefined,
      role:   next.role.length ? next.role : undefined,
      award:  next.award.length ? next.award : undefined,
    };
    const result = await loadMoreTalents(opts);
    if (page === 1) {
      setTalents(result.talents);
    } else {
      setTalents((prev) => {
        const seen = new Set(prev.map((r) => r.slug));
        return [...prev, ...result.talents.filter((r) => !seen.has(r.slug))];
      });
    }
    setPagination(result.pagination);
    setLoading(false);
  }

  function toggleToque(toque: number) {
    const arr  = active.toques;
    const next = { ...active, toques: arr.includes(toque) ? arr.filter((t) => t !== toque) : [...arr, toque] };
    setActive(next);
    setSearchQuery('');
    applyFilters(next);
  }

  function toggleRole(slug: string) {
    const arr  = active.role;
    const next = { ...active, role: arr.includes(slug) ? arr.filter((r) => r !== slug) : [...arr, slug] };
    setActive(next);
    setSearchQuery('');
    applyFilters(next);
  }

  function toggleAward(slug: string) {
    const arr  = active.award;
    const next = { ...active, award: arr.includes(slug) ? arr.filter((a) => a !== slug) : [...arr, slug] };
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
    ? talents.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (Array.isArray(p.role) ? p.role.join(' ') : p.role ?? '')
          .toLowerCase().includes(searchQuery.toLowerCase())
      )
    : talents;

  const hasActiveFilters = Boolean(active.toques.length || active.role.length || active.award.length);

  return (
    <div className={styles.listPage}>

      {/* ── Search bar ── */}
      <div className={styles.searchBar}>
        <div className={styles.searchInner}>
          <SearchIcon width={18} height={18} className={styles.searchIcon} />
          <input
            type="search"
            placeholder="Rechercher un chef, un talent..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* ── Body ── */}
      <div className={styles.body}>

        {/* ── Sidebar ── */}
        <aside className={styles.sidebar}>

          {hasActiveFilters && (
            <button className={styles.resetBtn} onClick={resetFilters}>
              Réinitialiser
            </button>
          )}

          {/* Toques */}
          {filters.toques.length > 0 && (
            <>
              <p className={styles.sidebarTitle}>Toques</p>
              <ToqueFilter
                toques={filters.toques}
                selected={active.toques}
                onToggle={toggleToque}
              />
            </>
          )}

          {/* Rôle */}
          {filters.roles.length > 0 && (
            <>
              <p className={`${styles.sidebarTitle} ${styles.sidebarTitleGap}`}>Rôle</p>
              <ul className={styles.filterList}>
                {filters.roles.map(({ libelle, slug }) => (
                  <li key={slug}>
                    <button
                      className={`${styles.filterItem} ${active.role.includes(slug) ? styles.filterItemActive : ''}`}
                      onClick={() => toggleRole(slug)}
                    >
                      {libelle}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Distinctions */}
          {filters.awards.length > 0 && (
            <>
              <p className={`${styles.sidebarTitle} ${styles.sidebarTitleGap}`}>Distinctions</p>
              <ul className={styles.filterList}>
                {filters.awards.map(({ libelle, slug }) => (
                  <li key={slug}>
                    <button
                      className={`${styles.filterItem} ${active.award.includes(slug) ? styles.filterItemActive : ''}`}
                      onClick={() => toggleAward(slug)}
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

          {loading && talents.length === 0 ? (
            <p className={styles.loadingText}>Chargement...</p>
          ) : displayed.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyTitle}>Aucun talent trouvé</p>
              <p className={styles.emptyText}>Essayez d&apos;autres critères de recherche.</p>
            </div>
          ) : (
            <>
              <div className={styles.cardsGrid}>
                {displayed.map((talent) => (
                  <PeopleCard key={talent.slug} lang={lang} People={talent} />
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

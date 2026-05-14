"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from '@/styles/listPage.module.css';
import PeopleCard from '@/components/cards/peopleCard';
import SearchBar from '@/components/SearchBar';
import PeopleProps from '@/types/Peoples';
import { ApiPagination } from '@/types/api/Article';
import { ApiTalentFilters } from '@/types/api/Talent';
import type { FetchTalentsOptions } from '@/lib/api/talents';
import { loadMoreTalents, searchTalents, TalentSearchResult } from '@/lib/actions/talents';
import ToqueFilter from '@/components/cards/common/Toques/ToqueFilter';
import PeopleIcon from '@/public/icons/menu/people.svg';
import { sanitizeSearch } from '@/lib/utils/sanitize';

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
  const [talents, setTalents]           = useState<PeopleProps[]>(initialTalents);
  const [pagination, setPagination]     = useState<ApiPagination>(initialPagination);
  const [loading, setLoading]           = useState(false);
  const [searchQuery, setSearchQuery]   = useState('');
  const [filtersOpen, setFiltersOpen]   = useState(false);
  const [active, setActive]             = useState<ActiveFilters>(EMPTY_FILTERS);
  const [searchResults, setSearchResults] = useState<TalentSearchResult[] | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const debounceRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (searchQuery.length < 4) {
      setSearchResults(null);
      setSearchLoading(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      const id = ++requestIdRef.current;
      setSearchLoading(true);
      const results = await searchTalents(sanitizeSearch(searchQuery));
      if (id !== requestIdRef.current) return;
      setSearchResults(results);
      setSearchLoading(false);
    }, 300);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [searchQuery]);

  const showDropdown = searchQuery.length >= 4;
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

  const hasActiveFilters = Boolean(active.toques.length || active.role.length || active.award.length);
  const hasFilters = filters.toques.length > 0 || filters.roles.length > 0 || filters.awards.length > 0;

  if (initialTalents.length === 0 && !hasFilters) {
    return (
      <div className={styles.emptyPage}>
        <p className={styles.emptyPageTitle}>Aucun enregistrement trouvé pour le moment.</p>
        <p className={styles.emptyPageSub}>Revenez bientôt pour découvrir nos talents.</p>
      </div>
    );
  }

  return (
    <div className={styles.listPage}>

      {/* ── Search bar ── */}
      <div className={styles.searchBarContainer}>
        <div className={styles.searchBarWrapper}>
          <div className={styles.searchBarBox}>
            <SearchBar type="talent" value={searchQuery} onChange={setSearchQuery} />
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
                <PeopleIcon width={25} height={25} />
                <span className={styles.dropdownLabel}>Talents</span>
                <button className={styles.dropdownClose} onClick={() => setSearchQuery('')}>Fermer ×</button>
              </div>
              {searchLoading ? (
                <p className={styles.dropdownLoading}>Recherche en cours…</p>
              ) : !searchResults || searchResults.length === 0 ? (
                <p className={styles.dropdownEmpty}>Aucun résultat trouvé</p>
              ) : (
                <div className={styles.dropdownList}>
                  {searchResults.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/${lang}/peoples/${t.slug}`}
                      className={styles.dropdownItem}
                      onClick={() => setSearchQuery('')}
                    >
                      <div className={styles.dropdownThumb}>
                        {t.thumbId && <img src={t.thumbId} alt={t.fullName} />}
                      </div>
                      <div className={styles.dropdownInfo}>
                        <p className={styles.dropdownTitle}>{t.fullName}</p>
                        {t.roles.length > 0 && (
                          <span style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                            {t.roles.map((r) => (
                              <span key={r} className={styles.dropdownTag}>{r}</span>
                            ))}
                          </span>
                        )}
                        {(t.chefAt?.name ?? t.workplace?.name) && (
                          <span className={styles.dropdownLocation}>{t.chefAt?.name ?? t.workplace?.name}</span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Body ── */}
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
          ) : talents.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyTitle}>Aucun talent trouvé</p>
              <p className={styles.emptyText}>Essayez d&apos;autres critères de recherche.</p>
            </div>
          ) : (
            <>
              <div className={styles.cardsGrid}>
                {talents.map((talent) => (
                  <PeopleCard key={talent.slug} lang={lang} People={talent} />
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

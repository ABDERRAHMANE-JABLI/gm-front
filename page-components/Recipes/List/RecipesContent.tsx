"use client";

import { useState } from 'react';
import styles from '@/styles/listPage.module.css';
import RecipeCard from '@/components/cards/recipeCard';
import SearchBar from '@/components/SearchBar';
import { RecipeCardProps } from '@/types/Recipe';
import { ApiPagination } from '@/types/api/Article';
import { ApiRecipeFilters } from '@/types/api/Recipe';
import type { FetchRecipesOptions } from '@/lib/api/recipes';
import { loadMoreRecipes } from '@/lib/actions/recipes';

type Language = 'fr' | 'en';

interface RecipesContentProps {
  lang: Language;
  initialRecipes: RecipeCardProps[];
  initialPagination: ApiPagination;
  filters: ApiRecipeFilters;
}

interface ActiveFilters {
  type:       string;
  difficulty: string;
  chef:       string;
}

const EMPTY_FILTERS: ActiveFilters = { type: '', difficulty: '', chef: '' };

export default function RecipesContent({
  lang,
  initialRecipes,
  initialPagination,
  filters,
}: RecipesContentProps) {
  const [recipes, setRecipes]         = useState<RecipeCardProps[]>(initialRecipes);
  const [pagination, setPagination]   = useState<ApiPagination>(initialPagination);
  const [loading, setLoading]         = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [active, setActive]           = useState<ActiveFilters>(EMPTY_FILTERS);

  const hasMore = pagination.page < pagination.total_pages;

  async function applyFilters(next: ActiveFilters, page = 1) {
    setLoading(true);
    const opts: FetchRecipesOptions = {
      page,
      limit:      9,
      type:       next.type       || undefined,
      difficulty: next.difficulty || undefined,
      chef:       next.chef       || undefined,
    };
    const result = await loadMoreRecipes(opts);
    if (page === 1) {
      setRecipes(result.recipes);
    } else {
      setRecipes((prev) => {
        const seen = new Set(prev.map((r) => r.slug));
        return [...prev, ...result.recipes.filter((r) => !seen.has(r.slug))];
      });
    }
    setPagination(result.pagination);
    setLoading(false);
  }

  function handleFilterChange<K extends keyof ActiveFilters>(key: K, value: string) {
    const next = { ...active, [key]: value };
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
    ? recipes.filter(
        (r) =>
          r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.resume.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : recipes;

  const hasActiveFilters = Boolean(active.type || active.difficulty || active.chef);

  return (
    <div className={styles.listPage}>

      {/* ── Search bar ── */}
      <div className={styles.searchBarContainer}>
        <div className={styles.searchBarWrapper}>
          <div className={styles.searchBarBox}>
            <SearchBar type="recette" value={searchQuery} onChange={setSearchQuery} />
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
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Difficulté */}
          {filters.difficulties.length > 0 && (
            <>
              <p className={`${styles.sidebarTitle} ${styles.sidebarTitleGap}`}>Difficulté</p>
              <ul className={styles.filterList}>
                <li>
                  <button
                    className={`${styles.filterItem} ${active.difficulty === '' ? styles.filterItemActive : ''}`}
                    onClick={() => handleFilterChange('difficulty', '')}
                  >
                    Toutes
                  </button>
                </li>
                {filters.difficulties.map((diff) => (
                  <li key={diff}>
                    <button
                      className={`${styles.filterItem} ${active.difficulty === diff ? styles.filterItemActive : ''}`}
                      onClick={() => handleFilterChange('difficulty', diff)}
                    >
                      {diff.charAt(0).toUpperCase() + diff.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Chefs */}
          {filters.chefs.length > 0 && (
            <>
              <p className={`${styles.sidebarTitle} ${styles.sidebarTitleGap}`}>Chef</p>
              <ul className={styles.filterList}>
                <li>
                  <button
                    className={`${styles.filterItem} ${active.chef === '' ? styles.filterItemActive : ''}`}
                    onClick={() => handleFilterChange('chef', '')}
                  >
                    Tous
                  </button>
                </li>
                {filters.chefs.map(({ libelle, slug }) => (
                  <li key={slug}>
                    <button
                      className={`${styles.filterItem} ${active.chef === slug ? styles.filterItemActive : ''}`}
                      onClick={() => handleFilterChange('chef', slug)}
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

          {loading && recipes.length === 0 ? (
            <p className={styles.loadingText}>Chargement...</p>
          ) : displayed.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyTitle}>Aucune recette trouvée</p>
              <p className={styles.emptyText}>Essayez d&apos;autres critères de recherche.</p>
            </div>
          ) : (
            <>
              <div className={styles.cardsGrid}>
                {displayed.map((recipe) => (
                  <RecipeCard key={recipe.slug} lang={lang} recipe={recipe} />
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

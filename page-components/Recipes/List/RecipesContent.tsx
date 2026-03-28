"use client";

import { useState } from 'react';
import styles from '@/styles/listPage.module.css';
import RecipeCard from '@/components/cards/recipeCard';
import SearchIcon from '@/public/icons/search.svg';
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
      <div className={styles.searchBar}>
        <div className={styles.searchInner}>
          <SearchIcon width={18} height={18} className={styles.searchIcon} />
          <input
            type="search"
            placeholder="Rechercher une recette, un chef..."
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

"use client";

import { useState } from 'react';
import NewsCard from '@/components/cards/NewsCard';
import styles from '@/styles/listPage.module.css';
import blogStyles from './BlogsContent.module.css';
import SearchBar from '@/components/SearchBar';
import { NewsCardProps } from '@/types/News';
import { ApiPagination, ApiTheme } from '@/types/api/Article';
import { loadMoreArticles } from '@/lib/actions/articles';

type Language = 'fr' | 'en';

interface BlogsContentProps {
  lang: Language;
  initialArticles: NewsCardProps[];
  initialPagination: ApiPagination;
  themes: ApiTheme[];
}

export default function BlogsContent({ lang, initialArticles, initialPagination, themes }: BlogsContentProps) {
  const [articles, setArticles]           = useState<NewsCardProps[]>(initialArticles);
  const [pagination, setPagination]       = useState<ApiPagination>(initialPagination);
  const [loading, setLoading]             = useState(false);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery]     = useState('');
  const [filtersOpen, setFiltersOpen]     = useState(false);

  const hasMore = pagination.page < pagination.total_pages;

  async function toggleTheme(slug: string) {
    const next = selectedThemes.includes(slug)
      ? selectedThemes.filter((t) => t !== slug)
      : [...selectedThemes, slug];
    setSelectedThemes(next);
    setLoading(true);
    const result = await loadMoreArticles({ themes: next.length ? next : undefined, page: 1, limit: 9 });
    setArticles(result.articles);
    setPagination(result.pagination);
    setLoading(false);
  }

  async function loadMore() {
    if (loading || !hasMore) return;
    setLoading(true);
    const result = await loadMoreArticles({
      themes: selectedThemes.length ? selectedThemes : undefined,
      page:   pagination.page + 1,
      limit:  pagination.limit,
    });
    setArticles((prev) => {
      const seen = new Set(prev.map((r) => r.slug));
      return [...prev, ...result.articles.filter((r) => !seen.has(r.slug))];
    });
    setPagination(result.pagination);
    setLoading(false);
  }

  return (
    <div className={styles.listPage}>

      {/* ── Search bar ── */}
      <div className={blogStyles.containerSearch}>
        <div className={blogStyles.searchWrapper}>
          <div className={blogStyles.searchBar}>
            <SearchBar
              type="actualite"
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
          <button
            className={blogStyles.filterToggleBtn}
            onClick={() => setFiltersOpen((v) => !v)}
            aria-label="Filtres"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" color="black"><g fill="none" fillRule="evenodd"><path d="m12.594 23.258-.012.002-.071.035-.02.004-.014-.004-.071-.036q-.016-.004-.024.006l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427q-.004-.016-.016-.018m.264-.113-.014.002-.184.093-.01.01-.003.011.018.43.005.012.008.008.201.092q.019.005.029-.008l.004-.014-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014-.034.614q.001.018.017.024l.015-.002.201-.093.01-.008.003-.011.018-.43-.003-.012-.01-.01z"></path><path fill="currentColor" d="M16 15c1.306 0 2.418.835 2.83 2H20a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H4a1 1 0 1 1 0-2h9.17A3 3 0 0 1 16 15m0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2M8 9a3 3 0 0 1 2.762 1.828l.067.172H20a1 1 0 0 1 .117 1.993L20 13h-9.17a3.001 3.001 0 0 1-5.592.172L5.17 13H4a1 1 0 0 1-.117-1.993L4 11h1.17A3 3 0 0 1 8 9m0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2m8-8c1.306 0 2.418.835 2.83 2H20a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H4a1 1 0 0 1 0-2h9.17A3 3 0 0 1 16 3m0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2"></path></g></svg>
          </button>
        </div>
      </div>

      {/* ── Body : filters + cards ── */}
      <div className={styles.body}>

        {/* Filters sidebar */}
        <aside className={`${styles.sidebar} ${filtersOpen ? blogStyles.sidebarOpen : blogStyles.sidebarHidden}`}>
          <p className={styles.sidebarTitle}>Thématique</p>

          <ul className={styles.filterList}>
            {themes.map(({ libelle, slug }) => (
              <li key={slug}>
                <button
                  className={`${styles.filterItem} ${selectedThemes.includes(slug) ? styles.filterItemActive : ''}`}
                  onClick={() => toggleTheme(slug)}
                >
                  {libelle}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Cards area */}
        <div className={styles.cardsArea}>

          {loading && articles.length === 0 ? (
            <p className={styles.loadingText}>Chargement...</p>
          ) : articles.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyTitle}>Aucun article trouvé</p>
              <p className={styles.emptyText}>Essayez d&apos;autres critères de recherche.</p>
            </div>
          ) : (
            <>
              <div className={styles.cardsGrid}>
                {articles.map((article) => (
                  <NewsCard key={article.id} lang={lang} news={article} />
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

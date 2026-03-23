"use client";

import { useState, useMemo } from 'react';
import NewsCard from '@/components/cards/NewsCard';
import styles from './styles.module.css';
import { NewsCardProps } from '@/types/News';
import { ApiPagination, ApiTheme } from '@/types/api/Article';
import { fetchArticles } from '@/lib/api/articles';
import SearchIcon from '@/public/icons/search.svg';

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
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [searchQuery, setSearchQuery]     = useState('');

  const hasMore = pagination.page < pagination.total_pages;

  const displayed = useMemo(() => {
    if (!searchQuery.trim()) return articles;
    const q = searchQuery.toLowerCase();
    return articles.filter(
      (a) => a.title.toLowerCase().includes(q) || a.resume.toLowerCase().includes(q)
    );
  }, [articles, searchQuery]);

  async function handleThemeChange(theme: string) {
    setSelectedTheme(theme);
    setLoading(true);
    const result = await fetchArticles({ theme: theme || undefined, page: 1, limit: 9 });
    setArticles(result.articles);
    setPagination(result.pagination);
    setLoading(false);
  }

  async function loadMore() {
    if (loading || !hasMore) return;
    setLoading(true);
    const result = await fetchArticles({
      theme: selectedTheme || undefined,
      page:  pagination.page + 1,
      limit: pagination.limit,
    });
    setArticles((prev) => [...prev, ...result.articles]);
    setPagination(result.pagination);
    setLoading(false);
  }

  return (
    <div className={styles.blogsPage}>

      {/* ── Search bar ── */}
      <div className={styles.searchBar}>
        <div className={styles.searchInner}>
          <SearchIcon width={18} height={18} className={styles.searchIcon} />
          <input
            type="search"
            placeholder="Rechercher un article..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* ── Body : filters + cards ── */}
      <div className={styles.body}>

        {/* Filters sidebar */}
        <aside className={styles.sidebar}>
          <p className={styles.sidebarTitle}>Thématique</p>

          <ul className={styles.filterList}>
            <li>
              <button
                className={`${styles.filterItem} ${selectedTheme === '' ? styles.filterItemActive : ''}`}
                onClick={() => handleThemeChange('')}
              >
                Tous
              </button>
            </li>
            {themes.map(({ libelle, slug }) => (
              <li key={slug}>
                <button
                  className={`${styles.filterItem} ${selectedTheme === slug ? styles.filterItemActive : ''}`}
                  onClick={() => handleThemeChange(slug)}
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
          ) : displayed.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyTitle}>Aucun article trouvé</p>
              <p className={styles.emptyText}>Essayez d&apos;autres critères de recherche.</p>
            </div>
          ) : (
            <>
              <div className={styles.cardsGrid}>
                {displayed.map((article) => (
                  <NewsCard key={article.id} lang={lang} news={article} />
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

"use client";

import { useState } from 'react';
import NewsCard from '@/components/cards/NewsCard';
import styles from './ArticlesGrid.module.css';
import { NewsCardProps } from '@/types/News';
import { ApiPagination } from '@/types/api/Article';
import { fetchArticles } from '@/lib/api/articles';

type Language = 'fr' | 'en';

interface ArticlesGridProps {
  lang: Language;
  initialArticles: NewsCardProps[];
  initialPagination: ApiPagination;
}

export default function ArticlesGrid({ lang, initialArticles, initialPagination }: ArticlesGridProps) {
  const [articles, setArticles] = useState<NewsCardProps[]>(initialArticles);
  const [pagination, setPagination] = useState<ApiPagination>(initialPagination);
  const [loading, setLoading] = useState(false);

  const hasMore = pagination.page < pagination.total_pages;

  async function loadMore() {
    if (loading || !hasMore) return;
    setLoading(true);

    const result = await fetchArticles({ page: pagination.page + 1, limit: pagination.limit });

    setArticles((prev) => [...prev, ...result.articles]);
    setPagination(result.pagination);
    setLoading(false);
  }

  return (
    <>
      <div className="infinite-hits-container mb-5">
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
  );
}

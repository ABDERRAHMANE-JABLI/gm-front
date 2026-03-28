'use client';

import { useState } from 'react';
import styles from '@/styles/listPage.module.css';
import UtensilHorizontalCard from '@/components/cards/utensilCard/HorizontaleCard';
import { UtensilItemProps } from '@/types/Utensils';
import { ApiPagination } from '@/types/api/Article';
import { loadMoreUtensilItems } from '@/lib/actions/utensils';

type Language = 'fr' | 'en';

interface UtensilCollectionContentProps {
  lang:              Language;
  collectionSlug:    string;
  initialItems:      UtensilItemProps[];
  initialPagination: ApiPagination;
}

export default function UtensilCollectionContent({
  lang,
  collectionSlug,
  initialItems,
  initialPagination,
}: UtensilCollectionContentProps) {
  const [items, setItems]           = useState<UtensilItemProps[]>(initialItems);
  const [pagination, setPagination] = useState<ApiPagination>(initialPagination);
  const [loading, setLoading]       = useState(false);

  const hasMore = pagination.page < pagination.total_pages;

  async function loadMore() {
    if (loading || !hasMore) return;
    setLoading(true);
    const result = await loadMoreUtensilItems(collectionSlug, {
      page:  pagination.page + 1,
      limit: pagination.limit,
    });
    setItems((prev) => {
      const seen = new Set(prev.map((i) => i.slug));
      return [...prev, ...result.items.filter((i) => !seen.has(i.slug))];
    });
    setPagination(result.pagination);
    setLoading(false);
  }

  return (
    <div className={styles.centeredContainer}>
      <div className={styles.cardsGrid}>
        {items.map((item) => (
          <UtensilHorizontalCard key={item.slug} lang={lang} utensil={item} />
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
    </div>
  );
}

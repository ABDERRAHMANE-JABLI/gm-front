'use client';

import { useState } from 'react';
import styles from '@/styles/listPage.module.css';
import UtensilCard from '@/components/cards/utensilCard';
import { UtensilProps } from '@/types/Utensils';
import { ApiPagination } from '@/types/api/Article';
import { loadMoreUtensils } from '@/lib/actions/utensils';

type Language = 'fr' | 'en';

interface UtensilsContentProps {
  lang:               Language;
  initialUtensils:    UtensilProps[];
  initialPagination:  ApiPagination;
}

export default function UtensilsContent({
  lang,
  initialUtensils,
  initialPagination,
}: UtensilsContentProps) {
  const [utensils, setUtensils]       = useState<UtensilProps[]>(initialUtensils);
  const [pagination, setPagination]   = useState<ApiPagination>(initialPagination);
  const [loading, setLoading]         = useState(false);

  const hasMore = pagination.page < pagination.total_pages;

  async function loadMore() {
    if (loading || !hasMore) return;
    setLoading(true);
    const result = await loadMoreUtensils({ page: pagination.page + 1, limit: pagination.limit });
    setUtensils((prev) => {
      const seen = new Set(prev.map((u) => u.slug));
      return [...prev, ...result.utensils.filter((u) => !seen.has(u.slug))];
    });
    setPagination(result.pagination);
    setLoading(false);
  }

  return (
    <div className={styles.centeredContainer}>
      {utensils.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyTitle}>Aucune collection trouvée</p>
          <p className={styles.emptyText}>Revenez bientôt pour découvrir nos collections.</p>
        </div>
      ) : (
        <>
          <div className={styles.cardsGrid}>
            {utensils.map((utensil) => (
              <UtensilCard key={utensil.slug} lang={lang} Utensil={utensil} />
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
  );
}

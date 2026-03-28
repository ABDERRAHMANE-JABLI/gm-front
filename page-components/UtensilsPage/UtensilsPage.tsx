import styles from '@/styles/listPage.module.css';
import UtensilsContent from './UtensilsContent';
import { fetchUtensils } from '@/lib/api/utensils';

interface UtensilsPageProps {
  lang: 'fr' | 'en';
}

export default async function UtensilsPage({ lang }: UtensilsPageProps) {
  const { utensils, pagination } = await fetchUtensils({ page: 1, limit: 9 });

  return (
    <div className={styles.listPage}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>
          {lang === 'fr' ? 'Nos collections' : 'Our collections'}
        </h1>
      </header>
      <UtensilsContent
        lang={lang}
        initialUtensils={utensils}
        initialPagination={pagination}
      />
    </div>
  );
}

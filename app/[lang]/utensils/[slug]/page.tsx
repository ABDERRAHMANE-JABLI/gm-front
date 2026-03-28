import { notFound } from 'next/navigation';
import Layout from '@/components/layout/Layout/Layout';
import { fetchUtensilItems, fetchUtensils } from '@/lib/api/utensils';
import UtensilCollectionContent from '@/page-components/UtensilsPage/UtensilCollectionContent';
import styles from '@/styles/listPage.module.css';
import { Language } from '@/lib/i18n/types';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export default async function UtensilCollectionPage({ params }: PageProps) {
  const { lang, slug } = await params;

  if (!['fr', 'en'].includes(lang)) notFound();
  const language = lang as Language;

  const [{ items, pagination }, collections] = await Promise.all([
    fetchUtensilItems(slug, { page: 1, limit: 9 }),
    fetchUtensils({ page: 1, limit: 50 }),
  ]);

  if (items.length === 0) notFound();

  const collection = collections.utensils.find((c) => c.slug === slug);
  const title = collection?.title ?? slug;

  return (
    <Layout language={language}>
      <div className={styles.listPage}>
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>{title}</h1>
        </header>
        <UtensilCollectionContent
          lang={language}
          collectionSlug={slug}
          initialItems={items}
          initialPagination={pagination}
        />
      </div>
    </Layout>
  );
}

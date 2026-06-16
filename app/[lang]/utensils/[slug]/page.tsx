import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Layout from '@/components/layout/Layout/Layout';
import { fetchUtensilItems, fetchUtensils } from '@/lib/api/utensils';
import UtensilCollectionContent from '@/page-components/UtensilsPage/UtensilCollectionContent';
import styles from '@/styles/listPage.module.css';
import { Language } from '@/lib/i18n/types';

export const revalidate = 86400;

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.gaultmillau.ma'
  const collections = await fetchUtensils({ page: 1, limit: 50 })
  const collection = collections.utensils.find((c) => c.slug === slug)
  const title = collection?.title ?? slug.replace(/-/g, ' ')
  const url = `${siteUrl}/${lang}/utensils/${slug}`

  return {
    title: `${title} | Gault&Millau Maroc`,
    description: `Découvrez la collection ${title} sélectionnée par Gault&Millau Maroc.`,
    alternates: {
      canonical: url,
      languages: {
        fr: `${siteUrl}/fr/utensils/${slug}`,
        en: `${siteUrl}/en/utensils/${slug}`,
      },
    },
  }
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

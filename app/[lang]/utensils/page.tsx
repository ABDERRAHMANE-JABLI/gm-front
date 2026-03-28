import Layout from "@/components/layout/Layout/Layout";
import UtensilsContent from "@/page-components/UtensilsPage/UtensilsContent";
import { fetchUtensils } from "@/lib/api/utensils";
import { Language } from "@/lib/i18n/types";
import styles from "@/styles/listPage.module.css";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Ustensiles - Gault&Millau',
    description: 'Découvrez les collections d\'ustensiles recommandées par Gault&Millau.',
  };
}

export default async function UtensilsPageRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const language = lang as Language;

  const { utensils, pagination } = await fetchUtensils({ page: 1, limit: 9 });

  return (
    <Layout language={language}>
      <div className={styles.listPage}>
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>
            {language === 'fr' ? 'Nos collections' : 'Our collections'}
          </h1>
        </header>
        <UtensilsContent
          lang={language}
          initialUtensils={utensils}
          initialPagination={pagination}
        />
      </div>
    </Layout>
  );
}

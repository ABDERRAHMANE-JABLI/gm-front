import { fetchArticles, fetchArticleFilters } from '@/lib/api/articles';
import BlogsContent from './BlogsContent';

type Language = 'fr' | 'en';

interface BlogsPageProps {
  lang: Language;
}

export default async function BlogsPage({ lang }: BlogsPageProps) {
  const [{ articles, pagination }, themes] = await Promise.all([
    fetchArticles({ page: 1, limit: 9 }),
    fetchArticleFilters(),
  ]);

  return (
    <BlogsContent
      lang={lang}
      initialArticles={articles}
      initialPagination={pagination}
      themes={themes}
    />
  );
}

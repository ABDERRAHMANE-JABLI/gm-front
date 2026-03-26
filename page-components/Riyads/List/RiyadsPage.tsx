import { fetchRiyads, fetchRiyadFilters } from '@/lib/api/riyads';
import RiyadsContent from './RiyadsContent';

type Language = 'fr' | 'en';

interface RiyadsPageProps {
  lang: Language;
}

export default async function RiyadsPage({ lang }: RiyadsPageProps) {
  const [{ riyads, pagination }, filters] = await Promise.all([
    fetchRiyads({ page: 1, limit: 9 }),
    fetchRiyadFilters(),
  ]);

  return (
    <RiyadsContent
      lang={lang}
      initialRiyads={riyads}
      initialPagination={pagination}
      filters={filters}
    />
  );
}

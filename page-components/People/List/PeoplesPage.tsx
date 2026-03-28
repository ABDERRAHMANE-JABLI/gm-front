import { fetchTalents, fetchTalentFilters } from '@/lib/api/talents';
import PeoplesContent from './PeoplesContent';

type Language = 'fr' | 'en';

interface PeoplesPageProps {
  lang: Language;
}

export default async function PeoplesPage({ lang }: PeoplesPageProps) {
  const [{ talents, pagination }, filters] = await Promise.all([
    fetchTalents({ page: 1, limit: 9 }),
    fetchTalentFilters(),
  ]);

  return (
    <PeoplesContent
      lang={lang}
      initialTalents={talents}
      initialPagination={pagination}
      filters={filters}
    />
  );
}

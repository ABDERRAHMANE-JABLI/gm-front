import { fetchArtisans, fetchArtisanFilters } from '@/lib/api/artisans';
import ArtisansContent from './ArtisansContent';

type Language = 'fr' | 'en';

interface ArtisansPageProps {
  lang: Language;
}

export default async function ArtisansPage({ lang }: ArtisansPageProps) {
  const [{ artisans, pagination }, filters] = await Promise.all([
    fetchArtisans({ page: 1, limit: 9 }),
    fetchArtisanFilters(),
  ]);

  return (
    <ArtisansContent
      lang={lang}
      initialArtisans={artisans}
      initialPagination={pagination}
      filters={filters}
    />
  );
}

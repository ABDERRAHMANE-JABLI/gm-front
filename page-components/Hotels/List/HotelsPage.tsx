import { fetchHotels, fetchHotelFilters } from '@/lib/api/hotels';
import HotelsContent from './HotelsContent';

type Language = 'fr' | 'en';

interface HotelsPageProps {
  lang: Language;
}

export default async function HotelsPage({ lang }: HotelsPageProps) {
  const [{ hotels, pagination }, filters] = await Promise.all([
    fetchHotels({ page: 1, limit: 9 }),
    fetchHotelFilters(),
  ]);

  return (
    <HotelsContent
      lang={lang}
      initialHotels={hotels}
      initialPagination={pagination}
      filters={filters}
    />
  );
}

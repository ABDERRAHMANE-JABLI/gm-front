import { fetchRestaurants, fetchRestaurantFilters } from '@/lib/api/restaurants';
import RestaurantsContent from './RestaurantsContent';

type Language = 'fr' | 'en';

interface RestaurantsPageProps {
  lang: Language;
}

export default async function RestaurantsPage({ lang }: RestaurantsPageProps) {
  const [{ restaurants, pagination }, filters] = await Promise.all([
    fetchRestaurants({ page: 1, limit: 9 }),
    fetchRestaurantFilters(),
  ]);

  return (
    <RestaurantsContent
      lang={lang}
      initialRestaurants={restaurants}
      initialPagination={pagination}
      filters={filters}
    />
  );
}

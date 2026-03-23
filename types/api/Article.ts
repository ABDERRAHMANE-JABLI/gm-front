export interface ApiLinkedEntity {
  name?: string;    // restaurant, hotel, riyad
  title?: string;   // artisan
  fullName?: string; // talent
  slug: string;
}

export interface ApiTheme {
  libelle: string;
  slug: string;
}

export interface ApiArticleFilters {
  themes: ApiTheme[];
}

export interface ApiArticle {
  title: string;
  slug: string;
  resume: string;
  thumbId: string;
  theme: { libelle: string; slug: string } | null;
  talent: ApiLinkedEntity | null;
  restaurant: ApiLinkedEntity | null;
  hotel: ApiLinkedEntity | null;
  riyad: ApiLinkedEntity | null;
  artisan: ApiLinkedEntity | null;
}

export interface ApiPagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface ApiArticleListResponse {
  data: ApiArticle[];
  pagination: ApiPagination;
}

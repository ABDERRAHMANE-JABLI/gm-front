export interface ApiLinkedEntity {
  name?: string;      // restaurant, hotel, riyad
  title?: string;     // artisan
  fullName?: string;  // talent
  slug: string;
  lieu?: string;      // restaurant, hotel, riyad, artisan
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
  theme: string;
  talent: ApiLinkedEntity | null;
  restaurant: ApiLinkedEntity | null;
  hotel: ApiLinkedEntity | null;
  riyad: ApiLinkedEntity | null;
  artisan: ApiLinkedEntity | null;
}

export interface ApiArticleDetailTalent {
  fullName: string;
  slug: string;
  thumbId: string | null;
  gendre?: string | null;
  nbrToques: number | null;
  noteGM: number | null;
  awards: string[];
  roles: string[];
}

export interface ApiArticleDetailRestaurant {
  name: string;
  slug: string;
  thumbId: string | null;
  nbrToques: number;
  noteGM: number | null;
  budgetMin: number | null;
  budgetMax: number | null;
  isSponsorised: boolean;
  cuisines: string[];
  lieu?: string;
  chef?: string;
}

export interface ApiArticleDetailHotel {
  name: string;
  slug: string;
  thumbId: string | null;
  nbrStars?: number | null;
  nbrToques?: number | null;
  noteGM?: number | null;
  budgetMin?: number | null;
  budgetMax?: number | null;
  isSponsorised?: boolean;
  services?: string[];
  lieu?: string;
}

export interface ApiArticleDetailArtisan {
  title: string;
  slug: string;
  thumbId: string | null;
  mainActivity?: { libelle: string } | null;
  isSponsorised?: boolean;
  isSelected?: boolean | null;
  services?: string[];
  otherActivities?: string[];
  lieu?: string;
}

export interface ApiArticleDetail {
  title: string;
  slug: string;
  resume: string;
  createdAt: string;
  updatedAt?: string | null;
  thumbId: string;
  content: string;
  theme?: string | null;
  talent: ApiArticleDetailTalent | null;
  restaurant: ApiArticleDetailRestaurant | null;
  hotel: ApiArticleDetailHotel | null;
  riyad: ApiArticleDetailHotel | null;
  artisan: ApiArticleDetailArtisan | null;
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

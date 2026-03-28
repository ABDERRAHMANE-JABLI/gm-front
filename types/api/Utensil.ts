import { ApiPagination } from './Article';

export interface ApiUtensil {
  name:    string;
  slug:    string;
  thumbId: string | null;
}

export interface ApiUtensilListResponse {
  data:       ApiUtensil[];
  pagination: ApiPagination;
}

export interface ApiUtensilItem {
  name:         string;
  slug:         string;
  thumbId:      string | null;
  refUstensil?: string;
  description?: string;
}

export interface ApiUtensilItemListResponse {
  data:       ApiUtensilItem[];
  pagination: ApiPagination;
}

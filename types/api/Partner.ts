export interface ApiPartner {
  name:      string;
  thumbId:   string;
  website:   string;
  categorie: string;
}

export interface ApiPartnersResponse {
  data:       ApiPartner[];
  total:      number;
  page:       number;
  totalPages: number;
}

export interface Offer {
  courseName: string;
  rating: number;
  fullPrice: string;
  offeredPrice: string;
  discountPercentage: string;
  kind: string;
  level: string;
  iesLogo: string;
  iesName: string;
}

export interface QueryFilters {
  level?: string[];
  kind?: string[];
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: 'courseName' | 'offeredPrice' | 'rating';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  fields?: string[];
}

export interface PaginatedResponse {
  data: Offer[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

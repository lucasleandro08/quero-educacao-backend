export interface RawOffer {
    courseName: string;
    rating: number;
    fullPrice: number;
    offeredPrice: number;
    kind: 'Presencial' | 'EaD';
    level: 'bacharelado' | 'tecnologo' | 'licenciatura';
    iesLogo: string;
    iesName: string;
}

export interface ProcessedOffer {
    courseName: string;
    rating: number;
    fullPrice: string;
    offeredPrice: string;
    kind: string;
    level: string;
    iesLogo: string;
    iesName: string;
    discountPercentage: string;
}

export interface QueryFilters {
  level?: ('bacharelado' | 'tecnologo' | 'licenciatura')[];
  kind?: ('Presencial' | 'EaD')[];
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: 'courseName' | 'offeredPrice' | 'rating';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  fields?: (keyof ProcessedOffer)[];
}


export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}
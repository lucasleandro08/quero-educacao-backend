import { DataLoader } from '../data/loadData.js';
import { RawOffer, ProcessedOffer, QueryFilters, PaginatedResponse } from '../domain/offer.js';
import { KIND_MAPPINGS, LEVEL_MAPPINGS, formatCurrency, calculateDiscountPercentage } from '../domain/mappings.js';

export class OfferQueryService {
  private dataLoader: DataLoader;

  constructor() {
    this.dataLoader = DataLoader.getInstance();
  }

  queryOffers(filters: QueryFilters = {}): PaginatedResponse<Partial<ProcessedOffer>> {
     const rawData = this.dataLoader.loadRawOffers();
    

    if (!Array.isArray(rawData)) {
      console.warn('DataLoader.loadRawOffers() não retornou array:', {
        type: typeof rawData,
        value: rawData
      });
      
      return {
        data: [],
        pagination: {
          currentPage: filters.page || 1,
          totalPages: 0,
          totalItems: 0,
          itemsPerPage: filters.limit || 10
        }
      };
    }

    const rawOffers = rawData;
    

    let filteredOffers = this.applyFilters(rawOffers, filters);
    
    filteredOffers = this.applySorting(filteredOffers, filters);
    
    const paginatedResult = this.applyPagination(filteredOffers, filters);
    
    const processedOffers = paginatedResult.data.map(offer => this.processOffer(offer));
    const selectedFieldsOffers = this.selectFields(processedOffers, filters.fields);
    
    return {
      data: selectedFieldsOffers,
      pagination: paginatedResult.pagination
    };
  }

  private applyFilters(offers: RawOffer[], filters: QueryFilters): RawOffer[] {
    return offers.filter(offer => {
      
      if (filters.level && filters.level.length > 0) {
        if (!filters.level.includes(offer.level)) {
          return false;
        }
      }

      if (filters.kind && filters.kind.length > 0) {
        if (!filters.kind.includes(offer.kind)) {
          return false;
        }
      }

      if (filters.minPrice !== undefined && offer.offeredPrice < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice !== undefined && offer.offeredPrice > filters.maxPrice) {
        return false;
      }

      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        if (!offer.courseName.toLowerCase().includes(searchTerm)) {
          return false;
        }
      }

      return true;
    });
  }

  private applySorting(offers: RawOffer[], filters: QueryFilters): RawOffer[] {
    if (!filters.sortBy) {
      return offers;
    }

    const sortOrder = filters.sortOrder || 'asc';
    const multiplier = sortOrder === 'asc' ? 1 : -1;

    return [...offers].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (filters.sortBy) {
        case 'courseName':
          aValue = a.courseName;
          bValue = b.courseName;
          break;
        case 'offeredPrice':
          aValue = a.offeredPrice;
          bValue = b.offeredPrice;
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        default:
          return 0;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * multiplier;
      }
      
      return ((aValue as number) - (bValue as number)) * multiplier;
    });
  }

  private applyPagination(offers: RawOffer[], filters: QueryFilters): {
    data: RawOffer[];
    pagination: PaginatedResponse<any>['pagination'];
  } {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const totalItems = offers.length;
    const totalPages = Math.ceil(totalItems / limit);
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    return {
      data: offers.slice(startIndex, endIndex),
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit
      }
    };
  }

  private processOffer(rawOffer: RawOffer): ProcessedOffer {
    return {
      courseName: rawOffer.courseName,
      rating: rawOffer.rating,
      fullPrice: formatCurrency(rawOffer.fullPrice),
      offeredPrice: formatCurrency(rawOffer.offeredPrice),
      discountPercentage: calculateDiscountPercentage(rawOffer.fullPrice, rawOffer.offeredPrice),
      kind: KIND_MAPPINGS[rawOffer.kind],
      level: LEVEL_MAPPINGS[rawOffer.level],
      iesLogo: rawOffer.iesLogo,
      iesName: rawOffer.iesName
    };
  }

 private selectFields(offers: ProcessedOffer[], fields?: (keyof ProcessedOffer)[]): Partial<ProcessedOffer>[] {
    if (!fields || fields.length === 0) {
        return offers;
    }

    return offers.map(offer => {
        const selectedOffer: Partial<ProcessedOffer> = {};
        fields.forEach(field => {
            if (field in offer && offer[field] !== undefined) {
                (selectedOffer as any)[field] = offer[field];
            }
        });
        return selectedOffer;
    });
}
}

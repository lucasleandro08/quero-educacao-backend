import { describe, it, expect, beforeEach } from 'vitest';
import { OfferQueryService } from '../src/services/queryOffers.js';
import { QueryFilters } from '../src/domain/offer.js';

describe('OfferQueryService', () => {
  let service: OfferQueryService;

  beforeEach(() => {
    service = new OfferQueryService();
  });

  it('should return paginated offers without filters', () => {
    const result = service.queryOffers({ page: 1, limit: 5 });
    
    expect(result.data).toHaveLength(5);
    expect(result.pagination.currentPage).toBe(1);
    expect(result.pagination.itemsPerPage).toBe(5);
  });

  it('should filter offers by level', () => {
    const filters: QueryFilters = { level: ['bacharelado'], limit: 100 };
    const result = service.queryOffers(filters);
    
    result.data.forEach(offer => {
      expect(offer.level).toBe('Graduação (bacharelado) 🎓');
    });
  });

  it('should filter offers by search term', () => {
    const filters: QueryFilters = { search: 'medicina', limit: 100 };
    const result = service.queryOffers(filters);
    
    result.data.forEach(offer => {
      expect(offer.courseName?.toLowerCase()).toContain('medicina');
    });
  });

  it('should sort offers by price ascending', () => {
    const filters: QueryFilters = { sortBy: 'offeredPrice', sortOrder: 'asc', limit: 10 };
    const result = service.queryOffers(filters);
    
    for (let i = 1; i < result.data.length; i++) {
      const prevPrice = parseFloat(result.data[i-1].offeredPrice?.replace(/[R$\s.,]/g, '') || '0');
      const currPrice = parseFloat(result.data[i].offeredPrice?.replace(/[R$\s.,]/g, '') || '0');
      expect(prevPrice).toBeLessThanOrEqual(currPrice);
    }
  });

  it('should select only specified fields', () => {
    const filters: QueryFilters = { fields: ['courseName', 'offeredPrice'], limit: 1 };
    const result = service.queryOffers(filters);
    
    const offer = result.data[0];
    expect(Object.keys(offer)).toEqual(['courseName', 'offeredPrice']);
  });
});

import { useState, useCallback } from 'react';
import { apiService } from '../components/services/api';
import { QueryFilters, PaginatedResponse } from '../components/types/offer';

export const useOffers = () => {
  const [data, setData] = useState<PaginatedResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOffers = useCallback(async (filters: QueryFilters) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await apiService.getOffers(filters);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar ofertas');
    } finally {
      setIsLoading(false);
    }  
  }, []);

  return {
    data,
    isLoading,
    error,
    fetchOffers
  };
};
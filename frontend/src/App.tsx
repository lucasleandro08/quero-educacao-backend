import React, { useState, useEffect, useCallback } from 'react';
import { Layout } from './components/layout/Layout';
import { SearchBar } from './components/filters/SearchBar';
import { FilterPanel } from './components/filters/FilterPanel';
import { OfferList } from './offer/OfferList';
import { Pagination } from './components/ui/Pagination';
import { useOffers } from '../src/hooks/useOffers';
import { QueryFilters } from '../src/components/types/offer';
import './styles/globals.css';

const App: React.FC = () => {
  const { data, isLoading, error, fetchOffers } = useOffers();
  const [filters, setFilters] = useState<QueryFilters>({
    page: 1,
    limit: 12
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Debounce para busca
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Atualizar filtros quando o termo de busca mudar
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      search: debouncedSearchTerm || undefined,
      page: 1 
    }));
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchOffers(filters);
  }, [filters, fetchOffers]);

  const handleFiltersChange = useCallback((newFilters: QueryFilters) => {
    setFilters(newFilters);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setFilters(prev => ({ ...prev, page }));
  }, []);

  const handleItemsPerPageChange = useCallback((itemsPerPage: number) => {
    setFilters(prev => ({ ...prev, limit: itemsPerPage, page: 1 }));
  }, []);

  return (
    <Layout 
      totalOffers={data?.pagination.totalItems || 0} 
      isLoading={isLoading}
    >
      <div className="space-y-8">
        <div className="container">
          <h2 className="hero-title">
            Encontre sua graduação ideal!
          </h2>
          <p className="hero-subtitle">
            Compare ofertas de bolsa de estudo das melhores instituições de ensino superior do Brasil.
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Busque por curso: Medicina, Engenharia, Direito..."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <FilterPanel
                filters={filters}
                onFiltersChange={handleFiltersChange}
              />
            </div>
          </div>
          <div className="lg:col-span-3 space-y-6">
            {data && !isLoading && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Ofertas encontradas
                  </h3>
                  <p className="text-sm text-gray-600">
                    {data.pagination.totalItems} {data.pagination.totalItems === 1 ? 'resultado' : 'resultados'} 
                    {searchTerm && ` para "${searchTerm}"`}
                  </p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <span className="text-sm text-gray-500">
                    Página {data.pagination.currentPage} de {data.pagination.totalPages}
                  </span>
                </div>
              </div>
            )}

            <OfferList
              offers={data?.data || []}
              isLoading={isLoading}
              error={error}
            />

            {data && data.pagination.totalPages > 1 && (
              <Pagination
                currentPage={data.pagination.currentPage}
                totalPages={data.pagination.totalPages}
                totalItems={data.pagination.totalItems}
                itemsPerPage={data.pagination.itemsPerPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;

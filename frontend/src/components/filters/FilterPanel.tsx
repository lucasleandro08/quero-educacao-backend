import React from 'react';
import { QueryFilters } from '../../types/offer';

interface FilterPanelProps {
  filters: QueryFilters;
  onFiltersChange: (filters: QueryFilters) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFiltersChange
}) => {
  const updateFilter = (key: keyof QueryFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: 'level' | 'kind', value: string) => {
    const currentArray = filters[key] || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    updateFilter(key, newArray.length > 0 ? newArray : undefined);
  };

  const clearAllFilters = () => {
    onFiltersChange({
      page: 1,
      limit: filters.limit
    });
  };

  const hasActiveFilters = Boolean(
    filters.level?.length || 
    filters.kind?.length || 
    filters.minPrice || 
    filters.maxPrice || 
    filters.search
  );

  return (
    <div className="card">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-primary-blue hover:text-primary-blue-dark"
            >
              Limpar filtros
            </button>
          )}
        </div>

        <div className="space-y-6">
          {/* Tipo de graduação */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Tipo de Graduação</h4>
            <div className="space-y-2">
              {[
                { value: 'bacharelado', label: 'Bacharelado 🎓' },
                { value: 'tecnologo', label: 'Tecnólogo 🎓' },
                { value: 'licenciatura', label: 'Licenciatura 🎓' }
              ].map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.level?.includes(option.value) || false}
                    onChange={() => toggleArrayFilter('level', option.value)}
                    className="w-4 h-4 text-primary-blue border-gray-300 rounded focus:ring-primary-blue focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Modalidade */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Modalidade</h4>
            <div className="space-y-2">
              {[
                { value: 'Presencial', label: 'Presencial 🏫' },
                { value: 'EaD', label: 'EaD 🏠' }
              ].map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.kind?.includes(option.value) || false}
                    onChange={() => toggleArrayFilter('kind', option.value)}
                    className="w-4 h-4 text-primary-blue border-gray-300 rounded focus:ring-primary-blue focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Faixa de Preço */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Faixa de Preço</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Preço mínimo</label>
                <input
                  type="number"
                  placeholder="R$ 0"
                  value={filters.minPrice || ''}
                  onChange={(e) => updateFilter('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                  className="input text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Preço máximo</label>
                <input
                  type="number"
                  placeholder="R$ 10000"
                  value={filters.maxPrice || ''}
                  onChange={(e) => updateFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                  className="input text-sm"
                />
              </div>
            </div>
          </div>

          {/* Ordenação */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Ordenar por</h4>
            <select
              value={filters.sortBy || ''}
              onChange={(e) => updateFilter('sortBy', e.target.value || undefined)}
              className="select text-sm"
            >
              <option value="">Selecione...</option>
              <option value="courseName">Nome do curso</option>
              <option value="offeredPrice">Preço com desconto</option>
              <option value="rating">Avaliação</option>
            </select>
            
            {filters.sortBy && (
              <div className="mt-2 flex space-x-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sortOrder"
                    value="asc"
                    checked={filters.sortOrder === 'asc'}
                    onChange={(e) => updateFilter('sortOrder', e.target.value as 'asc' | 'desc')}
                    className="w-4 h-4 text-primary-blue"
                  />
                  <span className="ml-1 text-xs text-gray-600">Crescente</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sortOrder"
                    value="desc"
                    checked={filters.sortOrder === 'desc'}
                    onChange={(e) => updateFilter('sortOrder', e.target.value as 'asc' | 'desc')}
                    className="w-4 h-4 text-primary-blue"
                  />
                  <span className="ml-1 text-xs text-gray-600">Decrescente</span>
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

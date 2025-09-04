import React from 'react';
import { QueryFilters } from '../types/offer';

interface FilterPanelProps {
  filters: QueryFilters;
  onFiltersChange: (filters: QueryFilters) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFiltersChange
}) => {
  const updateFilter = (key: keyof QueryFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value, page: 1 }); 
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
      limit: filters.limit || 12
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
    <div className="filter-panel">
      <div className="filter-header">
        <h3 className="filter-title">Filtros</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="clear-filters-btn"
          >
            Limpar tudo
          </button>
        )}
      </div>

      <div className="filter-sections">
        {/* Tipo de graduação */}
        <div className="filter-section">
          <h4 className="section-title">Tipo de Graduação</h4>
          <div className="checkbox-group">
            {[
              { value: 'bacharelado', label: 'Bacharelado', emoji: '🎓' },
              { value: 'tecnologo', label: 'Tecnólogo', emoji: '🎓' },
              { value: 'licenciatura', label: 'Licenciatura', emoji: '🎓' }
            ].map(option => (
              <label key={option.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={filters.level?.includes(option.value) || false}
                  onChange={() => toggleArrayFilter('level', option.value)}
                  className="custom-checkbox"
                />
                <span className="checkbox-label">
                  <span className="checkbox-emoji">{option.emoji}</span>
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Modalidade */}
        <div className="filter-section">
          <h4 className="section-title">Modalidade</h4>
          <div className="checkbox-group">
            {[
              { value: 'presencial', label: 'Presencial', emoji: '🏫' },
              { value: 'ead', label: 'EaD', emoji: '🏠' }
            ].map(option => (
              <label key={option.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={filters.kind?.includes(option.value) || false}
                  onChange={() => toggleArrayFilter('kind', option.value)}
                  className="custom-checkbox"
                />
                <span className="checkbox-label">
                  <span className="checkbox-emoji">{option.emoji}</span>
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Faixa de preço */}
        <div className="filter-section">
          <h4 className="section-title">Faixa de Preço</h4>
          <div className="price-inputs">
            <div className="price-input-group">
              <label className="input-label">Preço mínimo</label>
              <input
                type="number"
                placeholder="R$ 0"
                value={filters.minPrice || ''}
                onChange={(e) => updateFilter('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                className="price-input"
                min="0"
                step="50"
              />
            </div>
            <div className="price-input-group">
              <label className="input-label">Preço máximo</label>
              <input
                type="number"
                placeholder="R$ 10000"
                value={filters.maxPrice || ''}
                onChange={(e) => updateFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                className="price-input"
                min="0"
                step="50"
              />
            </div>
          </div>
        </div>

        {/* Ordenação */}
        <div className="filter-section">
          <h4 className="section-title">Ordenar por</h4>
          <select
            value={filters.sortBy || ''}
            onChange={(e) => updateFilter('sortBy', e.target.value || undefined)}
            className="sort-select"
          >
            <option value="">Selecione...</option>
            <option value="courseName">Nome do curso</option>
            <option value="offeredPrice">Preço com desconto</option>
            <option value="rating">Avaliação</option>
          </select>
          
          {filters.sortBy && (
            <div className="sort-order">
              <label className="radio-item">
                <input
                  type="radio"
                  name="sortOrder"
                  value="asc"
                  checked={filters.sortOrder === 'asc' || !filters.sortOrder}
                  onChange={(e) => updateFilter('sortOrder', e.target.value as 'asc' | 'desc')}
                  className="custom-radio"
                />
                <span>Crescente</span>
              </label>
              <label className="radio-item">
                <input
                  type="radio"
                  name="sortOrder"
                  value="desc"
                  checked={filters.sortOrder === 'desc'}
                  onChange={(e) => updateFilter('sortOrder', e.target.value as 'asc' | 'desc')}
                  className="custom-radio"
                />
                <span>Decrescente</span>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Offer } from '../components/types/offer';
import { OfferCard } from './OfferCard';

interface OfferListProps {
  offers: Offer[];
  isLoading: boolean;
  error?: string | null;
}

export const OfferList: React.FC<OfferListProps> = ({ 
  offers, 
  isLoading, 
  error 
}) => {
  if (isLoading) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="offer-card-skeleton animate-pulse">
          <div className="skeleton-header">
            <div className="skeleton-logo"></div>
            <div className="skeleton-rating"></div>
          </div>
          <div className="skeleton-title"></div>
          <div className="skeleton-badges">
            <div className="skeleton-badge"></div>
            <div className="skeleton-badge"></div>
          </div>
          <div className="skeleton-pricing">
            <div className="skeleton-price"></div>
            <div className="skeleton-price"></div>
          </div>
          <div className="skeleton-button"></div>
        </div>
      ))}
    </div>
  );
}

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Erro ao carregar ofertas
        </h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="btn btn-primary"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (offers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🔍</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Nenhuma oferta encontrada
        </h3>
        <p className="text-gray-600">
          Tente ajustar os filtros de busca para encontrar mais resultados.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {offers.map((offer, index) => (
        <OfferCard key={`${offer.courseName}-${index}`} offer={offer} />
      ))}
    </div>
  );
};

import React from 'react';
import { Offer } from '../../types/offer';

interface OfferCardProps {
  offer: Offer;
}

export const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        {/* Header com logo e instituição */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={offer.iesLogo}
              alt={`Logo ${offer.iesName}`}
              className="w-12 h-12 object-contain rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <div>
              <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
                {offer.courseName}
              </h3>
              <p className="text-sm text-gray-600">{offer.iesName}</p>
            </div>
          </div>
          
          {/* Rating */}
          <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-lg">
            <span className="text-yellow-500">⭐</span>
            <span className="text-sm font-medium text-gray-700">
              {offer.rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {offer.level}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {offer.kind}
          </span>
        </div>

        {/* Preços */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 line-through">
              De: {offer.fullPrice}
            </span>
            <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
              {offer.discountPercentage}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary-blue">
              {offer.offeredPrice}
            </span>
            <span className="text-xs text-gray-500">por mês</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6">
          <button className="w-full btn btn-primary">
            Ver oferta completa
          </button>
        </div>
      </div>
    </div>
  );
};


import React from 'react';
import { Offer } from '../components/types/offer';

interface OfferCardProps {
  offer: Offer;
}

export const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
  return (
    <div className="offer-card">
      <div className="offer-card-content">
        <div className="offer-header">
          <div className="offer-institution">
            <img
              src={offer.iesLogo}
              alt={`Logo ${offer.iesName}`}
              className="institution-logo"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <div className="institution-info">
              <p className="institution-name">{offer.iesName}</p>
            </div>
          </div>
          
          <div className="rating-badge">
            <span className="star-icon">⭐</span>
            <span className="rating-value">{offer.rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="course-title-section">
          <h3 className="course-title">{offer.courseName}</h3>
        </div>

        <div className="badges-section">
          <span className="badge badge-level">{offer.level}</span>
          <span className="badge badge-kind">{offer.kind}</span>
        </div>

        <div className="pricing-section">
          <div className="price-comparison">
            <div className="original-price-row">
              <span className="original-price">De: {offer.fullPrice}</span>
              <span className="discount-badge">{offer.discountPercentage}</span>
            </div>
            
            <div className="final-price-row">
              <span className="final-price">{offer.offeredPrice}</span>
              <span className="per-month">por mês</span>
            </div>
          </div>
        </div>
      </div>
      <div className="offer-card-footer">
        <button className="cta-button">
          Ver oferta completa
        </button>
      </div>
    </div>
  );
};

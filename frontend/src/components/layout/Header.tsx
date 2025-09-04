import React from 'react';

interface HeaderProps {
  totalOffers: number;
  isLoading: boolean;
}

export const Header: React.FC<HeaderProps> = ({ totalOffers, isLoading }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Ofertas de Bolsa de Estudo
                </h1>
                <p className="text-sm text-gray-600">
                  Encontre a graduação ideal para você
                </p>
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-lg">
            <span className="text-2xl">🎓</span>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {isLoading ? '...' : totalOffers.toLocaleString('pt-BR')}
              </p>
              <p className="text-xs text-gray-600">
                ofertas disponíveis
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

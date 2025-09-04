import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  totalOffers: number;
  isLoading: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  totalOffers, 
  isLoading 
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="header-container">
        <div className="header-wrapper">
          {/* Logo e título */}
          <div className="header-brand">
            <div className="brand-icon">
              <span className="brand-letter">Q</span>
            </div>
            <div className="brand-text">
              <h1 className="brand-title">Ofertas de Bolsa de Estudo</h1>
              <p className="brand-subtitle">Encontre a graduação ideal para você</p>
            </div>
          </div>

          {/* Contador de ofertas */}
          <div className="offers-counter">
            <div className="counter-icon">🎓</div>
            <div className="counter-text">
              <span className="counter-number">
                {isLoading ? '...' : totalOffers.toLocaleString('pt-BR')}
              </span>
              <span className="counter-label">ofertas disponíveis</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="footer-container">
        <div className="footer-content">
          <p className="footer-text">
            © 2025 Quero Educação - Desafio Técnico
          </p>
          <p className="footer-subtext">
            Desenvolvido com React, TypeScript e Node.js
          </p>
        </div>
      </footer>
    </div>
  );
};

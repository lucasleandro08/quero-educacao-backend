import React from 'react';
import { Header } from './Header';

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
      <Header totalOffers={totalOffers} isLoading={isLoading} />
      
      <main className="container py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container py-8">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              © 2025 Quero Educação - Desafio Técnico
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Desenvolvido com React, TypeScript e Node.js
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

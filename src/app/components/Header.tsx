'use client';
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Category } from '../types';
import { Sidebar } from './Sidebar';
import { LOCAL, PRODUCTION } from '../lib/constants';

interface HeaderProps {
  title?: string;
  onMenuClick: () => void;
}

export const Header = ({ title, onMenuClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${PRODUCTION}/category-stock`);
        if (!response.ok) throw new Error('Error al cargar categorías');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error:', error);
        setError(error instanceof Error ? error.message : 'Error desconocido');
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-14 bg-black text-white z-40">
        <div className="h-full px-4 flex items-center justify-between">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-white"
            aria-label="Abrir menú"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-medium">{title || 'Alfa Store'}</h1>
          <div className="w-6" />
        </div>
      </header>

      <Sidebar 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        categories={categories}
      />
    </>
  );
};
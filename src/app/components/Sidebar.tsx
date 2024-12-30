'use client';

import { FC } from 'react';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Category } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
}

export const Sidebar: FC<SidebarProps> = ({ isOpen, onClose, categories = [] }) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/');
    onClose();
  };

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/category/${categoryId}`);
    onClose();
  };

  return (
    <aside className="fixed top-0 left-0 h-full w-4/5 max-w-xs bg-black z-50">
      <div className="flex justify-between items-center h-14 px-4">
        <h2 className="text-white text-xl">Menú</h2>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-300"
          aria-label="Cerrar menú"
        >
          <X size={24} />
        </button>
      </div>

      <nav>
        <button
          onClick={handleHomeClick}
          className="block w-full text-left text-white px-4 py-3 hover:bg-gray-900"
        >
          INICIO
        </button>
        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => handleCategoryClick(category._id)}
            className="block w-full text-left text-white px-4 py-3 hover:bg-gray-900"
          >
            {category.name.toUpperCase()}
          </button>
        ))}
      </nav>
    </aside>
  );
};
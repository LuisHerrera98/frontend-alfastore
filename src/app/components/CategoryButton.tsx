'use client';

import { FC } from 'react';
import { Category } from '../types';

interface CategoryButtonProps {
  category: Category;
  onClick?: (category: Category) => void;
}

export const CategoryButton: FC<CategoryButtonProps> = ({ category, onClick }) => (
  <button
    onClick={() => onClick?.(category)}
    className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800"
  >
    {category.name}
  </button>
);
import { useState, useEffect } from 'react';
import { Category } from '../types';
import { fetchCategories } from '../lib/api';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar categorías');
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  return { categories, isLoading, error };
}
'use client';
import { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { WhatsAppButton } from '../../components/WhatsAppButton';
import { Category } from '../../types';
import { useParams, useRouter } from 'next/navigation';
import { LOCAL, PRODUCTION } from '@/app/lib/constants';

interface Size {
  _id: string;
  name: string;
}

export default function CategoryView() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  const params = useParams();
  const categoryId = params.categoryId as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        const [categoriesResponse, sizesResponse] = await Promise.all([
          fetch(`${PRODUCTION}/category-stock`),
          fetch(`${PRODUCTION}/size/${categoryId}`)
        ]);

        if (!categoriesResponse.ok || !sizesResponse.ok) 
          throw new Error('Error al cargar datos');

        const [categoriesData, sizesData] = await Promise.all([
          categoriesResponse.json(),
          sizesResponse.json()
        ]);

        setCategories(categoriesData);
        setSizes(sizesData);
        setCurrentCategory(categoriesData.find((cat: Category) => cat._id === categoryId));
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Error desconocido');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  const handleSizeClick = (size: Size) => {
    router.push(`/size/${size._id}?name=${size.name}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onMenuClick={() => setIsMenuOpen(true)} />
      <Sidebar 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        categories={categories}
      />
      
      <main className="pt-16 px-4">
        <h2 className="text-l font-bold my-4 text-center">
          Talles {currentCategory?.name || ''}
        </h2>
        
        {isLoading && <div className="text-center py-4">Cargando talles...</div>}
        {error && <div className="text-red-500 text-center py-4">{error}</div>}

        <div className="space-y-4">
          {sizes.map((size) => (
            <button
              key={size._id}
              onClick={() => handleSizeClick(size)}
              className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800"
            >
              {size.name}
            </button>
          ))}
        </div>
      </main>

      <WhatsAppButton />
    </div>
  );
}
// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { CategoryButton } from "./components/CategoryButton";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { Category } from "./types";
import { useRouter } from "next/navigation";
import { LOCAL, PRODUCTION } from "./lib/constants";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${PRODUCTION}/category-stock`);
        if (!response.ok) throw new Error("Error al cargar las categorías");
        const data = await response.json();
        setCategories(data || []);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category: Category) => {
    router.push(`/category/${category._id}`);
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
        <h2 className="text-l font-bold my-4 text-center">Categorias</h2>{" "}
        {/* Cambiado de text-2xl a text-xl */}
        {isLoading && (
          <div className="text-center py-4">Cargando categorías...</div>
        )}
        {error && <div className="text-red-500 text-center py-4">{error}</div>}
        <div className="space-y-4">
          {categories.map((category) => (
            <CategoryButton
              key={category._id}
              category={category}
              onClick={handleCategoryClick}
            />
          ))}
        </div>
      </main>

      <WhatsAppButton />
    </div>
  );
}

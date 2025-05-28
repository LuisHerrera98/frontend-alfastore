"use client";
import { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { WhatsAppButton } from "../../components/WhatsAppButton";
import { X } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { LOCAL, PRODUCTION } from "@/app/lib/constants";

interface Product {
  _id: string;
  name: string;
  price: number;
  images: { url: string; publicId: string }[];
}

export default function SizeView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const params = useParams();
  const searchParams = useSearchParams();
  const sizeId = params.sizeId as string;
  const sizeName = searchParams.get("name");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${PRODUCTION}/product/by-size/${sizeId}?page=${pageNum}&limit=8`
        );
        if (!response.ok) throw new Error("Error al cargar datos");
        const productsData = await response.json();
        setProducts(productsData.data || []);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [sizeId, pageNum]);

  return (
    <div className="min-h-screen bg-white">
      <Header title={`Talles ${sizeName || ""}`} onMenuClick={() => {}} />

      <main className="pt-16 px-2">
        {isLoading && (
          <div className="text-center py-4">Cargando productos...</div>
        )}
        {error && <div className="text-red-500 text-center py-4">{error}</div>}

        <div className="grid grid-cols-2 gap-2">
          {products.map((product) => (
            <div key={product._id} className="w-[46vw] shadow-lg">
              <img
                src={product.images[0]?.url || "/placeholder.jpg"}
                alt={product.name}
                className="w-full aspect-square object-cover"
                onClick={() => setSelectedImage(product.images[0]?.url)}
              />
              <div className="mt-1 px-1 bg-gray-50">
                <h2 className="font-medium text-sm">{product.name}</h2>
                <p className="text-sm">
                  Precio: ${product.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {products.length === 8 && (
          <button
            onClick={() => setPageNum((prev) => prev + 1)}
            className="w-full mt-4 bg-black text-white py-2 rounded font-medium"
          >
            Cargar más
          </button>
        )}
      </main>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-lg w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="fixed top-[10vh] right-4 bg-white rounded-full p-2"
              aria-label="Cerrar"
            >
              <X size={24} />
            </button>
            <img
              src={selectedImage}
              alt="Imagen ampliada"
              className="w-full h-auto"
            />
          </div>
        </div>
      )}

      <WhatsAppButton />
    </div>
  );
}

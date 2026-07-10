// components/Products.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AddToCart } from '../components/AddToCard'; // Corregido typo del import a AddToCart

interface ProductsProps {
  products: any[];
  categoryFilter?: string; // Propiedad para filtrar por categoría en el futuro
  limit?: number;          // Propiedad por si solo quieres mostrar unos cuantos (ej: en la Home)
}

const Products = ({ products = [], categoryFilter, limit }: ProductsProps) => {
  
  // 1. Dejamos el filtro listo: Si nos pasan una categoría, filtramos el arreglo
  let filteredProducts = categoryFilter 
    ? products.filter(product => product.category?.toLowerCase() === categoryFilter.toLowerCase())
    : products;

  // 2. Dejamos el límite listo: Si nos piden ver solo "unos cuantos", cortamos el arreglo
  if (limit) {
    filteredProducts = filteredProducts.slice(0, limit);
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-gray-500 p-10 text-center w-full">
        No se encontraron productos {categoryFilter ? `en la categoría "${categoryFilter}"` : ''} en la base de datos.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="w-full relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl flex flex-col bg-white"
          >
            {/* Link a detalle */}
            <Link href={`/productos/${product.id}`} className="block">
              <div className="relative m-2 h-64 w-full">
                <Image
                  src={product.images[0] || '/placeholder.png'}
                  alt={product.name}
                  fill
                  className="object-contain"
                  quality={85}
                />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {product.name}
                </h3>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-xl font-bold text-gray-900">${product.price}</p>
                </div>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {product.description}
                </p>
              </div>
            </Link>

            {/* Botones */}
            <div className="p-4 flex flex-col space-y-2 mt-auto">
              <Link href={`/productos/${product.id}`} className="w-full">
                <button className="w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition">
                  Ver Detalles
                </button>
              </Link>
              
              <AddToCart product={product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
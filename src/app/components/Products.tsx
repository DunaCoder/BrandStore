// components/Products.tsx
import { Producto } from '../../../lib/api';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartContext } from "../../context/CartContext";

type Props = {
  products?: Producto[];
  error?: string;
}

const Products = ({ products = [], error }: Props) => {
  const { addToCart } = useCartContext();

  if (error) return <div className="text-red-500">{error}</div>;

  if (!products || products.length === 0) {
    return (
      <div className="text-gray-500 p-4 text-center">
        No se encontraron productos disponibles
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-full relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl flex flex-col"
          >
            {/* Contenedor de la imagen con relación de aspecto */}
            <Link href={`/productos/${product.id}`} className="block h-full w-full">
              <div className="relative m-2 h-64 w-full">
                <Image
                  src={product.imagen}
                  alt={product.nombre}
                  fill
                  className="object-contain"
                  quality={85}
                />
              </div>

              {/* Información del producto */}
              <div className="p-4 bg-white">
                <h3 className="text-lg font-semibold text-gray-800">{product.nombre}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">${product.precio}</p>
                  {product.precio && (
                    <p className="text-sm text-gray-500 line-through">${product.precio}</p>
                  )}
                </div>
              </div>
            </Link>

            {/* Contenedor para ambos botones en columna */}
            <div className="p-4 bg-white flex flex-col space-y-2 mt-auto">
              <Link href={`/productos/${product.id}`}>
                <button className="w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:text-gray-300">
                  Ver Detalles
                </button>
              </Link>
              
              <button
                onClick={() => addToCart(product)}
                className="w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:text-gray-300"
              >
                Añadir al Carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
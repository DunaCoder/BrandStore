// components/Products.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// Ya no importamos Producto de lib/api, usaremos los tipos de Prisma automáticamente

const Products = ({ products = [] }: { products: any[] }) => {
  
  if (products.length === 0) {
    return (
      <div className="text-gray-500 p-10 text-center w-full">
        No se encontraron productos en la base de datos.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-full relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl flex flex-col bg-white"
          >
            {/* Link a detalle */}
            <Link href={`/productos/${product.id}`} className="block">
              <div className="relative m-2 h-64 w-full">
                <Image
                  src={product.images[0] || '/placeholder.png'} // Usamos tu nuevo campo images
                  alt={product.name} // Cambiado a .name
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
              
              {/* Dejamos el botón pero sin la función addToCart por ahora 
                  para que el componente pueda ser Server Component */}
              <button className="w-full rounded-lg border border-black px-4 py-2 text-sm font-medium text-black hover:bg-gray-100 transition">
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
// src/app/productos/[id]/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from "@/lib/prisma";
import { AddToCart } from '../../components/AddToCard'; // Importamos tu nuevo botón
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

// Convertimos la página en una función asíncrona de Servidor
export default async function ProductPage({ params }: ProductPageProps) {
  // 1. Desenvolvemos los params con await como pide tu tipado original
  const { id } = await params;

  // 2. Pedimos los datos directamente a Neon mediante Prisma
  const product = await prisma.product.findUnique({
    where: { id: id }, // Si tu ID de la DB es entero usa: Number(id)
  });

  // 3. Manejo de error inmediato en el servidor si el producto no existe
  if (!product) {
    notFound(); 
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Sección de la imagen */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-center">
            <Image
              src={product.images[0] || '/placeholder.png'} // Adaptado a array de Prisma
              alt={product.name} // Adaptado a 'name'
              width={800}
              height={600}
              className="w-full h-auto rounded-lg object-contain"
              priority
            />
          </div>

          {/* Sección de detalles del producto */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm">
                {/* Rellenamos temporalmente mientras agregas categorías al esquema de Prisma */}
                General
              </span>
              <span className="text-gray-600 text-sm">
                Disponibilidad Inmediata
              </span>
            </div>

            <p className="text-gray-600 mb-6">
              {product.description || "Sin descripción disponible."}
            </p>

            {/* Precio y Stock */}
            <div className="mb-6 flex justify-between items-center">
              <span className="text-2xl font-bold text-black">
                ${product.price.toFixed(2)}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.stock > 0
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
              </span>
            </div>

            {/* Características del producto (Si decides mapearlas luego) */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Información Adicional:
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">Garantía oficial del fabricante.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">Envío protegido y asegurado.</span>
                </li>
              </ul>
            </div>

            {/* REEMPLAZO MÁGICO: Tu componente cliente reutilizable que inyecta los datos al Nav */}
            <div className="w-full">
              {product.stock > 0 ? (
                <AddToCart product={product} />
              ) : (
                <button 
                  disabled 
                  className="w-full py-3 px-6 rounded-lg font-semibold bg-gray-400 text-gray-700 cursor-not-allowed"
                >
                  Producto agotado
                </button>
              )}
            </div>

            <Link href={`/colecion`} className="flex-1">
              <button className="w-full my-5 py-3 px-6 rounded-lg font-semibold transition duration-300 bg-black text-white hover:bg-white hover:text-black border border-black">
                Volver a la Colección
              </button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
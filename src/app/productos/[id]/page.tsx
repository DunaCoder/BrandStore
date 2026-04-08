'use client';
import Image from 'next/image';
import { Producto } from '../../../../lib/api';
import { useEffect, useState } from 'react';
import { getProductoById } from '../../../../lib/api';
import { useCartContext } from '../../../context/CartContext';
import Link from 'next/link';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCartContext();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { id } = await params;
        const data = await getProductoById(id);
        setProduct(data);
      } catch (err) {
        setError('Producto no encontrado');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Cargando producto...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500 text-xl">Producto no encontrado</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sección de la imagen */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-center">
            <Image
              src={product.imagen}
              alt={product.nombre}
              width={800}
              height={600}
              className="w-full h-auto rounded-lg object-contain"
              priority
            />
          </div>

          {/* Sección de detalles del producto */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.nombre}
            </h1>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm">
                {product.categoria}
              </span>
              <span className="text-gray-600 text-sm">
                ID de proveedor: {product.id_proveedor}
              </span>
            </div>

            <p className="text-gray-600 mb-6">{product.descripcion}</p>

            {/* Precio y Stock */}
            <div className="mb-6 flex justify-between items-center">
              <span className="text-2xl font-bold text-black">
                ${product.precio.toFixed(2)}
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

            {/* Características del producto */}
            {product.caracteristicas && product.caracteristicas.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Características:
                </h2>
                <ul className="space-y-2">
                  {product.caracteristicas.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Botón de compra */}
            <button
              onClick={() => addToCart(product)}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition duration-300 ${
                product.stock > 0
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-gray-400 text-gray-700 cursor-not-allowed'
              }`}
              disabled={product.stock === 0}
            >
              {product.stock > 0 ? 'Añadir al carrito' : 'Producto agotado'}
            </button>
            <Link href={`/colecion`} className="flex-1">
              <button className="w-full my-5 py-3 px-6 rounded-lg font-semibold transition duration-300 bg-black text-white hover:bg-white hover:text-black">
                Ver Detalles
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';
import React, { useEffect, useState } from 'react';
import Products from '@/app/components/Products';
import { getProductos } from '../../../lib/api'; // Asegúrate de que la ruta sea correcta
import type { Producto } from '../../../lib/api';

const Page = () => {
  // Mismo código que en la página principal
  const [products, setProducts] = useState<Producto[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductos();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar productos');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <div>
      <div className='my-10 mx-0 text-center text-xl capitalize font-bold '>
        <h2>Todo lo que quieras en un solo lugar</h2>
      </div>
      
      {/* Estados de carga y error idénticos a la página principal */}
      {loading && <div className="text-center py-4">Cargando productos...</div>}
      {error && <div className="text-red-500 text-center py-4">{error}</div>}
      
      <Products 
        products={products} 
        error={error}
      />
    </div>
  );
};

export default Page;
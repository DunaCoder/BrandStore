'use client';
import Carousel from "./components/Carousel";
import Image from "next/image";
import Products from "./components/Products"
import { getProductos } from "../../lib/api";
import type { Producto } from "../../lib/api";
import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState<Producto[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductos();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Error al cargar los productos');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []); 

  const images = [
    { id: 1, src: "1.webp", type: 'vertical' },
    { id: 2, src: "2.webp", type: 'vertical' },
    { id: 3, src: "5.webp", type: 'vertical' },
    { id: 4, src: "8.webp", type: 'vertical'},
    { id: 5, src: "6.webp", type: 'wide' },
    { id: 6, src: "7.webp", type: 'wide'},

  ];
  return (
    <div>
      <div className="p-4">
      <Carousel/>
       <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(200px,auto)]">
        {images.map((image) => (
          <div
            key={image.id}
            className={`
              bg-slate-400
              relative
              ${image.type === 'wide' ? 'md:col-span-2' : ''}
              ${image.type === 'vertical' ? 'md:row-span-2' : ''}
              ${!image.type ? 'md:col-span-1' : ''}
            `}
          >
            <Image
                  src={`/${image.src}`} // Añadí barra inicial si las imágenes están en public/
                  alt={`Imagen ${image.id}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  quality={80}
                />
          </div>
        ))}

      </div>
    </div>
    </div>
    <div className='my-10 mx-0 text-center text-xl capitalize font-bold '>
        <h2>Seguro que te gusta</h2>
        { loading ? (
          <p>Cargando productos...</p>
        ) : (
          <Products products={products} error={error} />
        )}
    </div>
    </div>
  );
}

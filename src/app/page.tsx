// src/app/page.tsx
import Carousel from "./components/Carousel"; // Ajusta la ruta exacta si está en components/ o app/components/
import Image from "next/image";
import Products from "../app/components/Products"; // Ajustado a tu ruta de componentes
import { prisma } from "@/lib/prisma";

export default async function Home() {
  // 1. Cargamos de la base de datos de forma ultra veloz en el servidor
  const productosDesdeDB = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' } // Muestra los más nuevos primero
  });

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
        <Carousel />
        
        {/* Banner Grid de Imágenes */}
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(200px,auto)]">
            {images.map((image) => (
              <div
                key={image.id}
                className={`
                  bg-slate-400
                  relative
                  overflow-hidden
                  rounded-lg
                  ${image.type === 'wide' ? 'md:col-span-2' : ''}
                  ${image.type === 'vertical' ? 'md:row-span-2' : ''}
                  ${!image.type ? 'md:col-span-1' : ''}
                `}
              >
                <Image
                  src={`/${image.src}`} 
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

      {/* Sección de Productos Destacados */}
      <div className='my-10 mx-0 text-center text-xl capitalize font-bold '>
        <h2 className="mb-6 text-2xl font-extrabold text-gray-900">Seguro que te gusta</h2>
        
        {/* 2. Reutilizamos el componente Products pasándole los datos de la DB 
            y limitándolo para que solo cargue una cantidad inicial (ej: 4 productos) */}
        <Products products={productosDesdeDB} limit={4} />
      </div>
    </div>
  );
}
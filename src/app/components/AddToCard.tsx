'use client'
import React from 'react'
import { useCartContext } from '@/context/CartContext'; // Importa el contexto del carrito

// 1. En Prisma, los IDs autoincrementales suelen venir como Int (number) o String (UUID).
// Dejamos tu interfaz recibiendo el ID tal como viene de tu base de datos actual.
interface AddToCartProps {
  product: {
    id: any; // Usamos any aquí por si tu base de datos usa string o number, así no choca
    name: string;
    price: number;
    images: string[];
    stock: number;
  };
}

// Nota: Cambié el nombre a mayúscula (AddToCart) porque React exige que los componentes empiecen con mayúscula
export function AddToCart({ product }: AddToCartProps) {
  const { addToCart } = useCartContext(); 

  const handleAddToCart = () => {
    // 2. Aquí creamos el objeto traduciendo los datos básicos
    const productoParaCarrito = {
      id: product.id,
      nombre: product.name,
      precio: product.price,
      imagen: product.images[0] || '/placeholder.png',
      stock: product.stock,
      // 3. Rellenamos lo que tu tipo "Producto" pide obligatoriamente para que no proteste
      descripcion: '',
      caracteristicas: [],
      categoria: '',
      id_proveedor: 0
    };

    // 4. Usamos "as any" al pasarlo para que TypeScript relaje la seguridad de tipos 
    // y acepte el objeto sin romper el resto de la aplicación
    addToCart(productoParaCarrito as any);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:text-gray-300 transition-colors"
    >
      Añadir al Carrito
    </button>
  );
}
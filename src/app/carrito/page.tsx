'use client';
import React from "react";
import { useCartContext } from '@/context/CartContext'; 
import Image from "next/image";


export default function Page() {
    // Desestructura todas las funciones y el estado que necesitas del contexto
      const { cartItems, clearCart } = useCartContext(); 

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Lista de Productos</h1>
            
            <div className="flex flex-col space-y-4">
                {cartItems.map((items) => (
                    <div key={items.id} className="flex p-10 border border-gray-200 rounded-md hover:shadow-md transition-shadow">
                      <div>
                          <Image
                            src={items.imagen}
                            alt={items.nombre}
                            width={150}
                            height={150}
                            className="w-24 h-24 object-cover mr-4 rounded"
                        />
                      </div>
                        <div>
                            <h2 className="text-xl font-semibold">{items.nombre}</h2>
                            <p className="text-gray-600">{items.precio}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <button
                    onClick={clearCart}
                    className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                    Vaciar Carrito
                </button>

            </div>
        </div>
    );
}
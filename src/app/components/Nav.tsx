// app/components/Nav.tsx
'use client'
import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import { FaUser, FaChevronDown, FaTimesCircle } from "react-icons/fa"; // Importa FaTimesCircle para el icono de eliminar
import Link from 'next/link'
import Image from 'next/image';
// Importa removeFromCart y clearCart del contexto
import { useCartContext } from '@/context/CartContext'; 

const Nav = () => {
  // Desestructura todas las funciones y el estado que necesitas del contexto
  const { cartItems, removeFromCart, clearCart } = useCartContext(); 

  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Datos de ejemplo para categorías
  const categories = [
    { name: 'Electrónica', subcategories: ['Smartphones', 'Laptops', 'Audio'] },
    { name: 'Hogar', subcategories: ['Muebles', 'Decoración', 'Cocina'] },
    { name: 'Moda', subcategories: ['Ropa Mujer', 'Ropa Hombre', 'Accesorios'] },
    { name: 'Deportes', subcategories: ['Fútbol', 'Fitness', 'Camping'] },
  ]

  return (
    <nav className="bg-black relative">
      <div className="mx-auto max-w-7xl py-5 px-4 sm:px-6 ">
        {/* Primera fila */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <Link href="/" className="text-white text-2xl font-bold hover:text-gray-300 transition-colors">
            BrandStore
          </Link>

          <div className="flex-1 w-full max-w-2xl relative">
            <div className="flex items-center border-2 border-gray-300 rounded-lg focus-within:border-white transition-all bg-black/20">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full px-4 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none"
              />
              <button className="p-3 text-white hover:bg-gray-800 rounded-r-md transition-colors">
                <CiSearch className="text-xl" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/account" className="p-2.5 text-white hover:bg-gray-800 rounded-md transition-colors flex items-center gap-1">
              <FaUser className="text-lg" />
              <span className="hidden sm:inline">Mi Cuenta</span>
            </Link>
            
            <button 
              onMouseEnter={() => setIsCartOpen(true)}
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="p-2.5 text-white hover:bg-gray-800 rounded-md transition-colors relative flex items-center gap-1">
              <FiShoppingCart className="text-xl" />
              <span className="hidden sm:inline">Carrito</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            </button>
          </div>
        </div>

        {/* Pestaña de carrito (desplegable) */}
        {isCartOpen && (
          <div 
            onMouseLeave={() => setIsCartOpen(false)}
            className="absolute z-50 right-0  md:w-auto w-full bg-white rounded-md shadow-lg p-4 text-black border border-gray-200"
          >
            <h3 className="text-lg font-semibold ">Carrito de Compras</h3>
            {cartItems.length === 0 ? (
              <p className="text-gray-600">El carrito está vacío.</p>
            ) : (
              <> {/* Fragmento para agrupar elementos */}
                <ul>
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex justify-between items-center p-5 border-b border-gray-100 last:border-b-0">
                    <Image
                        src={item.imagen}
                        alt={item.nombre}
                        width={80} // Corresponde a w-16 (16 * 4 = 64px si tu base es 1rem = 16px)
                        height={80} // Corresponde a h-16
                        className="object-cover rounded-md mx-2" // Tailwind CSS para object-cover y rounded-md
                      />
                      <span className="text-sm font-medium">{item.nombre} ({item.quantity})</span>
                      <span className="text-sm text-gray-700">${item.precio.toFixed(2)}</span>
                      {/* Botón para eliminar un producto individual */}
                      <button 
                        onClick={() => removeFromCart(item.id)} // Llama a removeFromCart con el ID del producto
                        className="ml-2 text-red-500 hover:text-red-700"
                        title="Eliminar producto"
                      >
                        <FaTimesCircle className="text-base" /> {/* Icono de 'X' o círculo con cruz */}
                      </button>
                    </li>
                  ))}
                </ul>
                {/* Botón para vaciar todo el carrito */}
                <button
                  onClick={clearCart} // Llama a clearCart (no necesita argumentos)
                  className="mt-4 w-full block text-center bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
                >
                  Vaciar Carrito
                </button>
              </>
            )}
            <Link href="/carrito" className="mt-4 w-full block text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
              Ver Carrito Completo
            </Link>
          </div>
        )}
        
        {/* Barra de categorías */}
        <div className="mt-4 border-t border-gray-800 pt-4">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div 
              className="relative group"
              onMouseEnter={() => setIsCategoriesOpen(true)}
            >
              <button 
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Categorías
                <FaChevronDown className="ml-1 text-xs transition-transform group-hover:rotate-180" />
              </button>

              {/* Menú desplegable */}
              {isCategoriesOpen && (
                <div onMouseEnter={() => setIsCategoriesOpen(true)} 
                onMouseLeave={() => setIsCategoriesOpen(false)}
                className="absolute z-50 top-full left-0 sm:w-[800px] w-[200px] bg-black border border-gray-800 rounded-lg shadow-xl p-6 mt-2">
                  <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
                    {categories.map((category) => (
                      <div key={category.name} className="group">
                        <h3 className="text-white font-medium mb-2 border-b border-gray-700 pb-1">
                          {category.name}
                        </h3>
                        <ul className="space-y-2">
                          {category.subcategories.map((sub) => (
                            <li key={sub}>
                              <a href="#" className="text-gray-300 hover:text-white text-sm block transition-colors">
                                {sub}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <a href="#" className="text-white hover:text-gray-300 font-medium">
                      Ver todas las categorías →
                    </a>
                  </div>
                </div>
              )}
            </div>

            <button className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
              Ofertas
            </button>
            <button className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
              Nuevo
            </button>
            <Link href='/colecion' className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
              Productos
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
"use client";

import { createContext, useState, ReactNode, useEffect, useContext  } from 'react';


export type Producto = {
  nombre: string;
  precio: number;
  descripcion: string;
  caracteristicas: string[];
  stock: number;
  categoria: string;
  imagen: string;
  id: number;
  id_proveedor: number;
}

export interface CartItem extends Producto {
  quantity: number;}

 export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Producto) => void; 
  removeFromCart: (id: number) => void;
  updateCartItem: (id: number, quantity: number) => void;
  clearCart: () => void;
}

  export const CartContext = createContext<CartContextType | undefined>(undefined);

  interface CartProviderProps {
    children: ReactNode;
  }

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {


    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
      if (typeof window !== 'undefined') {
        const storedCart = localStorage.getItem('cartItems'); // Faltaba el 'cart' key en localStorage
        return storedCart ? JSON.parse(storedCart) : [];
      }
      return [];
    });
    // ¡Aquí termina el snippet, pero le falta el resto del componente!

    useEffect(() => {
      //esto guarda en localStorages cada que el carrito cambia
      if (typeof window !== 'undefined') {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
      }
    }, [cartItems]);

    const addToCart = (product: Producto) => {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((i) => i.id === product.id);
        if (existingItem) {
          return prevItems.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1  } : i
          );
        }
        return [...prevItems, { ...product, quantity: 1 }];
      });
    };  

    const removeFromCart = (id: number) => {
      setCartItems((prevItems) => prevItems.filter((product) => product.id !== id));
    };

    const updateCartItem = (id: number, quantity: number) => {
      const newQuantity = Math.max(1, quantity); // Asegura que la cantidad no sea negativa
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, newQuantity } : item
        )
      );
    };
    const clearCart = () => {
      setCartItems([]);
    };
    
    return (
      <CartContext.Provider
        value={{
          cartItems,
          addToCart,
          removeFromCart,
          updateCartItem,
          clearCart,
        }}
      >
        {children}
      </CartContext.Provider>
    );
}

export const useCartContext = () => {
  const context = useContext(CartContext); // Aquí usamos useContext correctamente.

  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
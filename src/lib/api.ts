// Este archivo contiene funciones para interactuar con la API de productos y proveedores
// y obtener datos de productos y proveedores.

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

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const PRODUCTOS_URL = '/productos/'; // Cambia esto a la URL de tu API

const fetcher =  async <T>(endpoint: string): Promise<T>  => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) {
       throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    // console.log('Respuesta de la API:', data);
    return data;
  } catch (error) {
    // console.error('Error en la solicitud a', endpoint, ':', error);
    throw error;
  }
}

export const getProductos = async (): Promise<Producto[]> => {
  return fetcher<Producto[]>(PRODUCTOS_URL);
}

// Agrega al final de lib/api.ts
export const getProductoById = async (id: string | number): Promise<Producto> => {
  return fetcher<Producto>(`${PRODUCTOS_URL}${id}/`);
}
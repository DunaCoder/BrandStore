'use client';
import {useState, useEffect} from 'react';
import { getProductos } from '../../../lib/api'; // Asegúrate de que la ruta sea correcta

const TestAPI = () => {
  // Ejecutar al cargar el componente

  const [status, setStatus] = useState('Cargando...');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productos = await getProductos();
        console.log('Datos recibidos:', productos);
        setStatus('Datos cargados correctamente');
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        setStatus('Error al cargar los datos');
      }
    };

    fetchData();
  }, []);
  

  return(
    <div>
      <h1> prueba de la api {status}</h1>
      Revisa la consola del navegador (F12 → Consola)
    </div>
  );
};

export default TestAPI;
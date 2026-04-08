'use client'
import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Muestra u oculta el botón basado en la posición del scroll
  const toggleVisibility = () => {
    if (window.scrollY > 300) { // Muestra el botón si el scroll es mayor a 300px
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Desplaza la página hacia arriba suavemente
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Esto hace el desplazamiento suave
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    // Limpia el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez al montar y limpiar al desmontar

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="
            fixed bottom-4 right-4 p-3
            bg-blue-600 text-white rounded-full shadow-lg
            hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75
            transition-opacity duration-300 ease-in-out
            z-50 /* Asegura que esté por encima de la mayoría de los elementos */
          "
          aria-label="Volver arriba"
        >
          {/* Puedes usar un icono aquí si tienes una librería como Heroicons o Font Awesome */}
          ↑
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
import React from 'react'
import Link from 'next/link'
import { GrVisa } from "react-icons/gr";
import { RiMastercardFill } from "react-icons/ri";
import { FaPaypal } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { BsTwitterX } from "react-icons/bs";
import { BsTiktok } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-8 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Sección de Atención al Cliente */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Atención al Cliente</h3>
            <ul className="space-y-2">
              <li><Link href="/contacto" className="hover:text-gray-300 transition-colors">Contacto</Link></li>
              <li><Link href="/preguntas-frecuentes" className="hover:text-gray-300 transition-colors">Preguntas Frecuentes</Link></li>
              <li><Link href="/envios" className="hover:text-gray-300 transition-colors">Envíos y Entregas</Link></li>
              <li><Link href="/devoluciones" className="hover:text-gray-300 transition-colors">Devoluciones</Link></li>
            </ul>
          </div>

          {/* Sección de la Empresa */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Nuestra Empresa</h3>
            <ul className="space-y-2">
              <li><Link href="/nosotros" className="hover:text-gray-300 transition-colors">Sobre Nosotros</Link></li>
              <li><Link href="/tiendas" className="hover:text-gray-300 transition-colors">Nuestras Tiendas</Link></li>
              <li><Link href="/trabaja-con-nosotros" className="hover:text-gray-300 transition-colors">Trabaja con Nosotros</Link></li>
              <li><Link href="/sostenibilidad" className="hover:text-gray-300 transition-colors">Sostenibilidad</Link></li>
            </ul>
          </div>

          {/* Sección Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacidad" className="hover:text-gray-300 transition-colors">Política de Privacidad</Link></li>
              <li><Link href="/terminos" className="hover:text-gray-300 transition-colors">Términos y Condiciones</Link></li>
              <li><Link href="/cookies" className="hover:text-gray-300 transition-colors">Política de Cookies</Link></li>
              <li><Link href="/aviso-legal" className="hover:text-gray-300 transition-colors">Aviso Legal</Link></li>
            </ul>
          </div>

          {/* Newsletter y Redes Sociales */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Mantente Informado</h3>
            <div className="mb-6">
              <form className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Tu correo electrónico" 
                  className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="submit"
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Suscribir
                </button>
              </form>
            </div>
            
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-gray-400 transition-colors">
              <span className="sr-only">Facebook</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <FaFacebook 
                  className='text-2xl'/>
                </svg>
              </Link>
              <Link href="#" className="hover:text-gray-400 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <BsInstagram 
                  className='text-2xl'/>
                </svg>
              </Link>
              <Link href="#" className="hover:text-gray-400 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <BsTwitterX
                  className='text-2xl'/>
                </svg>
              </Link>
              <Link href="#" className="hover:text-gray-400 transition-colors">
                <span className="sr-only">TikTok</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <BsTiktok
                  className='text-2xl'/>
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-800 my-6"></div>

        {/* Copyright y métodos de pago */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="mb-4 md:mb-0">
            © {new Date().getFullYear()} Tu Tienda Online. Todos los derechos reservados.
          </div>
          <div className="flex space-x-4">
            <GrVisa  className="h-8 w-auto"/>
            < RiMastercardFill className="h-8 w-auto"/>
            <FaPaypal  className="h-8 w-auto"/>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
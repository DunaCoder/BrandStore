// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Configuración para el entorno de desarrollo
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/imagenes/**',
      },
      // Configuración para el entorno de producción en Vercel
      {
        protocol: 'https',
        hostname: 'full-store-api-39oh.vercel.app',
        port: '', // Vercel usa el puerto 443 por defecto, por lo que no es necesario especificarlo.
        pathname: '/imagenes/**',
      },
    ],
  },
};

module.exports = nextConfig;
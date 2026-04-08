'use client'
import { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';

const LoginPage: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica de inicio de sesión
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div
    className="h-screen flex items-center justify-center relative m-0"
    style={{
      backgroundImage: "url('/8.webp')", // Cambia esto por la ruta de tu imagen
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    {/* Degradado sobre la imagen de fondo */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/20"></div>

    <Head>
      <title>Iniciar Sesión</title>
    </Head>

    {/* Contenedor principal para ambos divs */}
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-4xl px-4 z-10">
      {/* Div con contenido: título y eslogan */}
      <div className="text-center rounded-lg w-full max-w-md bg-white/90 backdrop-blur-sm shadow-lg p-8">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Bienvenido a MiApp</h1>
        <p className="text-2xl text-gray-600">Tu plataforma de compras favorita en línea.</p>
      </div>

      {/* Formulario de inicio de sesión */}
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu correo electrónico"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  </div>
  );
};

export default LoginPage;
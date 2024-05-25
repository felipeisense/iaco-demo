"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Image from 'next/image';  // Importa el componente Image de Next.js

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const storedUsername = process.env.NEXT_PUBLIC_USERNAME;
    const storedPassword = process.env.NEXT_PUBLIC_PASSWORD;

    if (username === storedUsername && password === storedPassword) {
      Cookies.set('isAuthenticated', 'true', { expires: 1 });
      router.push('/home');
    } else {
      alert('Las credenciales son incorrectas');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="absolute top-10 pt-10 w-full flex justify-center">  {/* Ajusta la imagen para que esté en la parte superior de la pantalla */}
        <Image src="/avatar.png" alt="Avatar" width={400} height={400} />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">  {/* Mantiene el formulario centrado */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="usernameInput" className="block text-sm font-medium text-gray-700">Usuario</label>
            <input
              type="text"
              id="usernameInput"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="passwordInput" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              id="passwordInput"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}

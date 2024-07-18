'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [connected] = useState(true);
  const [isAdmin] = useState(true);

  return (
    <nav className="fixed w-full z-10 px-5 md:px-20">
      <div className="flex items-center py-2">
        <h1 className="text-left md:text-xl">FDD</h1>
        {connected == true && (
          <div className="flex flex-row mr-0 ml-auto gap-2">
            <Link
              href="/"
              className="transition delay-75 text-sm md:text-xl text-black md:px-4 hover:bg-black/90 hover:text-white py-2"
            >
              Accueil
            </Link>
            <Link
              href="/portfolios"
              className="transition delay-75 text-sm md:text-xl text-black md:px-4 hover:bg-black/90 hover:text-white py-2"
            >
              Portfolios
            </Link>
            <Link
              href={`/profil/miaou`}
              className="transition delay-75 text-sm md:text-xl text-black md:px-4 hover:bg-black/90 hover:text-white py-2"
            >
              Profil
            </Link>
            {isAdmin == true && (
              <Link
                href="/admin"
                className="transition delay-75 text-sm md:text-xl text-black md:px-4 hover:bg-black/90 hover:text-white py-2"
              >
                Admin
              </Link>
            )}
            <button
              onClick={console.log}
              className="transition delay-75 text-sm md:text-xl text-white md:px-4 bg-black hover:bg-black/90 hover:text-white py-2"
            >
              Déconnexion
            </button>
          </div>
        )}
        {connected == false && (
          <div className="flex flex-row mr-0 ml-auto gap-2">
            <Link
              href="/"
              className="transition delay-75 text-sm md:text-xl text-black md:px-4 hover:bg-black/90 hover:text-white py-2"
            >
              Accueil
            </Link>
            <Link
              href="/portfolios"
              className="transition text-sm delay-75 md:text-xl text-black md:px-4 hover:bg-black/90 hover:text-white py-2"
            >
              Portfolios
            </Link>
            <Link
              href="/connexion"
              className="transition text-sm delay-75 md:text-xl text-white md:px-4 bg-black hover:bg-black/90 hover:text-white py-2"
            >
              Connexion
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

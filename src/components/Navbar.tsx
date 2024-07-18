import { currentUser } from '@/auth/currentUser';
import { signOut } from '@/lib/auth';
import Link from 'next/link';

export default async function Navbar() {
  const user = await currentUser();

  return (
    <nav className="fixed w-full z-10 px-5 md:px-20">
      <div className="flex items-center py-2">
        <h1 className="text-left md:text-xl">FDD</h1>
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
          {user && user.admin && (
            <Link
              href="/admin"
              className="transition delay-75 text-sm md:text-xl text-black md:px-4 hover:bg-black/90 hover:text-white py-2"
            >
              Admin
            </Link>
          )}
          {user ? (
            <form>
              <button
                formAction={async () => {
                  'use server';

                  await signOut();
                }}
                className="transition delay-75 text-sm md:text-xl text-white md:px-4 bg-black hover:bg-black/90 hover:text-white py-2"
              >
                Déconnexion
              </button>
            </form>
          ) : (
            <Link
              href="/connexion"
              className="transition text-sm delay-75 md:text-xl text-white md:px-4 bg-black hover:bg-black/90 hover:text-white py-2"
            >
              Connexion
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

import { requiredCurrentUser } from '@/auth/currentUser';
import Link from 'next/link';
import ProfilForm from './ProfilForm';
import { ArrowLeft } from 'lucide-react';
import ImageForm from './ImageForm';

export default async function PageProfil() {
  const user = await requiredCurrentUser();

  return (
    <section className="flex flex-col w-full px-5 md:px-20 pt-28">
      <article className="w-full md:grid grid-cols-2 border-b pb-10 items-center mb-10">
        <h1 className="text-2xl lg:text-4xl xl:text-6xl uppercase">
          Détails du profil
        </h1>
        <p className="text-sm lg:text-lg md:text-right">
          Vous pouvez ajouter, modifier les informations concernant votre
          profil. Vous pouvez aussi rajouter un screen de votre portfolio. Si
          vous ne possédez pas de portfolio vous pouvez mettre un screen de
          votre profil Github / Linkedin / Gitlab ou d&apos;un autre réseau de
          votre choix.
        </p>
      </article>
      <section className="md:flex gap-4 pb-14 md:pb-0">
        <article className="flex flex-col md:w-1/2">
          <h1 className="text-2xl md:text-4xl my-5 text-beige bg-black uppercase py-1 px-1">
            Modifier profil
          </h1>
          <ProfilForm user={user} />
        </article>
        <article className="flex flex-col md:w-1/2">
          <h1 className="text-2xl md:text-4xl my-5 text-beige bg-black uppercase py-1 px-1">
            Envoyer une image
          </h1>
          <ImageForm user={user} />
        </article>
      </section>
      <Link
        href={`/profil`}
        className="text-3xl bottom-2 fixed hover:bg-black hover:text-white rounded-full px-2 py-1 transition delay-100"
      >
        <ArrowLeft />
      </Link>
    </section>
  );
}

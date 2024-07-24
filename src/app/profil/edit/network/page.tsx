import { requiredCurrentUser } from '@/auth/currentUser';
import React from 'react';
import AddNetworkForm from './AddNetworkForm';
import { prisma } from '@/lib/db';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import RemoveNetworkForm from './RemoveNetworkForm';

export default async function NetworkPage() {
  const user = await requiredCurrentUser();
  const networks = await prisma.network.findMany();
  const networksOfUser = await prisma.network.findMany({
    where: {
      UserNetwork: {
        some: {
          user: {
            id: user.id,
          },
        },
      },
    },
  });

  return (
    <section className="flex flex-col w-full px-5 md:px-20 pt-28">
      <article className="w-full grid grid-cols-2 border-b pb-10 items-center">
        <h1 className="text-2xl lg:text-4xl xl:text-6xl uppercase">
          Réseaux sociaux
        </h1>
        <p className="text-sm lg:text-lg text-right">
          Vous pouvez ajouter, modifier les liens de vos réseaux sociaux ainsi
          que les retirer.
        </p>
      </article>
      <article className="w-full md:flex gap-4 mt-10">
        <AddNetworkForm networks={networks} currentUser={user} />
        <RemoveNetworkForm networksOfUser={networksOfUser} />
      </article>
      <Link
        href={`/profil`}
        className="text-3xl bottom-2 fixed hover:bg-black hover:text-white rounded-full px-2 py-1 transition delay-100"
      >
        <ArrowLeft />
      </Link>
    </section>
  );
}

import { prisma } from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default async function RandomProfile() {
  const profiles = await prisma.user.findMany({
    include: {
      categories: true,
    },
    where: {
      bannished: null,
      emailVerified: {
        not: null,
      },
      categories: {
        some: {},
      },
      UserNetwork: {
        some: {},
      },
      description: {
        not: null,
      },
      imagePortfolio: {
        not: null,
      },
    },
  });
  const randomProfile = profiles[Math.floor(Math.random() * profiles.length)];

  if (!randomProfile) return;

  return (
    <article className="lg:flex gap-4 w-full">
      <aside className="lg:w-1/2 h-content">
        <h1 className="block xl:hidden text-xl uppercase text-center hover:text-white hover:bg-black mb-5">
          <Link href={`/portfolios/${randomProfile.userId}`}>
            {randomProfile.name}
          </Link>
        </h1>
        <a
          href={randomProfile.urlPortfolio || '#'}
          className="block lg:hidden transition delay-75 h-56 mr-0 ml-auto hover:scale-105 mb-5"
        >
          <Image
            src={randomProfile.imagePortfolio || '/assets/defaut.png'}
            alt="Profile Image"
            width={1000}
            height={1000}
            className="object-cover hover:contrast-125 h-56 duration-200 border border-black w-full"
          />
        </a>
        <p className="text-base md:text-lg lg:text-xl md:mb-5 text-justify md:border-b pb-5">
          Voici un profil que nous souhaitons mettre en avant.
        </p>
        <h1 className="my-2">
          <Link
            href={`/portfolios/${randomProfile.userId}`}
            className="hidden xl:block text-2xl hover:text-white hover:bg-black py-2 transition delay-100 w-fit"
          >
            {randomProfile.name}
          </Link>
        </h1>
        <p className="text-sm break-words">
          {randomProfile.categories
            .map((c) => c.name)
            .slice(0, 3)
            .join(', ')}
          {randomProfile.categories.length > 3 && '...'}
        </p>
      </aside>
      <a
        href={randomProfile.urlPortfolio || '#'}
        className="hidden lg:block transition delay-75 h-56 mr-0 ml-auto w-1/2 hover:scale-105"
      >
        <Image
          src={randomProfile.imagePortfolio || '/assets/defaut.png'}
          alt="Profile Image"
          width={1000}
          height={1000}
          className="object-cover hover:contrast-125 h-56 duration-200 border border-black w-full"
        />
      </a>
    </article>
  );
}

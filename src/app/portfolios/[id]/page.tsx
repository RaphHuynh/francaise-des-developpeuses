import { prisma } from '@/lib/db';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function PortfolioPage({
  params,
}: {
  params: { id: string };
}) {
  const profil = await prisma.user.findFirst({
    include: {
      categories: true,
      UserNetwork: {
        include: {
          network: true,
        },
      },
    },
    where: {
      userId: parseInt(params.id),
    },
  });

  if (!profil) {
    notFound();
  }

  return (
    <section className="flex items-center justify-center w-full min-h-screen px-5 md:px-20 pt-20 pb-10 md:py-20">
      <div>
        <article className="lg:flex mb-5 md:mb-20 items-baseline w-full border-b pb-4">
          <h1 className="text-xl md:text-6xl capitalize ">
            {profil.firstname} {profil.lastname}
          </h1>
          <p className="md:text-4xl ml-2">#{profil.name}</p>
        </article>
        <article className="flex flex-col-reverse lg:flex-row gap-4 mb-3 md:gap-8">
          <article className="lg:w-1/2 flex flex-col">
            <h1 className="text-xl md:text-4xl mb-5 text-beige bg-black uppercase py-1 px-1 top-0">
              Description
            </h1>
            <p className="md:text-lg text-justify px-1">{profil.description}</p>
          </article>
          <figure className="lg:w-1/2">
            <a href={profil.urlPortfolio || '#'} target="_blank">
              <Image
                src={profil.imagePortfolio || '/assets/defaut.png'}
                width={1000}
                height={1000}
                alt="Profile Image"
                className="transition delay-75 object-cover h-full w-full hover:contrast-125 border border-black"
              />
            </a>
          </figure>
        </article>
        <article className="flex flex-col 2xl:flex-row gap-8">
          <article className="2xl:w-1/2">
            <h1 className="text-xl md:text-4xl my-5 text-beige bg-black uppercase py-1 px-1">
              Categories
            </h1>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 w-fit">
              {profil.categories.map((category) => (
                <>
                  <span className="md:text-xl text-center border-2 border-black rounded-sm px-2 py-1">
                    {category.name}
                  </span>
                </>
              ))}
            </div>
          </article>
          <aside className="2xl:w-1/2">
            <h1 className="text-xl md:text-4xl my-5 text-beige bg-black uppercase py-1 px-1">
              Network
            </h1>
            <div className="grid grid-cols-4 md:grid-cols-7 gap-4 w-fit">
              {profil.UserNetwork.map((userNetwork) => (
                <>
                  {['github', 'linkedin'].includes(
                    userNetwork.network.name.toLowerCase()
                  ) ? (
                    <a href={userNetwork.url} target="_blank">
                      <Image
                        src={`/assets/${userNetwork.network.name.toLowerCase()}.svg`}
                        height={40}
                        width={40}
                        alt={`${userNetwork.network.name} logo`}
                        className="transition delay-75 hover:scale-125"
                      />
                    </a>
                  ) : (
                    <a href={userNetwork.url} target="_blank">
                      <span className="md:text-xl border-2 border-black rounded-sm px-2 py-1">
                        {userNetwork.network.name}
                      </span>
                    </a>
                  )}
                </>
              ))}
            </div>
          </aside>
        </article>
      </div>
    </section>
  );
}

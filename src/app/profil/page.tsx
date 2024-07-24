import { requiredCurrentUser } from '@/auth/currentUser';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function ProfilPage() {
  const user = await requiredCurrentUser();

  return (
    <section className="flex flex-col w-full px-5 md:px-20 pt-20 pb-10">
      <article className="w-full grid grid-cols-2 border-b pb-10 items-center">
        <h1 className="text-2xl lg:text-4xl xl:text-6xl uppercase">
          Résumé profil
        </h1>
        <p className="text-sm lg:text-lg text-right">
          Vous pouvez consulter le résumé de votre profil sur cette page ainsi
          que le modifier.
        </p>
      </article>
      <section className="w-full">
        <section className="flex justify-center w-full py-5 ">
          <div className="w-full">
            <article className="lg:flex mb-10 items-baseline w-full border-b">
              {user.firstname ? (
                <h1 className="text-2xl md:text-6xl capitalize ">
                  {user.firstname} {user.lastname}
                </h1>
              ) : (
                <h1 className="text-2xl md:text-6xl capitalize ">Prénom Nom</h1>
              )}
              <p className="md:text-4xl ml-2">#{user.name}</p>
            </article>
            <article className="flex flex-col-reverse lg:flex-row gap-4 mb-3 md:gap-8">
              <article className="lg:w-1/2 flex flex-col bg-slate-00">
                <h1 className="text-2xl md:text-4xl mb-5 text-beige bg-black uppercase py-1 px-1 top-0">
                  Description
                </h1>
                {user.description ? (
                  <p className="md:text-lg text-justify px-1">
                    {user.description}
                  </p>
                ) : (
                  <>
                    <p className="md:text-lg text-justify px-1">
                      Entrer une description de vous.
                    </p>
                    <p>
                      Si vous n&apos;avez pas de portfolio vous pouvez mettre
                      votre profil linkedin, github etc.
                    </p>
                  </>
                )}
              </article>
              <figure className="lg:w-1/2">
                {user.imagePortfolio ? (
                  <a href={user?.urlPortfolio as string} target="_blank">
                    <Image
                      src={user.imagePortfolio}
                      alt={`${user.name}'s portfolio`}
                      width={1000}
                      height={1000}
                      className="transition delay-75 object-cover h-full w-full hover:contrast-125 border border-black"
                    />
                  </a>
                ) : (
                  <Image
                    src="/assets/defaut.png"
                    alt="Image par défaut"
                    width={1000}
                    height={1000}
                    className="w-full h-auto"
                  />
                )}
              </figure>
            </article>
            <article className="flex flex-col 2xl:flex-row gap-8">
              <article className="2xl:w-1/2">
                <h1 className="text-2xl md:text-4xl my-5 text-beige bg-black uppercase py-1 px-1">
                  Categories
                </h1>
                <div className="flex flex-row flex-wrap gap-4 w-fit">
                  {user?.categories.map((category) => (
                    <>
                      <span className="md:text-xl border-2 border-black rounded-sm px-2 py-1">
                        {category.name}
                      </span>
                    </>
                  ))}
                  <Link
                    href={`/profil/edit/category`}
                    className="flex border-2 border-black uppercase py-1 px-3 hover:bg-black hover:text-white items-center"
                  >
                    <Plus />
                  </Link>
                </div>
              </article>
              <aside className="2xl:w-1/2">
                <h1 className="text-2xl md:text-4xl my-5 text-beige bg-black uppercase py-1 px-1">
                  Network
                </h1>
                <div className="flex gap-4 w-fit">
                  {user?.UserNetwork.map((userNetwork) => (
                    <div key={userNetwork.networkId}>
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
                    </div>
                  ))}
                  <Link
                    href={`/profil/edit/network`}
                    className="flex border-2 border-black uppercase py-1 px-3 hover:bg-black hover:text-white items-center"
                  >
                    <Plus />
                  </Link>
                </div>
              </aside>
            </article>
          </div>
        </section>
        <article className="text-center text-2xl">
          <Link
            href={`/profil/edit`}
            key={user.userId}
            className="border-2 border-black uppercase py-1 px-1 hover:bg-black hover:text-white"
          >
            Modifier profil
          </Link>
        </article>
      </section>
    </section>
  );
}

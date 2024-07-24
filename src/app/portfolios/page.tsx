'use client';

import { Category, User } from '@prisma/client';
import { getProfilesPaginated } from './portfolio.action';
import PortfoliosPaginate from './PortfoliosPaginate';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ClipLoader } from 'react-spinners';

type Profile = (User & { categories: Category[] })[];

export default function PortfoliosPage() {
  const [page, setPage] = useState(1);
  const [profiles, setProfiles] = useState<Profile>();
  const [lastPage, setLastPage] = useState(1);

  const fetchProfiles = async () => {
    const { data, nbPages } = await getProfilesPaginated(page);
    setProfiles(data);
    setLastPage(nbPages);
  };

  useEffect(() => {
    setProfiles(undefined);
    fetchProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <section className="flex w-full min-h-screen px-5 md:px-20 pt-20 md:pt-32">
      <div className="flex flex-col w-full">
        <article className="text-lg md:flex md:items-center mb-5 md:mb-10 w-full pb-5 md:pb-10 border-b gap-4">
          <h1 className="text-sm md:text-2xl lg:text-4xl xl:text-6xl lg:w-1/2 uppercase">
            Liste des portfolios
          </h1>
          <p className="md:w-1/2 text-sm lg:text-lg md:text-right">
            Liste des profils acceptés. Il est possible de tomber sur des
            profils francophones hors France. Ses profils ont été accepté dans
            le cadre où les personnes concernées s&apos;investissent dans la
            communauté francophone où recherche un emploi en France.
          </p>
        </article>
        {profiles ? <PortfoliosPaginate profiles={profiles} /> : <ClipLoader />}
        <div className="flex justify-center mt-5 gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="text-beige bg-black px-3 py-2 text-lg disabled:bg-slate-700 hover:scale-110 disabled:hover:scale-100 transition delay-75"
          >
            <ChevronLeft />
          </button>
          <button
            disabled={page >= lastPage}
            onClick={() => setPage(page + 1)}
            className="text-beige bg-black px-3 py-2 text-lg disabled:bg-slate-700 hover:scale-110 disabled:hover:scale-100 transition delay-75"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}

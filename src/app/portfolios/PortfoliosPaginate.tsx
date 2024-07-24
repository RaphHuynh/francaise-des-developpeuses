import { Category, User } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Profile = (User & { categories: Category[] })[];

interface PortfoliosPaginateProps {
  profiles: Profile;
}

export default function PortfoliosPaginate({
  profiles,
}: PortfoliosPaginateProps) {
  return (
    <article className="flex items-center justify-center w-full">
      <article className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
        {profiles.map((member) => (
          <Link
            href={`/portfolios/${member.userId}`}
            key={member.userId}
            className="transition delay-75 border h-min hover:scale-105 duration-50"
          >
            <Image
              width={1000}
              height={10}
              src={member.imagePortfolio || '/assets/defaut.png'}
              alt={member.name || 'default'}
              className="object-cover w-full h-56 hover:contrast-125 duration-200"
            />
            <aside className="pt-2 md:p-2 md:h-1/3">
              <h1 className="uppercase text-beige bg-black py-1 px-1 mb-2 w-fit">
                {member.name}
              </h1>
              {member.categories && (
                <div className="w-full flex justify-end">
                  <p className="text-sm">
                    {member.categories
                      .map((c) => c.name)
                      .slice(0, 3)
                      .join(', ')}
                    {member.categories.length > 3 && '...'}
                  </p>
                </div>
              )}
            </aside>
          </Link>
        ))}
      </article>
    </article>
  );
}

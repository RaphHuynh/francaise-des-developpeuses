'use server';

import { prisma } from '@/lib/db';

const predicat = {
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
};

export const getProfilesPaginated = async (page: number) => {
  const profiles = await prisma.user.findMany({
    include: {
      categories: true,
      UserNetwork: true,
    },
    where: predicat,
    take: 8,
    skip: page === 1 ? 0 : (page - 1) * 8,
  });

  const count = await prisma.user.count({
    where: predicat,
  });

  console.log(count);

  return {
    data: profiles,
    nbItems: count,
    nbPages: Math.ceil(count / 8),
  };
};

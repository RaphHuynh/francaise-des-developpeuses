'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const handleValidate = async (id: string) => {
  await prisma.user.update({
    data: {
      emailVerified: new Date(),
    },
    where: {
      id,
    },
  });

  revalidatePath('/admin/profiles');
};

export const handleUnban = async (id: string) => {
  await prisma.user.update({
    data: {
      bannished: null,
    },
    where: {
      id,
    },
  });

  revalidatePath('/admin/profiles');
};

export const handleDelete = async (id: string) => {
  await prisma.user.update({
    data: {
      bannished: new Date(),
    },
    where: {
      id,
    },
  });

  revalidatePath('/admin/profiles');
};

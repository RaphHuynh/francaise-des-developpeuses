'use server';

import { prisma } from '@/lib/db';
import { adminAction } from '@/lib/safe-action';
import { revalidatePath } from 'next/cache';
import { NetworkSchema } from './network.schema';

export const handleDeleteNetwork = async (id: number) => {
  await prisma.network.delete({
    where: { id },
  });

  revalidatePath('/admin/networks');
};

export const addNetworkAction = adminAction
  .schema(NetworkSchema)
  .action(async ({ parsedInput }) => {
    await prisma.network.create({
      data: parsedInput,
    });

    revalidatePath('/admin/networks');
  });

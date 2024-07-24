'use server';

import { userAction } from '@/lib/safe-action';
import { ImageSchema, ProfilSchema } from './profil.schema';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const updateProfilAction = userAction
  .schema(ProfilSchema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    await prisma.user.update({
      data: {
        ...parsedInput,
      },
      where: {
        id: user.id,
      },
    });

    revalidatePath(`/profil/${user.userId}/edit`);
  });

export const uploadImagePortfolio = userAction
  .schema(ImageSchema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    await prisma.user.update({
      data: {
        imagePortfolio: parsedInput.imagePortfolio,
      },
      where: {
        id: user.id,
      },
    });

    revalidatePath(`/profil/${user.userId}/edit`);
  });

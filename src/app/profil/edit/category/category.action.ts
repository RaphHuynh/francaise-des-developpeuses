'use server';

import { userAction } from '@/lib/safe-action';
import { CategoriesSchema } from './category.schema';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const addCategoriesToUserAction = userAction
  .schema(CategoriesSchema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    console.log('test 2');

    await prisma.user.update({
      data: {
        categories: {
          connect: parsedInput.categories.map((id: number) => ({ id })),
        },
      },
      where: {
        id: user.id,
      },
    });

    revalidatePath(`/profil/edit/category`, 'layout');
  });

export const removeCategoriesToUserAction = userAction
  .schema(CategoriesSchema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    await prisma.user.update({
      data: {
        categories: {
          disconnect: parsedInput.categories.map((id: number) => ({ id })),
        },
      },
      where: {
        id: user.id,
      },
    });

    revalidatePath(`/profil/edit/category`, 'page');
  });

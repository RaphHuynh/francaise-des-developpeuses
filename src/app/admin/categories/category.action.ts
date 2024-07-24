'use server';

import { prisma } from '@/lib/db';
import { adminAction } from '@/lib/safe-action';
import { revalidatePath } from 'next/cache';
import { CategorySchema } from './category.schema';

export const handleDeleteCategory = async (id: number) => {
  await prisma.category.delete({
    where: { id },
  });

  revalidatePath('/admin/categories');
};

export const addCategoryAction = adminAction
  .schema(CategorySchema)
  .action(async ({ parsedInput }) => {
    await prisma.category.create({
      data: parsedInput,
    });

    revalidatePath('/admin/categories');
  });

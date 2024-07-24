import { requiredCurrentUser } from '@/auth/currentUser';
import { prisma } from '@/lib/db';
import AddCategoryForm from './AddCategoryForm';
import { RemoveCategoryForm } from './RemoveCategoryForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function CategoryPage() {
  const user = await requiredCurrentUser();

  const categories = await prisma.category.findMany({
    where: {
      NOT: {
        users: {
          some: {
            id: user.id,
          },
        },
      },
    },
  });
  const categoriesOfUser = await prisma.category.findMany({
    where: {
      users: {
        some: {
          id: user.id,
        },
      },
    },
  });

  return (
    <section className="flex flex-col w-full px-5 md:px-20 pt-28">
      <article className="w-full grid grid-cols-2 border-b pb-10 items-center">
        <h1 className="text-2xl lg:text-4xl xl:text-6xl uppercase">
          Catégories
        </h1>
        <p className="text-sm lg:text-lg text-right">
          Vous pouvez sélectionner des catégories ou retirer des catégories sur
          cette page.
        </p>
      </article>
      <article className="w-full pt-12 gap-4 md:flex">
        <AddCategoryForm categories={categories} />
        <RemoveCategoryForm categoriesOfUser={categoriesOfUser} />
      </article>
      <Link
        href={`/profil`}
        className="text-3xl bottom-2 fixed hover:bg-black hover:text-white rounded-full px-2 py-1 transition delay-100"
      >
        <ArrowLeft />
      </Link>
    </section>
  );
}

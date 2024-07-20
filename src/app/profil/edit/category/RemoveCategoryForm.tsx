'use client';

import { Category } from '@prisma/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CategoriesSchema, CategoriesType } from './category.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { removeCategoriesToUserAction } from './category.action';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';

export function RemoveCategoryForm({
  categoriesOfUser,
}: {
  categoriesOfUser: Category[];
}) {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CategoriesType>({
    resolver: zodResolver(CategoriesSchema),
  });

  const mutation = useMutation({
    mutationFn: async (values: CategoriesType) => {
      values.categories = values.categories.map(Number);

      const { serverError } =
        (await removeCategoriesToUserAction(values)) ?? {};

      if (serverError) {
        toast.error(serverError);
        return;
      }

      toast.success('Catégories supprimées avec succès !');
      setSelectedCategories([]);
      reset();
    },
  });

  const handleCheckboxChange = (category: Category) => {
    if (selectedCategories.includes(category.id)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== category.id)
      );
    } else {
      setSelectedCategories([...selectedCategories, category.id]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        console.log(values);

        await mutation.mutateAsync(values);
      })}
      className="md:w-1/2 pb-10 md:pb-0"
    >
      <h1 className="text-4xl md:text-4xl text-beige bg-black uppercase py-1 px-1 top-0">
        Supprimer des catégories :
      </h1>
      <div className="flex flex-wrap gap-4 py-10">
        {categoriesOfUser.map((category) => (
          <label
            key={category.id}
            className={`border-2 border-black md:w-32 text-center cursor-pointer hover:scale-110 transition delay-75 ${selectedCategories.includes(category.id) ? 'bg-black text-beige' : ' text-black'}`}
          >
            <input
              type="checkbox"
              onClick={() => handleCheckboxChange(category)}
              value={category.id}
              {...register('categories')}
              className="hidden"
            />
            <span className="block p-2">{category.name}</span>
          </label>
        ))}
      </div>
      {errors.categories && (
        <p className="text-red-500 mb-5">{errors.categories.message}</p>
      )}
      <button
        type="submit"
        className="border-2 w-full border-black uppercase py-2 px-3 bg-black text-beige hover:scale-110 transition delay-75"
      >
        Supprimer
      </button>
    </form>
  );
}

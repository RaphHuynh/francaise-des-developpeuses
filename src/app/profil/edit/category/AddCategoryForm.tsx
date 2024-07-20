'use client';

import { Category } from '@prisma/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CategoriesSchema, CategoriesType } from './category.schema';
import { useMutation } from '@tanstack/react-query';
import { addCategoriesToUserAction } from './category.action';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';

export default function AddCategoryForm({
  categories,
}: {
  categories: Category[];
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

  const handleCheckboxChange = (category: Category) => {
    if (selectedCategories.includes(category.id)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== category.id)
      );
    } else {
      setSelectedCategories([...selectedCategories, category.id]);
    }
  };

  const mutation = useMutation({
    mutationFn: async (values: CategoriesType) => {
      values.categories = values.categories.map(Number);

      const { serverError } = (await addCategoriesToUserAction(values)) ?? {};

      if (serverError) {
        toast.error(serverError);
        return;
      }

      toast.success('Catégories ajoutées avec succès !');
      setSelectedCategories([]);
      reset();
    },
  });

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        await mutation.mutateAsync(values);
      })}
      className="md:w-1/2"
    >
      <h1 className="text-4xl md:text-4xl text-beige bg-black uppercase py-1 px-1 top-0">
        Sélectionnez les catégories :
      </h1>
      <div className="flex flex-wrap gap-4 py-10">
        {categories.map((category) => (
          <label
            key={category.id}
            className="border-2 border-black md:w-32 text-center cursor-pointer hover:scale-110 transition delay-75"
          >
            <input
              type="checkbox"
              onClick={() => handleCheckboxChange(category)}
              value={category.id}
              className="hidden"
              {...register('categories')}
            />
            <span
              className={`block ${selectedCategories.includes(category.id) ? 'text-white bg-black p-2' : 'text-black p-2'}`}
            >
              {category.name}
            </span>
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
        Soumettre
      </button>
    </form>
  );
}

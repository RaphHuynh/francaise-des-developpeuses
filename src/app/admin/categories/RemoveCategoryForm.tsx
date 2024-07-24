'use client';

import { Category } from '@prisma/client';
import { handleDeleteCategory } from './category.action';

export default function RemoveNetworkForm({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <ul className="grid grid-cols-3 md:grid-cols-6 gap-2">
      {categories.map((category) => (
        <li key={category.id} className="border-2 border-black flex flex-col">
          <button onClick={() => handleDeleteCategory(category.id)}>
            {category.name} - Supprimer
          </button>
        </li>
      ))}
    </ul>
  );
}

import { z } from 'zod';

export const CategorySchema = z.object({
  name: z.string().min(1, {
    message: 'Le nom de la catégorie est requis',
  }),
});

export type CategoryType = z.infer<typeof CategorySchema>;

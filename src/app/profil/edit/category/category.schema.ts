import { z } from 'zod';

export const CategoriesSchema = z.object({
  categories: z.string().or(z.number()).array().min(1, {
    message: 'Veuillez sélectionner au moins une catégorie',
  }),
});

export type CategoriesType = z.infer<typeof CategoriesSchema>;

import { z } from 'zod';

export const CategoriesSchema = z.object({
  categories: z.array(z.string().or(z.number()), {
    message: 'Veuillez au moins sélectionner une catégorie',
  }),
});

export type CategoriesType = z.infer<typeof CategoriesSchema>;

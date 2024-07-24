import { z } from 'zod';

export const ProfilSchema = z.object({
  lastname: z
    .string()
    .max(50, {
      message: 'Le nom ne peut dépasser les 50 caractères',
    })
    .optional(),
  firstname: z
    .string()
    .max(50, {
      message: 'Le prénom ne peut dépasser les 50 caractères',
    })
    .optional(),
  description: z.string().optional(),
  email: z
    .string()
    .max(320, {
      message: "L'email ne peut dépasser les 320 caractères",
    })
    .email({
      message: 'Email invalide',
    }),
  urlPortfolio: z
    .string()
    .optional()
    .refine(
      (value) =>
        !value ||
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w.-]*)*\/?$/.test(
          value
        ),
      {
        message: 'URL invalide',
      }
    ),
});

export const ImageSchema = z.object({
  imagePortfolio: z
    .any()
    .refine(
      (values) =>
        ['image/png', 'image/jpeg'].includes(values[0]?.type) ||
        typeof values === 'string',
      {
        message: 'Le fichier doit être une image PNG ou JPEG',
      }
    ),
});

export type ProfilType = z.infer<typeof ProfilSchema>;
export type ImageType = z.infer<typeof ImageSchema>;

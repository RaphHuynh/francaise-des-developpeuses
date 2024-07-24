import { z } from 'zod';

export const NetworkSchema = z.object({
  name: z.string().min(1, {
    message: 'Le nom du réseau social est requis',
  }),
});

export type NetworkType = z.infer<typeof NetworkSchema>;

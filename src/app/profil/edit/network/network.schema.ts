import { z } from 'zod';

const zEmptyStrToUndefined = z.preprocess((arg) => {
  if (typeof arg === 'string' && arg === '') {
    return undefined;
  } else {
    return arg;
  }
}, z.string().optional());

export const NetworksSchema = z.object({
  networks: z
    .array(
      z.object({
        id: z.number(),
        url: zEmptyStrToUndefined.refine(
          (value) =>
            !value ||
            /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w.-]*)*\/?$/.test(
              value
            ),
          {
            message: 'URL invalide',
          }
        ),
      }),
      {
        message: 'Veuillez au moins entrer une URL',
      }
    )
    .refine((value) => value.some((n) => n.url), {
      message: 'Veuillez au moins entrer une URL',
    }),
});

export const NetworksSchemaDelete = z.object({
  networks: z.array(z.string().or(z.number())).min(1, {
    message: 'Veuillez au moins sélectionner un réseau social',
  }),
});

export type NetworksType = z.infer<typeof NetworksSchema>;
export type NetworksSchemaDeleteType = z.infer<typeof NetworksSchemaDelete>;

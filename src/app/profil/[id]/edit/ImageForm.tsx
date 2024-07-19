'use client';

import { User } from '@prisma/client';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { ImageSchema, ImageType } from './profil.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { uploadImagePortfolio } from './profil.action';
import { toast } from 'sonner';
import { getBase64 } from '@/utils/getBase64';

export default function ImageForm({ user }: { user: User }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ImageType>({
    resolver: zodResolver(ImageSchema),
  });

  const mutation = useMutation({
    mutationFn: async (values: ImageType) => {
      const imagePortfolio = await getBase64(values.imagePortfolio[0]);

      const { serverError } =
        (await uploadImagePortfolio({ imagePortfolio })) ?? {};

      if (serverError) {
        toast.error(serverError);
        return;
      }

      toast.success('Image de portfolio mise à jour');
    },
  });

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        await mutation.mutateAsync(values);
      })}
      className="flex flex-col"
    >
      {user.imagePortfolio ? (
        <Image
          alt={`${user.name}'s Portfolio image`}
          src={user.imagePortfolio}
          width={1000}
          height={1000}
          className="transition delay-75 object-cover w-full h-96 hover:contrast-125 border border-black"
        />
      ) : (
        <Image
          width={1000}
          height={1000}
          className="w-full h-full"
          src="/assets/defaut.png"
          alt="Image par défaut"
        />
      )}
      <div className="flex justify-center w-full">
        <input
          type="file"
          {...register('imagePortfolio')}
          accept="image/jpeg, image/png"
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:text-sm file:font-semibold file:text-black hover:scale-105 file:bg-transparent file:border-2 file:border-black mt-5 file:cursor-pointer flex justify-center"
        />
      </div>
      {errors.imagePortfolio && (
        <p className="text-red-400 text-center">
          {errors.imagePortfolio.message as string}
        </p>
      )}
      <input
        type="submit"
        value="Envoyer"
        className="hover:cursor-pointer uppercase py-2 px-2 md:py-4 md:px-3 bg-black text-beige hover:scale-105 transition delay-75 mt-4 w-full"
      />
    </form>
  );
}

'use client';

import { User } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { ProfilSchema, ProfilType } from './profil.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateProfilAction } from './profil.action';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function ProfilForm({ user }: { user: User }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ProfilType>({ resolver: zodResolver(ProfilSchema) });

  const mutation = useMutation({
    mutationFn: async (values: ProfilType) => {
      const { serverError } = (await updateProfilAction(values)) ?? {};

      if (serverError) {
        toast.error('Erreur');
        return;
      }

      toast.success('Profil mis à jour');
    },
  });

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        await mutation.mutateAsync(values);
      })}
      className="flex flex-col gap-2"
    >
      <div className="flex flex-col">
        <label htmlFor="lastname" className="uppercase">
          Nom :
        </label>
        <input
          type="text"
          {...register('lastname')}
          defaultValue={user.lastname ?? undefined}
          className="bg-transparent border-b border-black focus:border-slate-400 p-1 focus:ring-transparent focus:outline-none focus:placeholder:text-slate-400 placeholder:text-slate-500"
          placeholder="Name"
        />
        {errors.lastname && (
          <p className="text-red-500">{errors.lastname.message}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="firstname" className="uppercase">
          Prénom :
        </label>
        <input
          type="text"
          {...register('firstname')}
          defaultValue={user.firstname ?? undefined}
          className="bg-transparent border-b border-black focus:border-slate-400 p-1 focus:ring-transparent focus:outline-none focus:placeholder:text-slate-400 placeholder:text-slate-500"
          placeholder="Firstname"
        />
        {errors.firstname && (
          <p className="text-red-500">{errors.firstname.message}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="description" className="uppercase">
          Description :
        </label>
        <input
          type="text"
          {...register('description')}
          defaultValue={user.description ?? undefined}
          className="bg-transparent border-b border-black focus:border-slate-400 p-1 focus:ring-transparent focus:outline-none focus:placeholder:text-slate-400 placeholder:text-slate-500"
          placeholder="Bonjour, je suis ..."
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="mail" className="uppercase">
          Email :
        </label>
        <input
          type="mail"
          {...register('email')}
          defaultValue={user.email ?? undefined}
          className="bg-transparent border-b border-black focus:border-slate-400 p-1 focus:ring-transparent focus:outline-none focus:placeholder:text-slate-400 placeholder:text-slate-500"
          placeholder="example@example.com"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="url_portfolio" className="uppercase">
          Url du portfolio :
        </label>
        <input
          type="text"
          {...register('urlPortfolio')}
          defaultValue={user.urlPortfolio ?? undefined}
          className="bg-transparent border-b border-black focus:border-slate-400 p-1 focus:ring-transparent focus:outline-none focus:placeholder:text-slate-400 placeholder:text-slate-500"
          placeholder="www.example.com"
        />
        {errors.urlPortfolio && (
          <p className="text-red-500">{errors.urlPortfolio.message}</p>
        )}
      </div>
      <input
        type="submit"
        name="update_profil"
        value="Valider"
        className="hover:cursor-pointer uppercase py-2 px-2 md:py-4 md:px-3 bg-black text-beige hover:scale-105 transition delay-75 mt-4 w-full"
      />
    </form>
  );
}

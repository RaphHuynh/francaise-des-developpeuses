'use client';

import { useForm } from 'react-hook-form';
import { NetworkSchema, NetworkType } from './network.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { addNetworkAction } from './network.action';
import { toast } from 'sonner';

export default function AddNetworkForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<NetworkType>({
    resolver: zodResolver(NetworkSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: NetworkType) => {
      const { serverError } = (await addNetworkAction(data)) ?? {};

      if (serverError) {
        toast.error(serverError);
        return;
      }

      toast.success('Le réseau social a bien été ajouté');
      reset();
    },
  });

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        await mutation.mutateAsync(values);
      })}
      className="flex flex-col"
    >
      <label className="uppercase">Nom du réseau social :</label>
      <input
        type="text"
        {...register('name')}
        className="bg-transparent border-b border-black focus:border-slate-400 p-1 focus:ring-transparent focus:outline-none focus:placeholder:text-slate-400 placeholder:text-slate-500"
        placeholder="Github"
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      <button
        type="submit"
        className="border-2 border-black uppercase py-2 px-3 bg-black text-beige hover:scale-105 transition delay-75 mt-4 w-full"
      >
        Ajouter le réseau social
      </button>
    </form>
  );
}

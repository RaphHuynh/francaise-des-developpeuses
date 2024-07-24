'use client';

import { Network, User } from '@prisma/client';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { NetworksSchema, NetworksType } from './network.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { addNetworkToUserAction } from './network.action';
import { toast } from 'sonner';

export default function AddNetworkForm({
  networks,
  currentUser,
}: {
  networks: Network[];
  currentUser: User & { UserNetwork: { url: string; network: Network }[] };
}) {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset,
  } = useForm<NetworksType>({
    resolver: zodResolver(NetworksSchema),
  });
  const networksRef = useRef(
    networks.map((network) => ({
      id: network.id,
      url: currentUser.UserNetwork.find((n) => n.network.id === network.id)
        ?.url,
    }))
  );

  const mutation = useMutation({
    mutationFn: async (values: NetworksType) => {
      const { serverError } = (await addNetworkToUserAction(values)) ?? {};

      if (serverError) {
        toast.error(serverError);
        return;
      }

      toast.success('Réseaux sociaux ajoutés avec succès !');
      reset();
    },
  });

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        await mutation.mutateAsync(values);
      })}
      className="md:w-1/2"
    >
      <h1 className="text-4xl md:text-4xl text-beige bg-black uppercase py-1 px-1 top-0 mb-10">
        Ajouter ou modifier
      </h1>
      {networks.map((network, index) => (
        <div key={network.id} className="flex flex-col mb-2">
          <label className="uppercase">{network.name} :</label>
          <input
            type="text"
            defaultValue={
              currentUser.UserNetwork.find((n) => n.network.id === network.id)
                ?.url
            }
            {...(register(`networks`),
            {
              onChange: (e) => {
                const prev = [...networksRef.current];
                const valueToChange = prev.find((n) => n.id === network.id);
                if (valueToChange) {
                  valueToChange.url = e.target.value;
                }
                networksRef.current = prev;
                setValue('networks', networksRef.current);
              },
            })}
            className="bg-transparent border-b border-black focus:border-slate-400 p-1 focus:ring-transparent focus:outline-none focus:placeholder:text-slate-400 placeholder:text-slate-500"
            placeholder="www.example.com"
          />
          {errors.networks &&
            errors.networks.message !== 'Veuillez au moins entrer une URL' && (
              <p className="text-red-500">
                {errors.networks[index]?.url?.message}
              </p>
            )}
        </div>
      ))}
      {errors.networks &&
        errors.networks.message === 'Veuillez au moins entrer une URL' && (
          <p className="text-red-500">{errors.networks.message}</p>
        )}
      <button
        type="submit"
        className="border-2 border-black uppercase py-2 px-3 bg-black text-beige hover:scale-105 transition delay-75 mt-4 w-full"
      >
        Valider
      </button>
    </form>
  );
}

'use client';

import { Network } from '@prisma/client';
import { useForm } from 'react-hook-form';
import {
  NetworksSchemaDelete,
  NetworksSchemaDeleteType,
} from './network.schema';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { removeNetworkToUserAction } from './network.action';
import { toast } from 'sonner';

export default function RemoveNetworkForm({
  networksOfUser,
}: {
  networksOfUser: Network[];
}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<NetworksSchemaDeleteType>({
    defaultValues: {
      networks: [],
    },
    resolver: zodResolver(NetworksSchemaDelete),
  });

  const [selectedNetworks, setSelectedNetworks] = useState<number[]>([]);

  const handleCheckboxChange = (network: Network) => {
    if (selectedNetworks.includes(network.id)) {
      setSelectedNetworks(selectedNetworks.filter((id) => id !== network.id));
    } else {
      setSelectedNetworks([...selectedNetworks, network.id]);
    }
  };

  const mutation = useMutation({
    mutationFn: async (values: NetworksSchemaDeleteType) => {
      values.networks = values.networks.map(Number);

      const { serverError } = (await removeNetworkToUserAction(values)) ?? {};

      if (serverError) {
        toast.error(serverError);
        return;
      }

      toast.success('Réseaux sociaux supprimés avec succès !');
      setSelectedNetworks([]);
      reset();
    },
  });

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        await mutation.mutateAsync(values);
      })}
      className="md:w-1/2 pb-10 md:pb-0"
    >
      <h1 className="text-4xl md:text-4xl text-beige bg-black uppercase py-1 px-1 top-0 mb-4">
        Supprimer
      </h1>
      <div className="flex flex-wrap gap-4">
        {networksOfUser.map((network) => (
          <label
            key={network.id}
            className={`border-2 border-black w-32 text-center cursor-pointer hover:scale-110 transition delay-75 ${selectedNetworks.includes(network.id) ? 'bg-black text-beige' : ' text-black'}`}
          >
            <input
              type="checkbox"
              value={network.id}
              onClick={() => {
                handleCheckboxChange(network);
              }}
              {...register('networks')}
              className="hidden"
            />
            <span className="block p-2">{network.name}</span>
          </label>
        ))}
      </div>
      {errors.networks && (
        <p className="text-red-500">{errors.networks.message}</p>
      )}
      <button
        type="submit"
        className="border-2 border-black uppercase py-2 px-3 bg-black text-beige hover:scale-105 transition delay-75 mt-4 w-full"
      >
        Supprimer
      </button>
    </form>
  );
}

/*
<form onSubmit={deleteSubmit} className="md:w-1/2 pb-10 md:pb-0">
          <h1 className="text-4xl md:text-4xl text-beige bg-black uppercase py-1 px-1 top-0 mb-4">
            Supprimer
          </h1>
          <div className="flex flex-wrap gap-4">
            {networksOfUser.map((network) => (
              <label
                key={network.id_network}
                className={`border-2 border-black w-32 text-center cursor-pointer hover:scale-110 transition delay-75 ${selectedNetworks.includes(network.id_network) ? 'bg-black text-beige' : ' text-black'}`}
              >
                <input
                  type="checkbox"
                  name={`network_${network.id_network}`}
                  value={network.id_network}
                  onChange={deleteCheckboxChange}
                  className="hidden"
                />
                <span className="block p-2">{network.name}</span>
              </label>
            ))}
          </div>
          <button
            type="submit"
            className="border-2 border-black uppercase py-2 px-3 bg-black text-beige hover:scale-105 transition delay-75 mt-4 w-full"
          >
            Supprimer
          </button>
          <p className="my-4">
            {deleteMessage && (
              <span className="border-2 border-slate-800 rounded-sm px-2 py-1">
                {deleteMessage}
                <button
                  onClick={clearDeleteMessage}
                  className="ml-2 text-black"
                >
                  &#x2716;
                </button>
              </span>
            )}
          </p>
        </form>
*/

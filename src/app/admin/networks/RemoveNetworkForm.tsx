'use client';

import { Network } from '@prisma/client';
import { handleDeleteNetwork } from './network.action';

export default function RemoveNetworkForm({
  networks,
}: {
  networks: Network[];
}) {
  return (
    <ul className="grid grid-cols-3 md:grid-cols-6 gap-2">
      {networks.map((network) => (
        <li key={network.id} className="border-2 border-black flex flex-col">
          <button onClick={() => handleDeleteNetwork(network.id)}>
            {network.name} - Supprimer
          </button>
        </li>
      ))}
    </ul>
  );
}

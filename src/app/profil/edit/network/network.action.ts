'use server';

import { userAction } from '@/lib/safe-action';
import { NetworksSchema, NetworksSchemaDelete } from './network.schema';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const addNetworkToUserAction = userAction
  .schema(NetworksSchema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    const { networks } = parsedInput;

    networks.map(async (network: { id: number; url: string | undefined }) => {
      if (!network.url) return;

      const data = await prisma.userNetwork.findUnique({
        where: {
          userId_networkId: {
            userId: user.id,
            networkId: network.id,
          },
        },
      });

      if (!data) {
        await prisma.userNetwork.create({
          data: {
            url: network.url,
            user: {
              connect: {
                id: user.id,
              },
            },
            network: {
              connect: {
                id: network.id,
              },
            },
          },
        });
        return;
      }

      await prisma.userNetwork.update({
        data: {
          url: network.url,
        },
        where: {
          userId_networkId: {
            userId: user.id,
            networkId: network.id,
          },
        },
      });
    });

    revalidatePath('/profil/edit/network');
  });

export const removeNetworkToUserAction = userAction
  .schema(NetworksSchemaDelete)
  .action(async ({ parsedInput, ctx: { user } }) => {
    const { networks } = parsedInput;

    networks.map(async (networkId: number) => {
      await prisma.userNetwork.delete({
        where: {
          userId_networkId: {
            userId: user.id,
            networkId: networkId,
          },
        },
      });
    });

    revalidatePath('/profil/edit/network');
  });

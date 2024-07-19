import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';

export const currentUser = async () => {
  const session = await auth();

  if (!session?.user) {
    return undefined;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      categories: true,
      UserNetwork: {
        include: {
          network: true,
        },
      },
    },
  });

  return user;
};

export const requiredCurrentUser = async () => {
  const user = await currentUser();

  if (!user) {
    redirect('/login');
  }

  return user;
};

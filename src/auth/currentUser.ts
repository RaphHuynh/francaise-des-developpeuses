import { auth } from '@/lib/auth';
import { User } from '@prisma/client';

export const currentUser = async () => {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return session.user as User;
};

export const requiredCurrentUser = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error('Not logged in');
  }

  return user;
};

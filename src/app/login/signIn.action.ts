'use server';

import { signIn } from '@/lib/auth';

export const signInAction = async () => {
  await signIn('github', {
    redirectTo: '/profil',
  });
};

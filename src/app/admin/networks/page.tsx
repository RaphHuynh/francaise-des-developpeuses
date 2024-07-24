import { requiredAdminUser } from '@/auth/currentUser';
import AddCategoryForm from './AddNetworkForm';
import RemoveNetworkForm from './RemoveNetworkForm';
import { prisma } from '@/lib/db';

export default async function Page() {
  await requiredAdminUser();

  const networks = await prisma.network.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  return (
    <section className="xl:flex w-full min-h-screen px-5 md:px-20 pt-20 pb-10 md:py-20 gap-4">
      <article className="xl:w-1/2 mb-2 xl:mb-0">
        <h1 className="text-2xl lg:text-4xl xl:text-6xl uppercase text-beige bg-black px-2 py-1 text-center">
          Créer un réseau social
        </h1>
        <AddCategoryForm />
      </article>
      <article className="xl:w-1/2">
        <h1 className="text-2xl lg:text-4xl xl:text-6xl uppercase text-beige bg-black px-2 py-1 text-center">
          Effacer un réseau social
        </h1>
        <div>
          <h2>Liste des réseaux sociaux :</h2>
          <RemoveNetworkForm networks={networks} />
        </div>
      </article>
    </section>
  );
}

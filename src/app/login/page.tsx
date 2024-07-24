import Image from 'next/image';
import SignInButton from '@/auth/SignInButton';
import { redirect } from 'next/navigation';
import { currentUser } from '@/auth/currentUser';

export default async function LoginPage() {
  const user = await currentUser();

  if (user) return redirect(`/profil`);

  return (
    <section className="flex flex-col-reverse xl:flex-row items-center justify-center w-full pt-10 h-screen gap-4">
      <article className="xl:w-3/6 h-screen p-10 flex items-center justify-center w-full">
        <Image
          src="/assets/logo-no-background.svg"
          alt="Logo of FDD"
          width={100}
          height={100}
          className="h-full w-full"
        />
      </article>
      <article className="flex flex-col h-screen xl:w-3/6 w-full bg-black pt-14">
        <h1 className="text-5xl md:text-6xl lg:text-[5rem] xl:text-[6rem] 2xl:text-[7rem] text-beige uppercase text-center ">
          Connexion
        </h1>
        <SignInButton className="flex items-center gap-2 text-4xl uppercase text-beige my-10 mx-5 md:mx-16 justify-center border-2 border-[#F7F4E9] py-2 rounded-full hover:bg-[#F7F4E9] hover:text-black transition delay-100" />
        <footer className="flex justify-center items-end bg-black text-beige w-content text-center h-full p-5">
          By RaynhCoding
        </footer>
      </article>
    </section>
  );
}

'use client';

import Image from 'next/image';
import { signInAction } from './signIn.action';

export default function LoginPage() {
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
        <button
          onClick={async () => {
            await signInAction();
          }}
          className="flex items-center gap-2 text-4xl uppercase text-beige my-10 mx-5 md:mx-16 justify-center border-2 border-[#F7F4E9] py-2 rounded-full hover:bg-[#F7F4E9] hover:text-black transition delay-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            className="bi bi-github"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
              className=""
            />
          </svg>
          Github
        </button>
        <footer className="flex justify-center items-end bg-black text-beige w-content text-center h-full p-5">
          By RaynhCoding
        </footer>
      </article>
    </section>
  );
}

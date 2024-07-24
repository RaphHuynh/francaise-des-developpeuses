'use client'; // Error components must be Client Components

import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Error() {
  console.log('miaou');

  return (
    <section className="flex flex-col items-center w-full min-h-screen px-5 md:px-20 pt-20 pb-10 md:py-20 gap-4 justify-center">
      <h1 className="text-center text-6xl">Accès refusé</h1>
      <p>
        Vous n&apos;êtes visiblement pas un administrateur. Vous ne pouvez pas
        visiter cette page
      </p>
      <Image
        width={50}
        height={50}
        alt="Kappa image"
        src="/assets/kappa.png"
        className="w-1/5 h-1/5"
      />
      <Link
        href="/"
        className="transition flex gap-3 text-sm delay-75 md:text-xl text-white md:px-4 bg-black hover:bg-black/90 hover:text-white py-2"
      >
        <ArrowLeft />
        Back to home
      </Link>
    </section>
  );
}

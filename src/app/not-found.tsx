import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <section className="flex flex-col items-center w-full min-h-screen px-5 md:px-20 pt-20 pb-10 md:py-20 gap-4 justify-center">
      <h1 className="text-center text-6xl">404 Not Found</h1>
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

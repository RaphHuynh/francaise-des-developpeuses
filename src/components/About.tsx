import Image from 'next/image';

export default function About() {
  return (
    <article className="lg:grid lg:grid-cols-3 md:gap-8">
      <aside className="hidden lg:block">
        <Image
          src="/assets/moi.jpeg"
          alt="test"
          width={1000}
          height={1000}
          className="w-full h-auto"
        ></Image>
      </aside>
      <aside className="col-span-2 mt-5">
        <p className="md:text-lg lg:text-xl text-justify mb-5">
          Je suis Raphaëlle étudiante en licence informatique. J&apos;aime
          l&apos;informatique et les sciences. Connu aussi sous
          l&apos;appelation RaynhCoding je réalise des lives de programmation
          sur ma chaine Twitch.
        </p>
        <p className="md:text-lg lg:text-xl text-justify">
          J&apos;ai réalisé ce site afin de mettre en valeur les femmes dans le
          monde de la tech qui reste majoritairement masculin.
        </p>
      </aside>
    </article>
  );
}

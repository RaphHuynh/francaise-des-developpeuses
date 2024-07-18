import Link from 'next/link';

export default function Home() {
  return (
    <section className="h-screen w-full flex flex-col justify-center px-5 md:px-20 pt-20 pb-10">
      <h1 className="text-3xl md:text-6xl xl:text-9xl uppercase bg-black text-beige w-fit py-3 px-2 md:py-5 md:px-4">
        Française Des
      </h1>
      <h1 className="text-3xl md:text-6xl xl:text-9xl mr-0 ml-auto uppercase bg-black text-beige w-fit py-3 px-2 md:py-5 md:px-4 mb-10">
        Développeuses
      </h1>
      <div className="md:w-full flex flex-col md:flex-row md:justify-center gap-2 md:gap-4">
        <Link
          href="/portfolios"
          className="text-xs md:text-2xl xl:text-3xl uppercase border-2 md:border-4 hover:bg-black hover:text-white border-black w-fit py-2 px-4 transition delay-150"
        >
          Voir les portfolios
        </Link>
        <a
          href="#About"
          className="text-xs md:text-2xl xl:text-3xl uppercase border-2 md:border-4 hover:bg-black hover:text-white border-black w-fit py-2 px-4 transition delay-150"
        >
          A propos
        </a>
        <a
          href="#About"
          className="text-xs md:text-2xl xl:text-3xl uppercase border-2 md:border-4 hover:bg-black hover:text-white border-black w-fit py-2 px-4 transition delay-150"
        >
          Comment s&apos;inscrire ?
        </a>
      </div>
    </section>
  );
}

import About from '@/components/About';
import RandomProfile from '@/components/RandomProfile';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <section className="h-screen w-full flex flex-col justify-center px-5 md:px-20 pt-20 pb-10">
        <h1 className="text-3xl md:text-6xl xl:text-9xl uppercase bg-black text-beige w-fit py-3 px-2 md:py-5 md:px-4">
          Française Des
        </h1>
        <h1 className="text-3xl md:text-6xl xl:text-9xl mr-0 ml-auto uppercase bg-black text-beige w-fit py-3 px-2 md:py-5 md:px-4 mb-10">
          Développeuses
        </h1>
        <div className="md:w-full flex flex-col items-center md:flex-row md:justify-center gap-2 md:gap-4">
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
      <section className="w-full min-h-screen px-5 md:px-20 pt-32" id="About">
        <article className="w-full">
          <section className="xl:grid xl:grid-cols-2 md:gap-10 border-b pb-5 md:pb-10">
            <aside className="pb-5 md:pb-0">
              <h1 className="text-xl md:text-4xl lg:text-6xl mb-10 uppercase bg-black text-beige text-center">
                Bienvenue
              </h1>
              <p className="md:text-lg lg:text-xl mb-5 md:mb-12 text-justify">
                Le site à pour but de mettre en avant les profils des femmes
                développeuses françaises. Découvrez la créativité,
                l&apos;expertise et la passion de ces femmes exceptionnelles qui
                font leur marque dans l&apos;industrie de l&apos;informatique.
                Explorez une variété de compétences techniques, de projets
                innovants et de parcours inspirants. Rejoignez-nous dans notre
                mission de promouvoir la diversité et l&apos;inclusion des
                femmes dans le domaine de la programmation en France.
              </p>
              <p className="text-sm md:text-base text-right">
                © Par Raphaëlle Huynh
              </p>
            </aside>
            <figure>
              <h1 className="text-xl  md:text-4xl lg:text-6xl mb-10 uppercase bg-black text-beige text-center">
                Profil mis en avant
              </h1>
              <RandomProfile />
            </figure>
          </section>
        </article>
        <article>
          <h1 className="text-4xl md:text-7xl text-center tracking-tighter uppercase py-10 border-b">
            A propos
          </h1>
          <section className="xl:grid xl:grid-cols-2 gap-4 md:gap-10 border-b py-5 md:py-10">
            <aside className="mb-5 md:mb-0">
              <h1 className="text-xl  md:text-4xl lg:text-6xl mb-10 uppercase bg-black text-beige text-center">
                COMMENT POSTULER ?
              </h1>
              <p className="md:text-lg lg:text-xl mb-12 text-justify">
                Pour soumettre votre candidature, vous devez vous connectez avec
                un compte Github ou Linkedin. Ensuite, vous devrez completer
                votre profil et le soumettre. Votre demande sera ensuite
                étudiée.
              </p>
              <p className="text-right">© Par Raphaëlle Huynh</p>
            </aside>
            <aside>
              <h1 className="text-xl  md:text-4xl lg:text-6xl mb-10 uppercase bg-black text-beige text-center">
                Qui sommes-nous ?
              </h1>
              <About />
            </aside>
          </section>
        </article>
      </section>
    </main>
  );
}

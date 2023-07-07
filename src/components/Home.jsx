import NavBar from "./NavBar";
import About from "./component/About";
import RandomProfil from "./component/RandomProfil";


function Home(){



    return (
        <main>
            <NavBar/>
            <section className="w-full min-h-screen px-20 py-32 ">
                <article className="w-full">
                    <h1 className="text-9xl text-center mb-10 tracking-tighter uppercase pb-10 border-b">Française des développeuses</h1>
                    <section className="grid grid-cols-2 gap-10 border-b pb-10">
                        <aside className="">
                            <h1 className="text-6xl mb-10 uppercase bg-black text-beige text-center">Bienvenue</h1>
                            <p className="text-2xl mb-12 text-justify">Le site à pour but de mettre en avant les profils des femmes développeuses françaises. Découvrez la créativité, l'expertise et la passion de ces femmes exceptionnelles qui font leur marque dans l'industrie de l'informatique. Explorez une variété de compétences techniques, de projets innovants et de parcours inspirants. Rejoignez-nous dans notre mission de promouvoir la diversité et l'inclusion des femmes dans le domaine de la programmation en France.</p>
                            <p className="text-right">© Par Raphaëlle Huynh</p>
                        </aside>
                        <figure>
                            <h1 className="text-6xl mb-10 uppercase bg-black text-beige text-center">Profil mise en avant</h1>
                            <RandomProfil/>
                        </figure>
                    </section>
                </article>
                <article>
                    <h1 className="text-7xl text-center tracking-tighter uppercase py-10 border-b">A propos</h1>
                    <section className="grid grid-cols-2 gap-10 border-b py-10">
                        <aside className="">
                            <h1 className="text-6xl mb-10 uppercase bg-black text-beige text-center">COMMENT POSTULER ?</h1>
                            <p className="text-2xl mb-12 text-justify">Pour soumettre votre candidature, vous devez vous connectez avec un compte Github ou Linkedin. Ensuite, vous devrez completer votre profil et le soumettre. Votre demande sera ensuite étudiée.</p>
                            <p className="text-right">© Par Raphaëlle Huynh</p>
                        </aside>
                        <aside>
                            <h1 className="text-6xl mb-10 uppercase bg-black text-beige text-center">Qui suis-je ?</h1>
                            <About/>
                        </aside>
                    </section>
                </article>
            </section>
        </main>
    )
}

export default Home;
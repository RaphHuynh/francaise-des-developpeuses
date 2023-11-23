import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import About from "./component/About";
import RandomProfil from "./component/RandomProfil";
import Footer from "./Footer";


function Home(){

    return (
        <main>
            <NavBar/>
            <section className="h-screen w-full flex flex-col justify-center px-5 md:px-20 md:py-32 pt-32 pb-10">
                <h1 className="text-9xl uppercase bg-black text-beige w-fit py-5 px-4">Française Des</h1>
                <h1 className="text-9xl mr-0 ml-auto uppercase bg-black text-beige w-fit py-5 px-4 mb-10">Développeuses</h1>
                <div className="w-full flex justify-center gap-4">
                    <Link to='/portfolios' className="text-3xl uppercase border-4 hover:bg-black hover:text-white border-black w-fit py-2 px-4 transition delay-150">Voir les portfolios</Link>
                    <a href="#About" className="text-3xl uppercase border-4 hover:bg-black hover:text-white border-black w-fit py-2 px-4 transition delay-150">A propos</a>
                    <a href="#About" className="text-3xl uppercase border-4 hover:bg-black hover:text-white border-black w-fit py-2 px-4 transition delay-150">Comment s'inscrire ?</a>
                </div>
            </section>
            <section className="w-full min-h-screen px-5 md:px-20 pt-32" id="About">
                <article className="w-full">
                    <section className="md:grid md:grid-cols-2 md:gap-10 border-b pb-5 md:pb-10">
                        <aside className="pb-5 md:pb-0">
                            <h1 className="text-xl md:text-4xl lg:text-6xl mb-10 uppercase bg-black text-beige text-center">Bienvenue</h1>
                            <p className="md:text-lg lg:text-xl mb-5 md:mb-12 text-justify">Le site à pour but de mettre en avant les profils des femmes développeuses françaises. Découvrez la créativité, l'expertise et la passion de ces femmes exceptionnelles qui font leur marque dans l'industrie de l'informatique. Explorez une variété de compétences techniques, de projets innovants et de parcours inspirants. Rejoignez-nous dans notre mission de promouvoir la diversité et l'inclusion des femmes dans le domaine de la programmation en France.</p>
                            <p className="text-sm md:text-base text-right">© Par Raphaëlle Huynh</p>
                        </aside>
                        <figure>
                            <h1 className="text-xl  md:text-4xl lg:text-6xl mb-10 uppercase bg-black text-beige text-center">Profil mis en avant</h1>
                            <RandomProfil/>
                        </figure>
                    </section>
                </article>
                <article>
                    <h1 className="text-4xl md:text-7xl text-center tracking-tighter uppercase py-10 border-b">A propos</h1>
                    <section className="md:grid md:grid-cols-2 gap-4 md:gap-10 border-b py-5 md:py-10">
                        <aside className="mb-5 md:mb-0">
                            <h1 className="text-xl  md:text-4xl lg:text-6xl mb-10 uppercase bg-black text-beige text-center">COMMENT POSTULER ?</h1>
                            <p className="md:text-lg lg:text-xl mb-12 text-justify">Pour soumettre votre candidature, vous devez vous connectez avec un compte Github ou Linkedin. Ensuite, vous devrez completer votre profil et le soumettre. Votre demande sera ensuite étudiée.</p>
                            <p className="text-right">© Par Raphaëlle Huynh</p>
                        </aside>
                        <aside>
                            <h1 className="text-xl  md:text-4xl lg:text-6xl mb-10 uppercase bg-black text-beige text-center">Qui suis-je ?</h1>
                            <About/>
                        </aside>
                    </section>
                </article>
            </section>
            <Footer/>
        </main>
    )
}

export default Home;
import marianne from "../assets/marianne.png"
import Footer from "./Footer";
import NavBar from "./NavBar";

function Home(){
    return (
        <main>
            <NavBar/>
            <section className="flex items-center justify-center w-full min-h-screen">
                <article className="w-3/6">
                    <h1 className="text-5xl mb-10">Française des développeuses</h1>
                    <p className="text-xl text-justify mb-10">Bienvenue sur notre site mettant en avant les portfolios de femmes développeuses françaises. Découvrez la créativité, l'expertise et la passion de ces femmes exceptionnelles qui font leur marque dans l'industrie de l'informatique. Explorez une variété de compétences techniques, de projets innovants et de parcours inspirants. Rejoignez-nous dans notre mission de promouvoir la diversité et l'inclusion dans le domaine de la programmation en France.</p>
                    <a href="https://discord.gg/8nKN4fduVD" className="transition delay-75 bg-black text-beige rounded-full py-2 px-4 text-xl hover:bg-indigo-800">Discord</a>
                </article>
                <figure className="max-h-screen ">
                    <img src={marianne} className="max-h-screen marianne "></img>
                </figure>
            </section>
            <Footer/>
        </main>
    )
}

export default Home;
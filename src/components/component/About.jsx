import image from "../../assets/moi.jpeg";

function About(){
    return (
        <article className="lg:grid lg:grid-cols-3 md:gap-8">
            <aside className="">
                <img src={image}></img>
            </aside>
            <aside className="col-span-2 mt-5">
                <p className="md:text-lg lg:text-xl text-justify mb-5">
                    Je suis Raphaëlle étudiante en licence informatique. J'aime l'informatique et les sciences. Connu aussi sous l'appelation RaynhCoding je réalise des lives de programmation sur ma chaine Twitch.
                </p>
                <p className="md:text-lg lg:text-xl text-justify">
                    J'ai réalisé ce site afin de mettre en valeur les femmes dans le monde de la tech qui reste majoritairement masculin.
                </p>
            </aside>
        </article>
    )
}

export default About;
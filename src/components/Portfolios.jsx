import Footer from "./Footer";
import NavBar from "./NavBar";
import Card from "./component/Card";

function Portfolios(){
    return (
        <main>
            <NavBar/>
            <section className="flex items-center w-full min-h-screen px-20 pt-32 pb-10">
                <div className="flex flex-col w-full">
                    <article className="flex items-center mb-20 w-full pb-10 border-b">
                        <h1 className="text-6xl w-1/2 uppercase">Liste des portfolios</h1>
                        <p className="w-1/2 text-lg">Liste des profils acceptés. Il est possible de tomber sur des profils francophones hors France. Ses profils ont été accepté dans le cadre où les personnes concernées s'investissent dans la communauté francophone où recherche un emploi en France.</p>
                    </article>
                    <article className="flex items-center justify-center w-full">
                        <Card/>
                    </article>
                </div>
            </section>
        </main>
    )
}

export default Portfolios;
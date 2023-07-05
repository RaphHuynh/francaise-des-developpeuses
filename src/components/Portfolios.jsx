import Footer from "./Footer";
import NavBar from "./NavBar";
import Card from "./component/Card";

function Portfolios(){
    return (
        <main>
            <NavBar/>
            <section className="flex items-center justify-center w-full min-h-screen px-44 py-20">
                <div className="flex flex-col w-full items-center">
                    <h1 className="text-5xl mb-10">Portfolios</h1>
                    <article className="flex items-center justify-center w-full">
                        <Card/>
                    </article>
                </div>
            </section>
            <Footer/>
        </main>
    )
}

export default Portfolios;
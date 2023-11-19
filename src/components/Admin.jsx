import NavBar from "./NavBar";
import { useParams, Link, useNavigate } from "react-router-dom";

function Admin(){
    return (
        <>
            <NavBar/>
            <section className="flex flex-col w-full px-5 md:px-20 pt-28">
                <h1 className="text-5xl">Panneau Administration</h1>
                <article className="my-20 flex flex-col gap-5">
                    <h1 className="text-3xl">Gérer les profils</h1>
                    <Link to="/admin/profils" className="text-xl bottom-2 bg-black text-white rounded-full px-4 py-1 transition delay-100 w-fit">Voir</Link>
                    <h1 className="text-3xl">Gérer les catégories</h1>
                    <Link to="/admin/category" className="text-xl bottom-2 bg-black text-white rounded-full px-4 py-1 transition delay-100 w-fit">Voir</Link>
                    <h1 className="text-3xl">Gérer les réseaux</h1>
                    <Link to="/admin/network" className="text-xl bottom-2 bg-black text-white rounded-full px-4 py-1 transition delay-100 w-fit">Voir</Link>
                </article>
            </section>
        </>
    )
}

export default Admin;
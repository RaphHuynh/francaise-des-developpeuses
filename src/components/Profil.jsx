import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import {Link} from "react-router-dom";

function Profil(){
    const [user, setUser] = useState([]);
    const [networks, setNetwork] = useState([]);
    const [categories, setCategory] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    return (
        <main>
            <NavBar/>
            <section className="flex flex-col items-center justify-center w-full min-h-screen px-5 md:px-20 pt-20 pb-10 md:py-20">
                <article className="w-full grid grid-cols-2 border-b pb-10">
                    <h1 className="text-2xl lg:text-4xl xl:text-6xl uppercase">
                        Résumé profil
                    </h1>
                    <p className="text-sm lg:text-lg text-right">
                        Vous pouvez consulter le résumé de votre porfil sur cette page ainsi que le modifier.
                    </p> 
                </article>
                <section className="w-full">
                    <article className="">
                        <Link to="/profil/member">Modifier profil</Link>
                    </article>
                </section>
            </section>
        </main>
    )
}

export default Profil;
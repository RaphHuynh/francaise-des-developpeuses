import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api_get_all";

function RandomProfil() {
    const [members, setMembers] = useState([]);
    const [randomIndex, setRandomIndex] = useState(null);

    useEffect(() => {
        api.getMembers().then((json) => {
            setMembers(json);
        });
    }, []);

    useEffect(() => {
        if (members.length > 0) {
            const randomIndex = Math.floor(Math.random() * members.length);
            setRandomIndex(randomIndex);
        }
    }, [members]);

    return (
        <>
            {randomIndex !== null && members.length > 0 && (
                <article className="lg:flex gap-4 w-full">
                    <aside className="lg:w-1/2 h-content">
                        <h1 className="block xl:hidden text-xl uppercase text-center hover:text-white hover:bg-black mb-5">
                            <Link to={`/portfolios/${members[randomIndex].id_member}`}>{members[randomIndex].username}</Link>
                        </h1>
                        <a href={members[randomIndex].url_portfolio} className="block lg:hidden transition delay-75 h-56 mr-0 ml-auto hover:scale-105 mb-5"><img src={"http://127.0.0.1:8000/member/image_portfolio_by_id?id_member=" + members[randomIndex].id_member} alt="Profile Image" className="object-cover hover:contrast-125 h-56 duration-200 border border-black w-full"/></a>
                        <p className="text-base md:text-lg lg:text-xl md:mb-5 text-justify md:border-b pb-5">Voici un profil que nous souhaitons mettre en avant.</p>
                        <h1 className="my-2">
                            <Link to={`/portfolios/${members[randomIndex].id_member}`} className="hidden xl:block text-2xl hover:text-white hover:bg-black py-2 transition delay-100 w-fit">{members[randomIndex].username}</Link>
                        </h1>
                        <p className="text-sm break-words">{members[randomIndex].category_name}</p>
                    </aside>
                    <a href={members[randomIndex].url_portfolio} className="hidden lg:block transition delay-75 h-56 mr-0 ml-auto w-1/2 hover:scale-105"><img src={"http://127.0.0.1:8000/member/image_portfolio_by_id?id_member=" + members[randomIndex].id_member} alt="Profile Image" className="object-cover hover:contrast-125 h-56 duration-200 border border-black w-full"/></a>
                </article>
            )}
        </>
    );
}

export default RandomProfil;

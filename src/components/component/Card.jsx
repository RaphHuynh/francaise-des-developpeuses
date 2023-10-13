import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api_get_all";

function Card({ currentPage, onPageChange, updateTotalPages }) {
    const [members, setMembers] = useState([]);
    const profilesPerPage = 8;

    useEffect(() => {
        api.getMembers().then((json) => {
            setMembers(json);

            // Calculez le nombre total de pages en fonction du nombre de profils
            const total = Math.ceil(json.length / profilesPerPage);
            updateTotalPages(total);
        });
    }, [updateTotalPages]);

    // Calculez l'index de début et de fin pour les profils sur la page actuelle
    const indexOfLastProfile = currentPage * profilesPerPage;
    const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
    const currentProfiles = members.slice(indexOfFirstProfile, indexOfLastProfile);

    return (
        <article className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6">
            {currentProfiles.map((member) => (
                <Link to={`${member.id_member}`} key={member.id_member} className="transition delay-75 border h-min hover:scale-105 duration-50">
                    <img src={"http://127.0.0.1:8000/member/image_portfolio_by_id?id_member=" + member.id_member} alt={member.username} className="object-cover w-full h-56 hover:contrast-125 duration-200"></img>
                    <aside className="pt-2 md:p-2 md:h-1/3">
                        <h1 className="uppercase text-beige bg-black py-1 px-1 mb-2 w-min">{member.username}</h1>
                        <p className="text-right">{member.category_name}</p>
                    </aside>
                </Link>
            ))}
        </article>
    );
}

export default Card;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api_get_all";

function Card({ currentPage, updateTotalPages }) {
    const [members, setMembers] = useState([]);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const profilesPerPage = 8;
    useEffect(() => {
        api.getMembers().then((json) => {
            setMembers(json);

            console.log(json);

            const total = Math.ceil(json.length / profilesPerPage);
            updateTotalPages(total);
        });
    }, [updateTotalPages]);

    const indexOfLastProfile = currentPage * profilesPerPage;
    const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
    const currentProfiles = members.slice(indexOfFirstProfile, indexOfLastProfile);

    return (
        <article className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
            {currentProfiles.map((member) => (
                <Link to={`${member.id_member}`} key={member.id_member} className="transition delay-75 border h-min hover:scale-105 duration-50">
                    <img src={`${baseUrl}/member/image_portfolio_by_id?id_member=` + member.id_member} alt={member.username} className="object-cover w-full h-56 hover:contrast-125 duration-200"></img>
                    <aside className="pt-2 md:p-2 md:h-1/3">
                        <h1 className="uppercase text-beige bg-black py-1 px-1 mb-2 w-min">{member.username}</h1>
                        {member.category_name && (
                            <div className="w-full flex justify-end">
                                <p>
                                {member.category_name.split(',').slice(0, 3).join(', ')}
                                {member.category_name.split(',').length > 3 && " ..."}
                                </p>
                            </div>
                        )}
                    </aside>
                </Link>
            ))}
        </article>
    );
}

export default Card;


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api_get_all";

function Card(){
    const [members, setMembers] = useState([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        !isMounted &&
        api.getMembers().then((json) => {
            setMembers(json);
            setIsMounted(true);
        });
    }, [isMounted]);

    return (
        <article className="grid grid-cols-4 gap-6">
            {members.map((member) =>(
                <Link to={`${member.id_member}`} key={member.id_member} className="transition delay-75  active:border-b h-min hover:scale-105 duration-50 border bg-black/5">
                    <img src={"http://127.0.0.1:8000/members/image_portfolio_by_id?id_member="+member.id_member} alt={`${member.username}`} className="object-cover w-full h-56 hover:contrast-125 duration-200 border-b-2"></img>
                    <aside className="p-2 h-1/3">
                        <h1 className="uppercase text-beige bg-black py-1 px-1 mb-2 w-min">{member.username}</h1>
                        <p className="text-right">{member.category_name}</p>
                    </aside>
                </Link>
            ))}
        </article>
    )
}

export default Card;
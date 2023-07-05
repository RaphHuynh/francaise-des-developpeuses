import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api_get_all";
import image from "../../assets/portfolio_test.png"

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
        <article className="grid grid-cols-3 gap-8">
            {members.map((member) =>(
                <Link to={`${member.id_member}`} key={member.id_member} className="transition delay-75 border-2 active:border-b border-black rounded-lg shadow-[0px_5px_0px_0px_rgba(0,0,0)]">
                    <img src={image} width={400} height={250} className="rounded-t-sm"></img>
                    <aside className="p-2 border-t-2 border-black">
                        <h1 className="text-indigo-800 uppercase">{member.username} {member.id_member}</h1>
                        <p className="text-right text-red-700">{member.category_name}</p>
                    </aside>
                </Link>
            ))}
        </article>
    )
}

export default Card;
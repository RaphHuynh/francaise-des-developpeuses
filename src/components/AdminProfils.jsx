import { useEffect } from "react";
import { useState } from "react";
import NavBar from "./NavBar";
import api from "./api/api_get_member_all";

function AdminProfils(){
    const [members, setMembers] = useState([]);
    const [forceUpdate, setForceUpdate] = useState(false);

    useEffect(() => {
        api.getMembersAll().then((json) => {
            setMembers(json);

            console.log(json)
        });
    }, [forceUpdate]);

    return (
        <>
        <NavBar/>
        <section className="flex w-full min-h-screen px-5 md:px-20 pt-20 pb-10 md:py-20 gap-4">
            <article className="w-full">
                <h1 className="text-2xl lg:text-4xl xl:text-6xl uppercase text-beige bg-black px-2 py-1 text-center">Gérer les membres</h1>
                <aside className="flex flex-col py-2">
                {members.map(member => (
                    <>
                    <div className="flex w-full even:bg-black/10 py-2 px-4 items-center">
                        <details className="">
                            <summary>
                                {member.firstname} {member.lastname} (#{member.username}) mail : {member.mail} url : {member.url_portfolio} validation : {member.date_activated} bannis : {member.date_deleted}
                            </summary>
                            {member.description}
                        </details>
                        <div className="flex mr-0 ml-auto gap-4">
                            {member.date_activated == null && <button className="bg-green-500 px-4 py-2 border-2 border-green-700 rounded-md">Valider</button>}
                            {member.date_deleted == null && <button className="bg-red-500 border-2 border-red-700 px-4 py-2 rounded-md">Bannir</button>}
                            {member.date_deleted != null && <button className="bg-blue-500 border-2 border-blue-700 px-4 py-2 rounded-md">Débannir</button>}
                        </div>
                    </div>
                    </>
                ))}
                </aside>
            </article>
        </section>
        </>
    )
}

export default AdminProfils;
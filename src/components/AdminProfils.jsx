import { useEffect } from "react";
import { useState } from "react";
import NavBar from "./NavBar";
import api from "./api/api_get_member_all";
import api_is_admin from "./api/api_is_admin";
import kappa from "../assets/kappa.png"

function AdminProfils() {
    const [members, setMembers] = useState([]);
    const [forceUpdate, setForceUpdate] = useState(false);
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const isAdminResponse = await api_is_admin.getVerifAdmin();
                setIsAdmin(isAdminResponse);
            } catch (error) {
                console.log("Erreur.");
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        api.getMembersAll().then((json) => {
            setMembers(json);

            console.log(json)
        });
    }, [forceUpdate]);

    const handleValidate = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/admin/member/validate?id_member=${id}`, {
                method: 'PATCH',
                headers: {
                    'Cookie': document.cookie,
                },
                credentials: 'include',
            });

            if (response.status === 200) {
                console.log('Validé avec succès !');
                // Déclencher une mise à jour forcée
                setForceUpdate(prev => !prev);
            } else {
                console.log('Erreur lors de la validation du profil.');
            }
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la requête Update :', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/admin/member/ban/?id_member=${id}`, {
                method: 'PATCH',
                headers: {
                    'Cookie': document.cookie,
                },
                credentials: 'include',
            });

            if (response.status === 200) {
                console.log('Validé avec succès !');
                setForceUpdate(prev => !prev);
            } else {
                console.log('Erreur lors de la validation du profil.');
            }
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la requête Update :', error);
        }
    };

    const handleUnban = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/admin/member/unban/?id_member=${id}`, {
                method: 'PATCH',
                headers: {
                    'Cookie': document.cookie,
                },
                credentials: 'include',
            });

            if (response.status === 200) {
                console.log('Validé avec succès !');
                // Déclencher une mise à jour forcée
                setForceUpdate(prev => !prev);
            } else {
                console.log('Erreur lors de la validation du profil.');
            }
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la requête Update :', error);
        }
    };

    return (
        <>
            <NavBar />
            {isAdmin == true &&
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
                                            {member.date_activated == null && <button className="bg-green-500 px-4 py-2 border-2 border-green-700 rounded-md" onClick={() => handleValidate(member.id)}>Valider</button>}
                                            {member.date_deleted == null && <button className="bg-red-500 border-2 border-red-700 px-4 py-2 rounded-md" onClick={() => handleDelete(member.id)}>Bannir</button>}
                                            {member.date_deleted != null && <button className="bg-blue-500 border-2 border-blue-700 px-4 py-2 rounded-md" onClick={() => handleUnban(member.id)}>Débannir</button>}
                                        </div>
                                    </div>
                                </>
                            ))}
                        </aside>
                    </article>
                </section>
            }
            {isAdmin != true &&
                <section className="flex w-full min-h-screen px-5 md:px-20 pt-20 pb-10 md:py-20 gap-4 justify-center">
                    <img src={kappa} className="w-1/2"></img>
                </section>
            }

        </>
    )
}

export default AdminProfils;
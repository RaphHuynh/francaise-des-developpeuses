import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import api_is_admin from "./api/api_is_admin";
import kappa from "./../assets/kappa.png"

function Admin() {
    const [isAdmin, setIsAdmin] = useState(null);
    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const isAdminResponse = await api_is_admin.getVerifAdmin();
                setIsAdmin(isAdminResponse);
            } catch (error) {
                setIsAdmin(false);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <NavBar />
            {isAdmin == true &&
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
            }
            {isAdmin == false &&
                <section className="flex w-full min-h-screen px-5 md:px-20 pt-20 pb-10 md:py-20 gap-4 justify-center">
                    <img src={kappa} className="w-1/2"></img>
                </section>
            }
        </>
    )
}

export default Admin;
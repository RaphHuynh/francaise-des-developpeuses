import NavBar from "./NavBar";
import React, { useState, useEffect } from 'react';
import api_is_admin from "./api/api_is_admin";
import kappa from "./../assets/kappa.png"

function AdminNetwork() {
    const [networkName, setNetworkName] = useState('');
    const [networks, setNetworks] = useState([]);
    const [forceUpdate, setForceUpdate] = useState(false);
    const [isAdmin, setIsAdmin] = useState(null);

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

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/admin/network', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': document.cookie,
                },
                credentials: 'include',
                body: JSON.stringify({ name: networkName }),
            });

            if (response.status === 201) {
                console.log('Network ajoutée avec succès !');
                setForceUpdate(prev => !prev);
            } else if (response.status === 400) {
                console.log('Échec de l\'ajout du network. Assurez-vous que les données sont correctes.');
            } else {
                console.log('Erreur inattendue lors de l\'ajout de la catégorie.');
            }
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la requête POST :', error);
        }
    };

    const handleDeleteCategory = async (name) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/admin/network?name=${name}`, {
                method: 'DELETE',
                headers: {
                    'Cookie': document.cookie,
                },
                credentials: 'include',
            });

            if (response.status === 200) {
                console.log('Network supprimée avec succès !');
                // Déclencher une mise à jour forcée
                setForceUpdate(prev => !prev);
            } else {
                console.log('Erreur lors de la suppression de network.');
            }
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la requête DELETE :', error);
        }
    };

    useEffect(() => {
        const fetchNetwork = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/network/');

                if (response.ok) {
                    const data = await response.json();
                    const sortedNetwork = data.sort((a, b) => a.name.localeCompare(b.name));
                    setNetworks(sortedNetwork);
                } else {
                    console.error('Erreur lors de la récupération des networks');
                }
            } catch (error) {
                console.error('Une erreur s\'est produite lors de la requête :', error);
            }
        };

        fetchNetwork();
    }, [forceUpdate]);

    return (
        <>
            <NavBar />
            {isAdmin == true &&
                <section className="xl:flex w-full min-h-screen px-5 md:px-20 pt-20 pb-10 md:py-20 gap-4">
                    <article className="xl:w-1/2 mb-2 xl:mb-0">
                        <h1 className="text-2xl lg:text-4xl xl:text-6xl uppercase text-beige bg-black px-2 py-1 text-center">Créer une catégorie</h1>
                        <form onSubmit={handleFormSubmit} className="flex flex-col">
                            <label className="uppercase">
                                Nom de la catégorie:
                            </label>
                            <input
                                type="text"
                                value={networkName}
                                onChange={(e) => setNetworkName(e.target.value)}
                                className="bg-transparent border-b border-black focus:border-slate-400 p-1 focus:ring-transparent focus:outline-none focus:placeholder:text-slate-400 placeholder:text-slate-500"
                                placeholder="Github"
                            />
                            <button type="submit" className="border-2 border-black uppercase py-2 px-3 bg-black text-beige hover:scale-105 transition delay-75 mt-4 w-full">Ajouter le network</button>
                        </form>
                    </article>
                    <article className="xl:w-1/2">
                        <h1 className="text-2xl lg:text-4xl xl:text-6xl uppercase text-beige bg-black px-2 py-1 text-center">Effacer un network</h1>
                        <div>
                            <h2>Liste des networks :</h2>
                            <ul className="grid grid-cols-3 md:grid-cols-6 gap-2">
                                {networks.map(network => (
                                    <li key={network.id} className="border-2 border-black flex flex-col">
                                        <button onClick={() => handleDeleteCategory(network.name)}>
                                            {network.name} - Supprimer
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
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

export default AdminNetwork;
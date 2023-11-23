import NavBar from "./NavBar";
import React, { useState, useEffect } from 'react';
import api_is_admin from "./api/api_is_admin";
import kappa from "./../assets/kappa.png"

function AdminCategory() {
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
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
            const response = await fetch('http://127.0.0.1:8000/admin/category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': document.cookie,
                },
                credentials: 'include',
                body: JSON.stringify({ name: categoryName }),
            });

            if (response.status === 201) {
                console.log('Catégorie ajoutée avec succès !');
                // Déclencher une mise à jour forcée
                setForceUpdate(prev => !prev);
            } else if (response.status === 400) {
                console.log('Échec de l\'ajout de la catégorie. Assurez-vous que les données sont correctes.');
            } else {
                console.log('Erreur inattendue lors de l\'ajout de la catégorie.');
            }
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la requête POST :', error);
        }
    };

    const handleDeleteCategory = async (name) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/admin/category?name=${name}`, {
                method: 'DELETE',
                headers: {
                    'Cookie': document.cookie,
                },
                credentials: 'include',
            });

            if (response.status === 200) {
                console.log('Catégorie supprimée avec succès !');
                // Déclencher une mise à jour forcée
                setForceUpdate(prev => !prev);
            } else {
                console.log('Erreur lors de la suppression de la catégorie.');
            }
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la requête DELETE :', error);
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/category/');

                if (response.ok) {
                    const data = await response.json();
                    const sortedCategories = data.sort((a, b) => a.name.localeCompare(b.name));
                    setCategories(sortedCategories);
                } else {
                    console.error('Erreur lors de la récupération des catégories');
                }
            } catch (error) {
                console.error('Une erreur s\'est produite lors de la requête :', error);
            }
        };

        fetchCategories();
    }, [forceUpdate]);

    return (
        <>
            <NavBar />
            {isAdmin == true &&
                <section className="md:flex w-full min-h-screen px-5 md:px-20 pt-20 pb-10 md:py-20 gap-4">
                    <article className="md:w-1/2">
                        <h1 className="text-2xl lg:text-4xl xl:text-6xl uppercase text-beige bg-black px-2 py-1 text-center">Créer une catégorie</h1>
                        <form onSubmit={handleFormSubmit} className="flex flex-col">
                            <label className="uppercase">
                                Nom de la catégorie:
                            </label>
                            <input
                                type="text"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                className="bg-transparent border-b border-black focus:border-slate-400 p-1 focus:ring-transparent focus:outline-none focus:placeholder:text-slate-400 placeholder:text-slate-500"
                                placeholder="Python"
                            />
                            <button type="submit" className="border-2 border-black uppercase py-2 px-3 bg-black text-beige hover:scale-105 transition delay-75 mt-4 w-full">Ajouter la catégorie</button>
                        </form>
                    </article>
                    <article className="md:w-1/2">
                        <h1 className="text-2xl lg:text-4xl xl:text-6xl uppercase text-beige bg-black px-2 py-1 text-center">Effacer une catégorie</h1>
                        <div>
                            <h2>Liste des catégories :</h2>
                            <ul className="grid grid-cols-3 md:grid-cols-6 gap-2">
                                {categories.map(category => (
                                    <li key={category.id} className="border-2 border-black flex flex-col">
                                        <button onClick={() => handleDeleteCategory(category.name)}>
                                            {category.name} - Supprimer
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

export default AdminCategory;

import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";

function FromProfil() {
    const id = useParams();
    const [user, setUser] = useState({
        id: id.profil,
        lastname: null,
        firstname: null,
        description: null,
        mail: null,
        url_portfolio: null,
    });
    const [isImageSelected, setIsImageSelected] = useState(false);
    const [file, setFile] = useState(null);
    const form = useRef(null);

    const submit = () => {
        const data = new FormData(form.current)
        data.append("id", user.id);
        const object = {};
        data.forEach(function (value, key) {
            object[key] = value;
        })
        fetch('http://127.0.0.1:8000/member', {
            method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify(object)
        })
            .then(res => res.json())
            .then(json => setUser(json.user))
    }

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setIsImageSelected(!!selectedFile);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!file) {
            alert('Veuillez sélectionner un fichier image.');
            return;
        }
    
        const formData = new FormData();
        const object = [];
        formData.append('file', file, file.name);
        formData.append('id_member', id.profil);

        formData.forEach(function (value, key) {
            object[key] = value;
        })

        console.log(object);

        debugger;
    
        try {
            const response = await fetch('http://127.0.0.1:8000/member/image_portfolio?id_member='+id.profil, {
                method: 'PATCH',
                body: formData
            });
    
            if (response.status === 200) {
                alert("L'image a été téléchargée avec succès.");
            } else {
                alert('Une erreur s\'est produite lors de l\'envoi de l\'image.');
            }
        } catch (error) {
            console.error('Erreur lors de la requête :', error);
        }
    };    

    return (
        <>
            <NavBar />
            <section className="flex flex-col w-full px-5 md:px-20 pt-28">
                <article className="w-full grid grid-cols-2 border-b pb-10 items-center mb-10">
                    <h1 className="text-2xl lg:text-4xl xl:text-6xl uppercase">
                        Détails du profil
                    </h1>
                    <p className="text-sm lg:text-lg text-right">
                        Vous pouvez ajouter, modifier les informations concernant votre profil. Vous pouvez aussi rajouter un screen de votre portfolio. Si vous ne possèdez pas de portfolio vous pouvez mettre un screen de votre profil Github / Linkedin / Gitlab ou d'un autre réseaux de votre choix.
                    </p>
                </article>
                <section className="flex gap-4">
                    <article className="flex flex-col justify-center w-1/2">
                        <h1 className="text-4xl md:text-4xl my-5 text-beige bg-black uppercase py-1 px-1">
                            Modifier les informations du profil
                        </h1>
                        <form ref={form} onSubmit={submit} className="flex flex-col gap-2">
                            <label htmlFor="lastname" className="uppercase">Nom :</label>
                            <input type="text" name="lastname" defaultValue={user.lastname} className="bg-transparent border-b border-black focus:border-slate-400 p-1 focus:ring-transparent focus:outline-none focus:placeholder:text-slate-400 placeholder:text-slate-500" placeholder="Name" />
                            <label htmlFor="firstname" className="uppercase">Prénom :</label>
                            <input type="text" name="firstname" defaultValue={user.firstname} className="bg-transparent border-b border-black focus:border-slate-400 p-1 focus:ring-transparent focus:outline-none focus:placeholder:text-slate-400 placeholder:text-slate-500" placeholder="Firstname" />
                            <label htmlFor="description" className="uppercase">Description :</label>
                            <input type="text" name="description" defaultValue={user.description} className="bg-transparent border-b border-black focus:border-slate-400 p-1 focus:ring-transparent focus:outline-none focus:placeholder:text-slate-400 placeholder:text-slate-500" placeholder="Bonjour, je suis ..." />
                            <label htmlFor="mail" className="uppercase">Email :</label>
                            <input type="mail" name="mail" defaultValue={user.mail} className="bg-transparent border-b border-black focus:border-slate-400 p-1 focus:ring-transparent focus:outline-none focus:placeholder:text-slate-400 placeholder:text-slate-500" placeholder="example@example.com" />
                            <label htmlFor="url_portfolio" className="uppercase">Url du portfolio :</label>
                            <input type="text" name="url_portfolio" defaultValue={user.url_portfolio} className="bg-transparent border-b border-black focus:border-slate-400 p-1 focus:ring-transparent focus:outline-none focus:placeholder:text-slate-400 placeholder:text-slate-500" placeholder="www.example.com" />
                            <input type="submit" name="update_profil" value="Valider" className="border-2 border-black uppercase py-2 px-3 bg-black text-beige hover:scale-105 transition delay-75 mt-4 w-full" />
                        </form>
                    </article>
                    <article className="flex flex-col justify-center w-1/2 px-20 pt-20">
                        <h1>Envoyer une image</h1>
                        <form onSubmit={handleSubmit} className="flex flex-col">
                            <input type="file" onChange={handleFileChange} accept="image/jpeg, image/png" />
                            <input type="submit" value="Envoyer" className="hover:cursor-pointer" />
                        </form>
                    </article>
                </section>
            </section>
        </>
    )
}

export default FromProfil;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";

function FromProfil(){
    const [user, setUser] = useState([]);
    const [networks, setNetwork] = useState([]);
    const [categories, setCategory] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    return (
        <main>
            <NavBar/>
            <section className="flex flex-col items-center justify-center w-full min-h-screen px-5">
                <article className="flex flex-col">
                <h2 className="text-4xl md:text-5xl mb-5 text-beige bg-black uppercase py-1 px-1 top-0">Modifier profil</h2>
                <form className="flex flex-col gap-2 text-gray-800">
                    <label>Pseudo :</label>
                    <input type="text" name="username" className="border-2"/>
                    <label>Prénom :</label>
                    <input type="text" name="firstname" className="border-2"/>
                    <label>Nom :</label>
                    <input type="text" name="lastname" className="border-2"/>
                    <label>Description :</label>
                    <textarea name="description" className="border-2"/>
                    <label>Mail :</label>
                    <input type="text" name="mail" className="border-2"/>
                    <label>Url Portfolio :</label>
                    <input type="text" name="url_portfolio" className="border-2"/>
                    <label>Image du Portfolio :</label>
                    <input type="file" value={selectedFile} onChange={(e) => setSelectedFile(e.target.files(0))}/>
                    <img src="" height="200" alt="Prévisualisation"></img>
                    <input type="submit" value="Confirmer" className="bg-black px-2 py-2 text-beige hover:bg-slate-800 cursor-pointer"/>
                </form>
                </article>
            </section>
        </main>
    )
}

export default FromProfil;
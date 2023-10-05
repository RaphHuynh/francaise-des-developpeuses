import { useState , useRef } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";

function FromProfil(){
    const id = useParams();
    const [user,setUser] = useState({
        id : id.profil,
        lastname : null,
        firstname : null,
        description : null,
        mail : null,
        url_portfolio : null,
    });
    const form = useRef(null);

    const submit = () => {
        const data = new FormData(form.current)
        data.append("id",user.id);
        const object = {};
        for( const [key,value] of data){
            console.log(key + " : " +value);
        }
        data.forEach(function(value, key){
            object[key] = value;
        })
        console.log(JSON.stringify(object));
        debugger;
        fetch('http://127.0.0.1:8000/member', {
            method: "PATCH",headers: {"content-type": "application/json"}, body: JSON.stringify(object)})
            .then(res => res.json())
            .then(json => setUser(json.user))
    }

    return (
        <>
        <NavBar/>
        <section className="flex bg-slate-300 min-h-screen w-full gap-2">
            <article className="w-1/2">
                <h1>Test</h1>
            </article>
            <article className="flex flex-col justify-center bg-slate-500 w-1/2 px-20 pt-20">
                <h1 className="text-4xl md:text-4xl my-5 text-beige bg-black uppercase py-1 px-1">
                    Modifier les informations du profil
                </h1>
                <form ref={form} onSubmit={submit} className="flex flex-col bg-red-200">
                    <label htmlFor="lastname">Nom :</label>
                    <input type="text" name="lastname" defaultValue={user.lastname}/>
                    <label htmlFor="firstname">Prénom :</label>
                    <input type="text" name="firstname" defaultValue={user.firstname}/>
                    <label htmlFor="description">Description :</label>
                    <input type="text" name="description" defaultValue={user.description}/>
                    <label htmlFor="mail">Email :</label>
                    <input type="mail" name="mail" defaultValue={user.mail}/> 
                    <label htmlFor="url_portfolio">Url du portfolio :</label>
                    <input type="text" name="url_portfolio" defaultValue={user.url_portfolio}/>
                    <input type="submit" name="update_profil" value="Valider"/>
                </form>
            </article>
        </section>
        </>
    )
}

export default FromProfil;
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
        fetch('http://127.0.0.1:8000/members', {
            type: "PATCH", body: data})
            .then(res => res.json())
            .then(json => setUser(json.user))
        for( const [key,value] of data){
            console.log(key + " : " +value);
        }
    }

    return (
        <>
        <NavBar/>
        <form ref={form} onSubmit={submit} className="flex flex-col p-20">
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
        </>
    )
}

export default FromProfil;
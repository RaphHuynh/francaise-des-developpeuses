import {useState, useRef} from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";

function FormCategory(){
    const id = useParams();
    const [network, setNetwork] = useState({
        id : id.profil
    });

    return(
        <>
        <NavBar/>
        <section className="">

        </section>
        </>
    )
}

export default FormCategory;
import { useEffect, useState } from "react";
import api_login from "./api/api_login";
import NavBar from "./NavBar";

function Connexion(){
    const url = "http://127.0.0.1:8000/github/login"

    const githubLogin = () => {
        const response = fetch(url, {
            method: "GET",
            redirect: "manual"
        }).then(response => {
            if (response.type == "opaqueredirect"){  
                // To make sure the fetch is with redirect response return. 
                console.log(response); 
                    const scope="user%3Aemail";
                    const redirect_uri="http://localhost:5173";
                    const client_id="f494318165ec1a0f6937";
                    window.location.replace("https://github.com/login/oauth/authorize?response_type=code&client_id=f494318165ec1a0f6937&redirect_uri=http%3A%2F%2F127.0.0.1%3A8000%2Fgithub%2Fcallback&scope="+{scope}); // create one and only one request
                }
    })
    .catch(function(err) {
        console.info(err + " url: " + url);
        })
    };

    return (
        <>
            <NavBar/>
            <section className="flex flex-col items-center justify-center w-full min-h-screen px-5 md:px-20 pt-20 pb-10 md:py-20">
                <h1>Connexion</h1>
                <button onClick={githubLogin}>Github</button>
            </section>
        </>
    )
}

export default Connexion;
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import api_verif_session from "./api/api_verif_session";

export default NavBar;

function NavBar() {
    const [connected, setConnected] = useState(false);
    const cookie = Cookies.get("token_user");

    useEffect(() => {
        try {
            console.log(cookie);

            api_verif_session.getVerifSession(cookie).then(json => {
                console.log(json);
                if (json.status !== 200) {
                    setConnected(false);
                } else {
                    setConnected(true);
                }
            }).catch(error => {
                console.error(error);
            });

        } catch (e) {
            console.error('Error parsing cookie:', e);
        }
    }, []);

    // ...

    const handleDeconnexion = () => {
        // Effectuer la requête de déconnexion vers l'endpoint FastAPI
        fetch('http://127.0.0.1:8000/session/delete?id_member=' + cookie, {
          method: 'DELETE',
          redirect: "manual"
        })
          .then((response) => {
            if (response.type == "opaqueredirect") {
                window.location.replace("http://127.0.0.1:5173/")
            } else {
              // Gérer l'échec de la déconnexion
              console.error('La déconnexion a échoué.');
            }
          })
          .catch((error) => {
            // Gérer les erreurs de requête
            console.error('Erreur de déconnexion :', error);
          });
      };
      

    return (
        <nav className="fixed w-full z-10 border-b border-black px-20">
            <div className="flex items-center py-2">
                <h1 className="text-left md:text-xl">FDD</h1>
                {connected == true &&
                    <div className="flex flex-row mr-0 ml-auto gap-2">
                        <Link to="/" className="transition delay-75 md:text-xl text-black md:px-4 hover:bg-gray-700 hover:text-white py-2">Accueil</Link>
                        <Link to="/portfolios" className="transition delay-75 md:text-xl text-black md:px-4 hover:bg-gray-700 hover:text-white py-2">Portfolios</Link>
                        <Link to={`/profil/${cookie}`} className="transition delay-75 md:text-xl text-black md:px-4 hover:bg-gray-700 hover:text-white py-2">Profil</Link>
                        <button onClick={handleDeconnexion} className="transition delay-75 md:text-xl text-white md:px-4 bg-black hover:bg-gray-700 hover:text-white py-2">Déconnexion</button>
                    </div>
                }
                {connected == false &&
                    <div className="flex flex-row mr-0 ml-auto gap-2">
                        <Link to="/" className="transition delay-75 md:text-xl text-black md:px-4 hover:bg-gray-700 hover:text-white py-2">Accueil</Link>
                        <Link to="/portfolios" className="transition delay-75 md:text-xl text-black md:px-4 hover:bg-gray-700 hover:text-white py-2">Portfolios</Link>
                        <Link to="/connexion" className="transition delay-75 md:text-xl text-white md:px-4 bg-black hover:bg-gray-700 hover:text-white py-2">Connexion</Link>
                    </div>
                }
            </div>
        </nav>
    )
}
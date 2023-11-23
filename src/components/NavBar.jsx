import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import api_verif_session from "./api/api_verif_session";
import api_is_admin from "./api/api_is_admin";

export default NavBar;

function NavBar() {
    const storedConnected = localStorage.getItem("connected");
    const [connected, setConnected] = useState(storedConnected === "true" ? true : storedConnected === "false" ? false : null);
    const cookie = Cookies.get("token_user");
    const [isAdmin, setIsAdmin] = useState(storedConnected === "true" ? true : storedConnected === "false" ? false : null);
    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        try {
            api_verif_session.getVerifSession(cookie)
                .then(json => {
                    const newConnected = json.status === 200;
                    if (newConnected !== connected) {
                        setConnected(newConnected);
                        localStorage.setItem("connected", newConnected);
                    }
                })
                .catch(error => {
                    console.error(error);
                });

        } catch (e) {
            console.error('Error parsing cookie:', e);
        }
    }, [cookie, connected]);

    if (connected === null) {
        return null;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const isAdminResponse = await api_is_admin.getVerifAdmin();
                setIsAdmin(isAdminResponse);
            } catch (error) {
                console.log("Erreur.");
            }
        };

        fetchData();
    }, []);

    const handleDeconnexion = () => {
        // Effectuer la requête de déconnexion vers l'endpoint FastAPI
        fetch(`${baseUrl}/session/delete?id_member=` + cookie, {
          method: 'DELETE',
          credentials: 'include',
          redirect: "manual"
        })
        .then((response) => {
          if (response.type === "opaqueredirect") {
            window.location.replace("http://127.0.0.1:5173/");
          } else {
            console.error('La déconnexion a échoué.');
          }
        })
        .catch((error) => {
          console.error('Erreur de déconnexion :', error);
        });
      };      

    return (
        <nav className="fixed w-full z-10 px-5 md:px-20">
            <div className="flex items-center py-2">
                <h1 className="text-left md:text-xl">FDD</h1>
                {connected == true &&
                    <div className="flex flex-row mr-0 ml-auto gap-2">
                        <Link to="/" className="transition delay-75 text-sm md:text-xl text-black md:px-4 hover:bg-black/90 hover:text-white py-2">Accueil</Link>
                        <Link to="/portfolios" className="transition delay-75 text-sm md:text-xl text-black md:px-4 hover:bg-black/90 hover:text-white py-2">Portfolios</Link>
                        <Link to={`/profil/${cookie}`} className="transition delay-75 text-sm md:text-xl text-black md:px-4 hover:bg-black/90 hover:text-white py-2">Profil</Link>
                        {isAdmin == true && 
                            <Link to="/admin" className="transition delay-75 text-sm md:text-xl text-black md:px-4 hover:bg-black/90 hover:text-white py-2">
                                Admin
                            </Link>
                        }
                        <button onClick={handleDeconnexion} className="transition delay-75 text-sm md:text-xl text-white md:px-4 bg-black hover:bg-black/90 hover:text-white py-2">Déconnexion</button>
                    </div>
                }
                {connected == false &&
                    <div className="flex flex-row mr-0 ml-auto gap-2">
                        <Link to="/" className="transition delay-75 text-sm md:text-xl text-black md:px-4 hover:bg-black/90 hover:text-white py-2">Accueil</Link>
                        <Link to="/portfolios" className="transition text-sm delay-75 md:text-xl text-black md:px-4 hover:bg-black/90 hover:text-white py-2">Portfolios</Link>
                        <Link to="/connexion" className="transition text-sm delay-75 md:text-xl text-white md:px-4 bg-black hover:bg-black/90 hover:text-white py-2">Connexion</Link>
                    </div>
                }
            </div>
        </nav>
    )
}

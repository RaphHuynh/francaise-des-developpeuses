import {Link} from "react-router-dom"

export default NavBar;

function NavBar(){
    return (
        <nav className="fixed w-full z-10 border-b border-black">
            <div className="flex items-center">
                <h1 className="text-left text-xl ml-2">FDD</h1>
                <div className="flex flex-row mr-0 ml-auto">
                    <Link to="/" className="transition delay-75 border-r border-l border-black text-xl text-black px-4 hover:bg-indigo-800 hover:text-white py-1">Accueil</Link>
                    <Link to="/portfolios" className="transition delay-75 border-r border-black text-xl text-black px-4 hover:bg-indigo-800 hover:text-white py-1">Portfolios</Link>
                    <Link to="/connexion" className="transition delay-75 border-r border-black text-xl text-black px-4 hover:bg-indigo-800 hover:text-white  py-1">Connexion</Link>
                    <Link to="/Deconnexion" className="transition delay-75 border-black text-xl text-black px-4 hover:bg-indigo-800 hover:text-white  py-1">Deconnexion</Link>
                </div>
            </div>
        </nav>
    )
}
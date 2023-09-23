import {Link} from "react-router-dom"

export default NavBar;

function NavBar(){
    return (
        <nav className="fixed w-full z-10 border-b border-black px-20">
            <div className="flex items-center py-2">
                <h1 className="text-left md:text-xl">FDD</h1>
                <div className="flex flex-row mr-0 ml-auto gap-2">
                    <Link to="/" className="transition delay-75 md:text-xl text-black md:px-4 hover:bg-gray-700 hover:text-white py-2">Accueil</Link>
                    <Link to="/portfolios" className="transition delay-75 md:text-xl text-black md:px-4 hover:bg-gray-700 hover:text-white py-2">Portfolios</Link>
                    <Link to="/connexion" className="transition delay-75 md:text-xl text-white md:px-4 bg-black hover:bg-gray-700 hover:text-white py-2">Connexion</Link>
                </div>
            </div>
        </nav>
    )
}
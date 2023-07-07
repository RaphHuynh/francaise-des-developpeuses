import {Link} from "react-router-dom"

export default NavBar;

function NavBar(){
    return (
        <nav className="fixed w-full z-10 border-b border-black">
            <div className="flex items-center py-2">
                <h1 className="text-left text-xl ml-20">FDD</h1>
                <div className="flex flex-row mr-20 ml-auto">
                    <Link to="/" className="transition delay-75 text-xl text-black px-4 hover:bg-gray-700 hover:text-white py-2 mx-1 ">Accueil</Link>
                    <Link to="/portfolios" className="transition delay-75 text-xl text-black px-4 hover:bg-gray-700 hover:text-white py-2 mx-1 ">Portfolios</Link>
                    <Link to="/connexion" className="transition delay-75 text-xl text-white px-4 bg-black hover:bg-gray-700 hover:text-white py-2 ml-1">Connexion</Link>
                </div>
            </div>
        </nav>
    )
}
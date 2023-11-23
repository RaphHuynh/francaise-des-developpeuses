import { Link } from "react-router-dom";

export default Footer;

function Footer(){
    return (
        <footer className="w-full z-10 flex items-center justify-center gap-4">
            <a href="https://github.com/RaphHuynh" className="text-center text-footer m-2">Raphaëlle HUYNH</a>
            <Link to="/mention">© Mentions Légales</Link>
        </footer>
    )
}

import { useEffect, useState } from "react";
import { useParams, Link,useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import api_profil from "./api/api_get_member_by_id";
import api_get_network_by_id from "./api/api_get_network_by_id";
import api_get_category_by_member_id from "./api/api_get_category_by_member_id";
import github from "./../assets/github.svg";
import linkedin from "./../assets/linkedin.svg";
import defaut from "./../assets/defaut.png";
import api_verif_session from "./api/api_verif_session";

function Profil() {
    const [resume, setResume] = useState([]);
    const [networks, setNetwork] = useState([]);
    const [categories, setCategory] = useState([]);
    const { profil } = useParams();
    const [imageUrl, setImageUrl] = useState(null);
    const [connected, setConnected] = useState();
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        api_verif_session.getVerifSession(profil).then((json) => {
            console.log(json);
            console.log(json.status);
            if (json.status != 200) {
                setConnected(false);
                navigate("/connexion");
            }
            else {
                setConnected(true);
            }
        })
            .catch((error) => {
                console.error(error);
        });
        api_get_network_by_id.getNetworkById(profil).then((json) => {
            setNetwork(json);
        });
        api_get_category_by_member_id.getCategoryByIdMember(profil).then((json) => {
            setCategory(json);
        });
        api_profil.getMemberById(profil).then((json) => {
            setResume(json);

            const imageUrl = `${baseUrl}/member/image_portfolio_by_id?id_member=${profil}`;

            const img = new Image();
            img.onload = () => {
                setImageUrl(imageUrl);
            };
            img.onerror = () => {
                setImageUrl(defaut);
            };
            img.src = imageUrl;
        });
    }, [profil, navigate]);

    return (
        <main>
            <>
            <NavBar />
            {connected == true &&
                    <section className="flex flex-col w-full px-5 md:px-20 pt-20 pb-10">
                        <article className="w-full grid grid-cols-2 border-b pb-10 items-center">
                            <h1 className="text-2xl lg:text-4xl xl:text-6xl uppercase">
                                Résumé profil
                            </h1>
                            <p className="text-sm lg:text-lg text-right">
                                Vous pouvez consulter le résumé de votre profil sur cette page ainsi que le modifier.
                            </p>
                        </article>
                        <section className="w-full">
                            <section className="flex justify-center w-full py-5 ">
                                <div className="w-full">
                                    <article className="lg:flex mb-10 items-baseline w-full border-b">
                                        {resume.firstname != null && <h1 className="text-2xl md:text-6xl capitalize ">{resume.firstname} {resume.lastname}</h1>}
                                        {resume.firstname == null && <h1 className="text-2xl md:text-6xl capitalize ">Prénom Nom</h1>}
                                        <p className="md:text-4xl ml-2">#{resume.username}</p>
                                    </article>
                                    <article className="flex flex-col-reverse lg:flex-row gap-4 mb-3 md:gap-8">
                                        <article className="lg:w-1/2 flex flex-col bg-slate-00">
                                            <h1 className="text-2xl md:text-4xl mb-5 text-beige bg-black uppercase py-1 px-1 top-0">Description</h1>
                                            {resume.description == null && <p className="md:text-lg text-justify px-1">Entrer une description de vous.<p>Si vous n'avez pas de portfolio vous pouvez mettre votre profil linkedin, github etc.</p></p>
                                            }
                                            {resume.description != null && <p className="md:text-lg text-justify px-1">{resume.description}</p>}
                                        </article>
                                        <figure className="lg:w-1/2">
                                            {console.log("image:" + imageUrl)}
                                            {imageUrl ? (
                                                <a href={resume.url_portfolio} target="_blank">
                                                    <img src={imageUrl} className="transition delay-75 object-cover h-full w-full hover:contrast-125 border border-black" />
                                                </a>
                                            ) : (
                                                <img src={defaut} alt="Image par défaut" />
                                            )}
                                        </figure>
                                    </article>
                                    <article className="flex flex-col 2xl:flex-row gap-8">
                                        <article className="2xl:w-1/2">
                                            <h1 className="text-2xl md:text-4xl my-5 text-beige bg-black uppercase py-1 px-1">Categories</h1>
                                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 w-fit">
                                                {categories.map((category) => (
                                                    <>
                                                        <span className="md:text-xl border-2 border-black rounded-sm px-2 py-1">{category.name}</span>
                                                    </>
                                                ))}
                                                <Link to={`/profil/${profil}/edit/category`} key={profil} className="flex border-2 border-black uppercase py-1 px-3 hover:bg-black hover:text-white items-center">+</Link>
                                            </div>
                                        </article>
                                        <aside className="2xl:w-1/2">
                                            <h1 className="text-2xl md:text-4xl my-5 text-beige bg-black uppercase py-1 px-1">Network</h1>
                                            <div className="grid grid-cols-3 md:grid-cols-7 gap-4 w-fit">
                                                {networks.map((network) => (
                                                    <>
                                                        {network.name == "github" && <a href={network.url} target="_blank" className="bg-red"><img src={github} height={40} width={40} className="transition delay-75 hover:scale-125"></img></a>}
                                                        {network.name == "linkedin" && <a href={network.url} target="_blank"><img src={linkedin} height={40} width={40} className="transition delay-75 hover:scale-125"></img></a>}
                                                    </>
                                                ))}
                                                <Link to={`/profil/${profil}/edit/network`} key={profil} className="flex border-2 border-black uppercase py-1 px-3 hover:bg-black hover:text-white items-center">+</Link>
                                            </div>
                                        </aside>
                                    </article>
                                </div>
                            </section>
                            <article className="text-center text-2xl">
                                <Link to={`/profil/${profil}/edit`} key={profil} className="border-2 border-black uppercase py-1 px-1 hover:bg-black hover:text-white">Modifier profil</Link>
                            </article>
                        </section>
                    </section>
            }
            </>
        </main>
    )
}

export default Profil;

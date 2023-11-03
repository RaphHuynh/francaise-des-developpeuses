import { useEffect, useState } from "react";
import { redirect, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
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
    const [imageUrl, setImageUrl] = useState(null); // Ajoutez un état pour stocker l'URL de l'image
    const [connected, setConnedted] = useState();

    useEffect(() => {
        api_verif_session.getVerifSession(profil).then((json) => {
            console.log(json);
            console.log(json.status);
            if (json.status != 200) {
                setConnedted(false);
            }
            else {
                setConnedted(true);
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

            const imageUrl = `http://127.0.0.1:8000/member/image_portfolio_by_id?id_member=${profil}`;

            // Attendre que l'image soit chargée avant de la définir
            const img = new Image();
            img.onload = () => {
                setImageUrl(imageUrl);
            };
            img.onerror = () => {
                // En cas d'erreur de chargement de l'image, définir imageUrl sur null ou l'image par défaut
                setImageUrl(defaut);
            };
            img.src = imageUrl;
        });
    }, []);

    return (
        <main>
            {connected == true &&
                <>
                    <NavBar />
                    <section className="flex flex-col w-full px-5 md:px-20 pt-20">
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
                                    <article className="flex mb-10 items-baseline w-full border-b">
                                        {resume.firstname != null && <h1 className="text-2xl md:text-6xl capitalize ">{resume.firstname} {resume.lastname}</h1>}
                                        {resume.firstname == null && <h1 className="text-2xl md:text-6xl capitalize ">Prénom Nom</h1>}
                                        <p className="md:text-4xl ml-2">#{resume.username}</p>
                                    </article>
                                    <article className="flex flex-col-reverse md:flex-row gap-4 mb-3 md:gap-8">
                                        <article className="md:w-1/2 flex flex-col bg-slate-00">
                                            <h1 className="text-4xl md:text-4xl mb-5 text-beige bg-black uppercase py-1 px-1 top-0">Description</h1>
                                            {resume.description == null && <p className="md:text-lg text-justify px-1">Entrer une description de vous.<p>Si vous n'avez pas de portfolio vous pouvez mettre votre profil linkedin, github etc.</p></p>
                                            }
                                            {resume.description != null && <p className="md:text-lg text-justify px-1">{resume.description}</p>}
                                        </article>
                                        <figure className="md:w-1/2">
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
                                    <article className="flex flex-col md:flex-row gap-8">
                                        <article className="md:w-1/2">
                                            <h1 className="text-4xl md:text-4xl my-5 text-beige bg-black uppercase py-1 px-1">Categories</h1>
                                            <div className="flex gap-4">
                                                {categories.map((category) => (
                                                    <>
                                                        <span className="md:text-xl border-2 border-black rounded-sm px-2 py-1">{category.name}</span>
                                                    </>
                                                ))}
                                                <Link to={`/profil/${profil}/edit/category`} key={profil} className="flex border-2 border-black uppercase py-1 px-3 hover:bg-black hover:text-white items-center">+</Link>
                                            </div>
                                        </article>
                                        <aside className="md:w-1/2">
                                            <h1 className="text-4xl md:text-4xl my-5 text-beige bg-black uppercase py-1 px-1">Network</h1>
                                            <div className="flex gap-4">
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
                </>
            }
            {connected == false && <h1>Test</h1>}
        </main>
    )
}

export default Profil;

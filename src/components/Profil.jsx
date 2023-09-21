import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import {Link} from "react-router-dom";
import api_profil from "./api/api_get_member_by_id";
import api_get_network_by_id from "./api/api_get_network_by_id";
import api_get_category_by_member_id from "./api/api_get_category_by_member_id";
import github from "./../assets/github.svg";
import linkedin from "./../assets/linkedin.svg";

function Profil(){
    const [resume, setResume] = useState([]);
    const [networks, setNetwork] = useState([]);
    const [categories, setCategory] = useState([]);
    const {profil} = useParams();

    useEffect(() =>{
        api_get_network_by_id.getNetworkById(profil).then((json) =>{
            setNetwork(json); 
        });
        api_get_category_by_member_id.getCategoryByIdMember(profil).then((json) =>{
            setCategory(json);
        });
        api_profil.getMemberById(profil).then((json) => {
            setResume(json);
        });
    }, []);

    return (
        <main>
            <NavBar/>
            <section className="flex flex-col items-center justify-center w-full min-h-screen px-5 md:px-20 pt-20 pb-10 md:py-20">
                <article className="w-full grid grid-cols-2 border-b pb-10">
                    <h1 className="text-2xl lg:text-4xl xl:text-6xl uppercase">
                        Résumé profil
                    </h1>
                    <p className="text-sm lg:text-lg text-right">
                        Vous pouvez consulter le résumé de votre profil sur cette page ainsi que le modifier.
                    </p> 
                </article>
                <section className="w-full">
                <section className="flex items-center justify-center w-full min-h-screen  pb-10">
                <div>
                    <article className="flex mb-5 md:mb-20 items-baseline w-full border-b pb-4">
                        <h1 className="text-2xl md:text-6xl capitalize ">{resume.firstname} {resume.lastname}</h1>
                        <p className="md:text-4xl ml-2">#{resume.username}</p>
                    </article>
                    <article className="flex flex-col-reverse md:flex-row gap-4 mb-3 md:gap-8">
                        <article className="md:w-1/2 flex flex-col">
                            <h1 className="text-4xl md:text-4xl mb-5 text-beige bg-black uppercase py-1 px-1 top-0">Description</h1>
                            <p className="md:text-lg text-justify px-1">{resume.description}</p>
                            </article>
                        <figure className="md:w-1/2">
                            <a href={resume.url_portfolio} target="_blank">
                                <img src={"http://127.0.0.1:8000/members/image_portfolio_by_id?id_member="+profil} className="transition delay-75 object-cover h-full w-full hover:contrast-125 border border-black"></img>
                            </a>
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
                                ))
                                }
                            </div>

                        </article>
                        <aside className="md:w-1/2">
                            <h1 className="text-4xl md:text-4xl my-5 text-beige bg-black uppercase py-1 px-1">Network</h1>
                            <div className="flex gap-4">
                            {networks.map((network) => (
                                <>
                                    {network.name == "github" && <a href={network.url} target="_blank" className="bg-red"><img src={github} height={50} width={50} className="transition delay-75 hover:scale-125"></img></a>}
                                    {network.name == "linkedin" && <a href={network.url} target="_blank"><img src={linkedin} height={50} width={50} className="transition delay-75 hover:scale-125"></img></a>}
                                </>
                            ))
                            }
                            </div>
                        </aside>
                    </article>
                    </div>
                    </section>
                    <article className="text-center text-2xl">
                        <Link to="/profil/1/edit" className="border-2 border-black uppercase py-1 px-1 hover:bg-black hover:text-white">Modifier profil</Link>
                    </article>
                </section>
            </section>
        </main>
    )
}

export default Profil;
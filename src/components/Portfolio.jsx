import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";
import api_profil from "./api/api_get_member_by_id";
import api_get_network_by_id from "./api/api_get_network_by_id";
import api_get_category_by_member_id from "./api/api_get_category_by_member_id";
import github from "./../assets/github.svg";
import linkedin from "./../assets/linkedin.svg";

function Portfolio(){
    const [resume, setResume] = useState([]);
    const [networks, setNetwork] = useState([]);
    const [categories, setCategory] = useState([]);
    const {portfolio} = useParams();
    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() =>{
        api_get_network_by_id.getNetworkById(portfolio).then((json) =>{
            setNetwork(json); 
        });
        api_get_category_by_member_id.getCategoryByIdMember(portfolio).then((json) =>{
            setCategory(json);
        });
        api_profil.getMemberById(portfolio).then((json) => {
            setResume(json);
        });
    }, []);

    return (
        <main>
            <NavBar/>
            <section className="flex items-center justify-center w-full min-h-screen px-5 md:px-20 pt-20 pb-10 md:py-20">
                <div>
                    <article className="lg:flex mb-5 md:mb-20 items-baseline w-full border-b pb-4">
                        <h1 className="text-xl md:text-6xl capitalize ">{resume.firstname} {resume.lastname}</h1>
                        <p className="md:text-4xl ml-2">#{resume.username}</p>
                    </article>
                    <article className="flex flex-col-reverse lg:flex-row gap-4 mb-3 md:gap-8">
                        <article className="lg:w-1/2 flex flex-col">
                            <h1 className="text-xl md:text-4xl mb-5 text-beige bg-black uppercase py-1 px-1 top-0">Description</h1>
                            <p className="md:text-lg text-justify px-1">{resume.description}</p>
                            </article>
                        <figure className="lg:w-1/2">
                            <a href={resume.url_portfolio} target="_blank">
                                <img src={`${baseUrl}/member/image_portfolio_by_id?id_member=`+portfolio} className="transition delay-75 object-cover h-full w-full hover:contrast-125 border border-black"></img>
                            </a>
                        </figure>
                    </article>
                    <article className="flex flex-col 2xl:flex-row gap-8">
                        <article className="2xl:w-1/2">
                            <h1 className="text-xl md:text-4xl my-5 text-beige bg-black uppercase py-1 px-1">Categories</h1>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 w-fit">
                                {categories.map((category) => (
                                <>
                                    <span className="md:text-xl border-2 border-black rounded-sm px-2 py-1">{category.name}</span>
                                </>
                                ))
                                }
                            </div>

                        </article>
                        <aside className="2xl:w-1/2">
                            <h1 className="text-xl md:text-4xl my-5 text-beige bg-black uppercase py-1 px-1">Network</h1>
                            <div className="grid grid-cols-4 md:grid-cols-7 gap-4 w-fit">
                            {networks.map((network) => (
                                <>
                                    {network.name == "github" && <a href={network.url} target="_blank"><img src={github} height={50} width={50} className="transition delay-75 hover:scale-125"></img></a>}
                                    {network.name == "linkedin" && <a href={network.url} target="_blank"><img src={linkedin} height={50} width={50} className="transition delay-75 hover:scale-125"></img></a>}
                                </>
                            ))
                            }
                            </div>
                        </aside>
                    </article>
                </div>
            </section>
        </main>
    )
}

export default Portfolio;
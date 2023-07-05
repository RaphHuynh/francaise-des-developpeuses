import { useEffect, useState } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";
import api_profil from "./api/api_get_member_by_id";
import image from "../assets/portfolio_test.png"

function Portfolio(){
    const [resume, setResume] = useState([]);
    const {portfolio} = useParams();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        !isMounted &&
        api_profil.getMemberById(portfolio).then((json) => {
            setResume(json);
            setIsMounted(true);
        });
    }, [isMounted])

    return (
        <main>
            <NavBar/>
            <section className="flex items-center justify-center w-full min-h-screen px-44 py-20">
                <div>
                    <article className="flex mb-3 gap-2">
                        <article className="w-1/2 p-5 flex flex-col justify-center border-2 border-black rounded-lg shadow-[0px_5px_0px_0px_rgba(0,0,0)] bg-black/5">
                            <h1 className="text-5xl text-indigo-800">{resume.username}</h1>
                            <h2 className="text-4xl text-red-700">{resume.firstname} {resume.lastname}</h2>
                            <p className="text-lg text-justify">{resume.description}</p>
                            </article>
                        <figure className="w-1/2 border-2 border-black rounded-lg shadow-[0px_5px_0px_0px_rgba(0,0,0)]">
                            <a href={resume.url_portfolio}>
                                <img src={image} className="transition delay-200 rounded-r-sm object-cover h-full w-full hover:sepia"></img>
                            </a>
                        </figure>
                    </article>
                    <article className="flex gap-2">
                        <article className="w-1/2 border-2 border-black rounded-lg shadow-[0px_5px_0px_0px_rgba(0,0,0)] p-5 bg-black/5">
                            <h3 className="text-3xl text-indigo-800">Categories</h3>
                            <p className="text-lg">ReactJS, Front-End</p>
                        </article>
                        <aside className="w-1/2 border-2 border-black rounded-lg shadow-[0px_5px_0px_0px_rgba(0,0,0)] p-5 bg-black/5">
                            <h3 className="text-3xl text-indigo-800">Network</h3>
                            <p>Twitter ,Github, Linkedln</p>
                        </aside>
                    </article>
                </div>
            </section>
            <Footer/>
        </main>
    )
}

export default Portfolio;
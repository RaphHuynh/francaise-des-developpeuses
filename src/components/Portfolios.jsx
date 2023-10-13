import React, { useState } from "react";
import NavBar from "./NavBar";
import Card from "./component/Card";

function Portfolios() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // Mise à jour du nombre total de pages

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        } else if (newPage > totalPages) {
            setCurrentPage(1); // Revenir à la première page si on atteint la dernière.
        }
    };

    return (
        <main>
            <NavBar />
            <section className="flex w-full min-h-screen px-5 md:px-20 pt-20 md:pt-32 pb-10">
                <div className="flex flex-col w-full">
                    <article className="md:flex md:items-center mb-5 md:mb-10 w-full pb-5 md:pb-10 border-b gap-4">
                        <h1 className="text-2xl lg:text-4xl xl:text-6xl lg:w-1/2 uppercase">Liste des portfolios</h1>
                        <p className="md:w-1/2 text-sm lg:text-lg">Liste des profils acceptés. Il est possible de tomber sur des profils francophones hors France. Ses profils ont été accepté dans le cadre où les personnes concernées s'investissent dans la communauté francophone où recherche un emploi en France.</p>
                    </article>
                    <article className="flex items-center justify-center w-full">
                        <Card
                            currentPage={currentPage}
                            // Mise à jour du nombre total de pages
                            updateTotalPages={(total) => setTotalPages(total)}
                        />
                    </article>
                    <div className="flex justify-center mt-5 gap-4">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="text-beige bg-black px-3 py-2 text-lg disabled:bg-slate-700 hover:scale-110 disabled:hover:scale-100 transition delay-75"
                        >
                            {"<"}
                        </button>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="text-beige bg-black px-3 py-2 text-lg hover:scale-110 transition delay-75"
                        >
                            {">"}
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Portfolios;

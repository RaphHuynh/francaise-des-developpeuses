import NavBar from "./NavBar";

function Mention() {
    return (
        <>
            <NavBar />
            <section className="h-screen w-full flex flex-col px-5 md:px-20 md:py-32 pt-32 pb-10">
                <h1 className="text-xl md:text-4xl lg:text-6xl mb-10 uppercase bg-black text-beige text-center">
                    Mentions légales
                </h1>

                <article className="flex w-full gap-5 text-justify">
                    <aside className="w-1/2 gap-4 flex flex-col">
                        <h2 className="text-xl uppercase font-bold">1. Informations sur l'éditeur :</h2>
                        <p>Nom de l'administrateur : RaynhCoding</p>
                        <p>Adresse postale : <a href={"http://bento.me/raynhcoding"} className="text-gray-700 underline">Lien bento</a></p>
                        <p>Numéro de téléphone : <a href={"http://bento.me/raynhcoding"} className="text-gray-700 underline">Lien bento</a></p>
                        <p>Adresse e-mail :  <a href={"http://bento.me/raynhcoding"} className="text-gray-700 underline">Lien bento</a></p>
                        <p>Numéro d'inscription au registre du commerce : N'existe pas c'est du open source !</p>

                        <h2 className="text-xl uppercase font-bold">2. Informations sur l'hébergeur :</h2>
                        <p>Nom de l'hébergeur : </p>
                        <p>Adresse de l'hébergeur : </p>

                        <h2 className="text-xl uppercase font-bold">3. Propriété intellectuelle :</h2>
                        <p>Copyright 2023-Actuellement Huynh Raphaëlle</p>

                        <p>Permission vous est accordée, gratuitement, de copier, modifier, fusionner, publier, distribuer, sous-licencier et/ou vendre des copies du logiciel, et d'autoriser les personnes à qui le logiciel est fourni de le faire, sous réserve des conditions suivantes :<br />
                            L'avis de droits d'auteur ci-dessus et cet avis d'autorisation doivent être inclus dans toutes copies ou parties substantielles du logiciel.<br />
                            Le logiciel est fourni "tel quel", sans garantie d'aucune sorte, expresse ou implicite, y compris, mais sans s'y limiter, les garanties de qualité marchande, d'adéquation à un usage particulier et d'absence de contrefaçon. En aucun cas, les auteurs ou les détenteurs des droits d'auteur ne seront responsables de toute réclamation, dommage ou autre responsabilité, que ce soit dans le cadre d'un contrat, d'un délit ou autre, découlant de ou en lien avec le logiciel ou l'utilisation ou d'autres transactions dans le logiciel.
                        </p>
                    </aside>
                    <aside className="w-1/2 gap-4 flex flex-col">
                        <h2 className="text-xl uppercase font-bold">4. Politique de confidentialité :</h2>
                        <p>Nom prénom email : Seulement stockés, non exploités et non partagés.</p>

                        <h2 className="text-xl uppercase font-bold">5. Conditions générales d'utilisation :</h2>
                        <p>Vous pouvez partager vos portfolios, profil github / gitlab / linkedlin/ professionnels seulement.<br />
                            Vous êtes responsable de la confidentialité de votre compte.<br />
                            Toutes publications hors professionnelles ne sont pas autorisées que ce soit dans le nom, prénom, username, réseaux partagé, description, image etc ...<br />
                            Tout bannissement sera possible si les conditions d'utilisation ne sont pas respectées.<br />
                            Je ne récolte que les données fournis que vous mettez sur le site. Elles sont toutes visibles hors mis l'adresse mail. Celle-ci n'étant pas visible hors requête de l'administrateur.<br />
                            Je me réserve le droit de modifier les conditions d'utilisations. Les modifications seront annoncés sur le repo github du projet.<br />
                            Si les conditions ne sont pas respectées, je me reserve le droit de résilier le compte.<br />
                            Il n'y a pas de garanties concernant l'utilisation du service.
                        </p>
                    </aside>
                </article>
            </section>
        </>
    )
}

export default Mention;
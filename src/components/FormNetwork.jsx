import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import api_verif_session from "./api/api_verif_session";

function FormNetwork() {
  const [networks, setNetworks] = useState([]);
  const [formData, setFormData] = useState([]);
  const [message, setMessage] = useState("");
  const [networksOfUser, setNetworksOfUser] = useState([]);
  const [selectedNetworks, setSelectedNetworks] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [connected, setConnected] = useState();
  const { profil } = useParams();
  const navigate = useNavigate();

  const clearMessage = () => {
    setMessage('');
  };

  const clearDeleteMessage = () => {
    setDeleteMessage('');
  };

  const fetchNetworks = () => {
    fetch("http://127.0.0.1:8000/network", {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setNetworks(data);
        setFormData(data.map((network) => ({ id_member: profil, id_network: network.id, url: null })));
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des networks:", error);
      });
  };

  useEffect(() => {
    api_verif_session.getVerifSession(profil).then((json) => {
      console.log(json);
      console.log(json.status);
      if (json.status !== 200) {
        setConnected(false);
        navigate("/connexion");
      } else {
        setConnected(true);
      }
    })
      .catch((error) => {
        console.error(error);
      });

    fetchNetworks();
  }, [profil, navigate]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/member/network/${profil}`, {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setNetworksOfUser(data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des réseaux sociaux:', error);
      });
  }, [profil]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFormData = [...formData];
    updatedFormData[index] = { ...updatedFormData[index], [name]: value };
    setFormData(updatedFormData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const filteredFormData = formData.filter((data) => data.url && data.url.trim() !== '');

    const json = {
      id_member: profil,
      id_network: filteredFormData.map((data) => data.id_network),
      url: filteredFormData.map((data) => data.url.trim()),
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/member/network", {
        method: "POST",
        headers: headers,
        credentials: 'include',
        body: JSON.stringify(json),
      });

      if (response.status === 201) {
        setMessage("Mise à jour réussie.");
        setFormData(networks.map((network) => ({ id_member: profil, id_network: network.id, url: null })));
        setSelectedNetworks([]);

        fetch(`http://127.0.0.1:8000/member/network/${profil}`, {
          credentials: 'include',
        })
          .then((response) => response.json())
          .then((data) => {
            setNetworksOfUser(data);
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des réseaux sociaux:', error);
          });
      } else {
        setMessage("Erreur lors de la mise à jour.");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
    }
  };

  const deleteCheckboxChange = (event) => {
    const fieldName = event.target.name;
    const networkId = parseInt(fieldName.split('_')[1]);
    if (event.target.checked) {
      setSelectedNetworks([...selectedNetworks, networkId]);
    } else {
      setSelectedNetworks(selectedNetworks.filter((id) => id !== networkId));
    }
  };

  const deleteSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/member/network', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_member: profil,
          id_network: selectedNetworks,
        }),
        credentials: 'include',
      });

      if (response.status === 200) {
        setDeleteMessage('Réseaux sociaux supprimés avec succès !');
        setSelectedNetworks([]);

        fetchNetworks();
        fetch(`http://127.0.0.1:8000/member/network/${profil}`, {
          credentials: 'include',
        })
          .then((response) => response.json())
          .then((data) => {
            setNetworksOfUser(data);
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des réseaux sociaux:', error);
          });
      } else {
        const data = await response.json();
        setDeleteMessage(`Erreur : ${data.detail}`);
      }
    } catch (error) {
      setDeleteMessage('Une erreur inattendue s\'est produite.');
    }
  };

  return (
    <>
      {connected === true &&
        <>
          <NavBar />
          <section className="flex flex-col w-full px-5 md:px-20 pt-28">
            <article className="w-full grid grid-cols-2 border-b pb-10 items-center">
              <h1 className="text-2xl lg:text-4xl xl:text-6xl uppercase">
                Réseaux sociaux
              </h1>
              <p className="text-sm lg:text-lg text-right">
                Vous pouvez ajouter, modifier les liens de vos réseaux sociaux ainsi que les retirer.
              </p>
            </article>
            <article className="w-full flex gap-4 mt-10">
              <form onSubmit={handleSubmit} className="w-1/2">
                <h1 className="text-4xl md:text-4xl text-beige bg-black uppercase py-1 px-1 top-0 mb-10">Ajouter ou modifier</h1>
                {networks.map((network, index) => (
                  <div key={network.id_network} className="flex flex-col mb-2">
                    <label className="uppercase">{network.name} :</label>
                    <input
                      type="text"
                      name={`url`}
                      defaultValue={formData[index].url}
                      onChange={(event) => handleInputChange(index, event)}
                      className="bg-transparent border-b border-black focus:border-slate-400 p-1 focus:ring-transparent focus:outline-none focus:placeholder:text-slate-400 placeholder:text-slate-500"
                      placeholder="www.example.com"
                    />
                  </div>
                ))}
                <button type="submit" className="border-2 border-black uppercase py-2 px-3 bg-black text-beige hover:scale-105 transition delay-75 mt-4 w-full">Valider</button>
                <p className="my-4">
                  {message && (
                    <span className="border-2 border-slate-800 rounded-sm px-2 py-1">
                      {message}
                      <button onClick={clearMessage} className="ml-2 text-black">
                        &#x2716;
                      </button>
                    </span>
                  )}
                </p>
              </form>
              <form onSubmit={deleteSubmit} className="w-1/2">
                <h1 className="text-4xl md:text-4xl text-beige bg-black uppercase py-1 px-1 top-0 mb-4">Supprimer</h1>
                <div className="flex flex-wrap gap-4">
                  {networksOfUser.map((network) => (
                    <label key={network.id_network} className={`border-2 border-black w-32 text-center cursor-pointer hover:scale-110 transition delay-75 ${selectedNetworks.includes(network.id_network) ? 'bg-black text-beige' : ' text-black'}`}>
                      <input
                        type="checkbox"
                        name={`network_${network.id_network}`}
                        value={network.id_network}
                        onChange={deleteCheckboxChange}
                        className="hidden"
                      />
                      <span className="block p-2">{network.name}</span>
                    </label>
                  ))}
                </div>
                <button type="submit" className="border-2 border-black uppercase py-2 px-3 bg-black text-beige hover:scale-105 transition delay-75 mt-4 w-full">Supprimer</button>
                <p className="my-4">
                  {deleteMessage && (
                    <span className="border-2 border-slate-800 rounded-sm px-2 py-1">
                      {deleteMessage}
                      <button onClick={clearDeleteMessage} className="ml-2 text-black">
                        &#x2716;
                      </button>
                    </span>
                  )}
                </p>
              </form>
            </article>
            <Link to={`/profil/${profil}`} key={profil} className="text-3xl bottom-2 fixed hover:bg-black hover:text-white rounded-full px-2 py-1 transition delay-100">&#8592;</Link>
          </section>
        </>
      }
    </>
  );
}

export default FormNetwork;


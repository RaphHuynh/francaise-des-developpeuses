import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function FormNetwork() {
  const [networks, setNetworks] = useState([]);
  const [formData, setFormData] = useState([]);
  const [message, setMessage] = useState("");

  const { profil } = useParams();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/network")
      .then((response) => response.json())
      .then((data) => {
        setNetworks(data);
        setFormData(data.map((network) => ({ id_member: profil, id_network: network.id, url: null })));
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des networks:", error);
      });
  }, []);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFormData = [...formData];
    updatedFormData[index] = { ...updatedFormData[index], [name]: value };
    setFormData(updatedFormData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const json = {
        id_member: profil,
        id_network: formData.map((data) => data.id_network),
        url: formData.map((data) => data.url.trim()),
    };

    fetch("http://127.0.0.1:8000/member/network", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    })
      .then((response) => {
        if (response.status === 201) {
          setMessage("Mise à jour réussie.");
        } else {
          setMessage("Erreur lors de la mise à jour.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour:", error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Entrer les URL des networks que vous voulez ajouter ou mettre à jour :</label>
        {networks.map((network, index) => (
          <div key={network.id_network}>
            <label>{network.name} :</label>
            <input
              type="text"
              name={`url`}
              defaultValue={formData[index].url}
              onChange={(event) => handleInputChange(index, event)}
            />
          </div>
        ))}
        <button type="submit">Valider</button>
        {message && <p>{message}</p>}
      </form>
    </>
  );
}

export default FormNetwork;
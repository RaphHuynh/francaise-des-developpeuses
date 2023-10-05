import {useState, useEffect} from "react";
import NavBar from "./NavBar";
import { useParams } from 'react-router-dom';

function FormCategory() {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [message, setMessage] = useState('');

  const { profil } = useParams(); // Récupérez l'ID de l'utilisateur depuis les paramètres d'URL

  useEffect(() => {
    // Récupérez la liste des catégories depuis le serveur
    fetch('http://127.0.0.1:8000/category')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des catégories:', error);
      });
  }, []);

  const handleCheckboxChange = (event) => {
    const categoryId = parseInt(event.target.value);
    if (event.target.checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(profil);
    console.log(JSON.stringify({id_member:profil,id_category: selectedCategories}));

    try {
      const response = await fetch('http://127.0.0.1:8000/member/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_member: profil,
          id_category: selectedCategories,
        }),
      });

      if (response.status === 201) {
        setMessage('Catégories ajoutées avec succès !');
      } else {
        const data = await response.json();
        setMessage(`Erreur : ${data.detail}`);
      }
    } catch (error) {
      setMessage('Une erreur inattendue s\'est produite.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Sélectionnez les catégories :</label>
        {categories.map((category) => (
          <div key={category.id}>
            <input
              type="checkbox"
              value={category.id}
              onChange={handleCheckboxChange}
            />
            {category.name}
          </div>
        ))}
        <button type="submit">Soumettre</button>
      </form>
      <p>{message}</p>
    </div>
  );
}


export default FormCategory;
import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { useParams, Link, useNavigate } from 'react-router-dom';
import api_verif_session from "./api/api_verif_session";

function FormCategory() {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [message, setMessage] = useState('');
  const [categoriesOfUser, setCategoriesOfUser] = useState([]);
  const [selectedCategoriesOfUser, setSelectedCategoriesOfUser] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [connected, setConnected] = useState();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const { profil } = useParams();
  const navigate = useNavigate();

  const clearMessage = () => {
    setMessage('');
  };

  const clearDeleteMessage = () => {
    setDeleteMessage('');
  };

  useEffect(() => {
    api_verif_session.getVerifSession(profil).then((json) => {
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
  }, [profil, navigate]);

  useEffect(() => {
    fetch(`${baseUrl}/category`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        const categoriesToDisplay = data.filter((category) => {
          return !categoriesOfUser.some((userCategory) => userCategory.id_category === category.id);
        });
        setCategories(categoriesToDisplay);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des catégories:', error);
      });
  }, [categoriesOfUser]);

  useEffect(() => {
    fetch(`${baseUrl}/member/category/${profil}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setCategoriesOfUser(data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des catégories:', error);
      });
  }, [profil]);

  const handleCheckboxChange = (event) => {
    const categoryId = parseInt(event.target.value);
    if (event.target.checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    }
  };

  const deleteCheckboxChange = (event) => {
    const categoryId = parseInt(event.target.value);
    if (event.target.checked) {
      setSelectedCategoriesOfUser([...selectedCategoriesOfUser, categoryId]);
    } else {
      setSelectedCategoriesOfUser(selectedCategoriesOfUser.filter((id) => id !== categoryId));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/member/category`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_member: profil,
          id_category: selectedCategories,
        }),
        credentials: 'include',
      });

      if (response.status === 201) {
        setMessage('Catégories ajoutées avec succès !');
        setCategories([]);
        setCategoriesOfUser([]);
        setSelectedCategories([]);
        setSelectedCategoriesOfUser([]);
        fetchCategories();
        fetch(`http://127.0.0.1:8000/member/category/${profil}`, {
          method: 'GET',
          credentials: 'include',
        })
          .then((response) => response.json())
          .then((data) => {
            setCategoriesOfUser(data);
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des catégories:', error);
          });
      } else {
        const data = await response.json();
        setMessage(`Erreur : ${data.detail}`);
      }
    } catch (error) {
      setMessage('Une erreur inattendue s\'est produite.');
    }
  };

  const deleteSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/member/category`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_member: profil,
          id_category: selectedCategoriesOfUser,
        }),
        credentials: 'include',
      });

      if (response.status === 200) {
        setDeleteMessage('Catégories supprimées avec succès !');
        setCategories([]);
        setCategoriesOfUser([]);
        setSelectedCategories([]);
        setSelectedCategoriesOfUser([]);
        fetchCategories();
        fetch(`${baseUrl}/member/category/${profil}`, {
          method: 'GET',
          credentials: 'include',
        })
          .then((response) => response.json())
          .then((data) => {
            setCategoriesOfUser(data);
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des catégories:', error);
          });
      } else {
        const data = await response.json();
        setDeleteMessage(`Erreur : ${data.detail}`);
      }
    } catch (error) {
      setDeleteMessage('Une erreur inattendue s\'est produite.');
    }
  };

  const fetchCategories = () => {
    fetch(`${baseUrl}/category`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        const categoriesToDisplay = data.filter((category) => {
          return !categoriesOfUser.some((userCategory) => userCategory.id_category === category.id);
        });
        setCategories(categoriesToDisplay);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des catégories:', error);
      });
  };

  return (
    <>
      {connected == true &&
        <div>
          <NavBar />
          <section className="flex flex-col w-full px-5 md:px-20 pt-28">
            <article className="w-full grid grid-cols-2 border-b pb-10 items-center">
              <h1 className="text-2xl lg:text-4xl xl:text-6xl uppercase">
                Catégories
              </h1>
              <p className="text-sm lg:text-lg text-right">
                Vous pouvez sélectionner des catégories ou retirer des catégories sur cette page.
              </p>
            </article>
            <article className="w-full pt-12 gap-4 md:flex">
              <form onSubmit={handleSubmit} className="md:w-1/2">
                <h1 className="text-4xl md:text-4xl text-beige bg-black uppercase py-1 px-1 top-0">Sélectionnez les catégories :</h1>
                <div className="flex flex-wrap gap-4 py-10">
                  {categories.map((category) => (
                    <label key={category.id} className="border-2 border-black md:w-32 text-center cursor-pointer hover:scale-110 transition delay-75">
                      <input
                        type="checkbox"
                        value={category.id}
                        onChange={handleCheckboxChange}
                        className="hidden"
                      />
                      <span className={`block ${selectedCategories.includes(category.id) ? 'text-white bg-black p-2' : 'text-black p-2'}`}>
                        {category.name}
                      </span>
                    </label>
                  ))}
                </div>
                <button type="submit" className="border-2 w-full border-black uppercase py-2 px-3 bg-black text-beige hover:scale-110 transition delay-75">Soumettre</button>
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
              <form onSubmit={deleteSubmit} className="md:w-1/2 pb-10 md:pb-0">
                <h1 className="text-4xl md:text-4xl text-beige bg-black uppercase py-1 px-1 top-0">Supprimer des catégories :</h1>
                <div className="flex flex-wrap gap-4 py-10">
                  {categoriesOfUser.map((category) => (
                    <label key={category.id_category} className={`border-2 border-black md:w-32 text-center cursor-pointer hover:scale-110 transition delay-75 ${selectedCategoriesOfUser.includes(category.id_category) ? 'bg-black text-beige' : ' text-black'}`}>
                      <input
                        type="checkbox"
                        value={category.id_category}
                        onChange={deleteCheckboxChange}
                        className="hidden"
                      />
                      <span className="block p-2">{category.name}</span>
                    </label>
                  ))}
                </div>
                <button type="submit" className="border-2 w-full border-black uppercase py-2 px-3 bg-black text-beige hover:scale-110 transition delay-75">Supprimer</button>
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
        </div>
      }
    </>
  );
}

export default FormCategory;


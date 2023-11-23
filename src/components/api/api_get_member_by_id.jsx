function api_profil() {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const getMemberById = (id) => {
        console.log(id);
      return fetch(`${baseUrl}/member/`+id, {
        type: "GET",
      }).then((res) => res.json());
    };
  
    return {
      getMemberById,
    };
  }
  
export default api_profil();
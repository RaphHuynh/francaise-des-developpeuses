function api_profil() {
    const getMemberById = (id) => {
        console.log(id);
      return fetch("http://127.0.0.1:8000/member/"+id, {
        type: "GET",
      }).then((res) => res.json());
    };
  
    return {
      getMemberById,
    };
  }
  
  export default api_profil();
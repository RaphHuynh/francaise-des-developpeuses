function api() {
    const getMembers = () => {
      return fetch("http://127.0.0.1:8000/members", {
        type: "GET",
      }).then((res) => res.json());
    };
  
    return {
      getMembers,
    };
  }

export default api();
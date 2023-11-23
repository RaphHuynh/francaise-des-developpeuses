function api() {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const getMembers = () => {
      return fetch(`${baseUrl}/member`, {
        type: "GET",
      }).then((res) => res.json());
    };
  
    return {
      getMembers,
    };
  }

export default api();
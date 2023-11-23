function api_list_category() {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const getCategoryByIdMember = (id) => {
      return fetch(`${baseUrl}/member/list_category/`+id, {
        type: "GET",
      }).then((res) => res.json());
    };
  
    return {
      getCategoryByIdMember,
    };
  }
  
export default api_list_category();
function api_list_category() {
    const getCategoryByIdMember = (id) => {
      return fetch("http://127.0.0.1:8000/members/list_category/"+id, {
        type: "GET",
      }).then((res) => res.json());
    };
  
    return {
      getCategoryByIdMember,
    };
  }
  
  export default api_list_category();
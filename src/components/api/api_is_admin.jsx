function api_is_admin() {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const getVerifAdmin = () => {
        try {
            return fetch(`${baseUrl}/admin/`, {
            method: 'GET',
            credentials: "include",
            })
            .then(res => {
                if (res.status === 200){
                    return true
                }
                else if (res.status === 400){
                    return false
                }
            });
        } catch(error){
            return false;
        }
    };

    return {
        getVerifAdmin,
    };
}

export default api_is_admin();
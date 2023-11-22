function api_is_admin() {

    const getVerifAdmin = () => {
        try {
            return fetch('http://127.0.0.1:8000/admin/', {
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
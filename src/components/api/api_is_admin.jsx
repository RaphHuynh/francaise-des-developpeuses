function api_is_admin() {

    const getVerifAdmin = () => {
        return fetch('http://127.0.0.1:8000/admin/', {
            method: 'GET',
            credentials: "include",
        })
        .then(res => {
            if (res.status === 200){
                return true
            }
            else {
                return false
            }
        });
    };

    return {
        getVerifAdmin,
    };
}

export default api_is_admin();
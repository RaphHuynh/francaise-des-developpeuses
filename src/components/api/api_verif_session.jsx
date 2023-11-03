function api_verif_session() {

    const getVerifSession = (id) => {
        return fetch('http://127.0.0.1:8000/session/?id_member='+id, {
            method: 'GET',
            credentials: "include",
        })
        .then((res) => res.json());
    };

    return {
        getVerifSession,
    };
}

export default api_verif_session();
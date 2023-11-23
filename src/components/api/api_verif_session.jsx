function api_verif_session() {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const getVerifSession = (id) => {
        return fetch(`${baseUrl}/session/?id_member=`+id, {
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
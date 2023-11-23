function api_logout() {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const deleteSession = (id) => {
        return fetch(`${baseUrl}/session/delete?id_member=`+id, {
            method: 'GET',
        }).then((res) => res.json());
    }

    return {
        deleteSession,
    }
}

export default api_logout();
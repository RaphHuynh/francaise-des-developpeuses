function api_logout() {
    const deleteSession = (id) => {
        return fetch('http://127.0.0.1:8000/session/delete?id_member='+id, {
            method: 'GET',
        }).then((res) => res.json());
    }

    return {
        deleteSession,
    }
}

export default api_logout();
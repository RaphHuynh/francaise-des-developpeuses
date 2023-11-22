function api() {
    const getMembersAll = () => {
        return fetch('http://127.0.0.1:8000/admin/member', {
            type: "GET",
            credentials: 'include',
        }).then((res) => res.json());
    };

    return {
        getMembersAll,
    };
}

export default api();
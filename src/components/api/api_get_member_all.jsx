function api() {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const getMembersAll = () => {
        return fetch(`${baseUrl}/admin/member`, {
            type: "GET",
            credentials: 'include',
        }).then((res) => res.json());
    };

    return {
        getMembersAll,
    };
}

export default api();
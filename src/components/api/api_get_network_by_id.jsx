function api_get_network_by_id() {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const getNetworkById = (id) => {
        return fetch(`${baseUrl}/member/network/`+id, {
            type: "GET",
        }).then((res) => res.json());
    };

    return {
        getNetworkById,
    };
}

export default api_get_network_by_id();
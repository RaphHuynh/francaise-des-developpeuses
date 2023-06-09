function api_get_network_by_id() {
    const getNetworkById = (id) => {
        return fetch("http://127.0.0.1:8000/members/network?id_member="+id, {
            type: "GET",
        }).then((res) => res.json());
    };

    return {
        getNetworkById,
    };
}

export default api_get_network_by_id();
function login() {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const getLogin = () => {
        return fetch(`${baseUrl}/github/login`, {
            method: "GET",
        }).then((res) => res.json());
    };

    return {
        getLogin,
    };
}

export default login();
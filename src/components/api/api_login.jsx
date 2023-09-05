function login() {
    const getLogin = () => {
        return fetch("http://127.0.0.1:8000/github/login", {
            type: "GET",
        }).then((res) => res.json());
    };

    return {
        getLogin,
    };
}

export default login();
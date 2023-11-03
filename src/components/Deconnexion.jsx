export default Deconnexion;

function Deconnexion(){
    const logout = (id) => {
        const response = fetch('http://127.0.0.1:8000/session/delete?id_member='+id, {
            method: "DELETE",
            redirect: "manual"
        }).then((res) => res.json());
    }
}
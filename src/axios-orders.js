import axios from "axios";

const instance = axios.create({
    baseURL: "https://react-burger-a411b.firebaseio.com/"
});

export default instance;
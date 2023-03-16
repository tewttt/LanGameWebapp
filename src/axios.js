import axios from "axios";

const instance = axios.create ({
    baseURL: "https://race-d2c0d-default-rtdb.asia-southeast1.firebasedatabase.app/"
});

export default instance;
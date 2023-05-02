import axios from "axios";

const instance = axios.create ({
    // baseURL: "https://race-d2c0d-default-rtdb.asia-southeast1.firebasedatabase.app/"
    baseURL: "https://game-2a0c3-default-rtdb.firebaseio.com/"
});

export default instance;
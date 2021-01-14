import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://burger-builder-af20a.firebaseio.com/"
});

export default axiosInstance;
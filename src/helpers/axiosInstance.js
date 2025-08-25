import axios from "axios";

const BASE_URL =
    "https://lead-management-system-backend-whbe.onrender.com/api/v1/";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;

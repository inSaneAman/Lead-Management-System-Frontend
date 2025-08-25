import axios from "axios";

const BASE_URL =
    "https://lead-management-system-backend-whbe.onrender.com/api/v1/";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // include cookies
});

// Add a request interceptor to attach token
axiosInstance.interceptors.request.use(
    (config) => {
        // Get token from localStorage (or wherever you store it)
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;

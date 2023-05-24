import axios from "axios";
import { toast } from "react-toastify";
import useAuthStore from "../store";

const axiosInstance = axios.create({
    baseURL: "/api",
    withCredentials: true,
});
axiosInstance.interceptors.response.use(response => {
    return response;
}, async error => {
    if (error.response.status === 401) {
        useAuthStore.setState({ details: null, checkAuthenticated: false })
        toast.error(error.response.data.message);
        return Promise.reject(error);
    }
    else if (error.response.status === 400) {
        toast.error(error.response.data.message);
        return Promise.reject(error);
    } else {
        toast.error("Something went wrong");
        return Promise.reject(error);
    }
});

export default axiosInstance;
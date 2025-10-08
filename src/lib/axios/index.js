import axios from "axios";
import { logoutHelper } from "../../features/auth/utilities/auth";
import { userStorage } from "../../features/auth/storage";
import { toast } from "react-toastify";

const statusesConfig = {
    401: {
        message: 'You are not authorized to access this resource',
        action: function () {
            toast.error(this.message)
            logoutHelper();
            window.location.reload();
        }
    },
    403: {
        message: 'You do not have permission to access this resource',
        action: function () {
            toast.error(this.message)
        }
    },
    404: {
        message: 'The requested resource was not found',
        action: function () {
            toast.error(this.message);
        }
    },
    500: {
        message: 'An internal server error occurred',
        action: function () {
            toast.error(this.message);
        }
    },
}

export const httpClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
})

httpClient.interceptors.request.use((config) => {
    const token = userStorage.get();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

httpClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    statusesConfig[error.response?.status]?.action?.();
    return Promise.reject(error);
});
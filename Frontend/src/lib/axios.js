import axios from "axios";


export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true, // as we are using cookies for authentication, we need to set this to true
})

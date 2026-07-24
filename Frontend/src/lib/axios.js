import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api/",
    withCredentials: true, // as we are using cookies for authentication, we need to set this to true
})

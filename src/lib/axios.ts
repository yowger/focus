import axios from "axios"

import { PEXELS_API_KEY, PEXELS_API_URL } from "@/config/config"

export const axiosInstance = axios.create({
    baseURL: PEXELS_API_URL,
    headers: {
        Authorization: PEXELS_API_KEY,
    },
})

axiosInstance.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        return Promise.reject(error)
    }
)

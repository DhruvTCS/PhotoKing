// src/utils/axiosSetup.ts
import axios from 'axios';
import store from '../Store';
import { refreshAccessToken } from './Auth/refreshToken';

const api = axios.create({
    baseURL: 'https://photo-app-be-python.onrender.com', // Replace with your API base URL
});

let isRefreshing = false;
let failedQueue: Array<{ resolve: (value?: unknown) => void; reject: (reason?: unknown) => void }> = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers['Authorization'] = 'Bearer ' + token;
                        return api(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem('refresh_token');

            if (refreshToken) {
                try {
                    const response = await store.dispatch(refreshAccessToken(refreshToken));
                    const newAccessToken = response.payload as string;
                    localStorage.setItem('access_token', newAccessToken);
                    api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    processQueue(null, newAccessToken);
                    return api(originalRequest);
                } catch (err) {
                    processQueue(err, null);
                    // Handle token refresh error (e.g., logout user)
                    return Promise.reject(err);
                } finally {
                    isRefreshing = false;
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;

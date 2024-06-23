import axios, {AxiosInstance} from 'axios';
import {NavigateFunction} from 'react-router-dom';

export const createAxiosInstance = (navigate?: NavigateFunction): AxiosInstance => {
    const instance = axios.create({
        baseURL: "http://127.0.0.1:8000/",
        headers: {
            "Content-Type": "application/json",
        }
    });

    instance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('access_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('access_token');
                if (navigate) {
                    navigate('/');
                }
            }
            return Promise.reject(error);
        }
    );

    return instance;
};
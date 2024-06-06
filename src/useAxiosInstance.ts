import {useMemo} from 'react';
import axios, {AxiosInstance} from 'axios';
import {useNavigate} from 'react-router-dom';

const useAxiosInstance = (): AxiosInstance => {
    const navigate = useNavigate();

    return useMemo(() => {
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
                    navigate('/');
                }
                return Promise.reject(error);
            }
        );

        return instance;
    }, [navigate]);
};

export default useAxiosInstance;
import {useMemo} from 'react';
import {createAxiosInstance} from "./axiosInstance.ts";
import {useNavigate} from 'react-router-dom';

const useAxiosInstance = () => {
    const navigate = useNavigate();
    return useMemo(() =>
        createAxiosInstance(navigate),[navigate]);
}

export default useAxiosInstance;
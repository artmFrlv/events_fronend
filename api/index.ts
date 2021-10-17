import axios from 'axios';
import Cookies from 'js-cookie';

export const API_URL = 'http://84.38.183.53:5000/api';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
    if (config.headers && Cookies.get('accessToken')) {
        config.headers.Authorization = `Bearer ${Cookies.get('accessToken')}`;
    }

    return config;
});

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;

    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            await axios.get(`${API_URL}/auth/refresh`, {withCredentials: true});
            return $api.request(originalRequest);
        } catch (e) {
            console.log('ERROR');
        }
    }
    throw error;
});

export default $api;

import axios, { AxiosRequestConfig } from 'axios';
import store from '../Store'; // Import the Redux store
import { clearToken, setToken } from './../Slice/Auth/AuthSlice';
import { refreshAccessToken } from './../ApiCalls/Auth/refreshToken'; // Assume you have a thunk for refreshing the token
import { getHostUrl } from './getHotUrl';

const api = axios.create({
    baseURL: `${getHostUrl()}`
});
const getTokens = () => {
    const state = store.getState();
    const accessToken = state.auth.access_token || localStorage.getItem('access_token');
    const refreshToken = state.auth.refresh_token || localStorage.getItem('refresh_token');
    return { accessToken, refreshToken };
};

// Generic function to handle API calls with token refresh
const apiCall = async (options: AxiosRequestConfig<any>) => {
    const { accessToken, refreshToken } = getTokens();
    // console.log(accessToken, refreshToken)

    // Attach the access token to the request
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        // 'ngrok-skip-browser-warning': true,
        ...options.headers,
    };

    try {
        // console.log(headers);
        // console.log(options);
        const response = await api({
            ...options,
            headers: headers
        });
        return response.data;
    } catch (error: any) {
        console.log(error)
        console.log("error above sending refresh token api");
        console.log(error.response);
        if ((error.response.status === 401) && refreshToken) {
            // Token might be expired, attempt to refresh it
            try {
                const newAccessToken = await store.dispatch(refreshAccessToken(refreshToken)).unwrap();
                console.log(newAccessToken);
                console.log(newAccessToken.data)
                // Update the access token in the Redux store
                store.dispatch(setToken({ access_token: newAccessToken.data, refresh_token: refreshToken }));
                if (localStorage.getItem('access_token')) {
                    localStorage.setItem('access_token', newAccessToken.data);
                }
                // Retry the original request with the new access token
                const retryHeaders = {
                    Authorization: `Bearer ${newAccessToken.data}`,
                    ...options.headers,
                };

                const retryResponse = await api({
                    ...options,
                    headers: retryHeaders,
                });
                return retryResponse.data;
            } catch (refreshError) {
                console.log("error in refresh token request from authAPI")
                console.log(refreshError)
                // If refresh fails, clear tokens and handle error appropriately;
                // store.dispatch(clearToken());
                throw refreshError;
            }
        } else {
            throw error;
        }
    }
};

export default apiCall;
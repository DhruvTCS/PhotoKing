import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiCall from "../AuthorizedApi";
import { getHostUrl } from "../getHotUrl";

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials: { phone_number: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${getHostUrl()}/account/sendotp/`, credentials);
            // console.log(response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const verifyOTP = createAsyncThunk(
    'auth/verifyOTP',
    async (credentials: { country_code: string, phone_number: string, otp: string, orderId: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${getHostUrl()}/account/login/`, credentials);
            // console.log(response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getUserByToken = createAsyncThunk(
    'auth/getUserByToken',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'GET',
                url: '/account/user-details/'
            });
            // // console.log(response);
            return response.data.user;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const resendOTP = createAsyncThunk(
    'auth/resendOTP',
    async (credentials: { orderId: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${getHostUrl()}/account/resent-otp/`, credentials);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);


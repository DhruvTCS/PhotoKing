import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials: { phone_number: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/account/sendotp/', credentials);
            console.log(response.data);
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
            const response = await axios.post('/account/login/', credentials);
            console.log(response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const resendOTP = createAsyncThunk(
    'auth/resendOTP',
    async (credentials: { orderId: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/account/resent-otp/', credentials);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);


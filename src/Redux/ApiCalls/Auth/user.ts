import { createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "../AuthorizedApi";

export const changePhoneNumberOtpAPI = createAsyncThunk(
    'auth/changePhoneNumberOtpAPI',
    async (credentials: { phone_number: string }, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'POST',
                url: '/account/sendotp/',
                data: credentials
            });
            // console.log(response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const changePhoneNumberAPI = createAsyncThunk(
    'auth/changePhoneNumberAPI',
    async (credentials: { new_phone_number: string, new_country_code: string, otp: string, orderId: string }, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'PUT',
                url: '/account/update-phone/',
                data: credentials
            });
            // console.log(response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const getBusinessDetailsAPI = createAsyncThunk(
    'auth/getBusinessDetailsAPI',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'GET',
                url: '/account/business-detail/',
            });
            // console.log(response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateUserDetailsAPI = createAsyncThunk(
    'auth/updateUserDetailsAPI',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'PUT',
                url: '/account/update-userdetail/',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                data
            });
            // console.log(response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const verifyEmailLinkAPI = createAsyncThunk(
    'auth/verifyEmailLinkAPI',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'POST',
                url: '/account/user/send-verify-token/',
                data
            });
            // console.log(response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);
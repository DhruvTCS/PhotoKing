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
            console.log(response.data);
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
            console.log(response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);
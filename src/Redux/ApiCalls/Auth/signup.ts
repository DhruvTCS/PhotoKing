import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getHostUrl } from "../getHotUrl";
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (credentials: { name: string, email: string, phone_number: string, country_code: string, orderId: string, role: number, otp: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${getHostUrl()}/account/register/`, credentials);
            // console.log(response.data.data.user);
            let userObject = response.data.user;

            return response.data.data.user;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    })
// src/store/thunks/authThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const refreshAccessToken = createAsyncThunk(
    'auth/refreshAccessToken',
    async (refresh_token: string, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://photo-app-be-python.onrender.com/account/token/', { refresh_token });
            // console.log("from refresh token ")
            return response.data;
        } catch (error: any) {
            // console.log(error.refresh);
            return rejectWithValue(error.response.data.message || 'Failed to refresh token');
        }
    }
);

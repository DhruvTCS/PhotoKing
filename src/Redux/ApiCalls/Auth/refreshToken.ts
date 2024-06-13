// src/store/thunks/authThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const refreshAccessToken = createAsyncThunk(
    'auth/refreshAccessToken',
    async (refreshToken: string, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/refresh-token', { refreshToken });
            return response.data.accessToken;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message || 'Failed to refresh token');
        }
    }
);

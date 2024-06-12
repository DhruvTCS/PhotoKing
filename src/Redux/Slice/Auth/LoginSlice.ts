// src/store/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
    user: { email: string } | null;
    loading: boolean;
    error: string | null;
    isError: boolean;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
    isError: false,
};

// Async thunk for user login
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials: { contact: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/login', credentials);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ email: string }>) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

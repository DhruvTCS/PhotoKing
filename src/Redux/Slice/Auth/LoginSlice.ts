// src/store/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../../../dto/user.dto';
import { Error } from '../../../dto/error.dto';

interface UserState {
    user: User | null;
    loading: boolean;
    error: {
        success?: boolean;
        status?: number;
        messgae?: string;
        error?: {
            message?: string;
            stringify_error?: string | null;
        }
    };
    isError: boolean;
    status: boolean;
    phone_number: string;
    country_code: string;
    orderId: string;


}

const initialState: UserState = {
    user: null,
    loading: false,
    error: {},
    isError: false,
    status: false,
    phone_number: "",
    country_code: "",
    orderId: "",
};

// Async thunk for user login
export const loginUser = createAsyncThunk(
    'login/loginUser',
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
    'login/verifyOTP',
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

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.loading = false;
            state.error = {};
        },
        setContactNumber(state, action: PayloadAction<{ phone_number: string, countryCode: string }>) {
            state.phone_number = action.payload.phone_number;
            state.country_code = action.payload.countryCode;
        },
        clearError(state) {
            state.error = {};
            state.loading = false;
            state.isError = false;
            state.status = false;

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = {};
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<{
                success: boolean,
                status: number,
                message: string,
                data: {
                    orderId: string,
                }
            }>) => {
                state.orderId = action.payload.data.orderId;
                state.status = true;
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.isError = true;

                console.log(action.payload);
                state.error = action.payload;
            })
            .addCase(verifyOTP.pending, (state) => {
                state.loading = true;
                state.error = {};
                state.isError = false;
                state.status = false;

            })
            .addCase(verifyOTP.fulfilled, (state, action: PayloadAction<{
                status: number;
                suceess: boolean;
                data: {
                    access_token: string;
                    refresh_token: string;
                    user: {
                        id: string;
                        name: string;
                        email: string;
                        country_code: string;
                        phone_number: string;
                        username: string;
                        role: string;

                    }

                }


            }>) => {
                state.loading = false;
                console.log(action.payload);
                state.user = action.payload.data.user;
                console.log(state.user);
                state.status = action.payload.suceess;
            })
            .addCase(verifyOTP.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.isError = true;
                console.log(action.payload);
                state.error.messgae = action.payload.message;
                state.error.status = action.payload.status;
                state.status = false;
            })

    },
});

export const { setContactNumber, clearError } = loginSlice.actions;


export default loginSlice.reducer;







// {
//     "success": true,
//         "status": 200,
//             "message": "Logged in successfully.",
//                 "data": {
//         "status": true,
//             "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4MTk0OTY1LCJpYXQiOjE3MTgxODc3NjUsImp0aSI6IjBlMTliMzBmMzE2NjQ2NGU4YTBkMzQ3MjBjN2I4NmI5IiwidXNlcl9pZCI6NjB9.ZTnhyCilFFVXyOrO5FKZ5pmH3Et33p4f1a9oBehs_e8",
//                 "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMDc3OTc2NSwiaWF0IjoxNzE4MTg3NzY1LCJqdGkiOiIwNzU4ZjQzYzVhNDQ0ZmI0YTZhZjJlNGNhMDA0ODA1YSIsInVzZXJfaWQiOjYwfQ.U0vhDYPx9HY41p2QXgKEVHzeDO5JkSuqQoxT7hOpuUI",
//                     "user": {
//             "id": 60,
//                 "email": "dhruvgopani27@gmail.com",
//                     "name": "Dhruv",
//                         "country_code": "+91",
//                             "phone_number": "8849927290",
//                                 "role": 1,
//                                     "username": "dhruvgopani27"
//         }
//     }
// }


// Error response for not registered users
// {
//     "success": false,
//         "status": 401,
//             "message": "Phone number is not registered",
//                 "error": {
//         "message": "Phone number is not registered",
//             "stringify_error": null
//     }
// }
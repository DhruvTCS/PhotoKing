// src/store/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../Data/user.dto';
import { Error } from '../../../Data/error.dto';

import { LoginReducer } from '../../Reducers/Auth/LoginReducers';
import { OTPVerificationReducer } from '../../Reducers/Auth/OTPVerificationReducer';
import { UserReducer } from '../../Reducers/Auth/userReducer';
import { RegisterReducer } from '../../Reducers/Auth/SignUpReducer';
export interface UserState {
    user: User | null;
    loading: boolean;
    isRegister: boolean;
    error: Error;
    isError: boolean;
    apiStatus: boolean;
    phone_number: string;
    country_code: string;
    orderId: string;
    isAuthticated: boolean;
    access_token: string | null;
    refresh_token: string | null;
    isUserChanged: boolean;
    remeberMe: boolean;
    otp?: string;
    subscription_plans?: any;
    SocialLinks: {
        website?: string;
        facebook_link?: string;
        insta_link?: string;
        youtube_link?: string;
    }
    isSocialChanged: boolean;

}

const initialState: UserState = {
    user: null,
    loading: false,
    isUserChanged: true,
    error: {},
    isError: false,
    apiStatus: false,
    phone_number: "",
    country_code: "",
    orderId: "",
    isAuthticated: false,
    access_token: null,
    refresh_token: null,
    remeberMe: false,
    isRegister: false,
    SocialLinks: {},
    isSocialChanged: true,

};




const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setContactNumber(state, action: PayloadAction<{ phone_number: string, countryCode: string }>) {
            state.phone_number = action.payload.phone_number;
            state.country_code = action.payload.countryCode;
        },
        clearError(state) {
            state.error = {};
            state.loading = false;
            state.isError = false;
            state.apiStatus = false;

        },
        clearToken(state) {
            state.access_token = null;
            state.refresh_token = null;
            state.isAuthticated = false;
            state.user = null;
            if (localStorage.getItem("access_token")) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
            }
        },
        setToken(state, action: PayloadAction<{ access_token: string, refresh_token: string }>) {
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
        },
        setRemeberMe(state, action: PayloadAction<boolean>) {
            state.remeberMe = action.payload;
        },

        setUserPhoneNumber(state, action: PayloadAction<{ number: string }>) {
            if (state.user)
                state.user.phone_number = action.payload.number;
        },
        setReduxOtp(state, action: PayloadAction<string>) {
            state.otp = action.payload;
        }
    },

    extraReducers: (builder) => {
        LoginReducer(builder);
        OTPVerificationReducer(builder);
        UserReducer(builder);
        RegisterReducer(builder);
    },
});

export const { setContactNumber, clearError, setToken, clearToken, setRemeberMe, setUserPhoneNumber, setReduxOtp } = authSlice.actions;


export default authSlice.reducer;






// Success Resposnse 
// {
//     "success": true,
//      "status": 200,
//      "message": "Logged in successfully.",
//      "data": {
//         "status": true,
//          "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4MTk0OTY1LCJpYXQiOjE3MTgxODc3NjUsImp0aSI6IjBlMTliMzBmMzE2NjQ2NGU4YTBkMzQ3MjBjN2I4NmI5IiwidXNlcl9pZCI6NjB9.ZTnhyCilFFVXyOrO5FKZ5pmH3Et33p4f1a9oBehs_e8",
//          "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMDc3OTc2NSwiaWF0IjoxNzE4MTg3NzY1LCJqdGkiOiIwNzU4ZjQzYzVhNDQ0ZmI0YTZhZjJlNGNhMDA0ODA1YSIsInVzZXJfaWQiOjYwfQ.U0vhDYPx9HY41p2QXgKEVHzeDO5JkSuqQoxT7hOpuUI",
//          "user": {
//                "id": 60,
//                 "email": "dhruvgopani27@gmail.com",
//                  "name": "Dhruv",
//                   "country_code": "+91",
//                   "phone_number": "8849927290",
//                    "role": 1,
//                    "username": "dhruvgopani27"
//         }
//     }
// }


// Error response for not registered users
// {
//     "success": false,
//     "status": 401,
//      "message": "Phone number is not registered",
//      "error": {
//         "message": "Phone number is not registered",
//          "stringify_error": null
//     }
// }
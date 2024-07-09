import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../../Slice/Auth/AuthSlice';
import { verifyOTP, resendOTP } from '../../ApiCalls/Auth/login';
export const OTPVerificationReducer = (builder: ActionReducerMapBuilder<UserState>) => {
    builder.addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = {};
        state.isError = false;
        state.apiStatus = false;
    })
        .addCase(verifyOTP.fulfilled, (state, action: PayloadAction<{
            status: number;
            success: boolean;
            data: {
                access_token: string;
                refresh_token: string;
                user: {
                    id: number;
                    name: string;
                    email: string;
                    country_code: string;
                    phone_number: string;
                    username: string;
                    role: number;
                    image: string | null;

                }
            }
        }>) => {
            state.loading = false;
            console.log(action.payload);
            state.user = action.payload.data.user;
            console.log(action.payload.success);
            state.apiStatus = action.payload.success;
            state.access_token = action.payload.data.access_token;
            state.refresh_token = action.payload.data.refresh_token;

            if (state.remeberMe) {

                localStorage.setItem("access_token", action.payload.data.access_token);
                localStorage.setItem("refresh_token", action.payload.data.refresh_token);
            }
            state.isAuthticated = true;
        })
        .addCase(verifyOTP.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;
            console.log(action.payload);
            state.error.message = action.payload.message;
            state.error.status = action.payload.status;
            state.apiStatus = false;
        }).addCase(resendOTP.pending, (state) => {
            state.loading = true;
            state.error = {};
            state.isError = false;
            state.apiStatus = false;

        }).addCase(resendOTP.fulfilled, (state, action: PayloadAction<{
            orderId: string;
        }>) => {
            state.loading = false;
        }).addCase(resendOTP.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.apiStatus = false;
            console.log(action.payload);
            state.error = action.payload;

        })

};
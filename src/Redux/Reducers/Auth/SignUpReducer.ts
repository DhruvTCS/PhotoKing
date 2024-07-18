import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../../Slice/Auth/AuthSlice';
import { registerUser } from '../../ApiCalls/Auth/signup';
import { User } from '../../../Data/user.dto';
import { showSuccessToast } from '../../../components/atoms/Utlis/Toast';
export const RegisterReducer = (builder: ActionReducerMapBuilder<UserState>) => {
    builder.addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = {};
    })
        .addCase(registerUser.fulfilled, (state, action: PayloadAction<{
            access_token: string,
            refresh_token: string,
            id: number,
            email: string,
            name: string,
            country_code: string,
            phone_number: string,
            username: string,
            profile_image: string,
            role: string,
        }>) => {
            // console.log(action.payload)
            state.loading = false;
            let userData: User = {
                name: action.payload.name,
                id: action.payload.id,
                phone_number: action.payload.phone_number,
                country_code: action.payload.country_code,
                email: action.payload.email,
                image: action.payload.profile_image,
                role: parseInt(action.payload.role),
                username: action.payload.username,
            }
            state.user = userData;
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
            if (state.remeberMe) {
                localStorage.setItem("access_token", action.payload.access_token);
                localStorage.setItem("refresh_token", action.payload.refresh_token);
            }
            state.loading = false;
            state.isAuthticated = true;
            state.apiStatus = true;
            state.isError = false;
            showSuccessToast("User registered successfully.")
            // state.user=action.payload;


        })
        .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;

            // console.log(action.payload);
            state.error = action.payload;
        })

};
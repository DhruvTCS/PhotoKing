import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../../Slice/Auth/AuthSlice';
import { getUserByToken } from '../../ApiCalls/Auth/login';
import { refreshAccessToken } from '../../ApiCalls/Auth/refreshToken';
import store from '../../Store';
import { clearError as clearAlbumError } from '../../Slice/Dashboard/AlbumSlice';
import { clearError as clearMemberError } from '../../Slice/Dashboard/MemberSlice'
import { getBusinessDetailsAPI, updateUserDetailsAPI } from '../../ApiCalls/Auth/user';
import { showSuccessToast } from '../../../components/atoms/Utlis/Toast';
export const UserReducer = (builder: ActionReducerMapBuilder<UserState>) => {
    builder.addCase(getUserByToken.pending, (state) => {
        state.loading = true;
        state.error = {};
    })
        .addCase(getUserByToken.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            // console.log("payload")
            // console.log(action.payload)

            if (action.payload.role === null) {
                state.isError = true;
                state.error = {
                    status: 402,
                    message: "Please Register first"
                }
            } else if (action.payload.role !== 3) {
                state.isError = true;
                state.error = {
                    status: 401,
                    message: "You are not authorized to perform this action"
                }
            } else {
                state.user = action.payload;
                state.isUserChanged = false;
                state.access_token = localStorage.getItem('access_token');
                state.refresh_token = localStorage.getItem('refresh_token');
                state.isAuthticated = true;
                state.apiStatus = true;
            }
        })
        .addCase(getUserByToken.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;

            // console.log(action.payload);
            state.error = action.payload;
        })
        .addCase(getBusinessDetailsAPI.pending, (state) => {
            state.loading = true;
            state.error = {};
            state.isError = false;

        })
        .addCase(getBusinessDetailsAPI.fulfilled, (state, action: PayloadAction<{
            business_details: {
                website: string,
                facebook_link: string,
                insta_link: string,
                youtube_link: string
            }
        }>) => {
            state.loading = false;
            if (action.payload.business_details.website)
                state.SocialLinks.website = action.payload.business_details.website
            if (action.payload.business_details.facebook_link)
                state.SocialLinks.facebook_link = action.payload.business_details.facebook_link
            if (action.payload.business_details.insta_link)
                state.SocialLinks.insta_link = action.payload.business_details.insta_link
            if (action.payload.business_details.youtube_link)
                state.SocialLinks.youtube_link = action.payload.business_details.youtube_link
            state.isSocialChanged = false
        })
        .addCase(getBusinessDetailsAPI.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            // state.isError = true;

            // // console.log(action.payload);
            // state.error = action.payload;
        })
        .addCase(updateUserDetailsAPI.pending, (state) => {
            state.loading = true;
            state.error = {};
            state.isError = false;

        })
        .addCase(updateUserDetailsAPI.fulfilled, (state, action: PayloadAction<any>) => {
            showSuccessToast("User updated successfully.")
            state.isUserChanged = true;
            state.isSocialChanged = true;
        })
        .addCase(updateUserDetailsAPI.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            // state.isError = true;

            // // console.log(action.payload);
            // state.error = action.payload;
        })

};
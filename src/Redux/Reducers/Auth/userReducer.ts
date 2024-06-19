import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../../Slice/Auth/AuthSlice';
import { getUserByToken } from '../../ApiCalls/Auth/login';
export const UserReducer = (builder: ActionReducerMapBuilder<UserState>) => {
    builder.addCase(getUserByToken.pending, (state) => {
        state.loading = true;
        state.error = {};
    })
        .addCase(getUserByToken.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            console.log("payload")
            console.log(action.payload)
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
                state.access_token = localStorage.getItem('access_token');
                state.refresh_token = localStorage.getItem('refresh_token');
                state.isAuthticated = true;
                state.apiStatus = true;
            }
        })
        .addCase(getUserByToken.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;

            console.log(action.payload);
            state.error = action.payload;
        })

};
import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../../Slice/Auth/AuthSlice';
import { loginUser } from '../../ApiCalls/Auth/login';
import store from '../../Store';
import { setGlobalError } from '../../Slice/ErrorSlice';
export const LoginReducer = (builder: ActionReducerMapBuilder<UserState>) => {
    builder.addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = {};
    })
        .addCase(loginUser.fulfilled, (state, action: PayloadAction<{
            success: boolean,
            status: number,
            message: string,
            data: {
                orderId: string,
                role: number | null,
            }
        }>) => {
            state.loading = false;
            if (action.payload.data.role === null && !state.isRegister) {
                state.isError = true;
                state.error = {
                    status: 402,
                    message: "Please Register first"
                }
            } else if (action.payload.data.role !== 3 && !state.isRegister) {
                state.isError = true;
                state.error = {
                    status: 401,
                    message: "You are not authorized to perform this action"
                }
            } else {
                state.orderId = action.payload.data.orderId;
                state.apiStatus = true;
            }
        })
        .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            store.dispatch(setGlobalError(action.payload));
        })

};
import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../../Slice/Auth/AuthSlice';
import { loginUser } from '../../ApiCalls/Auth/login';
import { showErrorToast } from '../../../components/atoms/Utlis/Toast';
export const LoginReducer = (builder: ActionReducerMapBuilder<UserState>) => {
    builder.addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.isRegister = false;
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

            if (action.payload.data.role !== 3 && action.payload.data.role !== null) {
                state.isError = true;
                state.error = {
                    status: 401,
                    message: "You are not authorized to perform this action"
                }
            } else {
                if (action.payload.data.role === null) {
                    state.isRegister = true;
                }
                state.orderId = action.payload.data.orderId;
                state.apiStatus = true;
            }
        })
        .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;

            // console.log(action.payload);
            state.error = action.payload;
        })

};
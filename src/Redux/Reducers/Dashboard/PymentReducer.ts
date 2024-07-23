import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { PackageState } from '../../Slice/Dashboard/PackageSlice';
import { PaymentState } from '../../Slice/Dashboard/PaymentSlice';
import { createOrderAPI } from '../../ApiCalls/Dashboard/PaymentAPI';


export const PaymentReducer = (builder: ActionReducerMapBuilder<PaymentState>) => {
    builder.addCase(createOrderAPI.pending, (state) => {
        state.loading = true;
    })
        .addCase(createOrderAPI.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.order = action.payload;
        }).addCase(createOrderAPI.rejected, (state, action: PayloadAction<any>) => {

            state.loading = false;
            state.isError = true;

            // console.log(action.payload);
            state.error = action.payload;
        })
};

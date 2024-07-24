import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { PackageState } from '../../Slice/Dashboard/PackageSlice';
import { PaymentState } from '../../Slice/Dashboard/PaymentSlice';
import { completePaymentAPI, createOrderAPI } from '../../ApiCalls/Dashboard/PaymentAPI';
import { showSuccessToast } from '../../../components/atoms/Utlis/Toast';


export const PaymentReducer = (builder: ActionReducerMapBuilder<PaymentState>) => {
    builder.addCase(createOrderAPI.pending, (state) => {
        state.loading = true;
    })
        .addCase(createOrderAPI.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.order = action.payload;
            console.log(action.payload);
        }).addCase(createOrderAPI.rejected, (state, action: PayloadAction<any>) => {

            state.loading = false;
            state.isError = true;
            state.error = action.payload;
        }).addCase(completePaymentAPI.pending, (state) => {
            state.loading = true;
        })
        .addCase(completePaymentAPI.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.paymentSuccess = true;
            showSuccessToast("Payment successful.")
        }).addCase(completePaymentAPI.rejected, (state, action: PayloadAction<any>) => {

            state.loading = false;
            state.isError = true;

            // console.log(action.payload);
            state.error = action.payload;
        })
};

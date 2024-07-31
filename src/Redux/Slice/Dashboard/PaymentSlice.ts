// features/payment/paymentSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Error } from '../../../Data/error.dto';
import { PaymentReducer } from '../../Reducers/Dashboard/PaymentReducer';

export interface PaymentState {
    loading: boolean;
    order: any;
    paymentSuccess: boolean;
    error: Error;
    isError: boolean;
}

const initialState: PaymentState = {
    loading: false,
    order: null,
    paymentSuccess: false,
    error: {},
    isError: false,
};


const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        paymentSuccess(state) {
            state.paymentSuccess = true;
        },
        cancelPayment(state) {
            state.order = null;
        }
    },
    extraReducers: (builder) => {
        PaymentReducer(builder)
    },
});

export const { paymentSuccess, cancelPayment } = paymentSlice.actions;
export default paymentSlice.reducer;

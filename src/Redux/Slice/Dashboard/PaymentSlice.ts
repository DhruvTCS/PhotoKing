// features/payment/paymentSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Error } from '../../../Data/error.dto';
import { PaymentReducer } from '../../Reducers/Dashboard/PymentReducer';

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
        paymentSuccess: (state) => {
            state.paymentSuccess = true;
        },
    },
    extraReducers: (builder) => {
        PaymentReducer(builder)
    },
});

export const { paymentSuccess } = paymentSlice.actions;
export default paymentSlice.reducer;

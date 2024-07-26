
import { createAsyncThunk } from '@reduxjs/toolkit';
import apiCall from '../AuthorizedApi';


export const createOrderAPI = createAsyncThunk('payment/createOrderAPI', async (data: { storage_plan_id: number, duration: number }, { rejectWithValue }) => {
    try {
        const res = await apiCall({
            method: 'POST',
            url: `/plans/payment/`,
            data
        })

        // console.log(folder)
        return res.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});

export const completePaymentAPI = createAsyncThunk('payment/completePaymentAPI', async (data: any, { rejectWithValue }) => {
    try {
        const res = await apiCall({
            method: 'POST',
            url: `/plans/transaction/`,
            data
        })

        // console.log(folder)
        return res.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});


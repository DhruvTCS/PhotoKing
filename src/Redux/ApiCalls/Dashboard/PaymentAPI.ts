
import { createAsyncThunk } from '@reduxjs/toolkit';
import apiCall from '../AuthorizedApi';


export const createOrderAPI = createAsyncThunk('payment/createOrderAPI', async (amount: number) => {
    const response = await apiCall({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        url: "payment/createOrder",
        data: amount
    });
    return response.json();
});
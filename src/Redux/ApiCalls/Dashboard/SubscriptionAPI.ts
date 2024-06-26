import { createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "../AuthorizedApi";
export const subscriptionsPlansAPI = createAsyncThunk(
    'subscription/subscriptionsPlansAPI',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'GET',
                url: '/plans/all-plans/'
            })
            console.log(response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });
import { createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "../AuthorizedApi";
export const getAllNotificationAPI = createAsyncThunk(
    'extra/getAllNotificationAPI',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'GET',
                url: '/account/notification/?notification_type=unseen'
            })
            // console.log(response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });
export const seenNotification = createAsyncThunk(
    'extra/seenNotification',
    async (data: { notification_ids: number[] }, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'PUT',
                url: '/account/notification/',
                data
            })
            // console.log(response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });
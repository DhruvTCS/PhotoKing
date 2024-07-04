import { createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "../AuthorizedApi";
export const getAllEventsAPI = createAsyncThunk(
    'event/getAllEventsAPI',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'GET',
                url: '/project/user-event/',
                data: data
            })

            console.log(response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });

export const createEventAPI = createAsyncThunk(
    'event/createEventAPI',
    async (data: { title: string, time: string, date: string, location: string, members: string }, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'POST',
                url: '/project/user-event/',
                data: data
            })
            console.log(response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });
export const deleteEventAPI = createAsyncThunk(
    'event/deleteEventAPI',
    async (data: { id: number }, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'DELETE',
                url: `/project/user-event/?event_id=${data.id}`,

            })
            console.log(response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });
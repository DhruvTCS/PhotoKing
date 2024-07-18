import { createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "../AuthorizedApi";
import axios from "axios";
import { getHostUrl } from "../getHotUrl";
export const getAllEventsAPI = createAsyncThunk(
    'event/getAllEventsAPI',
    async (data: { start_date: string, end_date: string }, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'GET',
                url: `/project/user-event/?start_date=${data.start_date}&end_date=${data.end_date}`,

            })

            console.log(response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });

export const createEventAPI = createAsyncThunk(
    'event/createEventAPI',
    async (data: { title: string, start_time: string, start_date: string, end_time: string, end_date: string, location: string, members: string }, { rejectWithValue }) => {
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
export const updateEventAPI = createAsyncThunk(
    'event/updateEventAPI',
    async (data: { event_id: number, title: string, start_time: string, start_date: string, end_time: string, end_date: string, location: string, member_ids: number[] }, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'PUT',
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
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });
export const getEventFormTokenAPI = createAsyncThunk(
    'event/getEventFormTokenAPI',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'GET',
                url: `/account/user/form-token/`,

            })
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    })

export const submitEventFormAPI = createAsyncThunk(
    'event/submitEventFormAPI',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: 'POST',
                url: `${getHostUrl()}/project/customer-event/`,
                data

            })
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    })

export const getUserCreatedEventsAPI = createAsyncThunk(
    'event/getUserCreatedEventsAPI',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'GET',
                url: `/project/customer-event/`,


            })
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    })
export const deleteUserCreatedEventAPI = createAsyncThunk(
    'event/deleteUserCreatedEventAPI',
    async (data: { event_id: number }, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'DELETE',
                url: `/project/customer-event/?customer_event_id=${data.event_id}`,


            })
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    })
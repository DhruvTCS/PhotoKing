import { createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "../AuthorizedApi";
export const getAllMembers = createAsyncThunk(
    'member/getAllMembers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'GET',
                url: '/account/user/team-member/'
            })
            // console.log(response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });
export const createNewMemberAPI = createAsyncThunk(
    'member/createNewMemberAPI',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'POST',
                url: '/account/user/team-member/',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                data
            })
            // console.log(response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });
export const updateMemberAPI = createAsyncThunk(
    'member/updateMemberAPI',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'PUT',
                url: '/account/user/team-member/',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                data
            })
            // console.log(response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });
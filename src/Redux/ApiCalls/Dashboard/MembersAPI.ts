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
            console.log(response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });
export const createNewMemberAPI = createAsyncThunk(
    'member/createNewMemberAPI',
    async (data: { name: string, job_type: string, profile_image: string, phone_number: string, country_code: string }, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'POST',
                url: '/account/user/team-member/',
                data
            })
            console.log(response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });
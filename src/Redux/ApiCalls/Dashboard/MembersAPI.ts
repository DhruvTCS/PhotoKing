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
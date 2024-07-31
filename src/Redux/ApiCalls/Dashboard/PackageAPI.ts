import { createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "../AuthorizedApi";
export const createPackageAPI = createAsyncThunk(
    'album/createPackageAPI',
    async (data: { title: string, price: number, description: string, website?: string, youtube_link?: string, insta_link?: string, facebook_link?: string }, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'POST',
                url: `/plans/business-package/`,
                data
            })
            // console.log(response);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });
export const getAllPackageAPI = createAsyncThunk(
    'album/getAllPackageAPI',
    async (data: { user_id: number }, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'GET',
                url: `/plans/business-package/?user_id=${data.user_id}`,
            })
            // console.log(response);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });
export const updatePackageAPI = createAsyncThunk(
    'album/updatePackageAPI',
    async (data: { package_id: number, description: string, title: string, price: number }, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'PUT',
                url: `/plans/business-package/`,
                data
            })
            // console.log(response);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });
export const deletePackageAPI = createAsyncThunk(
    'album/deletePackageAPI',
    async (data: { package_id: number }, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'DELETE',
                url: `/plans/business-package/?package_id=${data.package_id}`,
            })
            // console.log(response);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });

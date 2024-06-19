import { createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "../AuthorizedApi";
export const getFoldersForAlbum = createAsyncThunk(
    'album/getFoldersForAlbum',
    async (albumId: number, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'GET',
                url: `/project/user/get-folder/?project_id=${albumId}`
            })
            console.log(response);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });
export const lockFolderAPI = createAsyncThunk(
    'album/lockFolderAPI',
    async (data: { project_id: number, folder_id: number, reason?: number, lock_type: string, custom_reason?: string }, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'GET',
                url: `/project/user/lock-folder/`,
                data
            })
            console.log(response);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });
export const unlockFolderAPI = createAsyncThunk(
    'album/unlockFolderAPI',
    async (data: { project_id: number, folder_id: number, reason?: number, lock_type: string }, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'POST',
                url: `/project/user/lock-folder/`,
                data
            })
            console.log(response);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });
export const lockMultipleFoldersAPI = createAsyncThunk(
    'album/lockMultipleFoldersAPI',
    async (data: { folders: number[], project_id: number, reason?: number, custom_reason?: string }, { rejectWithValue }) => {
        try {
            data.folders.forEach(async (folder) => {
                let reqData: { folder_id: number, lock_type: string, project_id: number, reason?: number, custom_reason?: string } = {
                    folder_id: folder,
                    project_id: data.project_id,
                    lock_type: "lock",

                };
                if (data.reason) {
                    reqData.reason = data.reason;
                } else {
                    reqData.custom_reason = data.custom_reason;
                }
                const response = await apiCall({
                    method: 'POST',
                    url: `/project/user/lock-folder/`,
                    data: reqData
                })
            })

            return true;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });

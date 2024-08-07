import { createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "../AuthorizedApi";
import { NewAlbum } from "../../../Data/album.dto";
export const getAllAlbums = createAsyncThunk(
    'album/getAllAlbums',
    async (page: number, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                url: `/project/user/projects/?page=${page}`
            })
            // console.log(response);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });

export const getSearchData = createAsyncThunk(
    'album/getSearchData',
    async (searchInput: string, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'GET',
                url: `/project/search-albums/?search=${searchInput}`
            })
            // console.log(response);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });


export const lockAlbum = createAsyncThunk(
    'album/lockAlbum',
    async (data: { project_id: number, custom_reason?: string, reason?: number, lock_type: string }, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'POST',
                url: `/project/user/lock-project/`,

                data: data
            })
            // console.log(response);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });
export const unlockAlbum = createAsyncThunk(
    'album/unlockAlbum',
    async (albumId: number, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'POST',
                url: `/project/user/unlock-project/?project_id=${albumId}`
            })
            // console.log(response);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });

export const createAlbumAPI = createAsyncThunk(
    'album/createAlbumAPI',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                url: `/project/user/create-project/`,
                data
            })
            // console.log(response);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });
export const updateAlbumAPI = createAsyncThunk(
    'album/updateAlbumAPI',
    async (data: any, { rejectWithValue }) => {
        try {

            const response = await apiCall({
                method: 'PUT',
                url: `/project/user/project-media-view/`,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                data
            })
            // console.log(response);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });

export const getAllRedeemUserAPI = createAsyncThunk(
    'album/getAllRedeemUserAPI',
    async (data: { album_id: number }, { rejectWithValue }) => {
        try {

            const response = await apiCall({
                method: 'GET',
                url: `/project/redeem-user-list/?album_id=${data.album_id}`,
            })
            // console.log(response);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });


export const removeRedeemUserAPI = createAsyncThunk(
    'album/removeRedeemUserAPI',
    async (data: { album_id: number, user_id: number }, { rejectWithValue }) => {
        try {

            const response = await apiCall({
                method: 'DELETE',
                url: `/project/redeem-user-list/?album_id=${data.album_id}&user_id=${data.user_id}`,
            })
            // console.log(response);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });


export const deleteAlbumAPI = createAsyncThunk(
    'album/deleteAlbumAPI',
    async (data: { album_id: number }, { rejectWithValue }) => {
        try {

            const response = await apiCall({
                method: 'DELETE',
                url: `/project/user/delete-project/${data.album_id}/`,
            })
            // console.log(response);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });
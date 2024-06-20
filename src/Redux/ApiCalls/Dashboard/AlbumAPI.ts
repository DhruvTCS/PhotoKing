import { createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "../AuthorizedApi";
import { NewAlbum } from "../../../Data/album.dto";
export const getAllAlbums = createAsyncThunk(
    'album/getAllAlbums',
    async (page: number, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'GET',
                url: `/project/user/projects/?page=${page}`
            })
            console.log(response);
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
            console.log(response);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });


export const lockAlbum = createAsyncThunk(
    'album/lockAlbum',
    async (data: { project_id: number, custom_reason?: string, reason?: number }, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'POST',
                url: `/project/user/lock-project/`,
                data: data
            })
            console.log(response);
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
            console.log(response);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });

export const createAlbumAPI = createAsyncThunk(
    'album/createAlbumAPI',
    async (data: { project: NewAlbum }, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'POST',
                url: `/project/user/create-project/`,
                data
            })
            console.log(response);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });
export const updateAlbumAPI = createAsyncThunk(
    'album/updateAlbumAPI',
    async (data: { project: NewAlbum, albumId: number }, { rejectWithValue }) => {
        try {

            const response = await apiCall({
                method: 'PUT',
                url: `/project/user/project-media-view/`,
                data: { ...data.project, id: data.albumId }
            })
            console.log(response);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });

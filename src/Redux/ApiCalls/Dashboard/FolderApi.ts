import { createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "../AuthorizedApi";
import store from "../../Store";
import { updateTotalProgress } from "../../Slice/Dashboard/AlbumSlice";
export const getFoldersForAlbum = createAsyncThunk(
    'album/getFoldersForAlbum',
    async (albumId: number, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'GET',
                url: `/project/user/get-folder/?project_id=${albumId}&fetch=all`
            })
            // console.log(response);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });
export const createFolderAPI = createAsyncThunk(
    'album/createFolderAPI',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'POST',
                url: `/project/user/project/create-folder/`,
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                data: data
            })
            // console.log(response);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });
export const updateFolderAPI = createAsyncThunk(
    'album/updateFolderAPI',
    async (data: { id: number, project_id: number, folder_name: string, folderImages: File[] }, { rejectWithValue }) => {
        try {

            const files = data.folderImages;
            console.log("images length")
            console.log(data.folderImages.length)
            const chunkSize = 10;
            const fileChunks = [];

            for (let i = 0; i < files.length; i += chunkSize) {
                fileChunks.push(files.slice(i, i + chunkSize));
            }

            let uploadedFilesCount = 0;
            store.dispatch(updateTotalProgress({
                folderId: data.id, folderName: data.folder_name,
                totalProgress: 1
            }));
            for (const chunk of fileChunks) {
                const formData = new FormData();
                formData.append('folder_name', data.folder_name);
                formData.append('folder_id', `${data.id}`);
                formData.append('project_id', `${data.project_id}`);
                chunk.forEach((image, index) => {
                    formData.append(`media[${index}][image]`, image);
                    formData.append(`media[${index}][media_type]`, "1");
                })

                const response = await apiCall({
                    method: 'POST',
                    url: `/project/user/upload-image/`,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    data: formData
                })
                if (response) {


                    uploadedFilesCount += chunk.length;
                    store.dispatch(updateTotalProgress({
                        folderId: data.id, folderName: data.folder_name,
                        totalProgress: (uploadedFilesCount / files.length) * 100
                    }));
                }
            }
            // console.log(response);
            return { folder_id: data.id, project_id: data.project_id };
        } catch (error: any) {
            console.log(error);
            return rejectWithValue({ error: error.response.data, data });
        }
    });

export const getSingleFolderAPI = createAsyncThunk(
    'album/getSingleFolderAPI',
    async (data: { folder_id: number }, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'GET',
                url: `/project/user/folder-detail/?folder_id=${data.folder_id}&media_type=1`,
            })
            let folder = response.data["folder_data"]
            folder.total_images = response.data.results.length;
            folder.images = response.data.results;
            // console.log(folder)
            return folder;
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
            // console.log(response);
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
            // console.log(response);
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
export const deleteFolderImagesAPI = createAsyncThunk(
    'album/deleteFolderImagesAPI',
    async (data: { media_ids: number[], folder_id: number, project_id: number }, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'DELETE',
                url: `/project/user/delete-media/`,
                data: data
            })
            // console.log(response);
            return { folder_id: data.folder_id, project_id: data.project_id };
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });

export const deleteFolderAPI = createAsyncThunk(
    'album/deleteFolderAPI',
    async (data: { folder_id: number }, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'DELETE',
                url: `/project/user/upload-image/?folder_id=${data.folder_id}`,
                data
            })
            // console.log(response);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });
export const hideFolderAPI = createAsyncThunk(
    'album/hideFolderAPI',
    async (data: { project_id: number, folder_id: number, lock_type: string }, { rejectWithValue }) => {
        try {
            const response = await apiCall({
                method: 'POST',
                url: `/project/user/lock-folder/`,
                data
            })
            // console.log(response);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    });


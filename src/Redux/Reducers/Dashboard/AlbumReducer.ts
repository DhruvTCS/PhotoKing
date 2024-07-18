import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { AlbumState } from '../../Slice/Dashboard/AlbumSlice';
import { createAlbumAPI, getAllAlbums, updateAlbumAPI } from '../../ApiCalls/Dashboard/AlbumAPI';
import { Folder } from '../../../Data/album.dto';
import { getFoldersForAlbum } from '../../ApiCalls/Dashboard/FolderApi';
import { showSuccessToast } from '../../../components/atoms/Utlis/Toast';
export const AlbumReducer = (builder: ActionReducerMapBuilder<AlbumState>) => {

    builder.addCase(getAllAlbums.pending, (state) => {
        state.loading = true;
        state.albums = [];
    })
        .addCase(getAllAlbums.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            // console.log(action.payload);
            state.isSearchData = false;
            state.total_projects = action.payload.count;
            state.albums = action.payload.results;
            state.currentPage = action.payload.page;
            state.isUpdate = false
        })
        .addCase(getAllAlbums.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;

            // console.log(action.payload);
            state.error = action.payload;
        }).addCase(createAlbumAPI.pending, (state) => {
            state.loading = true;

        })
        .addCase(createAlbumAPI.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isUpdate = true;

            showSuccessToast('New Album Created.')
        })
        .addCase(createAlbumAPI.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;

            // console.log(action.payload);
            state.error = action.payload;
        }).addCase(updateAlbumAPI.pending, (state) => {
            state.loading = true;

        })
        .addCase(updateAlbumAPI.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            showSuccessToast("Album updated successfully.")
            state.isUpdate = true;

        })
        .addCase(updateAlbumAPI.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;

            // console.log(action.payload);
            state.error = action.payload;
        }).addCase(getFoldersForAlbum.pending, (state) => {

            state.folderLoading = true;
            state.isError = false;
            state.error = {};
            state.isUpdate = false
            // state.albums = [];
        })
        .addCase(getFoldersForAlbum.fulfilled, (state, action: PayloadAction<Folder[]>) => {
            // // console.log(action.payload.length);
            if (action.payload) {

                if (action.payload.length > 0) {
                    state.isFolderChange = false;
                    if (state.currentAlbum) {
                        if (state.currentAlbum.id === action.payload[0].project_id)
                            state.currentAlbum.folders = action.payload;
                    }
                    state.albums.forEach((album) => {
                        if (album.id === action.payload[0].project_id) {
                            album.folders = action.payload;
                        }
                    })
                }
            }
            state.folderLoading = false;
            state.isFolderChange = false;


        })
        .addCase(getFoldersForAlbum.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.folderLoading = false;
            if (action.payload.status === 404 || action.payload.status === 401) {

            } else {
                state.isError = true;

            }
            // console.log(action.payload);
            state.error = action.payload;
        })


};
import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { AlbumState } from '../../Slice/Dashboard/AlbumSlice';
import { createAlbumAPI, getAllAlbums, getSearchData } from '../../ApiCalls/Dashboard/AlbumAPI';
import store from '../../Store'
import { setMember } from '../../Slice/Dashboard/MemberSlice';
import { Albums, Folder } from '../../../Data/album.dto';
import { getFoldersForAlbum } from '../../ApiCalls/Dashboard/FolderApi';
export const AlbumReducer = (builder: ActionReducerMapBuilder<AlbumState>) => {

    builder.addCase(getAllAlbums.pending, (state) => {
        state.loading = true;
        state.albums = [];
    })
        .addCase(getAllAlbums.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            console.log(action.payload);
            state.total_projects = action.payload.count;
            state.albums = action.payload.results;
            state.currentPage = action.payload.page;
            state.isUpdate = false
        })
        .addCase(getAllAlbums.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;

            console.log(action.payload);
            state.error = action.payload;
        }).addCase(createAlbumAPI.pending, (state) => {
            state.loading = true;

        })
        .addCase(createAlbumAPI.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isUpdate = true;
        })
        .addCase(createAlbumAPI.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;

            console.log(action.payload);
            state.error = action.payload;
        }).addCase(getFoldersForAlbum.pending, (state) => {

            state.folderLoading = true;
            state.isError = false;
            state.error = {};
            state.isUpdate = false
            // state.albums = [];
        })
        .addCase(getFoldersForAlbum.fulfilled, (state, action: PayloadAction<Folder[]>) => {
            console.log(action.payload.length);

            if (action.payload.length > 0) {
                state.isFolderChange = false;
                state.albums.forEach((album) => {
                    if (album.id === action.payload[0].project_id) {
                        album.folders = action.payload;
                    }
                })
            }
            state.folderLoading = false;



        })
        .addCase(getFoldersForAlbum.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.folderLoading = false;
            if (action.payload.status === 404) {

            } else {
                state.isError = true;

            }
            console.log(action.payload);
            state.error = action.payload;
        })


};
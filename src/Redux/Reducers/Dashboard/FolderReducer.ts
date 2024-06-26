import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { AlbumState } from '../../Slice/Dashboard/AlbumSlice';
import { createFolderAPI, deleteFolderImagesAPI, getSingleFolderAPI, lockMultipleFoldersAPI, unlockFolderAPI, updateFolderAPI } from '../../ApiCalls/Dashboard/FolderApi';
import { Folder } from '../../../Data/album.dto';
export const FolderReducer = (builder: ActionReducerMapBuilder<AlbumState>) => {

    builder.addCase(lockMultipleFoldersAPI.pending, (state) => {
        state.folderLoading = true;

    })
        .addCase(lockMultipleFoldersAPI.fulfilled, (state, action: PayloadAction<any>) => {
            state.folderLoading = false;


        })
        .addCase(lockMultipleFoldersAPI.rejected, (state, action: PayloadAction<any>) => {
            state.folderLoading = false;
            state.isError = true;

            console.log(action.payload);
            state.error = action.payload;
        }).addCase(unlockFolderAPI.pending, (state) => {
            state.folderLoading = true;

        })
        .addCase(unlockFolderAPI.fulfilled, (state, action: PayloadAction<any>) => {
            state.isFolderChange = true;
            state.folderLoading = false;


        })
        .addCase(unlockFolderAPI.rejected, (state, action: PayloadAction<any>) => {
            state.folderLoading = false;
            state.isError = true;

            console.log(action.payload);
            state.error = action.payload;
        }).addCase(createFolderAPI.pending, (state) => {
            state.folderLoading = true;

        })
        .addCase(createFolderAPI.fulfilled, (state, action: PayloadAction<any>) => {
            state.isFolderChange = true;
            state.folderLoading = false;


        })
        .addCase(createFolderAPI.rejected, (state, action: PayloadAction<any>) => {
            state.folderLoading = false;
            state.isError = true;

            console.log(action.payload);
            state.error = action.payload;
        }).addCase(updateFolderAPI.pending, (state) => {
            state.folderLoading = true;

        })
        .addCase(updateFolderAPI.fulfilled, (state, action: PayloadAction<any>) => {
            state.isFolderChange = true;
            state.folderLoading = false;
            if (state.currentAlbum)
                state.currentAlbum.folders = []


        })
        .addCase(updateFolderAPI.rejected, (state, action: PayloadAction<any>) => {
            state.folderLoading = false;
            state.isError = true;

            console.log(action.payload);
            state.error = action.payload;
        }).addCase(getSingleFolderAPI.pending, (state) => {
            state.folderLoading = true;

        })
        .addCase(getSingleFolderAPI.fulfilled, (state, action: PayloadAction<Folder>) => {
            state.isFolderChange = false;
            state.folderLoading = false;
            console.log(action.payload);
            state.currentFolder = action.payload;


            // state.currentFolder=action.payload.folder_data;
            // state.currentFolder?.total_images=action.payload.total_images;



        })
        .addCase(getSingleFolderAPI.rejected, (state, action: PayloadAction<any>) => {
            state.folderLoading = false;
            console.log(state);
            state.isError = true;

            console.log(action.payload);
            state.error = action.payload;
        })
        .addCase(deleteFolderImagesAPI.pending, (state) => {
            state.folderLoading = true;


        })
        .addCase(deleteFolderImagesAPI.fulfilled, (state, action: PayloadAction<Folder>) => {
            state.isFolderChange = true;
            state.folderLoading = false;
            if (state.currentAlbum)
                state.currentAlbum.folders = []


            // state.currentFolder=action.payload.folder_data;
            // state.currentFolder?.total_images=action.payload.total_images;



        })
        .addCase(deleteFolderImagesAPI.rejected, (state, action: PayloadAction<any>) => {
            state.folderLoading = false;
            state.isError = true;

            console.log(action.payload);
            state.error = action.payload;
        })
};
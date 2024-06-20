import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { AlbumState } from '../../Slice/Dashboard/AlbumSlice';
import { lockMultipleFoldersAPI, unlockFolderAPI } from '../../ApiCalls/Dashboard/FolderApi';
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
        })
};
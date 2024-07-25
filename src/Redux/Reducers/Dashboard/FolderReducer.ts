import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { AlbumState, UpdatedFolderType, removeFromUpdatingFolderProgress } from '../../Slice/Dashboard/AlbumSlice';
import { createFolderAPI, deleteFolderAPI, deleteFolderImagesAPI, getSingleFolderAPI, hideFolderAPI, lockMultipleFoldersAPI, unlockFolderAPI, updateFolderAPI } from '../../ApiCalls/Dashboard/FolderApi';
import { Folder } from '../../../Data/album.dto';
import { showSuccessToast } from '../../../components/atoms/Utlis/Toast';
import store from '../../Store';

export const FolderReducer = (builder: ActionReducerMapBuilder<AlbumState>) => {

    builder.addCase(lockMultipleFoldersAPI.pending, (state) => {
        state.folderLoading = true;
    })
        .addCase(lockMultipleFoldersAPI.fulfilled, (state, action: PayloadAction<any>) => {
            state.folderLoading = false;
            state.isFolderChange = true;
            showSuccessToast("Folders successfully locked.");
        })
        .addCase(lockMultipleFoldersAPI.rejected, (state, action: PayloadAction<any>) => {
            state.folderLoading = false;
            state.isError = true;
            state.error = action.payload;
        })
        .addCase(unlockFolderAPI.pending, (state) => {
            state.folderLoading = true;
        })
        .addCase(unlockFolderAPI.fulfilled, (state, action: PayloadAction<any>) => {
            state.isFolderChange = true;
            state.folderLoading = false;
            showSuccessToast("Folder successfully unlocked.");
        })
        .addCase(unlockFolderAPI.rejected, (state, action: PayloadAction<any>) => {
            state.folderLoading = false;
            state.isError = true;
            state.error = action.payload;
        })
        .addCase(createFolderAPI.pending, (state) => {
            state.folderLoading = true;
        })
        .addCase(createFolderAPI.fulfilled, (state, action: PayloadAction<any>) => {
            state.isFolderChange = true;
            state.folderLoading = false;
        })
        .addCase(createFolderAPI.rejected, (state, action: PayloadAction<any>) => {
            state.folderLoading = false;
            state.isError = true;
            state.error = action.payload;
        })
        .addCase(updateFolderAPI.pending, (state) => {

        })
        .addCase(updateFolderAPI.fulfilled, (state, action: PayloadAction<{ folder_id: number, project_id: number }>) => {
            state.updatedFolderList.push(action.payload);
            state.uploadFolderProgress = state.uploadFolderProgress.filter(folder => folder.folderId !== action.payload.folder_id)
            showSuccessToast("Folders updated successfully.");
        })
        .addCase(updateFolderAPI.rejected, (state, action: PayloadAction<any>) => {
            state.folderLoading = false;
            state.isError = true;
            state.error = action.payload;
        })
        .addCase(getSingleFolderAPI.pending, (state) => {
            state.folderLoading = true;
        })
        .addCase(getSingleFolderAPI.fulfilled, (state, action: PayloadAction<Folder>) => {
            state.isFolderChange = false;
            state.folderLoading = false;
            state.currentFolder = action.payload;
        })
        .addCase(getSingleFolderAPI.rejected, (state, action: PayloadAction<any>) => {
            state.folderLoading = false;
            state.isError = true;
            state.error = action.payload;
        })
        .addCase(deleteFolderImagesAPI.pending, (state) => {
            state.folderLoading = true;
        })
        .addCase(deleteFolderImagesAPI.fulfilled, (state, action: PayloadAction<{ folder_id: number, project_id: number }>) => {
            state.updatedFolderList.push(action.payload)
            state.folderLoading = false;
            showSuccessToast("Image deleted successfully.");

        })
        .addCase(deleteFolderImagesAPI.rejected, (state, action: PayloadAction<any>) => {
            state.folderLoading = false;
            state.isError = true;
            state.error = action.payload;
        })
        .addCase(deleteFolderAPI.pending, (state) => {
            state.folderLoading = true;
        })
        .addCase(deleteFolderAPI.fulfilled, (state, action: PayloadAction<Folder>) => {
            state.folderLoading = false;
            showSuccessToast("Folder Deleted.");
            state.isFolderChange = true;
            if (state.currentAlbum)
                state.currentAlbum.folders = [];
        })
        .addCase(deleteFolderAPI.rejected, (state, action: PayloadAction<any>) => {
            state.folderLoading = false;
            state.isError = true;
            state.error = action.payload;
        })
        .addCase(hideFolderAPI.pending, (state) => {
            state.folderLoading = true;
        })
        .addCase(hideFolderAPI.fulfilled, (state, action: PayloadAction<Folder>) => {
            state.isFolderChange = true;
            state.folderLoading = false;
            showSuccessToast("Folder's status updated successfully.");
            if (state.currentAlbum)
                state.currentAlbum.folders = [];
        })
        .addCase(hideFolderAPI.rejected, (state, action: PayloadAction<any>) => {
            state.folderLoading = false;
            state.isError = true;
            state.error = action.payload;
        });
};

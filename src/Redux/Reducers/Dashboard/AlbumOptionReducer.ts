import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { AlbumState } from '../../Slice/Dashboard/AlbumSlice';
import { getAllRedeemUserAPI, lockAlbum, removeRedeemUserAPI, unlockAlbum } from '../../ApiCalls/Dashboard/AlbumAPI';
import { User } from '../../../Data/user.dto';
export const AlbumOptionReducer = (builder: ActionReducerMapBuilder<AlbumState>) => {

    builder.addCase(lockAlbum.pending, (state) => {
        state.loading = true;
    })
        .addCase(lockAlbum.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isUpdate = true;

        })
        .addCase(lockAlbum.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;
            state.isUpdate = false
            // console.log(action.payload);
            state.error = action.payload;
        }).addCase(unlockAlbum.pending, (state) => {
            state.loading = true;
            state.folderLoading = true;
        })
        .addCase(unlockAlbum.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isUpdate = true;
            state.folderLoading = false;
        })
        .addCase(unlockAlbum.rejected, (state, action: PayloadAction<any>) => {
            state.folderLoading = false;
            state.loading = false;
            state.isError = true;
            state.isUpdate = false
            // console.log(action.payload);
            state.error = action.payload;
        }).addCase(getAllRedeemUserAPI.pending, (state) => {
            state.loading = true;
            state.isError = false;
        })
        .addCase(getAllRedeemUserAPI.fulfilled, (state, action: PayloadAction<User[]>) => {
            state.loading = false;
            state.redeemUsers = action.payload;
            state.isRedeemUserUpdates = false;

        })
        .addCase(getAllRedeemUserAPI.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;
            // console.log(action.payload);
            state.error = action.payload;
        }).addCase(removeRedeemUserAPI.pending, (state) => {
            state.loading = true;
            state.isError = false;
        })
        .addCase(removeRedeemUserAPI.fulfilled, (state, action: PayloadAction<User[]>) => {
            state.loading = false;
            state.isRedeemUserUpdates = true;;
            // state.redeemUsers = action.payload;

        })
        .addCase(removeRedeemUserAPI.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;
            // console.log(action.payload);
            state.error = action.payload;
        })


};
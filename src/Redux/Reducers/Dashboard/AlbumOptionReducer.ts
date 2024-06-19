import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { AlbumState } from '../../Slice/Dashboard/AlbumSlice';
import { lockAlbum, unlockAlbum } from '../../ApiCalls/Dashboard/AlbumAPI';
import store from '../../Store'
import { setMember } from '../../Slice/Dashboard/MemberSlice';
import { Albums, Folder } from '../../../Data/album.dto';
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
            console.log(action.payload);
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
            console.log(action.payload);
            state.error = action.payload;
        })


};
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Error } from '../../../Data/error.dto';
import { AlbumReducer } from '../../Reducers/Dashboard/AlbumReducer';
import { Albums, Folder } from '../../../Data/album.dto';
import { AlbumOptionReducer } from '../../Reducers/Dashboard/AlbumOptionReducer';
import { FolderReducer } from '../../Reducers/Dashboard/FolderReducer';
import { User } from '../../../Data/user.dto';

export interface FolderState {


    error: Error;
    isError: boolean;
    loading: boolean;
    isUpdate: boolean;
    currentFolder?: Folder;
    isFolderChange: boolean;
    currentFolders: Folder[];
    success: boolean;

}

const initialState: FolderState = {

    error: {},
    isError: false,

    loading: false,
    isUpdate: true,
    isFolderChange: true,
    success: false,
    currentFolders: [],
}



const folderSlice = createSlice({
    name: 'album',
    initialState,
    reducers: {
        setError(state, action: PayloadAction<any>) {
            state.isError = true;
            state.error = action.payload;
            state.loading = false;

        },
        clearError(state) {
            state.isError = false;
            state.error = {};
            state.loading = false;
        },

        setIsFolderChanged(state, action: PayloadAction<boolean>) {
            state.isFolderChange = action.payload;
        },

        removeCurrentFolder(state) {
            delete state.currentFolder;
        },


        setCurrentFolder(state, action: PayloadAction<Folder>) {
            state.currentFolder = action.payload;
        },


    },
    extraReducers: (builder) => {
        // FolderReducer(builder);
    },
});

export const { setError, clearError, setCurrentFolder, removeCurrentFolder } = folderSlice.actions;


export default folderSlice.reducer;

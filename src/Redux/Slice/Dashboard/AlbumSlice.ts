import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Error } from '../../../Data/error.dto';
import { AlbumReducer } from '../../Reducers/Dashboard/AlbumReducer';
import { Albums, Folder } from '../../../Data/album.dto';
import { AlbumOptionReducer } from '../../Reducers/Dashboard/AlbumOptionReducer';
import { FolderReducer } from '../../Reducers/Dashboard/FolderReducer';

export interface AlbumState {
    loading: boolean;
    total_projects: number;
    currentPage: number;
    albums: Albums[] | [],
    error: Error;
    isError: boolean;
    folderLoading: boolean;
    isUpdate: boolean;
    currentAlbum?: Albums;
    currentFolder?: Folder;
    isFolderChange: boolean;
    success: boolean;
    isSearchData: boolean;
}

const initialState: AlbumState = {
    albums: [],
    loading: false,
    error: {},
    isError: false,
    total_projects: 0,
    currentPage: 1,
    folderLoading: false,
    isUpdate: true,
    isFolderChange: false,
    success: false,
    isSearchData: false,
}



const albumSlice = createSlice({
    name: 'album',
    initialState,
    reducers: {
        setAlbumLoading(state) {
            state.loading = true;
        },
        setAlbums(state, action: PayloadAction<Albums[]>) {
            state.albums = action.payload;
            state.loading = false;
        },
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
        setCurrentAlbum(state, action: PayloadAction<Albums>) {
            state.currentAlbum = action.payload;
        },
        setIsFolderChanged(state, action: PayloadAction<boolean>) {
            state.isFolderChange = action.payload;
        },
        clearFlagAlbums(state) {
            state.success = false;
            state.isError = false;
            state.isFolderChange = false;
            state.isSearchData = false;;

        },
        setSearchDataFlag(state, action: PayloadAction<boolean>) {
            state.isSearchData = action.payload
        },
        setCurrentFolder(state, action: PayloadAction<Folder>) {
            state.currentFolder = action.payload;
        }

    },
    extraReducers: (builder) => {
        AlbumReducer(builder);
        AlbumOptionReducer(builder);
        FolderReducer(builder);
    },
});

export const { setAlbumLoading, setAlbums, setError, clearError, setCurrentAlbum, clearFlagAlbums, setSearchDataFlag, setCurrentFolder } = albumSlice.actions;


export default albumSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Error } from '../../../Data/error.dto';
import { AlbumReducer } from '../../Reducers/Dashboard/AlbumReducer';
import { Albums, Folder } from '../../../Data/album.dto';
import { AlbumOptionReducer } from '../../Reducers/Dashboard/AlbumOptionReducer';
import { FolderReducer } from '../../Reducers/Dashboard/FolderReducer';
import { User } from '../../../Data/user.dto';

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
    redeemUsers: User[]
    success: boolean;
    isRedeemUserUpdates: boolean;
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
    isFolderChange: true,
    success: false,
    isSearchData: false,
    isRedeemUserUpdates: false,
    redeemUsers: [],
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
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        removeCurrentFolder(state) {
            delete state.currentFolder;
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
        },
        setIsRedeemUserUpdates(state, action: PayloadAction<boolean>) {
            state.isRedeemUserUpdates = action.payload;
        }

    },
    extraReducers: (builder) => {
        AlbumReducer(builder);
        AlbumOptionReducer(builder);
        FolderReducer(builder);
    },
});

export const { setAlbumLoading, setAlbums, setError, clearError, setCurrentPage, setCurrentAlbum, clearFlagAlbums, setSearchDataFlag, setIsRedeemUserUpdates, setCurrentFolder, removeCurrentFolder } = albumSlice.actions;


export default albumSlice.reducer;

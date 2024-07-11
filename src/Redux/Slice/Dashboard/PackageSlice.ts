import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Error } from '../../../Data/error.dto';
import { Package } from '../../../Data/package.dto';
import { PackageReducer } from '../../Reducers/Dashboard/PackageReducer';
export interface PackageState {
    loading: boolean;
    packages: Package[];
    error: Error;
    isError: boolean;
    success: boolean;
    isPackageUpdate: boolean;
    currentPackage?: Package;
}

const initialState: PackageState = {
    packages: [],
    isPackageUpdate: true,
    loading: false,
    error: {},
    isError: false,
    success: false,

}



const packageSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        clearError(state) {
            state.error = {};
            state.isError = false;
        },
        setCurrentPackage(state, action: PayloadAction<Package>) {
            state.currentPackage = action.payload;
        },
        clearCurrentPackage(state) {
            delete state.currentPackage;
        }

    },
    extraReducers: (builder) => {
        // EventReducer(builder);
        PackageReducer(builder);
    },
});

export const { clearError, setCurrentPackage, clearCurrentPackage } = packageSlice.actions;


export default packageSlice.reducer;

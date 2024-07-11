import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { showSuccessToast } from '../../../components/atoms/Utlis/Toast';
import { createPackageAPI, deletePackageAPI, getAllPackageAPI, updatePackageAPI } from '../../ApiCalls/Dashboard/PackageAPI';
import { PackageState } from '../../Slice/Dashboard/PackageSlice';
import { Package } from '../../../Data/package.dto';


export const PackageReducer = (builder: ActionReducerMapBuilder<PackageState>) => {
    builder.addCase(createPackageAPI.pending, (state) => {
        state.loading = true;
        state.isError = false;
        state.success = false;
        state.isPackageUpdate = false;
        state.error = {};
    })
        .addCase(createPackageAPI.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = false;
            state.success = true;
            state.isPackageUpdate = true;
            showSuccessToast("Package created successfully.")
            // state.Events = action.payload;
        })
        .addCase(createPackageAPI.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;

            console.log(action.payload);
            state.error = action.payload;
        }).addCase(getAllPackageAPI.pending, (state) => {
            state.loading = true;
            state.isError = false;
            state.success = false;
            state.error = {};
        })
        .addCase(getAllPackageAPI.fulfilled, (state, action: PayloadAction<Package[]>) => {
            state.loading = false;
            state.isError = false;
            state.success = true;
            state.packages = [];
            if (action.payload && action.payload.length > 0)
                state.packages = action.payload;

            state.isPackageUpdate = false;
        })
        .addCase(getAllPackageAPI.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;

            console.log(action.payload);
            state.error = action.payload;
        }).addCase(updatePackageAPI.pending, (state) => {
            state.loading = true;
            state.isError = false;
            state.success = false;
            console.log("called from update")
            state.error = {};
        })
        .addCase(updatePackageAPI.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = false;
            state.success = true;
            state.isPackageUpdate = true;
            showSuccessToast("Package updated successfully.")
        })
        .addCase(updatePackageAPI.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;

            console.log(action.payload);
            state.error = action.payload;
        }).addCase(deletePackageAPI.pending, (state) => {
            state.loading = true;
            state.isError = false;
            state.success = false;
            state.error = {};
        })
        .addCase(deletePackageAPI.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = false;
            state.success = true;
            state.isPackageUpdate = true;
            showSuccessToast("Package deleted successfully.")
        })
        .addCase(deletePackageAPI.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;

            console.log(action.payload);
            state.error = action.payload;
        })
};

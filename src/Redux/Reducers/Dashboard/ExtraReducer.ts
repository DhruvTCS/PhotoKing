import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { showSuccessToast } from '../../../components/atoms/Utlis/Toast';
import { ExtraState } from '../../Slice/Dashboard/ExtraSlice';
import { getEventFormTokenAPI, submitEventFormAPI } from '../../ApiCalls/Dashboard/EventAPI';

export const ExtraReducer = (builder: ActionReducerMapBuilder<ExtraState>) => {
    builder.addCase(getEventFormTokenAPI.pending, (state) => {
        state.loading = true;
        state.isError = false;
        state.success = false;
        state.error = {};
    })
        .addCase(getEventFormTokenAPI.fulfilled, (state, action: PayloadAction<string>) => {
            state.loading = false;
            // console.log("changing token", action.payload)
            state.eventFromToken = action.payload;

            // state.Events = action.payload;
        })
        .addCase(getEventFormTokenAPI.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;

            console.log(action.payload);
            state.error = action.payload;
        }).addCase(submitEventFormAPI.pending, (state) => {
            state.loading = true;
            state.isError = false;
            state.success = false;
            state.error = {};
        })
        .addCase(submitEventFormAPI.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = false;
            state.success = true;
            // state.eventFromToken = action.payload;

            // state.Events = action.payload;
        })
        .addCase(submitEventFormAPI.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;

            console.log(action.payload);
            state.error = action.payload;
        })
};
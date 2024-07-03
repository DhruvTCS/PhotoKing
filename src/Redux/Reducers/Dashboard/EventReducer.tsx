import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { subscriptionsPlansAPI } from '../../ApiCalls/Dashboard/SubscriptionAPI';
import { EventState } from '../../Slice/Dashboard/EventSlice';
import { createEventAPI, getAllEventsAPI } from '../../ApiCalls/Dashboard/EventAPI';
import { Event } from '../../../Data/event.dto';

export const EventReducer = (builder: ActionReducerMapBuilder<EventState>) => {
    builder.addCase(getAllEventsAPI.pending, (state) => {
        state.loading = true;
        state.isError = false;
        state.success = false;
        state.error = {};
    })
        .addCase(getAllEventsAPI.fulfilled, (state, action: PayloadAction<Event[]>) => {
            state.loading = false;
            state.isError = false;
            state.success = true;
            state.isEventUpdate = false;
            state.Events = action.payload;
        })
        .addCase(getAllEventsAPI.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;

            console.log(action.payload);
            state.error = action.payload;
        }).addCase(createEventAPI.pending, (state) => {
            state.loading = true;
            state.isError = false;
            state.success = false;
            state.error = {};
        })
        .addCase(createEventAPI.fulfilled, (state, action: PayloadAction<Event[]>) => {
            state.loading = false;
            state.isError = false;
            state.success = true;
            state.isEventUpdate = true;
            state.Events = action.payload;
        })
        .addCase(createEventAPI.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;

            console.log(action.payload);
            state.error = action.payload;
        })
};

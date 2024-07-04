import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { subscriptionsPlansAPI } from '../../ApiCalls/Dashboard/SubscriptionAPI';
import { EventState } from '../../Slice/Dashboard/EventSlice';
import { createEventAPI, deleteEventAPI, getAllEventsAPI } from '../../ApiCalls/Dashboard/EventAPI';
import { BackendEvent, EventType } from '../../../Data/event.dto';

const convertToDateTime = (date: string, time: string): string => {
    const [hours, minutes, seconds] = time.split(':').map(Number)
    const dateTime = new Date(date)
    // console.log(dateTime, new Date(2024, 6, 2, 15, 0, 0))
    dateTime.setHours(hours, minutes, seconds, 0)
    return dateTime.toString();
}
export const EventReducer = (builder: ActionReducerMapBuilder<EventState>) => {
    builder.addCase(getAllEventsAPI.pending, (state) => {
        state.loading = true;
        state.isError = false;
        state.success = false;
        state.error = {};
    })
        .addCase(getAllEventsAPI.fulfilled, (state, action: PayloadAction<BackendEvent[]>) => {
            state.loading = false;
            state.isError = false;
            state.success = true;
            state.isEventUpdate = false;
            state.Events = [];
            action.payload.forEach((event) => {
                state.Events.push({
                    id: event.id,
                    title: event.title,
                    location: event.location,
                    members: event.members,
                    start: convertToDateTime(event.startDate, event.startTime),
                    end: convertToDateTime(event.endDate, event.endTime),

                })
            })
            // state.Events = action.payload;
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
        .addCase(createEventAPI.fulfilled, (state, action: PayloadAction<EventType[]>) => {
            state.loading = false;
            state.isError = false;
            state.success = true;
            state.isEventUpdate = true;
            // state.Events = action.payload;
        }).addCase(createEventAPI.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;

            console.log(action.payload);
            state.error = action.payload;
        }).addCase(deleteEventAPI.pending, (state) => {
            state.loading = true;
            state.isError = false;
            state.success = false;
            state.error = {};
        })
        .addCase(deleteEventAPI.fulfilled, (state, action: PayloadAction<EventType[]>) => {
            state.loading = false;
            state.isError = false;
            state.success = true;
            state.isEventUpdate = true;
            // state.Events = action.payload;
        })
        .addCase(deleteEventAPI.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;

            console.log(action.payload);
            state.error = action.payload;
        })
};

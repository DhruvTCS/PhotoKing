import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { subscriptionsPlansAPI } from '../../ApiCalls/Dashboard/SubscriptionAPI';
import { EventState } from '../../Slice/Dashboard/EventSlice';
import { createEventAPI, deleteEventAPI, getAllEventsAPI, getUserCreatedEventsAPI, updateEventAPI } from '../../ApiCalls/Dashboard/EventAPI';
import { BackendEvent, EnteredSubEventType, EventType, UserCreatedEvents } from '../../../Data/event.dto';
import { showSuccessToast } from '../../../components/atoms/Utlis/Toast';

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
                    start: convertToDateTime(event.start_date, event.start_time),
                    end: convertToDateTime(event.end_date, event.end_time),

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
            showSuccessToast("Event Created Success")
            // state.Events = action.payload;
        }).addCase(createEventAPI.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;

            console.log(action.payload);
            state.error = action.payload;
        }).addCase(updateEventAPI.pending, (state) => {
            state.loading = true;
            state.isError = false;
            state.success = false;
            state.error = {};
        })
        .addCase(updateEventAPI.fulfilled, (state, action: PayloadAction<EventType[]>) => {
            state.loading = false;
            state.isError = false;
            state.success = true;
            state.isEventUpdate = true;
            showSuccessToast("Event Updated Success")
            // state.Events = action.payload;
        }).addCase(updateEventAPI.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;

            console.log(action.payload);
            state.error = action.payload;
        })
        .addCase(deleteEventAPI.pending, (state) => {
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
        .addCase(getUserCreatedEventsAPI.pending, (state) => {
            state.loading = true;
            state.isError = false;
            state.success = false;
            // state.error = {};
        })
        .addCase(getUserCreatedEventsAPI.fulfilled, (state, action: PayloadAction<{
            event: {
                id: string,
                customer_name: string,
                phone_number: string,
                token: string,
                event_name: string,
            },
            sub_events: EnteredSubEventType[]
        }[]>) => {
            state.loading = false;
            console.log(action.payload)
            console.log(action.payload)
            if (action.payload === null) state.userCreatedEvents = [];
            else {
                state.userCreatedEvents = [];
                action.payload.forEach(payload => {
                    state.userCreatedEvents?.push({
                        id: parseInt(payload.event.id),
                        customer_name: payload.event.customer_name,
                        phone_number: payload.event.phone_number,
                        token: payload.event.token,
                        event_name: payload.event.event_name,
                        sub_events: payload.sub_events,
                    })
                })
                console.log(state.userCreatedEvents)
            }

            // state.Events = action.payload;
        })
        .addCase(getUserCreatedEventsAPI.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;

            console.log(action.payload);
            state.error = action.payload;
        })
};

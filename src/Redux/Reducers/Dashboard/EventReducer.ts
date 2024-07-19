import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { subscriptionsPlansAPI } from '../../ApiCalls/Dashboard/SubscriptionAPI';
import { EventState } from '../../Slice/Dashboard/EventSlice';
import { createEventAPI, deleteEventAPI, deleteUserCreatedEventAPI, getAllEventsAPI, getUserCreatedEventsAPI, updateEventAPI } from '../../ApiCalls/Dashboard/EventAPI';
import { BackendEvent, CalendarSubEvents, EnteredSubEventType, EventType, UserCreatedEvents } from '../../../Data/event.dto';
import { showSuccessToast } from '../../../components/atoms/Utlis/Toast';
const findEventTimeRange = (subEvents: CalendarSubEvents[]): { startTime: string, endTime: string } => {
    if (subEvents.length === 0) {
        return { startTime: '', endTime: '' };
    }

    // Initialize with the first sub-event
    let startTime = new Date(subEvents[0].start_date + 'T' + subEvents[0].start_time);
    let endTime = new Date(subEvents[0].end_date + 'T' + subEvents[0].end_time);

    subEvents.forEach(subEvent => {
        const startDateTime = new Date(subEvent.start_date + 'T' + subEvent.start_time);
        const endDateTime = new Date(subEvent.end_date + 'T' + subEvent.end_time);

        if (startDateTime < startTime) {
            startTime = startDateTime;
        }

        if (endDateTime > endTime) {
            endTime = endDateTime;
        }
    });

    // Format the resulting Date objects to ISO 8601 string format
    const formattedStartTime = startTime.toString().slice(0, -1);
    const formattedEndTime = endTime.toString().slice(0, -1);
    // console.log({ startTime: formattedStartTime, endTime: formattedEndTime })
    return { startTime: formattedStartTime, endTime: formattedEndTime };
};

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
            action.payload.forEach(mainEvent => {
                let dateRange = findEventTimeRange(mainEvent.sub_events)
                state.Events.push({
                    id: mainEvent.id,
                    title: mainEvent.title,
                    members: mainEvent.members,
                    sub_events: mainEvent.sub_events,
                    start: dateRange.startTime,
                    end: dateRange.endTime
                })
            })
            // state.Events = action.payload;
        })
        .addCase(getAllEventsAPI.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;

            // console.log(action.payload);
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

            // console.log(action.payload);
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

            // console.log(action.payload);
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
            showSuccessToast('Event Deleted.')
            // state.Events = action.payload;
        })
        .addCase(deleteEventAPI.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;

            // console.log(action.payload);
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
            // console.log(action.payload)
            // console.log(action.payload)
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
                // console.log(state.userCreatedEvents)
            }

            // state.Events = action.payload;
        })
        .addCase(getUserCreatedEventsAPI.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;

            // console.log(action.payload);
            state.error = action.payload;
        })
        .addCase(deleteUserCreatedEventAPI.pending, (state) => {
            state.loading = true;
            state.isError = false;
            state.success = false;
            // state.error = {};
        })
        .addCase(deleteUserCreatedEventAPI.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            delete state.userCreatedEvents;
            showSuccessToast("Event deleted successfully.")
            // state.Events = action.payload;
        })
        .addCase(deleteUserCreatedEventAPI.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;

            // console.log(action.payload);
            state.error = action.payload;
        })
};

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Error } from '../../../Data/error.dto';

import { EventType, UserCreatedEvents } from '../../../Data/event.dto';
import { EventReducer } from '../../Reducers/Dashboard/EventReducer';
export interface EventState {
    loading: boolean;
    Events: EventType[];
    error: Error;
    isError: boolean;
    success: boolean;
    isEventUpdate: boolean;
    currentEvent?: EventType;
    userCreatedEvents?: UserCreatedEvents[];
    currentCreatedEvent?: UserCreatedEvents;
}

const initialState: EventState = {
    Events: [],
    isEventUpdate: true,
    loading: false,
    error: {},
    isError: false,
    success: false,




}



const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        clearError(state) {
            state.error = {};
            state.isError = false;
        },
        setCurrentEvent(state, action: PayloadAction<EventType>) {
            state.currentEvent = action.payload;
        },
        clearCurrentEvent(state) {
            delete state.currentEvent;
        },
        setUserCreatedEvent(state, action: PayloadAction<UserCreatedEvents>) {
            state.currentCreatedEvent = action.payload;
        },
        removeUserCreatedEvent(state) {
            delete state.currentCreatedEvent;
        }

    },
    extraReducers: (builder) => {
        EventReducer(builder);
    },
});

export const { clearError, setCurrentEvent, clearCurrentEvent, setUserCreatedEvent, removeUserCreatedEvent } = eventSlice.actions;


export default eventSlice.reducer;

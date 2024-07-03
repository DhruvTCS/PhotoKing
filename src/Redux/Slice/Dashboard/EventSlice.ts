import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Error } from '../../../Data/error.dto';

import { EventType } from '../../../Data/event.dto';
import { EventReducer } from '../../Reducers/Dashboard/EventReducer';
export interface EventState {
    loading: boolean;
    Events: EventType[];
    error: Error;
    isError: boolean;
    success: boolean;
    isEventUpdate: boolean;
    currentEvent?: EventType;
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
        }

    },
    extraReducers: (builder) => {
        EventReducer(builder);
    },
});

export const { clearError, setCurrentEvent, clearCurrentEvent } = eventSlice.actions;


export default eventSlice.reducer;

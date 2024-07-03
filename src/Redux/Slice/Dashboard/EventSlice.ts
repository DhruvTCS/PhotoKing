import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Error } from '../../../Data/error.dto';

import { Event } from '../../../Data/event.dto';
import { EventReducer } from '../../Reducers/Dashboard/EventReducer';
export interface EventState {
    loading: boolean;
    Events: Event[];
    error: Error;
    isError: boolean;
    success: boolean;
    isEventUpdate: boolean;
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

    },
    extraReducers: (builder) => {
        EventReducer(builder);
    },
});

export const { clearError } = eventSlice.actions;


export default eventSlice.reducer;

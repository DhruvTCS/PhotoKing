import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Error } from '../../Data/error.dto';

export interface ErrorState {
    error: Error;
    isError: boolean;
    success: boolean;
}

const initialState: ErrorState = {

    error: {},
    isError: false,
    success: false,

}



const errorSlice = createSlice({
    name: 'member',
    initialState,
    reducers: {
        setGlobalError(state, action: PayloadAction<Error>) {
            state.error = action.payload;
            state.isError = true;
            state.success = false;

        },
        clearGlobalError(state) {
            state.error = {};
            state.isError = false;
            state.success = true;
        }
    }

});

export const { setGlobalError, clearGlobalError } = errorSlice.actions;


export default errorSlice.reducer;

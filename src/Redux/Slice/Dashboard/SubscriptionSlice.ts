import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Error } from '../../../Data/error.dto';
import { SubscriptionReducer } from '../../Reducers/Dashboard/SubscriptionReducer';
import { SubscriptionType } from '../../../Data/subscription.dto';
export interface SubscriptionStates {
    loading: boolean;
    subscriptions: SubscriptionType[] | null;
    error: Error;
    isError: boolean;
    success: boolean;
}

// id": "19",
//             "country_code": "+91",
//             "phone_number": "8849827190",
//             "profile_image": "https://res.cloudinary.com/dcuwbzynm/image/upload/v1718603255/gthlwzqyka7kcbsczocy.png",
//             "name": "Pinkesh Patel",
//             "job_type": "Camera Man",
//             "user_id": null
const initialState: SubscriptionStates = {
    subscriptions: null,
    loading: false,
    error: {},
    isError: false,
    success: false,

}



const subscriptionSlice = createSlice({
    name: 'subscription',
    initialState,
    reducers: {
        clearError(state) {
            state.error = {};
            state.isError = false;
        }
    },
    extraReducers: (builder) => {
        SubscriptionReducer(builder)
    },
});

export const { clearError } = subscriptionSlice.actions;


export default subscriptionSlice.reducer;

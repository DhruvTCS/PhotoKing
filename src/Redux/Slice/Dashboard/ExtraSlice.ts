import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Error } from '../../../Data/error.dto';
import { SubscriptionReducer } from '../../Reducers/Dashboard/SubscriptionReducer';
import { SubscriptionType } from '../../../Data/subscription.dto';
import { Notification } from '../../../Data/user.dto';
import { NotificationReducer } from '../../Reducers/Dashboard/NotificationReducer';
export interface ExtraState {
    loading: boolean;
    subscriptions: SubscriptionType[] | null;
    error: Error;
    isError: boolean;
    success: boolean;
    fcm_token?: string;
    notifications: Notification[];
}

// id": "19",
//             "country_code": "+91",
//             "phone_number": "8849827190",
//             "profile_image": "https://res.cloudinary.com/dcuwbzynm/image/upload/v1718603255/gthlwzqyka7kcbsczocy.png",
//             "name": "Pinkesh Patel",
//             "job_type": "Camera Man",
//             "user_id": null
const initialState: ExtraState = {
    subscriptions: null,
    loading: false,
    error: {},
    isError: false,
    success: false,
    notifications: [],


}



const extraSlice = createSlice({
    name: 'extra',
    initialState,
    reducers: {
        clearError(state) {
            state.error = {};
            state.isError = false;
        },
        setFCM(state, action: PayloadAction<string>) {
            state.fcm_token = action.payload;
        }
    },
    extraReducers: (builder) => {
        SubscriptionReducer(builder)
        NotificationReducer(builder)
    },
});

export const { clearError, setFCM } = extraSlice.actions;


export default extraSlice.reducer;

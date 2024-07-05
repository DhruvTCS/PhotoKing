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
    isNotificationUpdated: boolean;
    totalNotifications: number;
}

const initialState: ExtraState = {
    subscriptions: null,
    loading: false,
    error: {},
    isError: false,
    success: false,
    notifications: [],
    isNotificationUpdated: true,
    totalNotifications: 0

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
        },
        updateNotification(state, action: PayloadAction<{ update: boolean, count: number }>) {
            state.isNotificationUpdated = action.payload.update;
            state.totalNotifications += action.payload.count;
        }
    },
    extraReducers: (builder) => {
        SubscriptionReducer(builder)
        NotificationReducer(builder)
    },
});

export const { clearError, setFCM, updateNotification } = extraSlice.actions;


export default extraSlice.reducer;

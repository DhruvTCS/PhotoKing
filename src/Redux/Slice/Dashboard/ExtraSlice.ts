import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Error } from '../../../Data/error.dto';
import { SubscriptionReducer } from '../../Reducers/Dashboard/SubscriptionReducer';
import { SubscriptionType } from '../../../Data/subscription.dto';
import { Notification } from '../../../Data/user.dto';
import { NotificationReducer } from '../../Reducers/Dashboard/NotificationReducer';
import { ChnageNumberReducer } from '../../Reducers/Dashboard/ChangePhoneNumberReducer';
import { ExtraReducer } from '../../Reducers/Dashboard/ExtraReducer';
export interface ExtraState {
    loading: boolean;
    subscriptions: SubscriptionType[] | null;
    error: Error;
    isError: boolean;
    success: boolean;
    fcm_token?: string;
    notifications: Notification[];
    allNotiifications: Notification[];
    isNotificationUpdated: boolean;
    totalNotifications: number;
    changePhonenumberOrderId?: string;
    isPhoneNumberChange?: boolean;
    eventFromToken?: string;
}

const initialState: ExtraState = {
    subscriptions: null,
    loading: false,
    error: {},
    isError: false,
    success: false,
    notifications: [],
    allNotiifications: [],
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
        },
        removeOrderId(state) {
            delete state.changePhonenumberOrderId;
            state.isPhoneNumberChange = false;
        },
        removeCurrentFormToken(state) {
            delete state.eventFromToken;
        }
    },
    extraReducers: (builder) => {
        SubscriptionReducer(builder)
        NotificationReducer(builder)
        ChnageNumberReducer(builder)
        ExtraReducer(builder)
    },
});

export const { clearError, setFCM, updateNotification, removeOrderId, removeCurrentFormToken } = extraSlice.actions;


export default extraSlice.reducer;

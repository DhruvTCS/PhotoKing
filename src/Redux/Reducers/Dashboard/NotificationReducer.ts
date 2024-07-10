import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { MemberState } from '../../Slice/Dashboard/MemberSlice';
import { subscriptionsPlansAPI } from '../../ApiCalls/Dashboard/SubscriptionAPI';
import { ExtraState } from '../../Slice/Dashboard/ExtraSlice';
import { getAllNotificationAPI, seenNotification } from '../../ApiCalls/Dashboard/NotificationAPI';
import { Notification } from '../../../Data/user.dto';
export const NotificationReducer = (builder: ActionReducerMapBuilder<ExtraState>) => {
    builder.addCase(getAllNotificationAPI.pending, (state) => {
        state.loading = true;
        state.isError = false;
        state.error = {};
    })
        .addCase(getAllNotificationAPI.fulfilled, (state, action: PayloadAction<Notification[]>) => {
            state.loading = false;
            state.isNotificationUpdated = false;
            state.notifications = [];
            state.allNotiifications = action.payload;
            state.isError = false;

            action.payload.forEach(notification => {
                if (!notification.is_seen) {
                    state.notifications.push(notification);
                }

            });
            state.totalNotifications = state.notifications.length;
        })
        .addCase(getAllNotificationAPI.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;

            console.log(action.payload);
            state.error = action.payload;
        }).addCase(seenNotification.pending, (state) => {
            state.loading = true;
            state.isError = false;
            state.error = {};
        })
        .addCase(seenNotification.fulfilled, (state, action: PayloadAction<Notification[]>) => {
            state.loading = false;
            state.isError = false;
            state.isNotificationUpdated = false;
            // state.notifications = action.payload;
        })
        .addCase(seenNotification.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;

            console.log(action.payload);
            state.error = action.payload;
        })
};

// 
// "id": "18",
// "country_code": "+91",
// "phone_number": "8849827290",
// "profile_image": "https://res.cloudinary.com/dcuwbzynm/image/upload/v1718603255/gthlwzqyka7kcbsczocy.png",
// "name": "Pinkesh Patel",
// "job_type": "Camera Man",
// "user_id": null
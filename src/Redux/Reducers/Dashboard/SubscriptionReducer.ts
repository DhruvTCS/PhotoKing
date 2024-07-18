import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { MemberState } from '../../Slice/Dashboard/MemberSlice';
import { subscriptionsPlansAPI } from '../../ApiCalls/Dashboard/SubscriptionAPI';
import { ExtraState } from '../../Slice/Dashboard/ExtraSlice';
export const SubscriptionReducer = (builder: ActionReducerMapBuilder<ExtraState>) => {
    builder.addCase(subscriptionsPlansAPI.pending, (state) => {
        state.loading = true;
        state.isError = false;
        state.error = {};
    })
        .addCase(subscriptionsPlansAPI.fulfilled, (state, action: PayloadAction<[{
            id: number;
            name: string;
            description: [string];
            price_per_month: string;
            storage_size: string;
            user_limit: string;
            project_limit: string;
            duration: string;
        }]
        >) => {
            state.loading = false;
            state.isError = false;
            state.subscriptions = action.payload;
        })
        .addCase(subscriptionsPlansAPI.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;

            // console.log(action.payload);
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
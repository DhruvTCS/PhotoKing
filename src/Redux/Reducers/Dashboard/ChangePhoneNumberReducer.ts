import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { MemberState } from '../../Slice/Dashboard/MemberSlice';
import { subscriptionsPlansAPI } from '../../ApiCalls/Dashboard/SubscriptionAPI';
import { ExtraState } from '../../Slice/Dashboard/ExtraSlice';
import { changePhoneNumberAPI, chnagePhoneNumberOtpAPI } from '../../ApiCalls/Auth/user';
import { showSuccessToast } from '../../../components/atoms/Utlis/Toast';
export const ChnageNumberReducer = (builder: ActionReducerMapBuilder<ExtraState>) => {
    builder.addCase(chnagePhoneNumberOtpAPI.pending, (state) => {
        state.loading = true;
        state.isError = false;
        state.error = {};
    })
        .addCase(chnagePhoneNumberOtpAPI.fulfilled, (state, action: PayloadAction<
            {
                orderId: string,
                role: number | null,
            }

        >) => {
            state.loading = false;
            state.isError = false;

            state.changePhonenumberOrderId = action.payload.orderId;
            // state.isPhoneNumberChang;
        })
        .addCase(chnagePhoneNumberOtpAPI.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;

            console.log(action.payload);
            state.error = action.payload;
        }).addCase(changePhoneNumberAPI.pending, (state) => {
            state.loading = true;
            state.isError = false;
            state.error = {};
        })
        .addCase(changePhoneNumberAPI.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = false;

            delete state.changePhonenumberOrderId;
            state.isPhoneNumberChange = true;
            showSuccessToast("Phone Number Updated.");
            // state.isPhoneNumberChang;
        })
        .addCase(changePhoneNumberAPI.rejected, (state, action: PayloadAction<any>) => {
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
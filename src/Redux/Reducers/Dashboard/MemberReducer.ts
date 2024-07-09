import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { MemberState } from '../../Slice/Dashboard/MemberSlice';
import { createNewMemberAPI, getAllMembers, updateMemberAPI } from '../../ApiCalls/Dashboard/MembersAPI';
export const MemberReducer = (builder: ActionReducerMapBuilder<MemberState>) => {
    builder.addCase(getAllMembers.pending, (state) => {
        state.loading = true;
        state.isError = false;
        state.error = {};
    })
        .addCase(getAllMembers.fulfilled, (state, action: PayloadAction<[{
            id: string,
            country_code: string,
            phone_number: string,
            profile_image: string,
            name: string,
            job_type: string,
            user_id: string | null,
        }]
        >) => {
            state.loading = false;
            state.isMemberFetched = true;

            console.log(action.payload);
            state.members = action.payload;
        })
        .addCase(getAllMembers.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;

            console.log(action.payload);
            state.error = action.payload;
        }).addCase(createNewMemberAPI.pending, (state) => {
            state.loading = true;
            state.isError = false;
            state.error = {};

        }).addCase(createNewMemberAPI.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
            state.isMemberFetched = false;
            state.isMemberFetched = false;
        })
        .addCase(createNewMemberAPI.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;
            state.success = false;
            console.log(action.payload);
            state.error = action.payload;
        }).addCase(updateMemberAPI.pending, (state) => {
            state.loading = true;
            state.isError = false;
            state.error = {};

        }).addCase(updateMemberAPI.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
            state.isMemberFetched = false;
            state.isMemberFetched = false;

        })
        .addCase(updateMemberAPI.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isError = true;
            state.success = false;
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
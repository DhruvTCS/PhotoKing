import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Error } from '../../../Data/error.dto';
import { MemberReducer } from '../../Reducers/Dashboard/MemberReducer';
import { Member } from '../../../Data/member.dto';

export interface MemberState {
    loading: boolean;
    members: Member[] | [],
    error: Error;
    isError: boolean;
    currentMember?: Member;
    success: boolean;
}

// id": "19",
//             "country_code": "+91",
//             "phone_number": "8849827190",
//             "profile_image": "https://res.cloudinary.com/dcuwbzynm/image/upload/v1718603255/gthlwzqyka7kcbsczocy.png",
//             "name": "Pinkesh Patel",
//             "job_type": "Camera Man",
//             "user_id": null
const initialState: MemberState = {
    members: [],
    loading: false,
    error: {},
    isError: false,
    success: false,

}



const memberSlice = createSlice({
    name: 'member',
    initialState,
    reducers: {
        setMemberLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setMember(state, action: PayloadAction<Member[]>) {
            state.loading = false;
            state.members = action.payload;
        },
        setCurrentMember(state, action: PayloadAction<Member>) {
            state.currentMember = action.payload;
        },

        clearFlagsMembers(state) {
            state.isError = false;
            state.success = false;
            state.error = {};
        },
        clearError(state) {
            state.error = {};
            state.isError = false;
        }
    },
    extraReducers: (builder) => {
        MemberReducer(builder)
    },
});

export const { setMember, setMemberLoading, clearFlagsMembers, clearError, setCurrentMember } = memberSlice.actions;


export default memberSlice.reducer;

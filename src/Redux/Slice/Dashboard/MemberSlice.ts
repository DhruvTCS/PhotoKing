import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { Error } from '../../../Data/error.dto';
import { MemberReducer } from '../../Reducers/Dashboard/MemberReducer';
import { Member } from '../../../Data/member.dto';

export interface MemberState {
    loading: boolean;
    members: Member[] | [],
    error: Error;
    isError: boolean;
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

}



const memberSlice = createSlice({
    name: 'member',
    initialState,
    reducers: {
        setLoading(state) {
            state.loading = true;
        },
        setMember(state, action: PayloadAction<Member[]>) {
            state.loading = false;
            state.members = action.payload;
        }
    },
    extraReducers: (builder) => {
        MemberReducer(builder)
    },
});

export const { setMember } = memberSlice.actions;


export default memberSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Slice/Auth/AuthSlice';
import albumSlice from './Slice/Dashboard/AlbumSlice';
import memberSlice from './Slice/Dashboard/MemberSlice';
import extraSlice from './Slice/Dashboard/ExtraSlice';
import eventSlice from './Slice/Dashboard/EventSlice'
import PackageSlice from './Slice/Dashboard/PackageSlice';
const store = configureStore({
    reducer: {
        auth: authSlice,
        album: albumSlice,
        member: memberSlice,
        extra: extraSlice,
        event: eventSlice,
        package: PackageSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
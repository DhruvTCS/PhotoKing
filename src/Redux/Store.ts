import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slice/Auth/AuthSlice';
import albumReducer from './Slice/Dashboard/AlbumSlice';
import memberReducer from './Slice/Dashboard/MemberSlice';
import subscriptionReducer from './Slice/Dashboard/ExtraSlice';
const store = configureStore({
    reducer: {
        auth: authReducer,
        album: albumReducer,
        member: memberReducer,
        extra: subscriptionReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
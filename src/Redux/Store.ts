import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slice/Auth/AuthSlice';
import albumReducer from './Slice/Dashboard/AlbumSlice';
import memberReducer from './Slice/Dashboard/MemberSlice';
const store = configureStore({
    reducer: {
        auth: authReducer,
        album: albumReducer,
        member: memberReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
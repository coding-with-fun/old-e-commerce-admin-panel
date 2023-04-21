import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './slice/global.slice';
import userReducer from './slice/user.slice';

const store = configureStore({
    reducer: {
        global: globalReducer,
        user: userReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

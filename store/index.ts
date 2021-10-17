import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from '@store/auth/authSlice';
import {eventsSlice} from '@store/events/eventsSlice';

export function makeStore() {
    return configureStore({
        reducer: {
            auth: authSlice.reducer,
            events: eventsSlice.reducer,
        }
    });
}

const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser} from '@models/IUser';
import {fetchLogin} from './asyncThunks/login';
import {fetchRegistration} from './asyncThunks/registration';
import {fetchLogout} from './asyncThunks/logout';

interface AuthState {
    user: IUser,
    isAuth: boolean;
    isLoading: boolean;
    errors: string;
    isPageInitialized: boolean;
}

const initialState: AuthState = {
    user: {} as IUser,
    isAuth: false,
    isLoading: false,
    isPageInitialized: false,
    errors: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, {payload}: PayloadAction<{user: IUser, isAuth: boolean}>) => {
            state.isAuth = payload.isAuth;
            state.user = payload.user;
        },

        setIsPageInitialized: (state) => {
            state.isPageInitialized = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchLogin.fulfilled, (state, {payload}) => {
                state.isAuth = true;
                state.isLoading = false;
                state.user = payload;
                state.errors = '';
            })
            .addCase(fetchLogin.rejected, (state, {payload}) => {
                if (payload) {
                    state.errors = payload.message;
                }
            })
            .addCase(fetchRegistration.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchRegistration.fulfilled, (state, {payload}) => {
                state.isAuth = true;
                state.isLoading = false;
                if (payload) {
                    state.user = payload;
                }
            })
            .addCase(fetchLogout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchLogout.fulfilled, (state) => {
                state.isAuth = initialState.isAuth;
                state.isLoading = initialState.isLoading;
                state.user = initialState.user;
            })
    },
});

export const {setAuth, setIsPageInitialized} = authSlice.actions;

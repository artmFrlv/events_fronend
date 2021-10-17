import {createAsyncThunk} from '@reduxjs/toolkit';

import {IUser} from '@models/IUser';
import AuthService from '@services/AuthService';

export const fetchLogin = createAsyncThunk<
    IUser,
    {login: string, password: string},
    {
        rejectValue: {message: string},
    }
>(
    'auth/login',
    async ({login, password}: {login: string, password: string}, {rejectWithValue}) => {
        try {
            const response = await AuthService.login(login, password);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

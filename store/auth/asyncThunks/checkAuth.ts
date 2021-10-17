import {createAsyncThunk} from '@reduxjs/toolkit';

import {IUser} from '@models/IUser';
import axios, {AxiosError} from 'axios';
import {API_URL} from '../../../api';

interface Error {
    message: string;
    errors: any[];
}

export const fetchCheckAuth = createAsyncThunk<
    IUser,
    undefined,
    {
        rejectValue: Error,
    }
>(
    'auth/checkAuth',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get<IUser>(`${API_URL}/auth/refresh`, {withCredentials: true}).catch((e: AxiosError<Error>) => {throw e});

            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);
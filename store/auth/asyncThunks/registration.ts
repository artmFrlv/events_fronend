import {createAsyncThunk} from '@reduxjs/toolkit';

import {IUser} from '@models/IUser';
import AuthService from '@services/AuthService';
import {RegistrationRequest} from "@models/request/RegistrationRequest";

export const fetchRegistration = createAsyncThunk<
    IUser,
    RegistrationRequest,
    {
        rejectValue: {message: string}
    }
>(
    'auth/registration',
    async (registrationRequest, {rejectWithValue}) => {
        try {
            const response = await AuthService.registration(registrationRequest);
            localStorage.setItem('token', '');
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

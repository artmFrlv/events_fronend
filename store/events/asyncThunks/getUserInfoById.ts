import {createAsyncThunk} from '@reduxjs/toolkit';
import {IUser} from '@models/IUser';
import UserService from '@services/UserService';

export const fetchGetUserInfoById = createAsyncThunk<
    IUser,
    number,
    {
        rejectValue: {message: string}
    }
    >(
    'events/getUserInfoById',
    async (id, {rejectWithValue}) => {
        try {
            const response = await UserService.getUserInfo(id);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }

    }
);
import {createAsyncThunk} from '@reduxjs/toolkit';
import {IUser} from '@models/IUser';
import UserService from '@services/UserService';

export const fetchSearchUserToNewEvent = createAsyncThunk<
    IUser[],
    string,
    {
        rejectValue: {message: string}
    }
    >(
    'events/searchUsers',
    async (login, {rejectWithValue}) => {
        try {
            const response = await UserService.searchUsersByLogin(login);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }

    }
);
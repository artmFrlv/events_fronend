import {createAsyncThunk} from '@reduxjs/toolkit';
import EventService from '@services/EventService';
import {EventResponse} from '@models/response/EventResponse';
import {ID} from '@models/IUser';

export const fetchGetEvent = createAsyncThunk<
    EventResponse,
    ID,
    {
        rejectValue: {message: string}
    }
    >(
    'events/getEvent',
    async (id, {rejectWithValue}) => {
        try {
            const response = await EventService.getEvent(id);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

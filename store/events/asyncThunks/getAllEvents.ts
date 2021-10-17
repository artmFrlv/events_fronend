import {createAsyncThunk} from '@reduxjs/toolkit';
import EventService from '@services/EventService';
import {ID} from '@models/IUser';
import {EventResponse} from '@models/response/EventResponse';

export const fetchGetAllEvents = createAsyncThunk<
    EventResponse[],
    ID
>(
    'events/getAllEvents',
    async (id) => {
        const response = await EventService.getEventsByUserId(id);
        return response.data;
    }
);

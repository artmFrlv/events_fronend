import {createAsyncThunk} from '@reduxjs/toolkit';
import EventService from '@services/EventService';
import {EventResponse} from '@models/response/EventResponse';
import {EventRequest} from '@models/request/EventRequest';

export const fetchCreateEvent = createAsyncThunk<
    EventResponse,
    EventRequest
    >(
    'events/createEvent',
    async (createEventProps) => {
        const response = await EventService.createEvent(createEventProps);
        return response.data;
    }
);

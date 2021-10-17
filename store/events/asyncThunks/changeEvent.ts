import {createAsyncThunk} from '@reduxjs/toolkit';
import EventService from '@services/EventService';
import {EventResponse} from '@models/response/EventResponse';
import {EventRequest} from '@models/request/EventRequest';

export const fetchChangeEvent = createAsyncThunk<
    EventResponse,
    EventRequest
    >(
    'events/changeEvent',
    async (createEventProps) => {
        const response = await EventService.changeEvent(createEventProps);
        return response.data;
    }
);

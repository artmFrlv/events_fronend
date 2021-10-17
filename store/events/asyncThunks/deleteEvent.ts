import {createAsyncThunk} from '@reduxjs/toolkit';
import EventService from '@services/EventService';

export const fetchDeleteEvent = createAsyncThunk(
    'events/deleteEvent',
    async (id: number) => {
        await EventService.deleteEvent(id);
        return id;
    }
);
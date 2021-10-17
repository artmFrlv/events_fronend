import {AxiosResponse} from 'axios';

import $api from '../api';
import {EventResponse} from '@models/response/EventResponse';
import {ID} from '@models/IUser';
import {IEvent} from '@models/IEvent';
import {EventRequest} from '@models/request/EventRequest';

export default class EventService {
    static async getEvent(id: ID): Promise<AxiosResponse<EventResponse>> {
        return $api.get(`/events/${id}`);
    }

    static async getEventsByUserId(userId: ID): Promise<AxiosResponse<EventResponse[]>> {
        return $api.get(`/events/users/${userId}`);
    }

    static async searchEventsByTitle(title: string): Promise<AxiosResponse<IEvent[]>> {
        return $api.get(`/events/search/${title}`);
    }

    static async deleteEvent(id: ID): Promise<AxiosResponse<void>> {
        return $api.get(`/events/delete/${id}`);
    }

    static async createEvent(eventRequest: EventRequest): Promise<AxiosResponse<EventResponse>> {
        return $api.post('/events/create', {...eventRequest});
    }

    static async changeEvent(eventRequest: EventRequest): Promise<AxiosResponse<EventResponse>> {
        return $api.post('/events/change', {...eventRequest});
    }
}
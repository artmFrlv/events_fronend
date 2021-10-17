import {ID} from '@models/IUser';

export interface EventRequest {
    id?: number;
    title: string;
    description: string;
    start: Date;
    end: Date;
    isPrivate: boolean;
    organizers: ID[];
    members: ID[];
}
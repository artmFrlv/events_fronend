import {IEvent} from '../IEvent';
import {ID} from '../IUser';

export interface EventResponse {
    eventInfo: IEvent;
    creator: ID;
    organizers: ID[];
    members: ID[];
    canBeDeleted: boolean;
    canBeChanged: boolean;
}
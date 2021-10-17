import {EventsList} from '@models/IEvent';
import moment from 'moment';

export default function sortEventsListByTime(list: Array<EventsList>): Array<EventsList> {
    function comparator(firstEvent: EventsList, secondEvent: EventsList): number {
        if (moment(firstEvent.startDate).isBefore(secondEvent.startDate, 'hours')) {
            return -1;
        }
        if (moment(firstEvent.startDate).isAfter(secondEvent.startDate, 'hours')) {
            return 1;
        }
        return 0;
    }
    return list.sort(comparator);
}
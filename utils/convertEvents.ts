import {EventsList, EventTimeLapse} from '@models/IEvent';
import getMinutes from '@utils/getMinutes';

export default function convertEvents(events: EventsList[]) {
    const eventsTimeLapse: EventTimeLapse[] = [];
    for (const event of events) {
        const id = event.id;
        const startMinutes = getMinutes(event.startDate);
        const endMinutes = getMinutes(event.endDate);
        const startCoordinate = startMinutes * 0.5;
        const endCoordinate = endMinutes * 0.5;
        const width = endCoordinate - startCoordinate;
        eventsTimeLapse.push({id, startCoordinate, endCoordinate, width});
    }
    return eventsTimeLapse;
}
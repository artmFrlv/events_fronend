import {Moment} from 'moment';

export default function generateCalendarList(startDay: Moment, totalDay: number): Moment[][] {
    const day = startDay.clone().subtract(1, 'day');
    const calendarList: Moment[][] = [];
    for (let i = 0; i < totalDay; i++) {
        const weekNumber = Math.floor(i / 7);
        if (i % 7 === 0) {
            calendarList.push([]);
        }
        calendarList[weekNumber].push(day.add(1, 'day').clone());
    }
    return calendarList;
}
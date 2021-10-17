import React, {FC} from 'react';
import {Moment} from 'moment';
import CalendarDayCell from '@components/CalendarDayCell';
import styles from './CalendarWeekRow.module.css';
import {EventsList} from '@models/IEvent';
import moment from 'moment';

interface CalendarWeekRow {
    week: Moment[];
    isCurrentDay: (day: Moment) => boolean;
    isSelectedMonth: (day: Moment) => boolean;
    eventsWeek: EventsList[];
}

const CalendarWeekRow: FC<CalendarWeekRow> = ({week, isCurrentDay, isSelectedMonth, eventsWeek}) => {

    return (
        <div className={styles.weekWrapper}>
            {week.map((day) =>
                <CalendarDayCell
                    key={day.format('LLLL')}
                    day={day}
                    isCurrentDay={isCurrentDay(day)}
                    isSelectedMonth={isSelectedMonth(day)}
                    eventsDay={eventsWeek.filter((eventItem) => moment(eventItem.startDate).isSame(day, 'day'))}
                />
            )}
        </div>
    );
};

export default CalendarWeekRow;
import React, {FC, useEffect, useState} from 'react';
import styles from './Calendar.module.css';
import moment, {Moment} from 'moment';
import generateCalendarList from '@utils/generateCalendarList';
import CalendarWeekRow from '@components/CalendarWeekRow';
import MonthSwitcher from '@components/MonthSwitcher';
import {useTypedSelector} from '@hooks/useTypedSelector';
import Button from '@UIkit/Button';

const Calendar: FC = () => {
    const totalDays = 42;
    moment.updateLocale('en', {week: {dow: 1}});
    const [startDate, setStartDay] = useState<Moment>(moment());

    const startDay = startDate.clone().startOf('month').startOf('week');
    const daysMap = generateCalendarList(startDay, totalDays);

    const isCurrentDay = (day: Moment): boolean => moment().isSame(day, 'day');
    const isSelectedMonth = (day: Moment): boolean => startDate.isSame(day, 'month');

    const eventsList = useTypedSelector(state => state.events.eventsList);

    return (
        <div className={styles.calendarWrapper}>
            <div className={styles.header}>
                <MonthSwitcher
                    startDate={startDate}
                    setStartDay={setStartDay}
                />
            </div>

            {daysMap.map((week) =>
                <CalendarWeekRow
                    week={week}
                    key={week[0].format('LLL')}
                    isCurrentDay={isCurrentDay}
                    isSelectedMonth={isSelectedMonth}
                    eventsWeek={eventsList.filter((eventItem) => moment(eventItem.startDate).isSame(week[0], 'week'))}
                />
            )}
        </div>
    );
};

export default Calendar;
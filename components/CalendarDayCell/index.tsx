import React, {FC, useState} from 'react';
import moment, {Moment} from 'moment';
import styles from './CalendarDayCell.module.css';
import EventTitles from '@components/EventTitles';
import {EventsList} from '@models/IEvent';
import Modal from '@UIkit/Modal';
import classNames from 'classnames';
import DayInfo from '@components/DayInfo';
import ChangeEvent from '@components/ChangeEvent';

interface CalendarDayCellProps {
    day: Moment;
    eventsDay: EventsList[];
    isCurrentDay: boolean;
    isSelectedMonth: boolean;
}

const CalendarDayCell: FC<CalendarDayCellProps> = ({day, eventsDay, isCurrentDay, isSelectedMonth}) => {
    moment.locale('ru');
    const [isScrolling, setIsScrolling] = useState(false);
    const [activeModal, setActiveModal] = useState(false);
    const [changeEvent, setChangeEvent] = useState<number | null>(null);

    return (
        <div
            className={classNames(styles.dayWrapper,
                {
                    [styles.currentDay]: isCurrentDay,
                    [styles.selectedMonth]: isSelectedMonth
                })}
        >
            <div className={styles.dayNumber} onClick={() => setActiveModal(true)}>
                {day.format('D')}
            </div>
            <div className={styles.eventTitles} onScroll={() => setIsScrolling(true)}>
                <EventTitles events={eventsDay} hideInfo={isScrolling} setIsScrollingFalse={() => setIsScrolling(false)}/>
            </div>
            {
                activeModal &&
                <Modal setActive={setActiveModal} width={760}>
                    {
                        changeEvent === null
                            ? <DayInfo events={eventsDay} isCurrentDay={isCurrentDay} setChangeEvent={(id: number | null) => setChangeEvent(id)}/>
                            : <ChangeEvent eventId={changeEvent} setChangeEvent={(id: number | null) => setChangeEvent(id)}/>
                    }
                </Modal>
            }
        </div>
    );
};

export default CalendarDayCell;
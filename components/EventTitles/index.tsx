import React, {FC, useEffect, useState} from 'react';
import {EventsList} from '@models/IEvent';
import styles from './EventTitles.module.css';
import EventCard from '@components/EventCard';
import sortEventsListByTime from '@utils/sortEventsListByTime';
import moment from 'moment';

interface EventTitlesProps {
    events: EventsList[];
    hideInfo: boolean;
    setIsScrollingFalse: () => void;
}

const EventTitles: FC<EventTitlesProps> = ({events, hideInfo, setIsScrollingFalse}) => {
    const [showInfoEventId, setShowInfoEventId] = useState<number | null>(null);
    const sortEvents = sortEventsListByTime(events);

    useEffect(() => {
        if (hideInfo) {
            setShowInfoEventId(null);
        }
    }, [hideInfo]);

    const handlerClickOnEventTitle = (id: number | null) => {
        setIsScrollingFalse();
        setShowInfoEventId(id);
    };

    return (
        <div className={styles.eventTitlesWrapper}>
            {sortEvents.map((eventItem, index) =>
                <EventCard
                    key={moment(eventItem.startDate).format('hhmmss') + index}
                    eventId={eventItem.id}
                    showInfo={handlerClickOnEventTitle}
                    needShowInfo={showInfoEventId === eventItem.id}
                />
            )}
        </div>
    );
};

export default EventTitles;
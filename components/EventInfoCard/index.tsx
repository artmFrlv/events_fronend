import React, {FC} from 'react';
import styles from './EventInfoCard.module.css';
import {useTypedSelector} from '@hooks/useTypedSelector';
import classNames from 'classnames';
import moment from 'moment';

interface EventInfoCard {
    coordinates: {
        x: number;
        y: number;
    };
    eventId: number;
}

const EventInfoCard: FC<EventInfoCard> = ({coordinates, eventId}) => {
    const event = useTypedSelector(state => state.events.eventsCollections[eventId]);
    const isCreator = event.canBeDeleted;
    const isOrganizer = event.canBeChanged;
    return (
        <div className={classNames(styles.eventInfoCardWrapper, {[styles.creator]: isCreator, [styles.organizer]: isOrganizer})} style={{top: `${coordinates.y + 10}px`, left: `${coordinates.x - 30}px`}}>
            <h4 className={styles.title}>
                {event.eventInfo.title}
            </h4>
            <div className={styles.description}>
                {event.eventInfo.description}
            </div>
            <div>
                Время начала: {moment(event.eventInfo.start).format('HH:mm')}
            </div>
        </div>
    );
};

export default EventInfoCard;
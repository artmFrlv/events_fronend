import React, {FC, useRef, useState} from 'react';
import styles from './EventCard.module.css';
import {useTypedSelector} from '@hooks/useTypedSelector';
import {useOutsideClick} from '@hooks/useOutsideClick';
import EventInfoCard from '@components/EventInfoCard';
import classNames from 'classnames';

interface EventCardProps {
    eventId: number;
    showInfo: (id: number | null) => void;
    needShowInfo: boolean;
}

const EventCard: FC<EventCardProps> = ({showInfo, eventId, needShowInfo}) => {
    const [coordinates, setCoordinates] = useState({x: 0, y: 0});
    const id = eventId;
    const eventItem = useTypedSelector(state => state.events.eventsCollections[id]);
    const isCreator = eventItem.canBeDeleted;
    const isOrganizer = eventItem.canBeChanged;

    const wrapperRef = useRef(null);

    useOutsideClick({
        ref: wrapperRef,
        needCallback: needShowInfo,
        callback: () => showInfo(null)
    });

    const handlerClickCoordinates = (e: React.MouseEvent) => {
        const x = e.clientX;
        const y = e.clientY;
        setCoordinates({x, y});
        showInfo(id);
    };

    return (
        <div
            className={classNames(
                styles.eventCard,
                {
                    [styles.creator]: isCreator,
                    [styles.organizer]: isOrganizer,
                }
            )}
        >
            <div
                className={classNames(styles.title)}
                onClick={handlerClickCoordinates}
                ref={wrapperRef}
            >
                {eventItem.eventInfo.title}
            </div>
            {
                needShowInfo &&
                <EventInfoCard coordinates={coordinates} eventId={id} />
            }
        </div>
    );
};

export default EventCard;
import React, {FC, useEffect} from 'react';
import moment from 'moment';
import {selectEventById} from '@store/events/eventsSlice';
import styles from './EventInfo.module.css';
import {useAppDispatch} from '@hooks/useAppDispatch';
import {fetchGetUserInfoById} from '@store/events/asyncThunks/getUserInfoById';
import {useTypedSelector} from '@hooks/useTypedSelector';
import {clearUsers} from '@store/events/eventsSlice';
import Button from '@UIkit/Button';
import {fetchDeleteEvent} from '@store/events/asyncThunks/deleteEvent';

interface EventInfoProps {
    id: number;
    setChosenEvents: (chosenEvents: number[]) => void;
    setChangeEvent: (id: number | null) => void;
}

const EventInfo: FC<EventInfoProps> = ({id, setChosenEvents, setChangeEvent}) => {
    const viewedEvent = selectEventById(id);
    const dispatch = useAppDispatch();

    const membersId = viewedEvent.members;
    const organizersId = viewedEvent.organizers;
    const creatorId = viewedEvent.creator;
    const isCreator = viewedEvent.canBeDeleted;
    const isOrganizer = viewedEvent.canBeChanged;

    useEffect(() => {
        for (const userId of membersId) {
            dispatch(fetchGetUserInfoById(userId));
        }
        for (const userId of organizersId) {
            dispatch(fetchGetUserInfoById(userId));
        }
        dispatch(fetchGetUserInfoById(creatorId));
        return () => {
            dispatch(clearUsers());
        }
    }, [dispatch, creatorId, membersId, organizersId]);

    const usersInfo = useTypedSelector(state => state.events.users);

    return (
        <div className={styles.eventInfoWrapper}>
            <h3 className={styles.title}>{viewedEvent.eventInfo.title}</h3>
            <div className={styles.margin}>Время начала: {moment(viewedEvent.eventInfo.start).format('HH:MM')}</div>
            <div  className={styles.margin}>Время окончания: {moment(viewedEvent.eventInfo.end).format('HH:MM')}</div>
            <div className={styles.usersContainer}>
                Создатель события: <div className={styles.creator}>{usersInfo[creatorId]?.login}</div>
            </div>
            <div className={styles.usersContainer}>
                Организаторы:
                {
                    organizersId.map((userId) =>
                        <div key={`organizer__${userId}`} className={styles.organizer}>
                            {usersInfo[userId]?.login}
                        </div>
                    )
                }
            </div>
            <div  className={styles.usersContainer}>
                Участники:
                {
                    membersId.map((userId) =>
                        <div key={`member__${userId}`} className={styles.member}>
                            {usersInfo[userId]?.login}
                        </div>
                    )
                }
            </div>
            <div>Описание встречи: {viewedEvent.eventInfo.description}</div>
            <div className={styles.buttons}>
                {
                    isOrganizer &&
                    <Button title={'Изменить'} onClick={() => setChangeEvent(id)}/>
                }
                {
                    isCreator &&
                    <Button title={'Удалить'} onClick={() => {
                        setChosenEvents([]);
                        dispatch(fetchDeleteEvent(id));
                    }}/>
                }
            </div>
        </div>
    );
};

export default EventInfo;
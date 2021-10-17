import React, {FC, useEffect, useState} from 'react';
import moment, {Moment} from 'moment';
import {useAppDispatch} from '@hooks/useAppDispatch';
import {useTypedSelector} from '@hooks/useTypedSelector';
import EventForm from '@components/EventForm';
import Button from '@UIkit/Button';
import {fetchChangeEvent} from '@store/events/asyncThunks/changeEvent';
import {
    selectEventById,
    addMemberToChangedEvent,
    addOrganizerToChangedEvent,
    removeMemberToChangedEvent,
    removeOrganizerToChangedEvent,
    FoundUsers, clearUsers,
} from '@store/events/eventsSlice';
import styles from './ChangeEvent.module.css';
import {fetchSearchUserToChangedEvents} from '@store/events/asyncThunks/searchUserToChangedEvent';
import {fetchGetUserInfoById} from '@store/events/asyncThunks/getUserInfoById';

interface ChangeEventProps {
    eventId: number;
    setChangeEvent: (id: number | null) => void;
}

const ChangeEvent: FC<ChangeEventProps> = ({eventId, setChangeEvent}) => {
    const event = selectEventById(eventId);
    const [title, setTitle] = useState<string>(event.eventInfo.title);
    const [description, setDescription] = useState<string>(event.eventInfo.description);
    const [startDate, setStartDate] = useState<Moment>(moment(event.eventInfo.start));
    const [endDate, setEndDate] = useState<Moment>(moment(event.eventInfo.end));
    const dispatch = useAppDispatch();

    const membersId = event.members;
    const organizersId = event.organizers;

    useEffect(() => {
        for (const userId of membersId) {
            dispatch(fetchGetUserInfoById(userId));
        }
        for (const userId of organizersId) {
            dispatch(fetchGetUserInfoById(userId));
        }
        return () => {
            dispatch(clearUsers());
        }
    }, [dispatch, membersId, organizersId]);

    const usersInfo = useTypedSelector(state => state.events.users);

    for (const userId of membersId) {
        if (usersInfo[userId]) {
            dispatch(addMemberToChangedEvent({id: userId, login: usersInfo[userId].login}));
        }
    }

    for (const userId of organizersId) {
        if (usersInfo[userId]) {
            dispatch(addOrganizerToChangedEvent({id: userId, login: usersInfo[userId].login}));
        }
    }

    const organizers = useTypedSelector(state => state.events.changedEvent.organizers);
    const members = useTypedSelector(state => state.events.changedEvent.members);
    const foundUsers = useTypedSelector(state => state.events.changedEvent.foundUsers);

    const handleClickSaveChanges = () => {
        dispatch(fetchChangeEvent({
            id: eventId,
            title,
            description,
            start: startDate.toDate(),
            end: endDate.toDate(),
            isPrivate: false,
            organizers: organizers.map(user => user.id),
            members: members.map(user => user.id),
        }));
        setChangeEvent(null);
        dispatch(clearUsers());
    };

    return (
        <>
            <EventForm
                titleForm={'Редактирование события'}
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                organizers={organizers}
                members={members}
                foundUsers={foundUsers}
                addMember={(user: FoundUsers) => dispatch(addMemberToChangedEvent(user))}
                removeMember={(user: FoundUsers) => dispatch(removeMemberToChangedEvent(user))}
                addOrganizer={(user: FoundUsers) => dispatch(addOrganizerToChangedEvent(user))}
                removeOrganizer={(user: FoundUsers) => dispatch(removeOrganizerToChangedEvent(user))}
                searchUsers={(login: string) => dispatch(fetchSearchUserToChangedEvents(login))}
            />
            <div className={styles.buttons}>
                <Button title={'Сохранить'} onClick={handleClickSaveChanges}/>
                <Button title={'Отменить'} onClick={() => setChangeEvent(null)}/>
            </div>
        </>
    );
};

export default ChangeEvent;
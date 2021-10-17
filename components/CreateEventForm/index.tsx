import React, {FC, useState} from 'react';
import moment, {Moment} from 'moment';

import Button from '@UIkit/Button';
import {useAppDispatch} from '@hooks/useAppDispatch';
import {
    addMemberToNewEvent,
    FoundUsers,
    addOrganizerToNewEvent,
    removeMemberToNewEvent,
    removeOrganizerToNewEvent
} from '@store/events/eventsSlice';
import {useTypedSelector} from '@hooks/useTypedSelector';
import {fetchCreateEvent} from '@store/events/asyncThunks/createEvent';
import EventForm from '@components/EventForm';
import {fetchSearchUserToNewEvent} from '@store/events/asyncThunks/searchUser';

interface CreateEventFormProps {
    closeModal: (active: boolean) => void;
}

const CreateEventForm: FC<CreateEventFormProps> = ({closeModal}) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [startDate, setStartDate] = useState<Moment>(moment());
    const [endDate, setEndDate] = useState<Moment>(moment().add(30, 'minutes'));

    const organizers = useTypedSelector(state => state.events.newEvent.organizers);
    const members = useTypedSelector(state => state.events.newEvent.members);
    const foundUsers = useTypedSelector(state => state.events.newEvent.foundUsers);

    const dispatch = useAppDispatch();

    const handlerCreateEvent = () => {
        dispatch(fetchCreateEvent({
            title,
            description,
            start: startDate.toDate(),
            end: endDate.toDate(),
            isPrivate: false,
            organizers: organizers.map(user => user.id),
            members: members.map(user => user.id),
        }));
        closeModal(false);
    };

    return (
        <>
            <EventForm
                titleForm={'Создание события'}
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
                addMember={(user: FoundUsers) => dispatch(addMemberToNewEvent(user))}
                removeMember={(user: FoundUsers) => dispatch(removeMemberToNewEvent(user))}
                addOrganizer={(user: FoundUsers) => dispatch(addOrganizerToNewEvent(user))}
                removeOrganizer={(user: FoundUsers) => dispatch(removeOrganizerToNewEvent(user))}
                searchUsers={(login: string) => dispatch(fetchSearchUserToNewEvent(login))}
            />
            <Button title={'Создать'} onClick={handlerCreateEvent}/>
        </>
    );
};

export default CreateEventForm;
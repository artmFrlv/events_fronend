import React, {FC} from 'react';
import {Moment} from 'moment';
import Input from '@UIkit/Input';
import DatePicker from '@components/DatePicker';
import TimePicker from '@components/TimePicker';
import SearchBar from '@components/SearchBar';
import {FoundUsers} from '@store/events/eventsSlice';
import styles from './EventForm.module.css';

interface EventFormProps {
    titleForm: string;
    title: string;
    setTitle: (value: string) => void;
    description: string;
    setDescription: (value: string) => void;
    startDate: Moment;
    setStartDate: (value: Moment) => void;
    endDate: Moment;
    setEndDate: (value: Moment) => void;
    organizers: FoundUsers[];
    members: FoundUsers[];
    foundUsers: FoundUsers[];
    addMember: (user: FoundUsers) => void;
    removeMember: (user: FoundUsers) => void;
    addOrganizer: (user: FoundUsers) => void;
    removeOrganizer: (user: FoundUsers) => void;
    searchUsers: (login: string) => void;
}

const EventForm: FC<EventFormProps> =
    ({
         titleForm,
         title,
         setTitle,
         description,
         setDescription,
         startDate,
         setStartDate,
         endDate,
         setEndDate,
         organizers,
         members,
         foundUsers,
         addMember,
         removeMember,
         addOrganizer,
         removeOrganizer,
         searchUsers,
    }) => {

    return (
        <>
            <div className={styles.title}>{titleForm}</div>
            <Input value={title} placeholder={'Название'} onChange={(e) => setTitle(e.target.value)} />
            <div className={styles.time}>
                <DatePicker title={'Дата встречи'} date={startDate} setDate={setStartDate} />
                <TimePicker title={'Время начала'} date={startDate} setDate={setStartDate} />
            </div>
            <div className={styles.time}>
                <TimePicker title={'Время окончания'} date={endDate} setDate={setEndDate} />
            </div>
            <Input value={description} placeholder={'Описание'} onChange={(e) => setDescription(e.target.value)} />
            <SearchBar
                title={'Добавить организаторов'}
                addUser={addOrganizer}
                removeUser={removeOrganizer}
                chosenUsers={organizers}
                isOrganizers={true}
                foundUsers={foundUsers}
                searchUsers={searchUsers}
            />
            <SearchBar
                title={'Добавить участников'}
                addUser={addMember}
                removeUser={removeMember}
                chosenUsers={members}
                isOrganizers={false}
                foundUsers={foundUsers}
                searchUsers={searchUsers}
            />
        </>
    );
};

export default EventForm;
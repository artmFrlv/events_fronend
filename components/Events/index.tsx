import React, {useEffect, useState} from 'react';
import Calendar from '@components/Calendar';
import Button from '@UIkit/Button';
import Modal from '@UIkit/Modal';
import styles from './Events.module.css';
import CreateEventForm from '@components/CreateEventForm';
import {useAppDispatch} from '@hooks/useAppDispatch';
import {useTypedSelector} from '@hooks/useTypedSelector';
import {fetchGetAllEvents} from '@store/events/asyncThunks/getAllEvents';

const Events = () => {
    const [modalActive, setModalActive] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const id = useTypedSelector(state => state.auth.user.id);
    const isAuth = useTypedSelector(state => state.auth.isAuth);

    useEffect(() => {
        dispatch(fetchGetAllEvents(id))
    }, [dispatch, isAuth, id]);

    return (
        <div className={styles.eventsWrapper}>
            <Calendar />
            <div className={styles.bottom}>
                <Button title={'Создать событие'} onClick={() => setModalActive(true)}/>
            </div>
            {
                modalActive &&
                <Modal setActive={setModalActive}>
                    <CreateEventForm closeModal={setModalActive}/>
                </Modal>
            }
        </div>
    );
};

export default Events;
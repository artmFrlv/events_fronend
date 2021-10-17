import React, {FC, useMemo, useState} from 'react';
import {EventsList} from '@models/IEvent';
import TimeLapse from '@components/TimeLapse';
import getMinutes from '@utils/getMinutes';
import EventInfo from '@components/EventInfo';
import convertEvents from '@utils/convertEvents';
import EventCard from '@components/EventCard';
import styles from './DayInfo.module.css';

interface DayInfoProps {
    events: EventsList[];
    isCurrentDay: boolean;
    setChangeEvent: (id: number | null) => void;
}

const DayInfo: FC<DayInfoProps> = ({events, isCurrentDay, setChangeEvent}) => {
    const [chosenEvents, setChosenEvents] = useState<number[]>([]);

    const dateNow = new Date;
    const minutesNow = useMemo(() => getMinutes(dateNow), [dateNow]);

    const eventsTimeLapse = useMemo(() => convertEvents(events), [events]);

    const handlerClickOnTitleEvent = (id: number | null) => {
        if (id) {
            setChosenEvents([id]);
        }
    };

    return (
        <div>
            <TimeLapse
                events={eventsTimeLapse}
                minutes={minutesNow}
                needTimeNow={isCurrentDay}
                setChosenEvents={(chosenEvents: number[]) => setChosenEvents(chosenEvents)}
            />
            <div className={styles.content}>
                {
                    chosenEvents.length > 1 &&
                    <div>
                        <div>В это время проводится несколько событий</div>
                        <div className={styles.choseEvent}>
                            {
                                chosenEvents.map((id) =>
                                    <EventCard eventId={id} needShowInfo={false} showInfo={handlerClickOnTitleEvent}/>
                                )
                            }
                        </div>
                    </div>
                }
                {
                    chosenEvents.length === 1 &&
                    <EventInfo
                        id={chosenEvents[0]}
                        setChosenEvents={(chosenEvents: number[]) => setChosenEvents(chosenEvents)}
                        setChangeEvent={setChangeEvent}
                    />
                }
                {
                    chosenEvents.length === 0 &&
                    <div>
                        Выберите встречу
                    </div>
                }
            </div>
        </div>
    );
};

export default DayInfo;
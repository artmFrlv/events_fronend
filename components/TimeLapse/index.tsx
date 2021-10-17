import React, {FC} from 'react';
import {EventTimeLapse} from '@models/IEvent';
import styles from './TimeLapse.module.css';
import {useTypedSelector} from '@hooks/useTypedSelector';
import DurationEvent from '@components/DurationEvent';

interface TimeLapseProps {
    events: EventTimeLapse[];
    minutes: number;
    setChosenEvents: (chosenEvents: number[]) => void;
    needTimeNow: boolean;
}

const TimeLapse: FC<TimeLapseProps> = ({events, setChosenEvents, minutes, needTimeNow}) => {
    const eventsCollections = useTypedSelector(state => state.events.eventsCollections);

    const handlerClickOnEvents = (e: any) => {
        e.stopPropagation();

        const coordinate = e.nativeEvent.layerX + e.target.offsetLeft;
        const chosenEvent: number[] = [];

        for (const event of events) {
            if (coordinate >= event.startCoordinate && coordinate <= event.endCoordinate) {
                chosenEvent.push(event.id);
            }
        }

        setChosenEvents(chosenEvent);
    };

    return (
        <div
            onClick={() => setChosenEvents([])}
            className={styles.timeLapseWrapper}
        >
            {events.map((event) => {
                const id = event.id;
                const {canBeChanged, canBeDeleted} = eventsCollections[id];
                return (
                    <DurationEvent
                        key={`${id}_timeLapse_${canBeChanged}`}
                        handlerClick={handlerClickOnEvents}
                        width={event.width}
                        left={event.startCoordinate}
                        isCreator={canBeDeleted}
                        isOrganizer={canBeChanged}
                    />
                )
                }
            )}
            {
                needTimeNow &&
                <div
                    className={styles.timeNow}
                    style={
                        {
                            left: `${minutes * 0.5}px`,
                        }
                    }
                />
            }
        </div>
    );
};

export default TimeLapse;
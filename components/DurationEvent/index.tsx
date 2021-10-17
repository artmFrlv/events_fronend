import React, {FC} from 'react';
import classNames from 'classnames';
import styles from './DurationEvent.module.css';

interface DurationEvent {
    width: number;
    left: number;
    isCreator: boolean;
    isOrganizer: boolean;
    handlerClick: (e: any) => void;
}

const DurationEvent: FC<DurationEvent> = ({left, width, isCreator, isOrganizer, handlerClick}) => {
    return (
        <div
            className={classNames(styles.eventItem, {[styles.organizer]: isOrganizer, [styles.creator]: isCreator})}
            onClick={handlerClick}
            style={
                {
                    left: `${left}px`,
                    width: `${width}px`,
                }
            }
        />
    );
};

export default DurationEvent;
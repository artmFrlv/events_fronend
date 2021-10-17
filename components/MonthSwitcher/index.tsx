import React, {FC, useEffect} from 'react';
import moment, {Moment} from 'moment';
import styles from './MonthSwitcher.module.css';
import Image from 'next/image';

interface MonthSwitchProps {
    startDate: Moment;
    setStartDay: (date: Moment) => void;
}

const MonthSwitcher: FC<MonthSwitchProps> = ({startDate, setStartDay}) => {
    return (
        <div className={styles.monthSwitcherWrapper}>
            <div className={styles.imgContainer} onClick={() => setStartDay(startDate.clone().subtract(1, 'month'))}>
                <Image
                    src={'/leftArrow.svg'}
                    width={15}
                    height={15}
                />
            </div>
            <h1 className={styles.title}>{startDate.format('MMMM')}</h1>
            <div className={styles.imgContainer} onClick={() => setStartDay(startDate.clone().add(1, 'month'))}>
                <Image
                    src={'/rightArrow.svg'}
                    width={15}
                    height={15}
                />
            </div>
        </div>
    );
};

export default MonthSwitcher;
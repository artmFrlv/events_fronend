import React, {FC} from 'react';
import styles from './TimePicker.module.css';
import generateList from '@utils/generateList';
import {Moment} from 'moment';
import DropDown from '@UIkit/DropDown';

interface TimePickerProps {
    title: string;
    date: Moment;
    setDate: (date: Moment) => void;
}

const TimePicker: FC<TimePickerProps> = ({title, date, setDate}) => {
    const hourList = generateList(0, 23);
    const minuteList = generateList(0, 59);

    return (
        <div>
            <div className={styles.title}>
                {title}
            </div>
            <div className={styles.timePicker}>
                <DropDown value={date.hours()} setValue={(value) => setDate(date.clone().hours(value))} valueList={hourList} key={'hourPicker'}/>
                <DropDown value={date.minutes()} setValue={(value) => setDate(date.clone().minutes(value))} valueList={minuteList} key={'minutePicker'}/>
            </div>
        </div>
    );
};

export default TimePicker;
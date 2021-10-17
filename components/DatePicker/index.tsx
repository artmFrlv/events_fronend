import React, {FC, useMemo, useState} from 'react';
import DropDown from '@UIkit/DropDown';
import styles from './DatePicker.module.css';
import {Moment} from 'moment';
import generateList from '@utils/generateList';

interface DatePickerProps {
    title: string;
    date: Moment;
    setDate: (date: Moment) => void;
}

const DatePicker: FC<DatePickerProps> = ({title, date, setDate}) => {
    const yearList = useMemo(() => generateList(date.year() - 100, date.year()).reverse(), [date.year()]);
    const monthList = generateList(1, 12);
    const dayList = useMemo(() => generateList(1, date.daysInMonth()), [date.daysInMonth()]);
    return (
        <div>
            <div className={styles.title}>
                {title}
            </div>
            <div className={styles.datePicker}>
                <DropDown value={date.date()} setValue={(value) => setDate(date.clone().date(value))} valueList={dayList} key={'dayPicker'}/>
                <DropDown value={date.month() + 1} setValue={(value) => setDate(date.clone().month(value - 1))} valueList={monthList} key={'monthPicker'}/>
                <DropDown value={date.year()} setValue={(value) => setDate(date.clone().year(value))} valueList={yearList} key={'yearPicker'}/>
            </div>
        </div>
    );
};

export default DatePicker;
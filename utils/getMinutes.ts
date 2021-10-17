import moment from 'moment';

export default function getMinutes(date: Date): number {
    return moment(date).hour() * 60 + moment(date).minute();
}
export interface IEvent {
    id: number;
    title: string;
    description: string;
    start: Date;
    end: Date;
    isPrivate: boolean;
}

export interface EventsList {
    id: number;
    startDate: Date;
    endDate: Date;
}

export interface EventTimeLapse {
    id: number;
    startCoordinate: number;
    endCoordinate: number;
    width: number;
}
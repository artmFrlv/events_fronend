export interface IUser {
    id: ID;
    email: string;
    login: string;
    isActivated: boolean;
    name: string;
    secondName: string;
    birthday: Date;
}

export type ID = number;
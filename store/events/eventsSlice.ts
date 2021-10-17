import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {EventsList} from '@models/IEvent';
import {EventResponse} from '@models/response/EventResponse';
import {fetchGetAllEvents} from '@store/events/asyncThunks/getAllEvents';
import {fetchCreateEvent} from '@store/events/asyncThunks/createEvent';
import {fetchSearchUserToNewEvent} from '@store/events/asyncThunks/searchUser';
import {fetchLogout} from '@store/auth/asyncThunks/logout';
import {useTypedSelector} from '@hooks/useTypedSelector';
import {fetchGetUserInfoById} from '@store/events/asyncThunks/getUserInfoById';
import {IUser} from '@models/IUser';
import {fetchDeleteEvent} from '@store/events/asyncThunks/deleteEvent';
import {fetchChangeEvent} from '@store/events/asyncThunks/changeEvent';
import {fetchSearchUserToChangedEvents} from '@store/events/asyncThunks/searchUserToChangedEvent';

export interface FoundUsers {
    id: number;
    login: string;
}

interface EventsState {
    eventsCollections: {
        [id: number]: EventResponse,
    },
    eventsList: EventsList[];
    newEvent: {
        organizers: FoundUsers[];
        members: FoundUsers[];
        foundUsers: FoundUsers[];
    };
    changedEvent: {
        organizers: FoundUsers[];
        members: FoundUsers[];
        foundUsers: FoundUsers[];
    };
    users: {
        [id: number]: IUser;
    };
}

const initialState: EventsState = {
    eventsCollections: {},
    eventsList: [],
    newEvent: {
        organizers: [],
        members: [],
        foundUsers: [],
    },
    changedEvent: {
        organizers: [],
        members: [],
        foundUsers: [],
    },
    users: {},
};

export const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        addOrganizerToNewEvent: (state, {payload}: PayloadAction<FoundUsers>) => {
            if (!state.newEvent.organizers.find((user) => user.id === payload.id)) {
                state.newEvent.organizers.push(payload);
            }
        },
        addMemberToNewEvent: (state, {payload}: PayloadAction<FoundUsers>) => {
            state.newEvent.members.push(payload);
        },
        removeOrganizerToNewEvent: (state, {payload}: PayloadAction<FoundUsers>) => {
            state.newEvent.organizers = state.newEvent.organizers.filter((user) => user.id !== payload.id);
        },
        removeMemberToNewEvent: (state, {payload}: PayloadAction<FoundUsers>) => {
            state.newEvent.members = state.newEvent.members.filter((user) => user.id !== payload.id);
        },

        addOrganizerToChangedEvent: (state, {payload}: PayloadAction<FoundUsers>) => {
            if (!state.changedEvent.organizers.find((user) => user.id === payload.id)) {
                state.changedEvent.organizers.push(payload);
            }
        },
        addMemberToChangedEvent: (state, {payload}: PayloadAction<FoundUsers>) => {
            if (!state.changedEvent.members.find((user) => user.id === payload.id)) {
                state.changedEvent.members.push(payload);
            }
        },
        removeOrganizerToChangedEvent: (state, {payload}: PayloadAction<FoundUsers>) => {
            state.changedEvent.organizers = state.changedEvent.organizers.filter((user) => user.id !== payload.id);
        },
        removeMemberToChangedEvent: (state, {payload}: PayloadAction<FoundUsers>) => {
            state.changedEvent.members = state.changedEvent.members.filter((user) => user.id !== payload.id);
        },

        clearUsers: (state) => {
            state.users = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetAllEvents.fulfilled, (state, {payload}) => {
                for (const event of payload) {
                    const id = event.eventInfo.id;
                    const startDate = event.eventInfo.start;
                    const endDate = event.eventInfo.end;
                    state.eventsCollections[id] = event;
                    state.eventsList.push({id, endDate, startDate});
                }
            })
            .addCase(fetchCreateEvent.fulfilled, (state, {payload}) => {
                const id = payload.eventInfo.id;
                const startDate = payload.eventInfo.start;
                const endDate = payload.eventInfo.end;
                state.eventsCollections[id] = payload;
                state.eventsList.push({id, endDate, startDate});
            })
            .addCase(fetchSearchUserToNewEvent.fulfilled, (state, {payload}) => {
                const foundUsers = [];
                for (const user of payload) {
                    foundUsers.push({
                        id: user.id,
                        login: user.login,
                    });
                }
                state.newEvent.foundUsers = foundUsers;
            })
            .addCase(fetchLogout.fulfilled, (state) => {
                state.newEvent = initialState.newEvent;
                state.eventsList = initialState.eventsList;
                state.eventsCollections = initialState.eventsCollections;
                state.users = initialState.users;
            })
            .addCase(fetchGetUserInfoById.fulfilled, (state, {payload}) => {
                const id = payload.id;
                state.users[id] = payload;
            })
            .addCase(fetchDeleteEvent.fulfilled, (state, {payload}) => {
                delete state.eventsCollections[payload];
                state.eventsList = state.eventsList.filter((event) => event.id !== payload);
            })
            .addCase(fetchChangeEvent.fulfilled, (state, {payload}) => {
                const id = payload.eventInfo.id;
                const startDate = payload.eventInfo.start;
                const endDate = payload.eventInfo.end;
                state.eventsCollections[id] = payload;
                state.eventsList = state.eventsList.filter((event) => event.id !== id);
                state.eventsList.push({id, endDate, startDate});
            })
            .addCase(fetchSearchUserToChangedEvents.fulfilled, (state, {payload}) => {
                const foundUsers = [];
                for (const user of payload) {
                    foundUsers.push({
                        id: user.id,
                        login: user.login,
                    });
                }
                state.changedEvent.foundUsers = foundUsers;
            })
    }
});

export const selectEventById = (id: number) => useTypedSelector(state => state.events.eventsCollections[id]);

export const {
    addOrganizerToNewEvent,
    addMemberToNewEvent,
    removeMemberToNewEvent,
    removeOrganizerToNewEvent,
    addMemberToChangedEvent,
    addOrganizerToChangedEvent,
    removeMemberToChangedEvent,
    removeOrganizerToChangedEvent,
    clearUsers,
} = eventsSlice.actions;

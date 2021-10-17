import {createAsyncThunk} from '@reduxjs/toolkit';

import AuthService from '@services/AuthService';

export const fetchLogout = createAsyncThunk(
    'auth/logout',
    async () => {
        try {
            await AuthService.logout();
            return;
        } catch (err) {
            console.log(err);
        }
    }
);
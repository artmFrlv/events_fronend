import {AxiosResponse} from 'axios';

import $api from '../api';
import {RegistrationRequest} from '@models/request/RegistrationRequest';
import {IUser} from '@models/IUser';

export default class AuthService {
    static async login(login: string, password: string): Promise<AxiosResponse<IUser>> {
        return $api.post('/auth/login', {login, password});
    }

    static async registration(registrationRequest: RegistrationRequest): Promise<AxiosResponse<IUser>> {
        return $api.post('/auth/registration', {...registrationRequest});
    }

    static async logout(): Promise<AxiosResponse<void>> {
        return $api.get('/auth/logout');
    }

    static async checkAuth(): Promise<AxiosResponse<IUser>> {
        return $api.get('/auth/refresh').catch((e) => {throw e});
    }
}

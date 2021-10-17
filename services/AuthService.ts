import {AxiosResponse} from 'axios';

import $api from '../api';
import {RegistrationRequest} from '@models/request/RegistrationRequest';
import {IUser} from '@models/IUser';

export default class AuthService {
    static async login(login: string, password: string): Promise<AxiosResponse<IUser>> {
        return $api.post('http://84.38.183.53:5000/api/auth/login', {login, password});
    }

    static async registration(registrationRequest: RegistrationRequest): Promise<AxiosResponse<IUser>> {
        return $api.post('http://84.38.183.53:5000/api/auth/registration', {...registrationRequest});
    }

    static async logout(): Promise<AxiosResponse<void>> {
        return $api.get('http://84.38.183.53:5000/api/auth/logout');
    }

    static async checkAuth(): Promise<AxiosResponse<IUser>> {
        return $api.get('http://84.38.183.53:5000/api/auth/refresh').catch((e) => {throw e});
    }
}

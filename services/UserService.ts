import {AxiosResponse} from 'axios';

import $api from '../api';
import {ID, IUser} from '@models/IUser';

export default class UserService {
    static async getUserInfo(id: ID): Promise<AxiosResponse<IUser>> {
        return $api.get(`/users/${id}`);
    }

    static async searchUsersByLogin(login: string): Promise<AxiosResponse<IUser[]>> {
        return $api.get(`/users/search/${login}`);
    }
}
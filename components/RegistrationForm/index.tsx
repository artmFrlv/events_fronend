import React, {useState} from 'react';
import moment, {Moment} from 'moment';

import Form from '@UIkit/Form';
import Input from '@UIkit/Input';
import Button from '@UIkit/Button';
import {fetchRegistration} from '@store/auth/asyncThunks/registration';
import {useAppDispatch} from '@hooks/useAppDispatch';
import AppLink from '@UIkit/AppLink';
import DatePicker from '@components/DatePicker';

import styles from './RegistrationForm.module.css';
import validateEmail from '@utils/validateEmail';
import {useRouter} from 'next/router';

const RegistrationForm = () => {
    const [email, setEmail] = useState<string>('');
    const [login, setLogin] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [secondName, setSecondName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [birthday, setBirthday] = useState<Moment>(moment());
    const [errors, setErrors] = useState<string[]>([]);
    const router = useRouter();

    const dispatch = useAppDispatch();

    const handlerRegistrationButton = () => {
        setErrors([]);
        if (login.length < 6 || login.length > 16) {
            setErrors(prevState => [...prevState, 'Длина логина должна быть от 6 до 16 символов']);
        }
        if (password.length < 6 || password.length > 16) {
            setErrors(prevState => [...prevState, 'Длина пароля должна быть от 6 до 16 символов']);
        }
        if (!validateEmail(email)) {
            setErrors(prevState => [...prevState, 'Введите корректный email']);
        }
        if (name.length === 0 || secondName.length === 0) {
            setErrors(prevState => [...prevState, 'Введите все поля']);
        }
        if (errors.length === 0) {
            dispatch(fetchRegistration({
                login,
                password,
                name,
                secondName,
                email,
                birthday: birthday.toDate()
            })).unwrap().then(() => router.push('/'));
        }
    };

    return (
        <div>
            <Form title={'Регистрация'}>
                <Input
                    value={email}
                    placeholder={'Email'}
                    onChange={e => setEmail(e.target.value)}
                />
                <Input
                    value={login}
                    placeholder={'Логин'}
                    onChange={e => setLogin(e.target.value)}
                />
                <Input
                    value={name}
                    placeholder={'Имя'}
                    onChange={e => setName(e.target.value)}
                />
                <Input
                    value={secondName}
                    placeholder={'Фамилия'}
                    onChange={e => setSecondName(e.target.value)}
                />
                <DatePicker
                    setDate={setBirthday}
                    date={birthday}
                    title={'Дата рожедния'}
                />
                <Input
                    value={password}
                    type={'password'}
                    placeholder={'Пароль'}
                    onChange={e => setPassword(e.target.value)}
                />
                <div className={styles.buttons}>
                    <Button
                        title={'Зарегистрироваться'}
                        onClick={handlerRegistrationButton}
                    />
                    <AppLink href={'/login'} size={'small'}>
                        У меня уже есть аккаунт
                    </AppLink>
                </div>
            </Form>
            {
                errors.length > 0 &&
                <div className={styles.errors}>
                    {errors.map((error) =>
                        <div key={error}>
                            {error}
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default RegistrationForm;
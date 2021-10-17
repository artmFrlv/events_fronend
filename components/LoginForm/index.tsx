import {useState} from 'react';
import {fetchLogin} from '@store/auth/asyncThunks/login'
import Form from '@UIkit/Form';
import Input from '@UIkit/Input';
import Button from '@UIkit/Button';
import styles from './LoginForm.module.css';
import AppLink from '@UIkit/AppLink';
import {useRouter} from 'next/router';
import {useAppDispatch} from '@hooks/useAppDispatch';

const LoginForm = () => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch = useAppDispatch();
    const router = useRouter();

    return (
        <Form title={'Авторизация'}>
            <Input
                value={login}
                placeholder={'Логин'}
                onChange={e => setLogin(e.target.value)}
            />
            <Input
                value={password}
                type={'password'}
                placeholder={'Пароль'}
                onChange={e => setPassword(e.target.value)}
            />
            <div className={styles.buttons}>
                <Button
                    title={'Вход'}
                    onClick={() => dispatch(fetchLogin({login, password})).unwrap().then(() => router.push('/')).catch((e) => e)}
                />
                <AppLink
                    href={'/registration'}
                    size={'small'}
                >
                    У меня нет аккаунта
                </AppLink>
            </div>
        </Form>
    );
};

export default LoginForm;
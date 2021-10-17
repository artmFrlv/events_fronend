import LoginForm from '../components/LoginForm';
import Layout from '../components/Layout';
import {useRouter} from 'next/router';
import {useTypedSelector} from '@hooks/useTypedSelector';
import {useEffect} from 'react';
import AuthService from '../services/AuthService';
import {setAuth, setIsPageInitialized} from '@store/auth/authSlice';
import {useDispatch} from 'react-redux';

const Login = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const {isPageInitialized} = useTypedSelector(state => state.auth);

    useEffect(() => {
        if (!isPageInitialized) {
            AuthService.checkAuth().then(user => {
                dispatch(setAuth({user: user.data, isAuth: true}));
                dispatch(setIsPageInitialized());
                router.push('/');
            }).catch(() => {dispatch(setIsPageInitialized())});
        }
    }, [dispatch, isPageInitialized, router]);

    if (!isPageInitialized) {
        return (
            <></>
        );
    }

    return (
        <Layout>
            <LoginForm />
        </Layout>
    );
};

export default Login;
import RegistrationForm from '../components/RegistrationForm';
import Layout from '../components/Layout';
import {useRouter} from 'next/router';
import {useTypedSelector} from '@hooks/useTypedSelector';
import {useEffect} from 'react';
import AuthService from '../services/AuthService';
import {setAuth, setIsPageInitialized} from '@store/auth/authSlice';
import {useDispatch} from 'react-redux';

const Registration = () => {
    const {isAuth, isPageInitialized} = useTypedSelector(state => state.auth);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isPageInitialized) {
            AuthService.checkAuth().then(user => {
                dispatch(setAuth({user: user.data, isAuth: true}));
                dispatch(setIsPageInitialized());
                router.push('/');
            }).catch(() => {dispatch(setIsPageInitialized())});
        }
    }, []);

    if (!isPageInitialized) {
        return (
            <></>
        );
    }

    return (
        <Layout>
            <RegistrationForm />
        </Layout>
    );
};

export default Registration;
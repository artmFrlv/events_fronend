import type {NextPage} from 'next';
import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useDispatch} from 'react-redux';
import {setAuth, setIsPageInitialized} from '@store/auth/authSlice';
import AuthService from '@services/AuthService';
import {useTypedSelector} from '@hooks/useTypedSelector';
import Layout from '@components/Layout';
import Events from '@components/Events';

const Home: NextPage = () => {
    const dispatch = useDispatch();
    const isPageInitialized = useTypedSelector(state => state.auth.isPageInitialized);
    const router = useRouter();

    useEffect(() => {
        if (!isPageInitialized) {
            AuthService.checkAuth().then(user => {
                dispatch(setAuth({user: user.data, isAuth: true}));
                dispatch(setIsPageInitialized());
            }).catch(() => {
                router.push('/login');
            });
        }
    }, []);

    if (!isPageInitialized) {
        return (
            <></>
        );
    }

    return (
        <Layout>
            <Events />
        </Layout>
    );
};

export default Home;

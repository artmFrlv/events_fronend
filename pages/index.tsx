import type {NextPage} from 'next';
import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {setAuth, setIsPageInitialized} from '@store/auth/authSlice';
import AuthService from '@services/AuthService';
import {useTypedSelector} from '@hooks/useTypedSelector';
import Layout from '@components/Layout';
import Events from '@components/Events';
import {useAppDispatch} from '@hooks/useAppDispatch';

const Home: NextPage = () => {
    const dispatch = useAppDispatch();
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
    }, [dispatch, isPageInitialized, router]);

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

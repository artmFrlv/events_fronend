import React from 'react';
import styles from './Navbar.module.css';
import Icon from '@components/UIkit/Icon';
import {useTypedSelector} from '@hooks/useTypedSelector';
import {useAppDispatch} from '@hooks/useAppDispatch';
import {fetchLogout} from '@store/auth/asyncThunks/logout';
import {useRouter} from 'next/router';
import Image from 'next/image';

const Navbar = () => {
    const isAuth = useTypedSelector(state => state.auth.isAuth);
    const dispatch = useAppDispatch();
    const router = useRouter();

    return (
        <div className={styles.navbarWrapper}>
            <div className={styles.logo}>
                <Icon href={'/'} src={'/logo.svg'} width={40} height={40} />
            </div>
            <div className={styles.link}>
                {
                    isAuth &&
                    <div
                        onClick={() => {
                            dispatch(fetchLogout()).unwrap().then(() => router.push('/login'))
                        }}
                    >
                        <Image
                            height={30}
                            width={30}
                            src={'/logout.svg'}
                        />
                    </div>
                }
            </div>
        </div>
    );
};

export default Navbar;
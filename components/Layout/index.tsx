import React, {FC, ReactNode} from 'react';
import styles from './Layout.module.css';
import Navbar from '@components/Navbar';
import {useTypedSelector} from '@hooks/useTypedSelector';
import Head from 'next/head';

interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({children}) => {
    const errors = useTypedSelector(state => state.auth.errors);
    return (
        <div className={styles.layout}>
            <Head>
                <title>Создавай встречи</title>
                <meta httpEquiv={'Content-Security-Policy'} content={'upgrade-insecure-requests'} />
            </Head>
            <Navbar />
            <div className={styles.content}>
                {children}
            </div>
            {
                errors &&
                <div className={styles.errors}>
                    {errors}
                </div>
            }
        </div>
    );
};

export default Layout;
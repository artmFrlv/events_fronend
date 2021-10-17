import React, {FC, ReactNode} from 'react';
import Link from 'next/link';
import styles from './AppLink.module.css';

interface AppLink {
    children: ReactNode;
    href: string;
    size: 'small' | 'medium' | 'large';
}

const AppLink: FC<AppLink> = ({children, href, size}) => {
    const className = [styles.title, styles[size]];
    return (
        <Link href={href}>
            <div className={className.join(' ')}>
                {children}
            </div>
        </Link>
    );
};

export default AppLink;
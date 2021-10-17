import React, {FC, useRef, useState} from 'react';
import styles from './SearchBar.module.css';
import Input from '@UIkit/Input';
import {useOutsideClick} from '@hooks/useOutsideClick';
import {FoundUsers} from '@store/events/eventsSlice';
import classNames from 'classnames';
import Image from 'next/image';

interface SearchBarProps {
    title: string;
    addUser: (user: FoundUsers) => void;
    removeUser: (user: FoundUsers) => void;
    chosenUsers: FoundUsers[];
    isOrganizers: boolean;
    foundUsers: FoundUsers[];
    searchUsers: (login: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({title, addUser, chosenUsers, isOrganizers, removeUser, foundUsers, searchUsers}) => {
    const [login, setLogin] = useState<string>('');
    const [activeSuggest, setActiveSuggest] = useState<boolean>(false);

    const wrapperRef = useRef(null);
    useOutsideClick({
        ref: wrapperRef,
        callback: () => setActiveSuggest(false),
        needCallback: activeSuggest,
    });

    const handlerChangeLogin = async (login: string) => {
        searchUsers(login);
        setLogin(login);
        setActiveSuggest(true);
    };

    return (
        <div className={styles.SearchBarWrapper}>
            <Input
                value={login}
                placeholder={title}
                onChange={e => handlerChangeLogin(e.target.value)}
                onFocus={() => setActiveSuggest(true)}
            />
            {
                activeSuggest &&
                <div ref={wrapperRef} className={styles.suggest}>
                    {foundUsers.map((user) =>
                        <div
                            key={user.id}
                            className={styles.item}
                            onClick={() => {
                                setActiveSuggest(false);
                                addUser(user);
                                setLogin('');
                            }}
                        >
                            {user.login}
                        </div>
                    )}
                </div>
            }
            {
                chosenUsers &&
                <div className={styles.chosenUsers}>
                    {chosenUsers.map((user) =>
                        <div key={`chosen ${user.id}`} className={classNames(styles.chosenUser, {[styles.organizer]: isOrganizers})}>
                            <div>
                                {user.login}
                            </div>
                            <div className={styles.cross} onClick={() => removeUser(user)}>
                                <Image
                                    src={'/cross.svg'}
                                    width={10}
                                    height={10}
                                    alt={'Удалить пользователя'}
                                />
                            </div>
                        </div>

                    )}
                </div>
            }
        </div>
    );
};

export default SearchBar;
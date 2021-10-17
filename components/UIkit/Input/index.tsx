import React, {FC} from 'react';
import styles from './Input.module.css';

export interface InputProps {
    value: string;
    type?: string;
    placeholder: string;
    onChange: (e: any) => void;
    onFocus?: (e: any) => void;
}

const Input: FC<InputProps> = ({type = 'text', ...inputProps}) => {
    return (
        <div className={styles.inputWrapper}>
            <input
                className={styles.input}
                type={type}
                {...inputProps}
            />
        </div>
    );
};

export default Input;
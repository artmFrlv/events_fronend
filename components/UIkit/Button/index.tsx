import React, {FC, SyntheticEvent} from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    title: string;
    disabled?: boolean;
    isLoading?: boolean;
    onClick?: (e: SyntheticEvent) => void;
}

const Button: FC<ButtonProps> = ({title, ...buttonProps}) => {
    return (
        <div className={styles.buttonWrapper}>
            <button
                className={styles.button}
                {...buttonProps}
            >
                {title}
            </button>
        </div>
    );
};

export default Button;
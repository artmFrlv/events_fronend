import React, {FC, ReactNode} from 'react';
import styles from './Form.module.css';

interface FormProps {
    title: string;
    children: ReactNode;
}

const Form: FC<FormProps> = ({title, children}) => {
    return (
        <div className={styles.formWrapper}>
            <div className={styles.title}>
                {title}
            </div>
            <form
                className={styles.form}
                onSubmit={e => e.preventDefault()}
            >
                {children}
            </form>
        </div>
    );
};

export default Form;
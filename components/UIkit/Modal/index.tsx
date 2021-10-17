import React, {FC, ReactNode} from 'react';
import Image from 'next/image';
import styles from './Modal.module.css';

interface ModalProps {
    children: ReactNode;
    setActive: (active: boolean) => void;
    width?: number;
}

const Modal: FC<ModalProps> = ({setActive, children, width}) => {
    return (
        <div className={styles.modalLayout} onClick={() => setActive(false)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()} style={{width: `${width}px`}}>
                <div className={styles.cross}>
                    <div className={styles.link} onClick={() => setActive(false)}>
                        <Image
                            src={'/cross.svg'}
                            width={20}
                            height={20}
                        />
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
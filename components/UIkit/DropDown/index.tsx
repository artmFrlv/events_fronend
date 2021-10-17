import React, {FC, useRef, useState} from 'react';
import styles from './DropDown.module.css';
import {useOutsideClick} from '@hooks/useOutsideClick';
import Image from 'next/image';

interface DropDownProps {
    value: any;
    setValue: (value: any) => void;
    valueList: any[];
}

const DropDown: FC<DropDownProps> = ({value, setValue, valueList}) => {
    const [activeDropDown, setActiveDropDown] = useState<boolean>(false);
    const wrapperRef = useRef(null);

    useOutsideClick({
        ref: wrapperRef,
        callback: () => setActiveDropDown(false),
        needCallback: activeDropDown,
    });

    return (
        <div className={styles.dropDownWrapper}  onClick={() => setActiveDropDown(true)}>
            <div className={styles.dropDownValue}>
                <div>
                    {value}
                </div>
                <div className={styles.imageContainer}>
                    <Image
                        src={'/arrowDown.svg'}
                        width={16}
                        height={16}
                    />
                </div>
            </div>
            {
                activeDropDown &&
                <div className={styles.dropDownMenu} ref={wrapperRef}>
                    {valueList.map((item) =>
                        <div
                            key={`${item}_drop_down`}
                            className={styles.dropDownItem}
                            onClick={(e) => {
                                e.stopPropagation();
                                setValue(item);
                                setActiveDropDown(false);
                            }}
                        >
                            {item}
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default DropDown;
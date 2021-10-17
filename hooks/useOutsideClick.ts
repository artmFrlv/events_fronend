import {useEffect} from 'react';

interface UseOutsideClickProps {
    ref: any;
    needCallback: boolean;
    callback: () => void;
}

export function useOutsideClick({ref, callback, needCallback}: UseOutsideClickProps) {
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                return callback();
            }
        }
        if (needCallback) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
        document.removeEventListener('mousedown', handleClickOutside);
    }, [ref, needCallback]);
}
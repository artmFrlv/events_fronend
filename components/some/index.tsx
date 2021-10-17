import React, {FC} from 'react';
import {selectEventById} from '@store/events/eventsSlice';

interface int {
    id: number;
}

const Something: FC<int> = ({id}) => {
    const event = selectEventById(id);
    return (
        <div>
            {event.eventInfo.title}
        </div>
    );
};

export default Something;
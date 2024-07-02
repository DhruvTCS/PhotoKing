import React, { useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer, SlotInfo } from 'react-big-calendar';
import moment from 'moment';
import styled from 'styled-components'; // Adjust the path as per your project structure
import EventCreateModal from '../../molecules/Dashboard/EventCalendar/CreateEventModal';

const localizer = momentLocalizer(moment);
interface EventData {
    eventName: string;
    dateTime: Date;
    members: string[];
}

const eventsData = [
    {
        id: 1,
        title: 'Event 1',
        start: new Date(2024, 6, 1, 10, 0, 0),
        end: new Date(2024, 6, 1, 12, 0, 0),
    },
    {
        id: 2,
        title: 'Event 2',
        start: new Date(2024, 6, 2, 15, 0, 0),
        end: new Date(2024, 6, 2, 17, 0, 0),
    },
    // Add more events as needed
];

const CalenderConatiner = styled.div`
  height:900px;
  padding: 20px;
`;
const StyledDateCellWrapper = styled.div<{ isToday: boolean }>`
  background-color: ${({ isToday }) => (isToday ? 'black' : 'black')};
`;

const CustomDateCellWrapper = ({ value, children }: { value: Date; children: React.ReactNode }) => {
    const isToday = moment().isSame(value, 'day');
    return <StyledDateCellWrapper isToday={isToday}>{children}</StyledDateCellWrapper>;
};

const EventCalendar: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);

    const handleSelectSlot = (slotInfo: SlotInfo) => {
        setSelectedSlot(slotInfo);
        console.log(modalOpen)
        console.log(slotInfo.start)
        // if (selectedSlot)
        setModalOpen(true);
    };
    const handleSelectedEvent = (data: any) => {
        console.log(data);
    }
    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedSlot(null);
    };

    const handleSubmitEvent = (eventData: EventData) => {
        // Here you would handle submitting the event data to your backend or state management
        console.log('Submitted event data:', eventData);
        // For demo, just close the modal
        handleCloseModal();
    };

    return (
        <CalenderConatiner>
            <Calendar
                localizer={localizer}
                events={eventsData}
                views={['month', 'week', 'day']}
                onSelectSlot={handleSelectSlot}
                selectable={true}
                defaultView="month"
                step={15}
                timeslots={4}
                onSelectEvent={handleSelectedEvent}

            />
            <EventCreateModal
                isOpen={modalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmitEvent}
                selectedSlot={selectedSlot}
            />
        </CalenderConatiner>
    );
};

export default EventCalendar;

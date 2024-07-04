import React, { useEffect, useState } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, momentLocalizer, SlotInfo } from 'react-big-calendar'
import moment from 'moment'
import styled from 'styled-components' // Adjust the path as per your project structure
import EventCreateModal from '../../molecules/Dashboard/EventCalendar/CreateEventModal'
import { useAppDispatch, useAppSelector } from '../../../Redux/Hooks'
import { getAllMembers } from '../../../Redux/ApiCalls/Dashboard/MembersAPI'
import { getAllEventsAPI } from '../../../Redux/ApiCalls/Dashboard/EventAPI'
import LoadingDots from '../../atoms/Utlis/LoadinDots'
import { EventType } from '../../../Data/event.dto'
import { clearCurrentEvent, setCurrentEvent } from '../../../Redux/Slice/Dashboard/EventSlice'

const localizer = momentLocalizer(moment)
interface EventData {
    eventName: string
    dateTime: Date
    members: string[]
}
const LoaderContainer = styled.div`
width:100%;
height:100%;
display:flex;
align-items: center;
justify-content: center;
`;
const eventsData = [

    {
        id: 3,
        title: 'Surat Marriage shoot',
        start: new Date('Mon Jul 15 2024 18:00:00 GMT +0530(India Standard Time)'),
        end: new Date('Mon Jul 15 2024 22:00:00 GMT +0530(India Standard Time)'),
        location: 'done',
        members: [
            {
                id: 5,
                member: 52,
            },
            {
                id: 6,
                member: 48,
            },
        ],
    },
    // Add more events as needed
]

const CalenderConatiner = styled.div`
  height: 900px;
  padding: 20px;
`

const EventCalendar: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null)
    const { members, isMemberFetched } = useAppSelector((state) => state.member)
    const [currentQuarter, setCurrentQuarter] = useState({
        start: new Date(new Date().getFullYear(), Math.floor(new Date().getMonth() / 3) * 3, 1),
        end: new Date(new Date().getFullYear(), Math.floor(new Date().getMonth() / 3) * 3 + 3, 0),
    });


    useEffect(() => {
        console.log(currentQuarter);
        fetchAndSetEvents(currentQuarter.start, currentQuarter.end);
    }, [currentQuarter]);

    const fetchAndSetEvents = async (start: Date, end: Date) => {
        // const newEvents = await fetchEventsForQuarter(start, end);
        // setEvents(newEvents);
        console.log(start, end);
    };

    const handleNavigate = (date: Date, view: string, action: string) => {
        const newStart = new Date(date.getFullYear(), Math.floor(date.getMonth() / 3) * 3, 1);
        const newEnd = new Date(date.getFullYear(), Math.floor(date.getMonth() / 3) * 3 + 3, 0);
        if (newStart.getTime() !== currentQuarter.start.getTime() || newEnd.getTime() !== currentQuarter.end.getTime()) {
            setCurrentQuarter({ start: newStart, end: newEnd });
        }
        // setCurrentQuarter({ start, end });
    };
    const { loading, Events, isError, isEventUpdate } = useAppSelector(
        (state) => state.event,
    )
    const dispatch = useAppDispatch()
    useEffect(() => {
        // console.log(convertToDateTime("2024/07/15", "14:00:00"))
        // console.log("+++++++++++++++++++++++++++++++++++++++")
        if (members.length == 0 && !isMemberFetched) {
            // dispatch(getAllMembers())
        }

        return () => { }
    }, [members])
    useEffect(() => {
        if (isEventUpdate) {
            // dispatch(
            //     getAllEventsAPI({
            //         start_date: '2024-01-15',
            //         end_date: '2024-12-15',
            //     }),
            // )
        }
    }, [isEventUpdate])

    const handleSelectSlot = (slotInfo: SlotInfo) => {
        setSelectedSlot(slotInfo)

        // if (selectedSlot)
        setModalOpen(true)
    }
    const handleSelectedEvent = (data: any) => {

        const eventObje: EventType = {
            id: data.id,
            location: data.location,
            start: data.start,
            end: data.end,
            members: data.members,
            title: data.title
        }

        dispatch(setCurrentEvent(eventObje));
        setModalOpen(true);
    }
    const handleCloseModal = () => {
        setModalOpen(false)
        setSelectedSlot(null)
        dispatch(clearCurrentEvent());
    }

    const handleSubmitEvent = (eventData: EventData) => {
        // Here you would handle submitting the event data to your backend or state management
        console.log('Submitted event data:', eventData)
        // For demo, just close the modal
        handleCloseModal()
    }

    return loading ? (
        <LoaderContainer> <LoadingDots /></LoaderContainer>
    ) : (
        <CalenderConatiner>
            <Calendar
                localizer={localizer}
                events={eventsData}
                views={{ month: true, week: true, day: true }}
                onSelectSlot={handleSelectSlot}
                selectable={true}
                defaultView="month"
                step={15}
                timeslots={4}
                onSelectEvent={handleSelectedEvent}
                onNavigate={handleNavigate}
            />
            <EventCreateModal
                isOpen={modalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmitEvent}
                selectedSlot={selectedSlot}
            />
        </CalenderConatiner>
    )
}

export default EventCalendar

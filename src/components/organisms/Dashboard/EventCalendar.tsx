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
import { clearCurrentEvent, clearError, setCurrentEvent } from '../../../Redux/Slice/Dashboard/EventSlice'
import { showErrorToast } from '../../atoms/Utlis/Toast'

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
        id: 2,
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
    const [currentEvents, setCurrentEvents] = useState<any[]>([]);
    const { members, isMemberFetched } = useAppSelector((state) => state.member)
    const [currentQuarter, setCurrentQuarter] = useState({
        start: new Date(new Date().getFullYear(), Math.floor(new Date().getMonth() / 3) * 3, 1),
        end: new Date(new Date().getFullYear(), Math.floor(new Date().getMonth() / 3) * 3 + 3, 0),
    });
    const { loading, Events, isError, isEventUpdate, error, success } = useAppSelector(
        (state) => state.event,
    )
    const dispatch = useAppDispatch()
    useEffect(() => {
        // const timeout = setTimeout(() => {

        console.log(currentQuarter);
        fetchAndSetEvents(currentQuarter.start, currentQuarter.end);
        // }, 500)

        return () => {
            // clearTimeout(timeout);
        }
    }, [currentQuarter]);

    useEffect(() => {
        // console.log(convertToDateTime("2024/07/15", "14:00:00"))
        // console.log("+++++++++++++++++++++++++++++++++++++++")
        if (members.length == 0 && !isMemberFetched) {
            // dispatch(getAllMembers())
        }

        return () => { }
    }, [members])
    useEffect(() => {
        if (isError) {
            if (error && error.message) {
                showErrorToast(error.message)
            } else {
                showErrorToast("Something went wrong! Please try again.")
            }
        }
        else if (isEventUpdate) {
            let startyear = currentQuarter.start.getFullYear();
            let startmonth = (currentQuarter.start.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
            let startday = currentQuarter.start.getDate().toString().padStart(2, '0');

            // Format the date into 'yyyy-mm-dd'
            let startDate = `${startyear}-${startmonth}-${startday}`;

            let endYear = currentQuarter.end.getFullYear();
            let endMonth = (currentQuarter.end.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
            let endDay = currentQuarter.end.getDate().toString().padStart(2, '0');

            // Format the date into 'yyyy-mm-dd'
            let endDate = `${endYear}-${endMonth}-${endDay}`;

            console.log(currentEvents);
            dispatch(getAllEventsAPI({ start_date: startDate, end_date: endDate }))
        }
        return () => {
            dispatch(clearError())
        }
    }, [dispatch, isEventUpdate, isError])
    useEffect(() => {
        if (Events && Events.length > 0) {
            let newEvents = Events.map(event => {
                let newEvent = {
                    title: event.title,
                    members: event.members,
                    location: event.location,
                    start: new Date(event.start),
                    end: new Date(event.end),
                    id: event.id
                }
                return newEvent

            })
            setCurrentEvents(newEvents);
        }
    }, [Events])

    const fetchAndSetEvents = async (start: Date, end: Date) => {
        // const newEvents = await fetchEventsForQuarter(start, end);
        // setEvents(newEvents);
        let startyear = start.getFullYear();
        let startmonth = (start.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        let startday = start.getDate().toString().padStart(2, '0');

        // Format the date into 'yyyy-mm-dd'
        let startDate = `${startyear}-${startmonth}-${startday}`;

        let endYear = end.getFullYear();
        let endMonth = (end.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        let endDay = end.getDate().toString().padStart(2, '0');

        // Format the date into 'yyyy-mm-dd'
        let endDate = `${endYear}-${endMonth}-${endDay}`;

        console.log(currentEvents);
        dispatch(getAllEventsAPI({ start_date: startDate, end_date: endDate }))
        // console.log(start.getDate(), end.getDate("yyyy-MM-dd"));
    };

    const handleNavigate = (date: Date, view: string, action: string) => {
        const newStart = new Date(date.getFullYear(), Math.floor(date.getMonth() / 3) * 3, 1);
        const newEnd = new Date(date.getFullYear(), Math.floor(date.getMonth() / 3) * 3 + 3, 0);
        if (newStart.getTime() !== currentQuarter.start.getTime() || newEnd.getTime() !== currentQuarter.end.getTime()) {
            setCurrentQuarter({ start: newStart, end: newEnd });
        }
        // setCurrentQuarter({ start, end });
    };

    const handleSelectSlot = (slotInfo: SlotInfo) => {
        setSelectedSlot(slotInfo)

        // if (selectedSlot)
        setModalOpen(true)
    }
    const handleSelectedEvent = (data: any) => {

        const eventObje: EventType = {
            id: data.id,
            location: data.location,
            start: data.start.toString(),
            end: data.end.toString(),
            members: data.members,
            title: data.title
        }
        console.log(eventObje)
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

    return (
        <CalenderConatiner>
            <Calendar
                localizer={localizer}
                events={currentEvents}
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

import React, { useState } from 'react'
import styled from 'styled-components'
import { UserCreatedEvents } from '../../../../Data/event.dto'
import ViewUserCreatedEventModal from './ViewUserCreatedEventModal'
import { useAppDispatch } from '../../../../Redux/Hooks'
import { setUserCreatedEvent } from '../../../../Redux/Slice/Dashboard/EventSlice'
import { useNavigate } from 'react-router-dom'

interface UserCreatedEventCardProps {
    userEvent: UserCreatedEvents
}

const UserCreatedEventCard: React.FC<UserCreatedEventCardProps> = ({ userEvent }) => {
    const [fullEventModal, setFullEventModal] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    function getEventDates(event: UserCreatedEvents) {
        if (!event.sub_events || event.sub_events.length === 0) {
            return { starting_date: null, ending_date: null };
        }

        let minStartingDate = event.sub_events[0].starting_date;
        let maxEndingDate = event.sub_events[0].ending_date;

        event.sub_events.forEach(subEvent => {
            if (subEvent.starting_date < minStartingDate) {
                minStartingDate = subEvent.starting_date;
            }
            if (subEvent.ending_date > maxEndingDate) {
                maxEndingDate = subEvent.ending_date;
            }
        });

        return {
            starting_date: minStartingDate,
            ending_date: maxEndingDate
        };
    }
    const handleViewFullEvent = () => {
        dispatch(setUserCreatedEvent(userEvent))
        navigate('/dashboard/events/userCreated/single')
    }
    return (
        <Container>
            {fullEventModal && <ViewUserCreatedEventModal userEvent={userEvent} onCancel={() => setFullEventModal(false)} />}
            <HeaderContainer >
                <CustomerNameText>{userEvent.customer_name}</CustomerNameText>
                <CustomerPhoneText>{userEvent.phone_number}</CustomerPhoneText>
            </HeaderContainer>
            <Hr colorData="#00000073" />
            <EventData>
                <EvenDateHeader>
                    <EventDataHeaderTitle>{userEvent.event_name}</EventDataHeaderTitle>
                </EvenDateHeader>
                <EventDataBody>
                    {/* <EventLocationContainer>
                        <EventLocationLabel>Location :</EventLocationLabel>
                        <EventLocationText>{userEvent}</EventLocationText>
                    </EventLocationContainer> */}
                    <EventDateContainer>
                        <EventDateLabel>Dates :</EventDateLabel>
                        <DateContainer>
                            <FromDateContainer>
                                <FromDateLabel>From :</FromDateLabel>
                                <Date>{getEventDates(userEvent).starting_date}</Date>
                            </FromDateContainer>
                            <FromDateContainer>
                                <FromDateLabel>To :</FromDateLabel>
                                <Date>{getEventDates(userEvent).ending_date}</Date>
                            </FromDateContainer>
                        </DateContainer>
                    </EventDateContainer>
                </EventDataBody>
                <ViewFullEventDiv onClick={() => handleViewFullEvent()}>
                    <ViewEventText>
                        See Full Event
                    </ViewEventText>
                </ViewFullEventDiv>
            </EventData>

        </Container>
    )
}

export default UserCreatedEventCard


const Container = styled.div`
height:300px;
width:254px;
padding:10px;
background-color:white;
border-radius:10px;
margin:10px;
`;
const HeaderContainer = styled.div`
width:100%;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
`;
const CustomerNameText = styled.p`
font-family: Urbanist;
font-size: 18px;
font-weight: 600;
line-height: 21.6px;
margin:0;
`;
const CustomerPhoneText = styled.p`
font-family: Urbanist;
font-size: 15px;
font-weight: 400;
line-height: 18px;
margin:0px 0px 10px 0px;
`;

const Hr = styled.hr<{ colorData: string }>`
border: 1px solid ${props => props.colorData};
width:100%;
`
const EventData = styled.div`
width:100%;
margin-top:20px;
`;

const EvenDateHeader = styled.div`
width:100%;
display: flex;
align-items: center;
justify-content: center;
`;

const EventDataHeaderTitle = styled.p`
font-family: Urbanist;
font-size: 18px;
font-weight: 600;
line-height: 21.6px;
margin:0;
`;
const EventDataBody = styled.div`
margin-top:10px;
`;
const EventLocationContainer = styled.div`
display: flex;
flex-direction: column;
align-items: baseline;
width:100%;

`;

const EventLocationLabel = styled.p`
font-family: Urbanist;
font-size: 16px;
font-weight: 500;
line-height: 21.6px;
width:41%;
margin:0;
color:gray;
`;

const EventLocationText = styled.p`
font-family: Urbanist;
font-size: 16px;
font-weight: 500;
line-height: 21.6px;
margin:0;
`;

const EventDateContainer = styled.div`
// margin-top:30px;
width:100%;
`;

const EventDateLabel = styled.p`
font-family: Urbanist;
font-size: 16px;
font-weight: 500;
line-height: 21.6px;
margin:0;
color:gray;
`;

const DateContainer = styled.div`
border:1px solid #00000014;
display:flex;
align-items: center;
justify-content: space-between;
border-radius:10px;
padding:10px;
height:40px;`;

const FromDateContainer = styled.div`
display:flex;
flex-direction:column;
align-items:baseline;

`;
const FromDateLabel = styled.p`
font-family: Urbanist;
font-size: 16px;
font-weight: 500;
line-height: 21.6px;
margin:0;
`;
const Date = styled.p`
font-family: Urbanist;
font-size: 14px;
font-weight: 500;
line-height: 21.6px;
margin:0;
`;
const Time = styled.p`
font-family: Urbanist;
font-size: 14px;
font-weight: 500;
line-height: 21.6px;
margin:0;
`;

const ToDateContainer = styled.div``;
const ViewFullEventDiv = styled.div`
width:91%;
margin-top:30px;
display: flex;
align-items: center;
justify-content: center;
border-radius:15px;
border: 1px solid #a720b9;
padding:10px;
cursor:pointer;
`;
const ViewEventText = styled.p`
font-family: Urbanist;
font-size: 16px;
font-weight: 600;
line-height: 21.6px;
margin:0;
color:#a720b9;
`;
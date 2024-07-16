import React from 'react'
import styled from 'styled-components'
import { UserCreatedEvents } from '../../../../Data/event.dto'

interface UserCreatedEventCardProps {
    userEvent?: UserCreatedEvents
}

const UserCreatedEventCard: React.FC<UserCreatedEventCardProps> = ({ userEvent }) => {
    return (
        <Container>
            <HeaderContainer >
                <CustomerNameText>Dhruv Pravinbhai Gopani</CustomerNameText>
                <CustomerPhoneText>+918849927290</CustomerPhoneText>
            </HeaderContainer>
            <Hr colorData="#00000073" />
            <EventData>
                <EvenDateHeader>
                    <EventDataHeaderTitle>Wedding Event</EventDataHeaderTitle>
                </EvenDateHeader>
                <EventDataBody>
                    <EventLocationContainer>
                        <EventLocationLabel>Location :</EventLocationLabel>
                        <EventLocationText>A/18, Shantiniketan row houses, near sneh sankul wadi,anand mahal road, adajan, surat- 395009.</EventLocationText>
                    </EventLocationContainer>
                    <Hr colorData="#00000014" />
                    <EventDateContainer>
                        <EventDateLabel>Dates :</EventDateLabel>
                        <DateContainer>
                            <FromDateContainer>

                            </FromDateContainer>
                        </DateContainer>
                    </EventDateContainer>
                </EventDataBody>
            </EventData>

        </Container>
    )
}

export default UserCreatedEventCard


const Container = styled.div`
height:400px;
width:400px;
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
margin-top:30px;
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
margin-top:30px;
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
border-radius:10px;
height:70px;`;

const FromDateContainer = styled.div`
display:flex;

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
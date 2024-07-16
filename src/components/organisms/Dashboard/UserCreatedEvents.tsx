import React, { useEffect, useState } from 'react'
import styled from 'styled-components'


import BackButtonIconPng from '../../../assets/Icons/SingleAlbum/back.png'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../Redux/Hooks'
import { getUserCreatedEventsAPI } from '../../../Redux/ApiCalls/Dashboard/EventAPI'
import { UserCreatedEvents as UserCreatedEventsType } from '../../../Data/event.dto'
import UserCreatedEventCard from '../../atoms/Dashboard/Events/UserCreatedEventCard'



const UserCreatedEvents: React.FC = () => {
    const navigate = useNavigate();
    const { isError, error, userCreatedEvents, loading } = useAppSelector(state => state.event);
    const dispatch = useAppDispatch();
    const [currentEvents, setCurrentEvents] = useState<UserCreatedEventsType[]>([])
    useEffect(() => {
        if (!userCreatedEvents) {
            console.log("User created events");
            console.log(userCreatedEvents)
            dispatch(getUserCreatedEventsAPI());
        } else {
            setCurrentEvents(userCreatedEvents);
        }
    }, [userCreatedEvents])
    return (
        <Container>
            <BackButtonContainer >
                <BackButtonIcon src={BackButtonIconPng} onClick={() => navigate(-1)} />
                <BackButtonText>Back</BackButtonText>
            </BackButtonContainer>
            <HeaderContainer>
                <HeaderTitle>User Events</HeaderTitle>
            </HeaderContainer>
            <BodyContainer>
                <UserCreatedEventCard />
                <UserCreatedEventCard />
                <UserCreatedEventCard />
                <UserCreatedEventCard />
                <UserCreatedEventCard />
                <UserCreatedEventCard />
            </BodyContainer>
        </Container>
    )
}

export default UserCreatedEvents

const Container = styled.div`
padding-left:32px;

`;

const BackButtonContainer = styled.div`
display:flex;
flex-direction:row;
width:98%;
align-items:center;
margin-bottom:30px;
`
const BackButtonIcon = styled.img`
width: 16px;
height: 13.8px;
color: #171717;
cursor: pointer;


`;

const BackButtonText = styled.p`
height: 23px;
font-family: Urbanist,sans-serif;
font-size: 16px;
font-weight: 500;
line-height: 22.8px;
text-align: left;
color: #171717;
margin:0px;
margin-left:11px;

`;

const HeaderContainer = styled.div`
width: 100%;
display:flex;
align-items: center;
justify-content: center;
`;

const HeaderTitle = styled.p`

font-family: Urbanist,sans-serif;
font-size: 20px;
font-weight: 600;
line-height: 22.8px;
text-align: left;
color: #171717;
margin:0px;
`;


const BodyContainer = styled.div`

display:flex;
align-items: baseline;
flex-wrap: wrap;
`;


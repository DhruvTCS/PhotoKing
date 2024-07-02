import React, { useState } from 'react'
import styled from 'styled-components'
import NotificationIconPng from './../../../../assets/Icons/notificationIcon.png'
import NotificationMenu from '../../../atoms/Utlis/NotificationMenu';
import { useAppSelector } from '../../../../Redux/Hooks';


const NotifcationContainer = styled.div`
position: relative;
height:50px;
width:50px;
justify-content: center;
border-radius:50%;
background-color: white;
`;
const NotificationIconContainer = styled.div`
height:50px;
width:50px;
display:flex;
align-items: center;
justify-content: center;
`;
const NotificationIcon = styled.img`

`;
const NotificationText = styled.p`

font-family: "Rubik", sans-serif;
font-size: 14px;
font-weight: 500;
color:white;
text-align: center;
margin:0px;
`;

const NotificationTextContainer = styled.div`
width: 20px;
height: 20px;
background: #A720B9;
border-radius:50%;
text-align: center;
justify-content: center;
position:absolute;
top:2px;
right:-6px;

`;

const Notification: React.FC = () => {
    const { notifications } = useAppSelector(state => state.extra)
    const [isOpen, setIsOpen] = useState(false);
    return (
        <NotifcationContainer >
            {isOpen ? <NotificationMenu isOpen={isOpen} handleIsOpen={() => setIsOpen(pre => !pre)} /> : null}
            <NotificationIconContainer onClick={() => setIsOpen(pre => !pre)}>

                <NotificationIcon src={NotificationIconPng} />
            </NotificationIconContainer>
            {notifications.length !== 0 && <NotificationTextContainer >

                <NotificationText>2</NotificationText>
            </NotificationTextContainer>}
        </NotifcationContainer>
    )
}

export default Notification
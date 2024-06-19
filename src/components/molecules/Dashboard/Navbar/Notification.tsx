import React from 'react'
import styled from 'styled-components'
import NotificationIconPng from './../../../../assets/Icons/notificationIcon.png'


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
    return (
        <NotifcationContainer >
            <NotificationIconContainer>

                <NotificationIcon src={NotificationIconPng} />
            </NotificationIconContainer>
            <NotificationTextContainer >

                <NotificationText>2</NotificationText>
            </NotificationTextContainer>
        </NotifcationContainer>
    )
}

export default Notification
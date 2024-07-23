import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import NotificationIconPng from './../../../../assets/Icons/notificationIcon.png'
import NotificationMenu from '../../../atoms/Dashboard/Navbar/NotificationMenu';
import { useAppDispatch, useAppSelector } from '../../../../Redux/Hooks';
import { Notification as NotificationType } from '../../../../Data/user.dto';
import { getAllNotificationAPI } from '../../../../Redux/ApiCalls/Dashboard/NotificationAPI';


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
height:30px;
width:30px;
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
width: 22px;
height: 23px;
background: #A720B9;
border-radius:50%;
text-align: center;
display:flex;
align-items: center;
justify-content: center;
position:absolute;
top:2px;
right:-6px;

`;

const Notification: React.FC = () => {
    const { notifications, totalNotifications, isNotificationUpdated } = useAppSelector(state => state.extra)
    const [isOpen, setIsOpen] = useState(false);
    const [currentNotification, setCurrentNotification] = useState<NotificationType[]>([]);
    const [totalNoti, setTotalNoti] = useState(0);
    useEffect(() => {
        if (notifications && notifications.length > 0)
            setCurrentNotification(notifications);
        setTotalNoti(totalNotifications)

    }, [isNotificationUpdated, notifications, totalNotifications])
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (isNotificationUpdated) {
            // console.log("called in this", isNotificationUpdated);
            dispatch(getAllNotificationAPI());
        }

    }, [dispatch, isNotificationUpdated])
    return (
        <NotifcationContainer >
            {isOpen ? <NotificationMenu isOpen={isOpen} handleIsOpen={() => setIsOpen(pre => !pre)} /> : null}
            <NotificationIconContainer onClick={() => setIsOpen(pre => !pre)}>

                <NotificationIcon src={NotificationIconPng} />
            </NotificationIconContainer>
            {(notifications.length !== 0 || isNotificationUpdated) &&
                <NotificationTextContainer >

                    <NotificationText>{totalNotifications}</NotificationText>
                    {/* <NotificationText>15</NotificationText> */}
                </NotificationTextContainer>
            }
        </NotifcationContainer>
    )
}

export default Notification
import React from 'react'
import styled from 'styled-components'
import AllNotificationPNG from '../../../../assets/Icons/allNotiifcation.png'
const Container = styled.div`
display:flex;
width:90%;
margin-left:30px;
align-items:center;
margin-top:10px;
`;
const DataContainer = styled.div``;
const IconContainer = styled.div`
width: 47px;
height: 47px;
background: #A720B926;
border:none;
border-radius:50%;
display:flex;
align-items: center;
justify-content: center;
margin-right:20px;
`;
const Icon = styled.img`
width: 25.16px;
height: 19.68px;
`;
const NotificationTitle = styled.p`
font-family: Urbanist;
font-size: 16px;
font-weight: 500;
line-height: 19.2px;
text-align: left;
margin:0;
`;
const NotificationBody = styled.p`
font-family: Urbanist;
font-size: 14px;
font-weight: 500;
line-height: 19.2px;
text-align: left;
margin:0;
`;
const notificationTime = styled.p``;

interface NotificationItemProps {
    title: string,
    body: string,
    seen: boolean,
}
const NotificationItem: React.FC<NotificationItemProps> = ({ title, body, seen }) => {
    return (
        <Container>
            <IconContainer >
                <Icon src={AllNotificationPNG} />
            </IconContainer>
            <DataContainer>
                <NotificationTitle>
                    {title}
                </NotificationTitle>
                <NotificationBody>
                    {body} {seen}
                </NotificationBody>
            </DataContainer>
        </Container>
    )
}

export default NotificationItem
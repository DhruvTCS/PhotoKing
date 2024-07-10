import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../Redux/Hooks'
import styled from 'styled-components'
import NotificationItem from '../../atoms/Dashboard/Notification/NotificationItem';
import { Notification } from '../../../Data/user.dto'

const Container = styled.div`
width:100%;
height:973px;
overflow-y: auto;
`;
const AllNotificationPage: React.FC = () => {
    const { allNotiifications, isNotificationUpdated } = useAppSelector(state => state.extra)
    const [notifications, setNotifications] = useState<Notification[]>([])
    useEffect(() => {
        setNotifications(allNotiifications);
    }, [allNotiifications])
    return (
        <Container>
            {allNotiifications && allNotiifications.map(noti =>
                <NotificationItem title={noti.title} body={noti.message} seen={noti.is_seen} />
            )}
        </Container>
    )
}

export default AllNotificationPage
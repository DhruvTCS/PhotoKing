import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../../Redux/Hooks';
import NotificationItem from './NotificationItem';
import { Notification } from '../../../../Data/user.dto';
import { getAllNotificationAPI, seenNotification } from '../../../../Redux/ApiCalls/Dashboard/NotificationAPI';
import { useNavigate } from 'react-router-dom';
const NotificationIconContainer = styled.div`
 background: #F8EDFA;
    border: 1px solid #ccc;
    border-radius: 5px;
    height: 400px;  
    position: absolute;
    right: 20px;
    top: 30px;
    width: 300px;
    z-index: 1000;
`;

const NotificationMenuStyled = styled.div`
   
    overflow-y: auto;
    padding: 1em;
     max-height: 300px;  
    text-align: center;
    scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;
`;

const NotificationHeader = styled.div`
height:49px;
display: flex;
justify-content: space-between;
align-items: baseline;
margin-top:10px;
`;
const NotificationTitle = styled.p`
font-family:Montserrat;
font-size: 16px;
font-weight: 700;
line-height: 23px;
margin:0;
text-align: left;
`;
const MarkAllNotification = styled.p`
font-family: Montserrat;
font-size: 12px;
font-weight: 500;
line-height: 20px;
margin:0;
margin-right:10px;
cursor: pointer;
text-decoration: underline;
`;
const NotificationHeaderContainer = styled.div`
display: flex;
flex-direction: column;
margin-left:15px;
align-items: baseline;

`;
const SeeAllNotificationText = styled.p`
margin:0;
font-family: Montserrat;
font-size: 12px;
font-weight: 500;
line-height: 20px;
text-decoration: underline;
margin-right:10px;
cursor: pointer;
`;
const NotificationMenu: React.FC<{ isOpen: boolean, handleIsOpen: () => void }> = ({ isOpen, handleIsOpen }) => {
    const { notifications, isNotificationUpdated } = useAppSelector((state) => state.extra);
    const [seenIds, setSeenIds] = useState<number[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch();
    const navigate = useNavigate()


    const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = Number(entry.target.getAttribute('data-id'));
                if (!seenIds.includes(id)) {
                    setSeenIds(prev => {
                        const newSeen = [...prev, id];


                        return newSeen;
                    });
                }
            }
        });
    }, [seenIds]);
    const handleMarskallNotificationAsRead = () => {
        // const remainNot=[];
        // console.log("calledd")
        // console.log(notifications)
        notifications.forEach(not => {
            // console.log(not)
            if (!seenIds.includes(not.id)) {
                // console.log(not.id)
                seenIds.push(not.id);
                dispatch(seenNotification({ notification_ids: seenIds }));
            }
            handleIsOpen();
        })

    }
    useEffect(() => {
        // // console.log('useEffect triggered');
        if (!listRef.current) {
            console.error('Container ref is not set');
            return;
        }

        const observer = new IntersectionObserver(handleIntersection, {
            root: listRef.current,
            threshold: 0.5,
        });

        const elements = listRef.current.querySelectorAll('.notification');
        // // console.log('Observing elements:', elements);
        elements.forEach(element => observer.observe(element));

        return () => {
            // // console.log('Cleanup: Unobserving elements');
            elements.forEach(element => observer.unobserve(element));
        };
    }, [handleIntersection, notifications.length]);
    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                handleIsOpen();

                dispatch(seenNotification({ notification_ids: seenIds }));
                // console.log('done')
                if (seenIds.length > 0) {
                    sendSeenNotifications(seenIds);
                    setSeenIds([]);
                }
            }
        },
        [handleIsOpen, seenIds]
    );
    useEffect(() => {
        if (isOpen && containerRef.current) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [isOpen, handleClickOutside]);


    const sendSeenNotifications = (id: number[]) => {

        // console.log(id);
    }
    return (
        (notifications && isOpen) ? (
            <NotificationIconContainer ref={containerRef}>
                <NotificationHeader>
                    <NotificationHeaderContainer>

                        <NotificationTitle>Notifications{`(${notifications.length})`}</NotificationTitle>
                        <SeeAllNotificationText onClick={() => navigate("/dashboard/user/allNotifications")}>See all</SeeAllNotificationText>
                    </NotificationHeaderContainer>
                    <MarkAllNotification onClick={() => handleMarskallNotificationAsRead()}>Mark all as read</MarkAllNotification>
                </NotificationHeader>
                <NotificationMenuStyled ref={listRef}>
                    {notifications.length === 0 ? (
                        <p>No pending notification</p>
                    ) : (
                        notifications.map(notification => (
                            // <NotificationItem key={notification.id} data-id={notification.id} className="notification">
                            //     {notification.message}
                            // </NotificationItem>
                            <NotificationItem id={notification.id} title={notification.title} message={notification.message} seen={notification.is_seen} />

                        ))
                    )}
                </NotificationMenuStyled>
            </NotificationIconContainer>
        ) : null
    );
};

export default NotificationMenu;

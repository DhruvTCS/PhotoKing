import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../Redux/Hooks';
import NotificationItem from './NotificationItem';
import { Notification } from '../../../Data/user.dto';
import { getAllNotificationAPI, seenNotification } from '../../../Redux/ApiCalls/Dashboard/NotificationAPI';
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
align-items: center;
`;
const NotificationTitle = styled.p`
font-size: 16px;
font-weight: 700;
line-height: 23px;
margin-left:15px;
text-align: left;
`;
const MarkAllNotification = styled.p`
font-size: 12px;
font-weight: 500;
line-height: 20px;
margin-right:10px;
`;


const NotificationMenu: React.FC<{ isOpen: boolean, handleIsOpen: () => void }> = ({ isOpen, handleIsOpen }) => {
    const notifications = useAppSelector((state) => state.extra.notifications);
    const [seenIds, setSeenIds] = useState<number[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const handleSeenChange = useCallback((newSeenIds: number[], id: number) => {
        // console.log('New seen IDs:', newSeenIds);
        setSeenIds(newSeenIds);
        // dispatch(seenNotification({ notification_id: id }));
        console.log(id);

    }, []);

    const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = Number(entry.target.getAttribute('data-id'));
                if (!seenIds.includes(id)) {
                    setSeenIds(prev => {
                        const newSeen = [...prev, id];

                        handleSeenChange(newSeen, id);
                        return newSeen;
                    });
                }
            }
        });
    }, [seenIds, handleSeenChange]);

    useEffect(() => {
        // console.log('useEffect triggered');
        if (!containerRef.current) {
            console.error('Container ref is not set');
            return;
        }

        const observer = new IntersectionObserver(handleIntersection, {
            root: containerRef.current,
            threshold: 0.5,
        });

        const elements = containerRef.current.querySelectorAll('.notification');
        // console.log('Observing elements:', elements);
        elements.forEach(element => observer.observe(element));

        return () => {
            // console.log('Cleanup: Unobserving elements');
            elements.forEach(element => observer.unobserve(element));
        };
    }, [handleIntersection, notifications.length]);
    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                handleIsOpen();
                dispatch(getAllNotificationAPI());
                console.log('done')
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

        console.log(id);
    }
    return (
        (notifications && isOpen) ? (
            <NotificationIconContainer>
                <NotificationHeader>
                    <NotificationTitle>Notifications{`(${notifications.length})`}</NotificationTitle>
                    <MarkAllNotification>Mark all as read</MarkAllNotification>
                </NotificationHeader>
                <NotificationMenuStyled ref={containerRef}>
                    {notifications.length === 0 ? (
                        <p>No notifications</p>
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

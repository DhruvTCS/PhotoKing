// src/components/NotificationItem.tsx
import React from 'react';
import styled from 'styled-components';

const NotificationItemStyled = styled.div`
    border-bottom: 1px solid #eee;
    padding: 0.5em 0;
`;

const NotificationItemTitle = styled.p`
    font-family: Urbanist;
font-size: 16px;
font-weight: 700;
line-height: 23px;
text-align: left;

    margin: 0;
`;

const NotificationItemMessage = styled.p`
    margin: 0;
    font-family: Urbanist;
font-size: 14px;
font-weight: 500;
line-height: 23px;
text-align: left;

`;

interface NotificationItemProps {
    id: number;
    title: string;
    message: string;
    seen: boolean;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ title, message, id }) => {
    return (
        <NotificationItemStyled data-id={id} className='notification'>
            <NotificationItemTitle>{title}</NotificationItemTitle>
            <NotificationItemMessage>{message}</NotificationItemMessage>
        </NotificationItemStyled>
    );
};

export default NotificationItem;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UnderLine from '../../../atoms/Login/UnderLine';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (eventData: EventData) => void;
    selectedSlot: SlotInfo | null;
}

interface EventData {
    eventName: string;
    dateTime: Date;
    members: string[];
}

interface SlotInfo {
    start: Date;
    end: Date;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 700px;
  width: 100%;
`;

const CloseButton = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
`;

const ModalTitle = styled.h2`
  font-family: Urbanist;
font-size: 20px;
font-weight: 600;
line-height: 30px;
text-align: center;

  margin-bottom: 1rem;
`;

const ModalLabel = styled.label`
font-family: Urbanist;
font-size: 18px;
font-weight: 600;
line-height: 18px;
text-align: left;
color: #424242;

  margin-bottom: 0.5rem;
`;

const ModalInput = styled.input`
  width: 98%;
//   padding: 0.5rem;
padding:0px;
border:none;

&:focus{
    outline:none;
    }
    `;

const MemberContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    `;

const MemberLabel = styled.label`
    display: flex;
    align-items: center;
    `;

const MemberCheckbox = styled.input`
    margin-right: 0.5rem;
    `;

const SubmitButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease;
    
    &:hover {
        background-color: #0056b3;
        }
        `;
const InputNameConatiner = styled.div`
        display:flex;
        flex-direction: column;
        align-items: left;
          margin-bottom: 1rem;
`;
const ModalDateConatiner = styled.div`
display:flex;
flex-direction: column;
align-items: baseline;
`;
const DateLable = styled.div`
font-family: Urbanist;
font-size: 18px;
font-weight: 600;
line-height: 18px;
text-align: left;
color: #424242;
`;
const DateRangeConatiner = styled.div`
margin-top:10px;
display:flex;
justify-content: space-between;
width: 100%;
`;
const FromDateConatiner = styled.div`
display:flex;
flex-direction: column;
width:40%;
`;
const Fromdate = styled.input`
border:none;
&:focus{
outline:none;
}
`;
const FromDateLable = styled.label`
text-align: left;
font-family: Urbanist;
font-size: 16px;
font-weight: 500;
line-height: 18px;
text-align: left;
color: grey;
`;
const EventCreateModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, selectedSlot }) => {


    const [eventName, setEventName] = useState('');
    const [members, setMembers] = useState<string[]>([]);
    const [startDateTime, setStartDateTime] = useState('');
    const [endDateTime, setEndDateTime] = useState('');

    useEffect(() => {
        if (selectedSlot) {
            const start = new Date(selectedSlot.start);
            const end = new Date(selectedSlot.end);
            setStartDateTime(start.toISOString().slice(0, 16));
            setEndDateTime(end.toISOString().slice(0, 16));
        }

    }, [selectedSlot]);

    const handleEventNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventName(e.target.value);
    };


    const handleSubmit = () => {
        const eventData = {
            title: eventName,
            members,
        };

        // onSubmit(eventData);
    };



    if (!isOpen) return null;

    return (
        selectedSlot ?
            <ModalOverlay>
                <ModalContent>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                    <ModalTitle>Add Event</ModalTitle>
                    <InputNameConatiner>
                        <ModalLabel>Event Name:</ModalLabel>
                        <ModalInput
                            type="text"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            placeholder="Enter event name"
                        />
                        <UnderLine width={100} isPercent={true} />
                    </InputNameConatiner>
                    <ModalDateConatiner>
                        <DateLable>Select Date & Time</DateLable>
                        <DateRangeConatiner>
                            <FromDateConatiner>
                                <FromDateLable>
                                    From
                                </FromDateLable>
                                <Fromdate type='datetime-local' placeholder='Select date and time' value={startDateTime} />
                                <UnderLine width={100} isPercent={true} />
                            </FromDateConatiner>
                            <FromDateConatiner>
                                <FromDateLable>
                                    To
                                </FromDateLable>
                                <Fromdate type='datetime-local' placeholder='Select date and time' value={endDateTime} />
                                <UnderLine width={100} isPercent={true} />
                            </FromDateConatiner>
                        </DateRangeConatiner>
                    </ModalDateConatiner>

                    {/* Add more members as needed */}
                    <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
                </ModalContent>
            </ModalOverlay>
            : null
    );
};

export default EventCreateModal;

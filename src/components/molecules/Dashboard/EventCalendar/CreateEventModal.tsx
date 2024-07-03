import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import UnderLine from '../../../atoms/Login/UnderLine';
import { useAppDispatch, useAppSelector } from '../../../../Redux/Hooks';
import { useNavigate } from 'react-router-dom';

import PlusSignIconPNG from '../../../../assets/Icons/addIcon.png'
import SubmitButton from '../../../atoms/Login/SubmitButton';
import { createEventAPI } from '../../../../Redux/ApiCalls/Dashboard/EventAPI';
import { showErrorToast } from '../../../atoms/Utlis/Toast';
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
// margin-bottom: 1rem;
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
const SelectMemberLabel = styled.select`

width: 50%;
border:none;
outline:none;
`;
const AddMemberLabel = styled.label`
text-align: left;
font-family: Urbanist;
font-size: 16px;
font-weight: 500;
line-height: 18px;
text-align: left;
color: grey;
`;

const MemberSelecetionConatiner = styled.div` 
width:100%;
margin-top:1rem;
`;
const SelectedMemberConatiner = styled.div``;
const SelectionMenuListConatiner = styled.div`
text-align: left;
cursor: pointer;

`;
const AddMemberConatiner = styled.div`
width:100%;
display:flex;
align-items: center;
justify-content: space-between;
`;
const SelectMemberHeading = styled.p`
font-family: Urbanist;
font-size: 18px;
font-weight: 600;
line-height: 18px;
text-align: left;
color: #424242;
`;
const MemberMenuConatriner = styled.div`
display: flex;
align-items: center;
justify-content: center;
`;
const AddMemberListConatiner = styled.div`
width:100%;
height:100%;
// background:red;
box-shadow: 0px 14px 44px 0px #00000026;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
z-index:100;
// position:absolute;
background:white;
border-radius:10px;
`;

const MenuHeadingConatiner = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`;
const MenuHeading = styled.p``;
const AddMemberButton = styled.button`
  border: 1px solid #a720b9;
  width: 137px;
  height: 30px;
//   margin-right: 52px;
  border: 1px;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  background: none;
  border: 1px solid #a720b9;
`
const PlusSignContainer = styled.div``
const PlusSignIcon = styled.img`
  height: 21px;
  width: 21px;
`

const ButtonText = styled.div`
  width: 89px;
  height: 17px;
  font-family: 'Urbanist', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 16.8px;
  text-align: left;
  margin-left:6px;
  color: #a720b9;
`
const SelectMemberHeadingConatiner = styled.div`
display:flex;
align-items: center;
justify-content: space-between;
`;
const MemberList = styled.div`
display: flex;
flex-direction: column;
width: 97%;

// border: 1px solid black;
// height:300px;
max-height: 172px;
overflow: auto;

`;
const MemberData = styled.div`
display: flex;
flex-direction: row;
align-items: center;
cursor: pointer;
`;
const MemberName = styled.p`
font-family: Urbanist;
font-size: 16px;
font-weight: 700;
line-height: 23px;
text-align: left;

    margin: 0;
`;
const MemberRole = styled.p`
font-family: Urbanist;
font-size: 14px;
font-weight: 500;
line-height: 23px;
text-align: left;

    margin: 0;
`;
const MemberListItem = styled.label`
display: flex;
align-items: center;
justify-content: space-between;
width:100%;
margin-top:10px;
cursor:pointer;
// padding-right:20px;
// margin-right:20px;
`;
const MemberText = styled.div`
margin-left:10px;
`;
const MemberSelectButton = styled.input`
margin-right:10px;
cursor: pointer;
`;
const MeberProfileImage = styled.img`
width:40px;
height:40px;
border-radius:50%;
`;

const SelectedMembersList = styled.div`
display: flex;
flex-wrap:wrap;
`;
const SelectedMemberDataConatiner = styled.div`
width:30%;
margin-bottom:10px;
// box-shadow: 0px 14px 44px 0px #00000026;
border:1px solid #00000026;
border-radius:10px;
margin-right:4px;
padding:5px;
`;
const SelectedMemberData = styled.div`
display: flex;
justify-content: space-between;
`;
const SubmitConatiner = styled.div`
margin-top:10px;
`;


const EventCreateModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, selectedSlot }) => {


    const [eventName, setEventName] = useState('');
    const [eventLocation, setEventLocation] = useState('')
    const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
    const [startDateTime, setStartDateTime] = useState('');
    const [endDateTime, setEndDateTime] = useState('');
    const { members } = useAppSelector(state => state.member);
    const { currentEvent } = useAppSelector(state => state.event)
    const selectionRef = useRef<HTMLSelectElement>(null);
    const [addMemberMenu, setAddMemberMenu] = useState(false);
    const [activeButton, setActiveButton] = useState(false);
    const selectMenuRef = useRef<HTMLDivElement>(null)
    const [isUpdate, setIsUpdate] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (currentEvent) {
            // const start = new Date(currentEvent.start);
            // const end = new Date(currentEvent.end);
            // console.log();
            const start = new Date(currentEvent.start);
            const end = new Date(currentEvent.end);
            const padZero = (num: number) => num.toString().padStart(2, '0');

            const formatedStart = `${start.getFullYear()}-${padZero(start.getMonth() + 1)}-${padZero(start.getDate())}T${padZero(start.getHours())}:${padZero(start.getMinutes())}`;
            const formatedEnd = `${end.getFullYear()}-${padZero(end.getMonth() + 1)}-${padZero(end.getDate())}T${padZero(end.getHours())}:${padZero(end.getMinutes())}`;
            console.log(start);
            setIsUpdate(true);
            setStartDateTime(formatedStart);
            setEndDateTime(formatedEnd);
            setEventName(currentEvent.title);
            setEventLocation(currentEvent.location);
        }
        else if (selectedSlot) {
            const start = new Date(selectedSlot.start);
            const end = new Date(selectedSlot.end);
            const padZero = (num: number) => num.toString().padStart(2, '0');

            const formatedStart = `${start.getFullYear()}-${padZero(start.getMonth() + 1)}-${padZero(start.getDate())}T${padZero(start.getHours())}:${padZero(start.getMinutes())}`;
            const formatedEnd = `${end.getFullYear()}-${padZero(end.getMonth() + 1)}-${padZero(end.getDate())}T${padZero(end.getHours())}:${padZero(end.getMinutes())}`;
            console.log(start);
            setStartDateTime(formatedStart);
            setEndDateTime(formatedEnd);
            setSelectedMembers([])
        }
        return () => {
            setEventLocation('');
            setEventName('');
            setStartDateTime('');
            setEndDateTime('');
            setSelectedMembers([])
        }
    }, [selectedSlot, currentEvent]);
    const handleClickOutside = (event: MouseEvent) => {
        if (
            selectMenuRef.current &&
            !selectMenuRef.current.contains(event.target as Node)
        ) {
            setAddMemberMenu(false);
        }
    };

    useEffect(() => {
        if (addMemberMenu) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [addMemberMenu])
    useEffect(() => {
        IsValidData();
    }, [eventName, startDateTime, endDateTime])
    const handleEventNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventName(e.target.value);
    };

    const handleMember = (id: number) => {
        if (selectedMembers.includes(id)) {
            setSelectedMembers(pre => pre.filter(val => val !== id));
        } else {
            setSelectedMembers(pre => [...pre, id]);
        }

    }
    const IsValidData = () => {

        // console.log(startDate, startTime);
        if (eventName.length > 0 && eventName.length <= 25 && startDateTime.length !== 0 && endDateTime.length !== 0) {
            setActiveButton(true);
        } else {
            setActiveButton(false);
        }
    }
    const handleSubmit = () => {
        if (new Date(startDateTime) > new Date(endDateTime)) showErrorToast("Please enter valid from and to date and time.")
        else {
            const date = startDateTime.toString().slice(0, 10);
            const time = startDateTime.toString().slice(11, 16);
            console.log({ date, time, title: eventName, location: eventLocation, members: `${selectedMembers}` })
            // dispatch(createEventAPI({ date, time, title: eventName, location: eventLocation, members: `${selectedMembers}` }))
            onClose()
        }

        // onSubmit(eventData);
    };
    useEffect(() => {
        console.log(selectedMembers)
    }, [selectedMembers])


    if (!isOpen) return null;

    return (
        selectedSlot || currentEvent ?
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
                    <InputNameConatiner>
                        <ModalLabel>Location:</ModalLabel>
                        <ModalInput
                            type="text"
                            value={eventLocation}
                            onChange={(e) => setEventLocation(e.target.value)}
                            placeholder="Enter event's location"
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
                                <Fromdate type='datetime-local' onChange={(e) => setStartDateTime(e.target.value)} placeholder='Select date and time' value={startDateTime} />
                                <UnderLine width={100} isPercent={true} />
                            </FromDateConatiner>
                            <FromDateConatiner>
                                <FromDateLable>
                                    To
                                </FromDateLable>
                                <Fromdate type='datetime-local' onChange={(e) => setEndDateTime(e.target.value)} placeholder='Select date and time' value={endDateTime} />
                                <UnderLine width={100} isPercent={true} />
                            </FromDateConatiner>
                        </DateRangeConatiner>
                        {/* <UnderLine width={100} isPercent={true} /> */}
                        <MemberSelecetionConatiner>
                            <SelectMemberHeadingConatiner>
                                <SelectMemberHeading>Selected Members {`(${selectedMembers.length})`}</SelectMemberHeading>
                                <AddMemberButton onClick={() => navigate('/dashboard/members/create/new')}>
                                    <PlusSignContainer>
                                        <PlusSignIcon src={PlusSignIconPNG}></PlusSignIcon>
                                    </PlusSignContainer>
                                    <ButtonText>New Member</ButtonText>
                                </AddMemberButton>
                            </SelectMemberHeadingConatiner>
                            <SelectedMemberConatiner>
                                <SelectedMembersList>
                                    {members.map(member => selectedMembers.includes(parseInt(member.id)) && <SelectedMemberDataConatiner>
                                        <SelectedMemberData>
                                            <MemberData  >
                                                <MeberProfileImage src={member.profile_image} />
                                                <MemberText>

                                                    <MemberName>{member.name}</MemberName>
                                                    <MemberRole>{member.job_type}</MemberRole>
                                                </MemberText>

                                            </MemberData>
                                            <CloseButton onClick={() => handleMember(parseInt(member.id))}>&times;</CloseButton>
                                        </SelectedMemberData>
                                    </SelectedMemberDataConatiner>)}

                                </SelectedMembersList>
                            </SelectedMemberConatiner>
                            <SelectionMenuListConatiner >
                                <AddMemberConatiner onClick={() => setAddMemberMenu(pre => !pre)}>

                                    <AddMemberLabel>Add Member</AddMemberLabel>
                                    <SelectMemberLabel ref={selectionRef} defaultValue={"Add Member"}>
                                        {/* <option value="Add Member" selected >Add Member</option> */}
                                    </SelectMemberLabel>
                                </AddMemberConatiner>
                                <UnderLine width={100} isPercent={true} />
                                <MemberMenuConatriner>

                                    {addMemberMenu && <AddMemberListConatiner ref={selectMenuRef}>
                                        <MemberList>
                                            {members.map(member =>
                                                <MemberListItem htmlFor={`member${member.id}`} >

                                                    <MemberData  >
                                                        <MeberProfileImage src={member.profile_image} />
                                                        <MemberText>

                                                            <MemberName>{member.name}</MemberName>
                                                            <MemberRole>{member.job_type}</MemberRole>
                                                        </MemberText>
                                                    </MemberData>
                                                    <MemberSelectButton id={`member${member.id}`} type='checkbox' onChange={() => { handleMember(parseInt(member.id)) }} checked={selectedMembers.includes(parseInt(member.id))}></MemberSelectButton>
                                                </MemberListItem>
                                            )}

                                        </MemberList>
                                    </AddMemberListConatiner>}
                                </MemberMenuConatriner>
                            </SelectionMenuListConatiner>
                        </MemberSelecetionConatiner>
                    </ModalDateConatiner>

                    {/* Add more members as needed */}
                    <SubmitConatiner>

                        <SubmitButton active={!activeButton} text={isUpdate ? 'Update' : 'Create'} width={270} needArrow={false} onClick={handleSubmit} />
                    </SubmitConatiner>
                </ModalContent>
            </ModalOverlay>
            : null
    );
};

export default EventCreateModal;

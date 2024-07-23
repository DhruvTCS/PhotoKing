import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import UnderLine from '../../../atoms/Login/UnderLine';
import { useAppDispatch, useAppSelector } from '../../../../Redux/Hooks';
import SubmitButton from '../../../atoms/Login/SubmitButton';
import { createEventAPI, deleteEventAPI, updateEventAPI } from '../../../../Redux/ApiCalls/Dashboard/EventAPI';
import { showErrorToast, showSuccessToast } from '../../../atoms/Utlis/Toast';
import DeleteIconPNG from '../../../../assets/Icons/deleteIcon.png'
import DeleteEventPopup from '../../../atoms/Dashboard/Events/DeleteEventPopup';
import Errortext from '../../../atoms/Utlis/Errortext';
import { CalendarSubEvents } from '../../../../Data/event.dto';
import SubCalendarEventModal from '../../../atoms/Dashboard/Events/SubCalendarEventModal';
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

const EventCreateModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, selectedSlot }) => {


    const [eventName, setEventName] = useState('');
    const [eventLocation, setEventLocation] = useState('')
    const [eventMembers, setEventMembers] = useState<number[]>([])
    const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
    const [startDateTime, setStartDateTime] = useState('');
    const [endDateTime, setEndDateTime] = useState('');
    const { members } = useAppSelector(state => state.member);
    const { currentEvent } = useAppSelector(state => state.event)
    const selectionRef = useRef<HTMLSelectElement>(null);
    const [addMemberMenu, setAddMemberMenu] = useState(false);
    const [deleteMember, setDeleteMember] = useState<number[]>([]);
    const [subEvents, setSubEvents] = useState<CalendarSubEvents[]>([])
    const [locationList, setLocationList] = useState<string[]>([])
    const selectMenuRef = useRef<HTMLDivElement>(null)
    const [
        currentSubEvent,
        setCurrentSubEvent,
    ] = useState<CalendarSubEvents | null>(null)

    const [isSubEventModal, setIsSubEventModal] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false);
    // const navigate = useNavigate();
    const [locationModal, setLocationModal] = useState<boolean>(false);
    const [deletePopup, setDeletePopUp] = useState(false);
    const startDateRef = useRef<HTMLInputElement>(null)
    const endDateRef = useRef<HTMLInputElement>(null);
    const [showError, setShowError] = useState(false);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (currentEvent) {
            // const start = new Date(currentEvent.start);
            // const end = new Date(currentEvent.end);
            // // console.log();
            const start = new Date(currentEvent.start);
            const end = new Date(currentEvent.end);
            const padZero = (num: number) => num.toString().padStart(2, '0');
            currentEvent.members.forEach((member) => {
                // eventMembers.push(member.member);
                setEventMembers(pre => [...pre, member.member])
                // console.log("pushing member")
            })
            const formatedStart = `${start.getFullYear()}-${padZero(start.getMonth() + 1)}-${padZero(start.getDate())}T${padZero(start.getHours())}:${padZero(start.getMinutes())}`;
            const formatedEnd = `${end.getFullYear()}-${padZero(end.getMonth() + 1)}-${padZero(end.getDate())}T${padZero(end.getHours())}:${padZero(end.getMinutes())}`;
            // // console.log(start);
            setIsUpdate(true);
            setStartDateTime(formatedStart);
            setSubEvents(currentEvent.sub_events)
            setEndDateTime(formatedEnd);
            setEventName(currentEvent.title);
            setDeletePopUp(false)
        }
        else if (selectedSlot) {
            const start = new Date(selectedSlot.start);
            const end = new Date(selectedSlot.end);
            const padZero = (num: number) => num.toString().padStart(2, '0');

            const formatedStart = `${start.getFullYear()}-${padZero(start.getMonth() + 1)}-${padZero(start.getDate())}T${padZero(start.getHours())}:${padZero(start.getMinutes())}`;
            const formatedEnd = `${end.getFullYear()}-${padZero(end.getMonth() + 1)}-${padZero(end.getDate())}T${padZero(end.getHours())}:${padZero(end.getMinutes())}`;
            // // console.log(start);
            setStartDateTime(formatedStart);
            setEndDateTime(formatedEnd);
            setSelectedMembers([])
        }
        return () => {
            // dispatch(clearCurrentEvent());
            setEventLocation('');
            setEventName('');
            setSubEvents([]);
            setStartDateTime('');
            setEndDateTime('');
            setSelectedMembers([])
            setDeleteMember([]);
            setIsUpdate(false);
            setShowError(false);
            setEventMembers([]);
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


    const handleMember = (id: number) => {
        if (deleteMember.includes(id)) {
            setDeleteMember(pre => pre.filter(member => member !== id));
            eventMembers.push(id);
        } else {

            if (selectedMembers.includes(id)) {
                setSelectedMembers(pre => pre.filter(val => val !== id));
            } else {
                setSelectedMembers(pre => [...pre, id]);
            }
        }

    }

    const validEventName = (name: string) => {
        if (name.length > 0 && name.length < 35) {
            return true;
        } else return false;
    }


    const validSubEvents = (subEvents: CalendarSubEvents[]) => {
        if (subEvents.length > 0) return true
        else return false
    }

    const handleSubmit = () => {
        if (!validEventName(eventName) && subEvents.length < 0) {
            setShowError(true);
        }
        else {
            console.log(eventName, subEvents)
            const subEventsData = subEvents.map(event => ({
                sub_event_name: event.sub_event_name,
                start_date: event.start_date,
                start_time: event.start_time,
                end_date: event.end_date,
                end_time: event.end_time,
                location: event.location,
                sub_event_member_id: event.members.map(member => member.member)

            }))
            // console.log(isUpdate)
            // console.log(subEventsData)
            // // console.log({ date, time, title: eventName, location: eventLocation, members: `${selectedMembers}` })
            if (isUpdate && currentEvent)
                dispatch(updateEventAPI({ business_event_id: currentEvent.id, title: eventName, event_member: [...selectedMembers, ...eventMembers], sub_events: subEventsData }))
            // dispatch(updateEventAPI({ event_id: currentEvent.id, start_date: startDate, end_date: endDate, start_time: startTime, end_time: endTime, title: eventName, location: eventLocation, member_ids: [...selectedMembers, ...eventMembers] }))
            else
                dispatch(createEventAPI({ title: eventName, event_member_id: selectedMembers, sub_events: subEventsData }))
            // console.log(selectedMembers)

            setAddMemberMenu(false);
            onClose()
        }

        // onSubmit(eventData);
    };
    const handleDeleteMember = (id: number) => {
        if (!deleteMember.includes(id) && eventMembers.includes(id)) {
            setDeleteMember([...deleteMember, id]);
            setEventMembers(pre => pre.filter(member => member !== id));
        }
    }

    const handleDeleteEvent = (id: number) => {
        dispatch(deleteEventAPI({ id }));
        // dispatch(clearCurrentEvent());

        onClose();

    }
    const handleButtonClick = (buttonAction: () => void) => {
        setAddMemberMenu(false);
        buttonAction();
    };
    const handleAddSubEvents = (subEvent: CalendarSubEvents) => {
        let filteredSubEvents = subEvents.filter((e) => e.id !== subEvent.id)
        setSubEvents([...filteredSubEvents, subEvent])
        setIsSubEventModal(false)
    }
    const handleRemoveSubEvents = (subEvent: CalendarSubEvents) => {
        setSubEvents(pre => pre.filter((e) => e.id !== subEvent.id))
    }
    if (!isOpen) return null;

    return (
        selectedSlot || currentEvent ?
            <ModalOverlay>
                <ModalContent>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                    <ModalTitleConatiner>
                        {currentEvent ?
                            <>
                                {deletePopup && <DeleteEventPopup Delete={() => handleDeleteEvent(currentEvent.id)} cancel={() => setDeletePopUp(false)} />}
                                <ModalTitle> {`Event`}&nbsp;</ModalTitle>
                                <DeleteEventConatiner onClick={() => setDeletePopUp(true)}>
                                    {`(Delete Event `} <DeleteIcon src={DeleteIconPNG} /> {`)`}
                                </DeleteEventConatiner></> : <ModalTitle>Add Event</ModalTitle>


                        }
                    </ModalTitleConatiner>

                    <InputNameConatiner>
                        <ModalLabel>Event Name:</ModalLabel>
                        <ModalInput
                            type="text"
                            value={eventName}
                            onChange={(e) => { if (e.target.value.length < 35) setEventName(e.target.value) }}
                            placeholder="Enter event name"
                        />
                        <UnderLine width={100} isPercent={true} />
                        <Errortext show={showError && !validEventName(eventName)} message='Please provide valid event name.' />
                    </InputNameConatiner>
                    <FormField>
                        {isSubEventModal && (
                            <SubCalendarEventModal
                                locationList={locationList}
                                setLocationList={setLocationList}
                                currentLength={subEvents.length}
                                addSubEvent={handleAddSubEvents}
                                currentSubEvent={currentSubEvent}
                                onClose={() => setIsSubEventModal(false)}
                            />
                        )}
                        <InputContainer>
                            <AddSubEventHeaderContainer>
                                <Label htmlFor="name">Sub Events</Label>
                                {subEvents.length <= 10 && <AddSubEventButton
                                    onClick={() => {
                                        setCurrentSubEvent(null)
                                        setIsSubEventModal(true)
                                    }}
                                >
                                    +
                                </AddSubEventButton>}
                            </AddSubEventHeaderContainer>
                            <SubEventsList>
                                {subEvents.map((event) => (
                                    <SubEventNameContainer
                                        onClick={() => {
                                            setCurrentSubEvent(event)
                                            setIsSubEventModal(true)
                                        }}
                                    >
                                        <SubEventName
                                            type="text"
                                            value={event.sub_event_name}
                                            readOnly
                                        />
                                        <CloseButtonSubEvent
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemoveSubEvents(event)
                                            }}
                                        >
                                            &times;
                                        </CloseButtonSubEvent>
                                    </SubEventNameContainer>
                                ))}
                            </SubEventsList>
                        </InputContainer>
                        <UnderLine width={100} isPercent={true} />
                        <Errortext
                            message="Please Add sub events"
                            show={showError && !validSubEvents(subEvents)}
                        />
                    </FormField>
                    <ModalDateConatiner>
                        <MemberSelecetionConatiner>
                            <SelectMemberHeadingConatiner>
                                <SelectMemberHeading>Selected Members {`(${selectedMembers.length})`}</SelectMemberHeading>
                            </SelectMemberHeadingConatiner>
                            <SelectedMemberConatiner>
                                <SelectedMembersList>
                                    {
                                        currentEvent && members && eventMembers.length > 0 && (members.map(member => eventMembers.includes(parseInt(member.id)) && <SelectedMemberDataConatiner>
                                            <SelectedMemberData>
                                                <MemberData  >
                                                    <MeberProfileImage src={member.profile_image} />
                                                    <MemberText>

                                                        <MemberName>{member.name}</MemberName>
                                                        <MemberRole>{member.job_type}</MemberRole>
                                                    </MemberText>

                                                </MemberData>
                                                <DeleteIcon onClick={(e) => handleButtonClick(() => handleDeleteMember(parseInt(member.id)))} src={DeleteIconPNG} />
                                            </SelectedMemberData>
                                        </SelectedMemberDataConatiner>))
                                    }
                                    {members && members.map(member => selectedMembers.includes(parseInt(member.id)) && <SelectedMemberDataConatiner>
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
                                <div onClick={() => { !members ? showErrorToast("No Members Available.") : setAddMemberMenu(pre => !pre) }}>

                                    <AddMemberConatiner >

                                        <AddMemberLabel>Add Member</AddMemberLabel>
                                        <SelectMemberLabel ref={selectionRef} defaultValue={"Add Member"}>
                                            {/* <option value="Add Member" selected >Add Member</option> */}
                                        </SelectMemberLabel>
                                    </AddMemberConatiner>
                                    <UnderLine width={100} isPercent={true} />
                                </div>
                                <Errortext show={showError && (selectedMembers.length <= 0 && eventMembers.length <= 0)} message='Please add event member.' />
                                <MemberMenuConatriner>

                                    {addMemberMenu && <AddMemberListConatiner ref={selectMenuRef}>
                                        <MemberList>
                                            {members && members.map(member => !eventMembers.includes(parseInt(member.id)) &&
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

                        <SubmitButton text={currentEvent ? 'Update' : 'Create'} width={270} needArrow={false} onClick={handleSubmit} />
                    </SubmitConatiner>
                </ModalContent>
            </ModalOverlay>
            : null
    );
};

export default EventCreateModal;



const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
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
    max-height: 676px;
    overflow-y: auto;
`;

const CloseButton = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
`;
const ModalTitleConatiner = styled.div`
display:flex;
align-items: center;
justify-content: center;
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
align-items: center;
`;
const SubmitConatiner = styled.div`
margin-top:10px;
display:flex;
align-items: center;
justify-content: center;
`;
const DeleteIcon = styled.img`
height:25px;
width:25px;
cursor:pointer;
`;
const DeleteEventConatiner = styled.div`
display: flex;
align-items: center;
justify-content: center;
cursor:pointer;
&:hover{
color:#B827BB;
}
`;


const FormField = styled.div`
  display: flex;
  flex-direction: column;
  
  margin-top:30px;

`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const SubEventsList = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const AddSubEventHeaderContainer = styled.div`
  display: flex;
  
  align-items: center;
  justify-content: space-between;
`
const AddSubEventButton = styled.button`
  font-size: 20px;
  border: 1px solid gray;
  font-weight: 400;
  background-color: transparent;
  border-radius: 50%;
  color: gray;
  cursor: pointer;
`

const SubEventNameContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  margin: 10px 0px 0px 10px;
  
  border: 1px solid gray;
  border-radius: 10px;
`

const SubEventName = styled.input`
  border: none;
  background-color: transparent;
  max-width: 83px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`

const CloseButtonSubEvent = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  text-align: end;
`

const Label = styled.label`
  font-family: Urbanist;
  font-size: 18px;
  font-weight: 600;
  line-height: 18px;
  text-align: left;
  color: #424242;

`
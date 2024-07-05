import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import UnderLine from '../../../atoms/Login/UnderLine';
import { useAppDispatch, useAppSelector } from '../../../../Redux/Hooks';
import SubmitButton from '../../../atoms/Login/SubmitButton';
import { deleteEventAPI } from '../../../../Redux/ApiCalls/Dashboard/EventAPI';
import { showErrorToast, showSuccessToast } from '../../../atoms/Utlis/Toast';
import DeleteIconPNG from '../../../../assets/Icons/deleteIcon.png'
import DeleteEventPopup from '../../../atoms/Dashboard/Events/DeleteEventPopup';
import LocationPickerModal from '../../../atoms/Dashboard/Events/SetLocationModal';
import Errortext from '../../../atoms/Utlis/Errortext';
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
    const [activeButton, setActiveButton] = useState(false);
    const [deletMember, setDeleteMember] = useState<number[]>([]);
    const selectMenuRef = useRef<HTMLDivElement>(null)
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
            // console.log();
            const start = new Date(currentEvent.start);
            const end = new Date(currentEvent.end);
            const padZero = (num: number) => num.toString().padStart(2, '0');
            currentEvent.members.forEach((member) => {
                // eventMembers.push(member.member);
                setEventMembers(pre => [...pre, member.member])
                console.log("pushing member")
            })
            const formatedStart = `${start.getFullYear()}-${padZero(start.getMonth() + 1)}-${padZero(start.getDate())}T${padZero(start.getHours())}:${padZero(start.getMinutes())}`;
            const formatedEnd = `${end.getFullYear()}-${padZero(end.getMonth() + 1)}-${padZero(end.getDate())}T${padZero(end.getHours())}:${padZero(end.getMinutes())}`;
            // console.log(start);
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
            // console.log(start);
            setStartDateTime(formatedStart);
            setEndDateTime(formatedEnd);
            setSelectedMembers([])
        }
        return () => {
            // dispatch(clearCurrentEvent());
            setEventLocation('');
            setEventName('');
            setStartDateTime('');
            setEndDateTime('');
            setSelectedMembers([])
            setDeleteMember([]);
            setEventMembers([]);
        }
    }, [selectedSlot, currentEvent]);


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


    const handleClickOutside = (event: MouseEvent) => {
        if (
            selectMenuRef.current &&
            !selectMenuRef.current.contains(event.target as Node)
        ) {
            setAddMemberMenu(false);
        }
    };


    const handleMember = (id: number) => {
        if (deletMember.includes(id)) {
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
    const IsValidData = () => {

        // console.log(startDate, startTime);
        if (eventName.length > 0 && eventName.length <= 25 && startDateTime.length !== 0 && endDateTime.length !== 0) {
            setActiveButton(true);
        } else {
            setActiveButton(false);
        }
    };

    const handleSubmit = () => {
        if (new Date(startDateTime) > new Date(endDateTime)) showErrorToast("Please enter valid date and time.")
        if (!activeButton) {
            setShowError(true);
        }
        else {
            const startDate = startDateTime.toString().slice(0, 10);
            const endDate = endDateTime.toString().slice(0, 10);
            const startTime = startDateTime.toString().slice(11, 16);
            const endTime = endDateTime.toString().slice(11, 16);
            console.log(startDate, endDate, startTime, endTime)
            // console.log({ date, time, title: eventName, location: eventLocation, members: `${selectedMembers}` })
            // dispatch(createEventAPI({ date, time, title: eventName, location: eventLocation, members: `${selectedMembers}` }))
            onClose()
        }

        // onSubmit(eventData);
    };
    const handleDeleteMember = (id: number) => {
        if (!deletMember.includes(id) && eventMembers.includes(id)) {
            setDeleteMember([...deletMember, id]);
            setEventMembers(pre => pre.filter(member => member !== id));
        }
    }

    const handleDeleteEvent = (id: number) => {
        dispatch(deleteEventAPI({ id }));
        // dispatch(clearCurrentEvent());
        showSuccessToast('Event Deleted.')
        onClose();

    }
    const handleButtonClick = (buttonAction: () => void) => {
        setAddMemberMenu(false);
        buttonAction();
    };
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
                            onChange={(e) => setEventName(e.target.value)}
                            placeholder="Enter event name"
                        />
                        <UnderLine width={100} isPercent={true} />
                        <Errortext show={showError && eventName.length <= 0} message='Please provide event name.' />
                    </InputNameConatiner>
                    <InputNameConatiner style={{ "cursor": "pointer" }} onClick={() => setLocationModal(true)}>
                        <ModalLabel>Location:</ModalLabel>
                        <ModalInput style={{ "cursor": "pointer" }}
                            type="text"
                            value={eventLocation}
                            onChange={(e) => setEventLocation(e.target.value)}
                            placeholder="Enter event's location"
                            readOnly={true}
                        />
                        <UnderLine width={100} isPercent={true} />
                        <Errortext show={showError && eventLocation.length <= 0} message='Please provide event location.' />
                    </InputNameConatiner>
                    {locationModal && <LocationPickerModal isOpen={locationModal} onClose={() => setLocationModal(false)} onSelect={(str) => console.log(str)} />}
                    <ModalDateConatiner>
                        <DateLable>Select Date & Time</DateLable>
                        <DateRangeConatiner>
                            <FromDateConatiner onClick={() => startDateRef.current?.showPicker()}>
                                <FromDateLable>
                                    From
                                </FromDateLable>
                                <Fromdate type='datetime-local' ref={startDateRef} onChange={(e) => setStartDateTime(e.target.value)} placeholder='Select date and time' value={startDateTime} />
                                <UnderLine width={100} isPercent={true} />
                                <Errortext show={showError && startDateTime.length <= 0} message='Please provide date and time.' />
                            </FromDateConatiner>
                            <FromDateConatiner onClick={() => endDateRef.current?.showPicker()}>
                                <FromDateLable>
                                    To
                                </FromDateLable>
                                <Fromdate type='datetime-local' ref={endDateRef} onChange={(e) => setEndDateTime(e.target.value)} placeholder='Select date and time' value={endDateTime} />
                                <UnderLine width={100} isPercent={true} />
                                <Errortext show={showError && endDateTime.length <= 0} message='Please provide date and time.' />
                            </FromDateConatiner>
                        </DateRangeConatiner>
                        {/* <UnderLine width={100} isPercent={true} /> */}
                        <MemberSelecetionConatiner>
                            <SelectMemberHeadingConatiner>
                                <SelectMemberHeading>Selected Members {`(${selectedMembers.length})`}</SelectMemberHeading>
                            </SelectMemberHeadingConatiner>
                            <SelectedMemberConatiner>
                                <SelectedMembersList>
                                    {
                                        currentEvent && eventMembers.length > 0 && (members.map(member => eventMembers.includes(parseInt(member.id)) && <SelectedMemberDataConatiner>
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
                                <div onClick={() => setAddMemberMenu(pre => !pre)}>

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
                                            {members.map(member => !eventMembers.includes(parseInt(member.id)) &&
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

                        <SubmitButton text={isUpdate ? 'Update' : 'Create'} width={270} needArrow={false} onClick={handleSubmit} />
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
cursor: pointer;
`;
const Fromdate = styled.input`
border:none;
cursor: pointer;
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

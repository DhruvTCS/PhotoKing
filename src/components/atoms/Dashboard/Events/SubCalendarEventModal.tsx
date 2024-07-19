import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import UnderLine from '../../Login/UnderLine'
import Errortext from '../../Utlis/Errortext'
import {
  CalendarSubEvents,
  EnteredSubEventType,
} from '../../../../Data/event.dto'
import LocationPickerModal from './SetLocationModal'
import DownIconPNG from '../../../../assets/Icons/downicon.png'
import { useAppSelector } from '../../../../Redux/Hooks'
import { showErrorToast } from '../../Utlis/Toast'
import DeleteIconPNG from '../../../../assets/Icons/deleteIcon.png'
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
}
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }

`

const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px; /* Ensure padding for smaller screens */

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0px;
  }
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  color: black;
  font-family: Urbanist, sans-serif;
  padding: 20px;
  border-radius: 5px;
  min-width: 300px;
  max-width: 80%;
  height: auto;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  transition: all 0.6s ease-in-out;
  @media (max-width: ${breakpoints.mobile}) {
    padding: 15px;
    min-width: 280px;
  }

  @media (min-width: ${breakpoints.tablet}) {
    max-width: 70%;
  }

  @media (min-width: ${breakpoints.desktop}) {
    max-width: 60%;
  }
`

const Form = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 20px;
  max-width: 400px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 15px;
    box-shadow: none;
  }

  @media (min-width: ${breakpoints.tablet}) {
    max-width: 500px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    max-width: 600px;
  }
`

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: 10px;
  }
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const InputContainerLocation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const InputDateContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
  }
`

const Label = styled.label`
  font-family: Urbanist;
  font-size: 18px;
  font-weight: 600;
  line-height: 18px;
  text-align: left;
  color: #424242;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`

const Input = styled.input`
  padding-top: 10px;
  width: 98%;
  color: black;
  font-size: 18px;
  font-weight: 500;
  line-height: 18px;
  text-align: left;
  border: none;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 7px;
    font-size: 0.9rem;
  }
`

const InputMainDateContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 15px;
  border: 1px solid grey;
  border-radius: 10px;
  padding: 10px;
  justify-content: space-between;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
  }
`

const Button = styled.button`
  padding: 15px;
  border-radius: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  border: none;
  font-family: Urbanist, sans-serif;
  font-size: 25px;
  font-weight: 800;
  line-height: 19.2px;
  text-align: center;
  cursor: pointer;
  background: linear-gradient(360deg, #9c44bd 0%, #c62bc9 100%);
  box-shadow: 0px 4px 14px 0px #86169680;
  color: #ffffff;

  &:hover {
    background: linear-gradient(360deg, #7a11a1 0%, #c62bc9 100%);
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 8px;
    font-size: 20px;
  }
`

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  cursor: pointer;
`

const CloseButton = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  text-align: end;
`
// const UsePreviousLocationButton = styled.button`
//   background-color: transparent;
//   font-family: Urbanist, cursive;
//   font-style: normal;
//   font-size: 16px;
//   font-weight: 400;
//   text-align: center;
//   width: 30%;

//   @media (max-width: ${breakpoints.mobile}) {
//     font-size: 0.9rem;
//   }
// `
const DownIcon = styled.img`
  cursor: pointer;
  height:7px;
  width:10px;
`

const UpIcon = styled.img`
  transform: rotate(180deg);
  cursor: pointer;
  height:7px;
  width:10px;
`
const SelectLocation = styled.div`
display:flex;
align-items:center;
justify-content:space:between;
`
const SelectionMenu = styled.div<{ menuOpen: boolean }>`
  box-shadow: 0px 14px 44px 0px #00000026;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-radius: 10px;
  padding: 4px 0px 4px 0px;
  z-index: 100;
  display: ${({ menuOpen }) => (menuOpen ? 'block' : 'none')};
  animation: ${({ menuOpen }) => (menuOpen ? fadeIn : '')} 0.6s ease-in-out;
  @media (max-width: ${breakpoints.mobile}) {
    height: 200px;
    padding: 11px;
  }

  @media (min-width: ${breakpoints.tablet}) {
    height: 200px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    height: 300px;
    padding: 15px;
  }
`

const LocationMenuHeader = styled.div`
  display: flex;
  align-items: baseline;
  width: 92%;
  justify-content: space-between;
  padding: 10px;
  font-family: Urbanist, sans-serif;

  font-weight: 600;
  line-height: 19.2px;
  text-align: center;
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`

const LocationMenuHeaderTitle = styled.p`
  font-size: 20px;
  margin-bottom: 0px;
`

const AddNewLocationButton = styled.button`
  background-color: transparent;
  padding: 5px;
  border: 1px solid gray;
  border-radius: 10px;
  cursor: pointer;
`
const LocationItemContainer = styled.div`
  max-height: 73%;
  overflow-y: auto;
  overflow-x: hidden;
`
const LocationItem = styled.div`
  cursor: pointer;
  min-height: 35px;
`

const Location = styled.div`
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 13px;
  }
`

interface SubEventModalProps {
  onClose: () => void
  addSubEvent: (subEvent: CalendarSubEvents) => void
  currentSubEvent?: CalendarSubEvents | null
  currentLength: number
  locationList: string[]
  setLocationList: (locationList: string[]) => void
}

const SubCalendarEventModal: React.FC<SubEventModalProps> = ({
  onClose,
  addSubEvent,
  currentSubEvent,
  currentLength,
  locationList,
  setLocationList,
}) => {
  const [eventName, setEventName] = useState<string>('')
  const [id, SetId] = useState<number>(currentLength + 1)
  const [eventLocation, setEventLocation] = useState<string>('')
  const [locationPickerModal, setLocationPickerModal] = useState<boolean>(false)
  const [isLocationListOpen, setIsLocationListOpen] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [eventMembers, setEventMembers] = useState<number[]>([])
  const [selectedMembers, setSelectedMembers] = useState<number[]>([])

  const selectionRef = useRef<HTMLSelectElement>(null)

  const selectMenuRef = useRef<HTMLDivElement>(null)
  const startDateRef = useRef<HTMLInputElement>(null)
  const [showError, setShowError] = useState(false)
  const endDateRef = useRef<HTMLInputElement>(null)
  const [addMemberMenu, setAddMemberMenu] = useState(false)
  const [deleteMember, setDeleteMember] = useState<number[]>([])
  const [subEventMembers, setSubEventMembers] = useState<
    { id: number; member: number }[]
  >([])
  const { members } = useAppSelector((state) => state.member)
  useEffect(() => {
    if (currentSubEvent) {
      console.log(currentSubEvent.start_date + 'T' + currentSubEvent.start_time.substring(0, 5))
      setEventName(currentSubEvent.sub_event_name)
      setEventLocation(currentSubEvent.location)
      setStartDate(currentSubEvent.start_date + 'T' + currentSubEvent.start_time.substring(0, 5))
      setEndDate(currentSubEvent.end_date + 'T' + currentSubEvent.end_time.substring(0, 5))
      // setEndDate(currentSubEvent.end_date)
      // console.log((new Date(currentSubEvent.start_date + 'T' + currentSubEvent.start_time)).toString())
      SetId(currentSubEvent.id)
      setEventMembers(currentSubEvent.members.map(member => member.member))
      // if(currentSubEvent.members)
    }
    return () => {
      setEventName('')
      setEventLocation('')
      setStartDate('')
      setEndDate('')
    }
  }, [currentSubEvent])

  const onChangeData = (name: string, value: string) => {
    console.log(startDate)
    if (name === 'event_name' && value.length <= 25) setEventName(value)
    else if (name === 'event_location' && value.length <= 200)
      setEventLocation(value)
    else if (name === 'start_date') setStartDate(value)
    else if (name === 'end_date') setEndDate(value)
  }

  const validEventName = (eventNames: string) => {
    if (eventNames.length > 0 && eventNames.length < 40) return true
    else return false
  }

  const setEventDate = (startDateTime: string, endDateTime: string) => {
    const formattedStartDateTime = giveFormattedDateTime(startDateTime)
    const formattedEndDateTime = giveFormattedDateTime(endDateTime)

    const start_time = formattedStartDateTime.formattedTime
    const start_date = formattedStartDateTime.formattedDate
    const end_date = formattedEndDateTime.formattedDate
    const end_time = formattedEndDateTime.formattedTime
    return { start_date, start_time, end_time, end_date }
  }

  const giveFormattedDateTime = (fdate: string) => {
    const date = new Date(fdate)

    // Extract year, month, and day
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0')

    // Format date as yyyy-mm-dd
    const formattedDate = `${year}-${month}-${day}`

    // Extract hours, minutes, and seconds
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    // Format time as HH:MM:SS
    const formattedTime = `${hours}:${minutes}:${seconds}`
    return { formattedDate, formattedTime }
  }

  const validDateTime = (startDateTime: Date, endDateTime: Date) => {
    if (
      startDateTime.toString().length !== 0 &&
      endDateTime.toString().length !== 0 &&
      startDateTime < endDateTime
    )
      return true
    else return false
  }

  const validateLocation = (location: string) => {
    if (location.length > 0 && location.length < 300) return true
    else return false
  }

  const handleSubmit = () => {
    if (
      !validateLocation(eventLocation) ||
      !validEventName(eventName) ||
      !validDateTime(new Date(startDate), new Date(endDate))
    ) {
      setShowError(true)
    } else {
      let { start_date, start_time, end_date, end_time } = setEventDate(
        startDate,
        endDate,
      )
      addSubEvent({
        sub_event_name: eventName,
        location: eventLocation,
        start_date: start_date,
        start_time: start_time,
        end_date: end_date,
        end_time: end_time,
        // sub_event_coordinates: "test coordinates",
        id: id,
        members: selectedMembers.map(member => { return { member: member, id: member } })
        ,
      })
    }
  }

  const setPickLocation = (loc: string) => {
    setEventLocation(loc)
  }
  const setLocation = (loc: string) => {
    setLocationList([...locationList, loc])
    setLocationPickerModal(false)
    setIsLocationListOpen(false)
    setEventLocation(loc)
  }


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
  const handleButtonClick = (buttonAction: () => void) => {
    setAddMemberMenu(false);
    buttonAction();
  };
  const handleDeleteMember = (id: number) => {
    if (!deleteMember.includes(id) && eventMembers.includes(id)) {
      setDeleteMember([...deleteMember, id]);
      setEventMembers(pre => pre.filter(member => member !== id));
    }
  }
  return (
    <Modal>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {locationPickerModal && (
          <LocationPickerModal
            onClose={() => setLocationPickerModal(false)}
            isOpen={locationPickerModal}
            onSelect={setLocation}
          />
        )}
        <Form>
          <FormField>
            <InputContainer>
              <Label htmlFor="name">Sub Event Name</Label>
              <Input
                type="text"
                id="name"
                placeholder=""
                name="name"
                onChange={(e) => onChangeData('event_name', e.target.value)}
                value={eventName}
              />
            </InputContainer>
            <UnderLine width={100} isPercent={true} />
            <Errortext
              show={showError && !validEventName(eventName)}
              message={'Please provide valid event name.'}
            />
          </FormField>
          <FormField>
            <Label htmlFor="name">Sub Event Date</Label>
            <InputMainDateContainer>
              <InputDateContainer>
                <DateContainer
                  onClick={() => startDateRef.current?.showPicker()}
                >
                  <Label htmlFor="from_date">From</Label>
                  <Input
                    type="datetime-local"
                    name="from_date"
                    ref={startDateRef}
                    onChange={(e) => onChangeData('start_date', e.target.value)}
                    value={startDate}
                  />
                </DateContainer>
                <UnderLine width={100} isPercent={true} />
              </InputDateContainer>
              <InputDateContainer>
                <DateContainer onClick={() => endDateRef.current?.showPicker()}>
                  <Label htmlFor="to_date">To</Label>
                  <Input
                    type="datetime-local"
                    id="to_date "
                    name="to_date"
                    ref={endDateRef}
                    onChange={(e) => onChangeData('end_date', e.target.value)}
                    value={endDate}
                  />
                </DateContainer>
                <UnderLine width={100} isPercent={true} />
              </InputDateContainer>
            </InputMainDateContainer>
            <Errortext
              show={
                showError &&
                !validDateTime(new Date(startDate), new Date(endDate))
              }
              message={'Please provide valid event date.'}
            />
          </FormField>
          <FormField>
            <InputContainer>
              <InputContainerLocation>
                <Label htmlFor="location">Sub Event Location</Label>
              </InputContainerLocation>
              <SelectLocation>
                <Input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Select Location"
                  value={eventLocation}
                  readOnly={true}
                  onClick={() => setIsLocationListOpen((pre) => !pre)}
                />
                {isLocationListOpen ? (
                  <UpIcon
                    src={DownIconPNG}
                    onClick={() => setIsLocationListOpen(false)}
                  />
                ) : (
                  <DownIcon
                    src={DownIconPNG}
                    onClick={() => setIsLocationListOpen(true)}
                  />
                )}
              </SelectLocation>
            </InputContainer>
            <UnderLine width={100} isPercent={true} />
            <Errortext
              show={showError && !validateLocation(eventLocation)}
              message={'Please provide valid event location.'}
            />
            {isLocationListOpen && (
              <SelectionMenu menuOpen={isLocationListOpen}>
                <LocationMenuHeader>
                  <LocationMenuHeaderTitle>Locations</LocationMenuHeaderTitle>
                  <AddNewLocationButton
                    onClick={() => setLocationPickerModal(true)}
                  >
                    Add New{' '}
                  </AddNewLocationButton>
                </LocationMenuHeader>
                <LocationItemContainer>
                  {locationList.map((location) => (
                    <>
                      <LocationItem onClick={() => setPickLocation(location)}>
                        <Location>{location}</Location>
                      </LocationItem>
                      <UnderLine width={100} isPercent={true} />
                    </>
                  ))}
                </LocationItemContainer>
              </SelectionMenu>
            )}
          </FormField>
          <FormField>
            <MemberSelecetionConatiner>
              <SelectMemberHeadingConatiner>
                <SelectMemberHeading>
                  Selected Members {`(${selectedMembers.length})`}
                </SelectMemberHeading>
              </SelectMemberHeadingConatiner>
              <SelectedMemberConatiner>
                <SelectedMembersList>
                  {currentSubEvent &&
                    members &&
                    eventMembers.length > 0 &&
                    members.map(
                      (member) =>
                        eventMembers.includes(parseInt(member.id)) && (
                          <SelectedMemberDataConatiner>
                            <SelectedMemberData>
                              <MemberData>
                                <MeberProfileImage src={member.profile_image} />
                                <MemberText>
                                  <MemberName>{member.name}</MemberName>
                                  <MemberRole>{member.job_type}</MemberRole>
                                </MemberText>
                              </MemberData>
                              <DeleteIcon
                                onClick={(e) =>
                                  handleButtonClick(() =>
                                    handleDeleteMember(parseInt(member.id)),
                                  )
                                }
                                src={DeleteIconPNG}
                              />
                            </SelectedMemberData>
                          </SelectedMemberDataConatiner>
                        ),
                    )}
                  {members &&
                    members.map(
                      (member) =>
                        selectedMembers.includes(parseInt(member.id)) && (
                          <SelectedMemberDataConatiner>
                            <SelectedMemberData>
                              <MemberData>
                                <MeberProfileImage src={member.profile_image} />
                                <MemberText>
                                  <MemberName>{member.name}</MemberName>
                                  <MemberRole>{member.job_type}</MemberRole>
                                </MemberText>
                              </MemberData>
                              <CloseButton
                                onClick={() =>
                                  handleMember(parseInt(member.id))
                                }
                              >
                                &times;
                              </CloseButton>
                            </SelectedMemberData>
                          </SelectedMemberDataConatiner>
                        ),
                    )}
                </SelectedMembersList>
              </SelectedMemberConatiner>
              <SelectionMenuListConatiner>
                <div
                  onClick={() => {
                    !members
                      ? showErrorToast('No Members Available.')
                      : setAddMemberMenu((pre) => !pre)
                  }}
                >
                  <AddMemberConatiner>
                    <AddMemberLabel>Add Member</AddMemberLabel>
                    <SelectMemberLabel
                      ref={selectionRef}
                      defaultValue={'Add Member'}
                    >
                      {/* <option value="Add Member" selected >Add Member</option> */}
                    </SelectMemberLabel>
                  </AddMemberConatiner>
                  <UnderLine width={100} isPercent={true} />
                </div>
                <Errortext
                  show={
                    showError &&
                    selectedMembers.length <= 0 &&
                    eventMembers.length <= 0
                  }
                  message="Please add event member."
                />
                <MemberMenuConatriner>
                  {addMemberMenu && (
                    <AddMemberListConatiner ref={selectMenuRef}>
                      <MemberList>
                        {members &&
                          members.map(
                            (member) =>
                              !eventMembers.includes(parseInt(member.id)) && (
                                <MemberListItem htmlFor={`member${member.id}`}>
                                  <MemberData>
                                    <MeberProfileImage
                                      src={member.profile_image}
                                    />
                                    <MemberText>
                                      <MemberName>{member.name}</MemberName>
                                      <MemberRole>{member.job_type}</MemberRole>
                                    </MemberText>
                                  </MemberData>
                                  <MemberSelectButton
                                    id={`member${member.id}`}
                                    type="checkbox"
                                    onChange={() => {
                                      handleMember(parseInt(member.id))
                                    }}
                                    checked={selectedMembers.includes(
                                      parseInt(member.id),
                                    )}
                                  ></MemberSelectButton>
                                </MemberListItem>
                              ),
                          )}
                      </MemberList>
                    </AddMemberListConatiner>
                  )}
                </MemberMenuConatriner>
              </SelectionMenuListConatiner>
            </MemberSelecetionConatiner>
          </FormField>

          <Button onClick={() => handleSubmit()}>
            {currentSubEvent ? `Update` : `Add`}
          </Button>
        </Form>
      </ModalContent>
    </Modal>
  )
}

export default SubCalendarEventModal

const MemberSelecetionConatiner = styled.div`
  width: 100%;
  margin-top: 1rem;
`
const SelectedMemberConatiner = styled.div``
const SelectionMenuListConatiner = styled.div`
  text-align: left;
  cursor: pointer;
`
const AddMemberConatiner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const SelectMemberHeading = styled.p`
  font-family: Urbanist;
  font-size: 18px;
  font-weight: 600;
  line-height: 18px;
  text-align: left;
  color: #424242;
`
const MemberMenuConatriner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const AddMemberListConatiner = styled.div`
  width: 100%;
  height: 100%;
  // background:red;
  box-shadow: 0px 14px 44px 0px #00000026;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
  // position:absolute;
  background: white;
  border-radius: 10px;
`

const SelectMemberHeadingConatiner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const MemberList = styled.div`
  display: flex;
  flex-direction: column;
  width: 97%;

  // border: 1px solid black;
  // height:300px;
  max-height: 172px;
  overflow: auto;
`
const MemberData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const MemberName = styled.p`
  font-family: Urbanist;
  font-size: 16px;
  font-weight: 700;
  line-height: 23px;
  text-align: left;

  margin: 0;
`
const MemberRole = styled.p`
  font-family: Urbanist;
  font-size: 14px;
  font-weight: 500;
  line-height: 23px;
  text-align: left;

  margin: 0;
`
const MemberListItem = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
  cursor: pointer;
  // padding-right:20px;
  // margin-right:20px;
`
const MemberText = styled.div`
  margin-left: 10px;
`
const MemberSelectButton = styled.input`
  margin-right: 10px;
  cursor: pointer;
`
const MeberProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`

const SelectedMembersList = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const SelectedMemberDataConatiner = styled.div`
  width: 30%;
  margin-bottom: 10px;
  // box-shadow: 0px 14px 44px 0px #00000026;
  border: 1px solid #00000026;
  border-radius: 10px;
  margin-right: 4px;
  padding: 5px;
`
const SelectedMemberData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SelectMemberLabel = styled.select`
  width: 50%;
  border: none;
  outline: none;
`
const AddMemberLabel = styled.label`
  text-align: left;
  font-family: Urbanist;
  font-size: 16px;
  font-weight: 500;
  line-height: 18px;
  text-align: left;
  color: grey;
`

const DeleteIcon = styled.img`
  height: 25px;
  width: 25px;
  cursor: pointer;
`

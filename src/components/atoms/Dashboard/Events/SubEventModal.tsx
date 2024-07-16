import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import UnderLine from '../../Login/UnderLine'
import Errortext from '../../Utlis/Errortext'
import { EnteredSubEventType } from '../../../../Data/event.dto'
import LocationPickerModal from './SetLocationModal'
import DownIconPNG from '../../../../assets/Icons/downicon.png'
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
    max-width: 570px;
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
`

const UpIcon = styled.img`
  transform: rotate(180deg);
  cursor: pointer;
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
  max-height:73%;
  overflow-y: auto;
  overflow-x: hidden;
`
const LocationItem = styled.div`
  cursor: pointer;
  min-height:35px;
`

const Location = styled.div`
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 13px;
  }
`

interface SubEventModal {
  onClose: () => void
  addSubEvent: (subEvent: EnteredSubEventType) => void
  currentSubEvent?: EnteredSubEventType | null
  currentLength: number
  locationList: string[]
  setLocationList: (locationList: string[]) => void
}

const SubEventModal: React.FC<SubEventModal> = ({
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
  const startDateRef = useRef<HTMLInputElement>(null)
  const [showError, setShowError] = useState(false)
  const endDateRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (currentSubEvent) {
      setEventName(currentSubEvent.sub_event_name)
      setEventLocation(currentSubEvent.sub_event_location)
      setStartDate(currentSubEvent.sub_event_start_date_time)
      setEndDate(currentSubEvent.sub_event_end_date_time)
      SetId(currentSubEvent.id)
    }
    return () => {
      setEventName('')
      setEventLocation('')
      setStartDate('')
      setEndDate('')
    }
  }, [currentSubEvent])

  const onChangeData = (name: string, value: string) => {
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
        sub_event_location: eventLocation,
        sub_event_end_date: end_date,
        sub_event_end_time: end_time,
        sub_event_start_date: start_date,
        sub_event_start_time: start_time,
        sub_event_end_date_time: endDate,
        sub_event_start_date_time: startDate,
        id: id,
      })
    }
  }

  const setPickLocation = (loc: string) => {
    setEventLocation(loc)
  }
  const setLocation = (loc: string) => {
    setLocationList([...locationList, loc])
    setEventLocation(loc)
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
                    id="from_date"
                    ref={startDateRef}
                    name="from_date"
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
                  placeholder='Select Location'
                  value={eventLocation}
                  readOnly={true}
                  onClick={() => setIsLocationListOpen(pre => !pre)}
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
                  {locationList.map((location) =>
                    <>
                      <LocationItem onClick={() => setPickLocation(location)}>
                        <Location>
                          {location}
                        </Location>
                      </LocationItem>
                      <UnderLine width={100} isPercent={true} />
                    </>
                  )}
                </LocationItemContainer>
              </SelectionMenu>
            )}
          </FormField>

          <Button onClick={() => handleSubmit()}>
            {currentSubEvent ? `Update` : `Add`}
          </Button>
        </Form>
      </ModalContent>
    </Modal>
  )
}

export default SubEventModal

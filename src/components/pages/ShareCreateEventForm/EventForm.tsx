// App.js
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import UnderLine from '../../atoms/Login/UnderLine'
import Errortext from '../../atoms/Utlis/Errortext'
import { useNavigate, useParams } from 'react-router-dom'
import { showErrorToast, showSuccessToast } from '../../atoms/Utlis/Toast'
import { useAppDispatch, useAppSelector } from '../../../Redux/Hooks'
import { submitEventFormAPI } from '../../../Redux/ApiCalls/Dashboard/EventAPI'
import CompanyLogo from '../../molecules/Logo/CompanyLogo'
import LogoImage from '../../atoms/Utlis/LogoImage'
import LoadingDots from '../../atoms/Utlis/LoadinDots'
import SubEventModal from '../../atoms/Dashboard/Events/SubEventModal'
import { EnteredSubEventType } from '../../../Data/event.dto'

const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  background: #f8edfa;
  padding: 20px;
`
const MainConTainer = styled.div`
display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;

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
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  
  background: white;
  padding: 20px;
  max-width: 400px;
  width: 100%;

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
    padding: 8px;
    font-size: 0.9rem;
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
    font-size: 25px;
  }
`
const ContactContainer = styled.div`
  display: flex;
  width: 98%;
  align-items: baseline;
`
const CountryCode = styled.input`
  border: none;
  width: 10%;
  font-size: 18px;
  font-weight: 500;
  line-height: 18px;
  text-align: left;
  &:focus {
    outline: none;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: 8px;
    font-size: 0.9rem;
  }
`

const SubmittedFormContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const MessageHeader = styled.p`
  font-family: Urbanist;
  font-size: 24px;
  font-weight: 700;
  line-height: 18px;
  text-align: left;
  color: #424242;
`

const MessageText = styled.p`
  font-family: Urbanist;
  font-size: 18px;
  font-weight: 600;
  line-height: 41px;
  text-align: left;
  color: #424242;
`

const LogoContainer = styled.div`
  width: 244px;
  height: 48px;
  opacity: 0px;
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
`

const TextContainer = styled.div`
  width: 162px;
  height: 43px;
  gap: 0px;
  opacity: 0px;
  font-family: 'Leckerli One', cursive;
  font-style: normal;
  font-size: 32px;
  font-weight: 400;
  line-height: 43.04px;
  text-align: center;
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
  padding: 10px;
  margin: 10px 0px 0px 10px;
  @media (max-width: ${breakpoints.mobile}) {
    padding: 4px;
    font-size: 0.9rem;
  }
  border: 1px solid gray;
  border-radius: 10px;
`

const SubEventName = styled.input`
  border: none;
  background-color: transparent;
  max-width: 83px;
  &:focus {
    outline: none;
  }
`

const CloseButton = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  text-align: end;
`
const EventForm = () => {
  const [customerName, setCustomerName] = useState<string>('')
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState<string>('')
  const [eventName, setEventName] = useState<string>('')
  const [locationList, setLocationList] = useState<string[]>([])

  const [showError, setShowError] = useState(false)
  const [
    currentSubEvent,
    setCurrentSubEvent,
  ] = useState<EnteredSubEventType | null>(null)
  const [formToken, setFormToken] = useState('')
  const [isSubEventModal, setIsSubEventModal] = useState(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [subEvents, setSubEvents] = useState<EnteredSubEventType[]>([])
  const { success, isError, error, loading } = useAppSelector(
    (state) => state.extra,
  )
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  useEffect(() => {
    console.log(params)
    if (params['data']) {
      setFormToken(params['data'])
      // showSuccessToast(params["data"]);
    } else {
      showErrorToast('Invalid Link, Please Contact your studio owner.')
      navigate('/auth/login.')
    }
  }, [params['data']])

  const handleAddSubEvents = (subEvent: EnteredSubEventType) => {
    let filteredSubEvents = subEvents.filter((e) => e.id !== subEvent.id)
    setSubEvents([...filteredSubEvents, subEvent])
    setIsSubEventModal(false)
  }
  const handleRemoveSubEvents = (subEvent: EnteredSubEventType) => {
    let filteredSubEvents = subEvents.filter((e) => e.id !== subEvent.id)
    setSubEvents(filteredSubEvents)
  }
  const validSubEvents = (subEvents: EnteredSubEventType[]) => {
    if (subEvents.length > 0) return true
    else return false
  }
  useEffect(() => {
    if (isError) {
      if (error && error.message)
        showErrorToast(error.message + ' Please Contact your studio owner.')
      else showErrorToast('Something went wrong! Please contact studio owner.')
    } else if (success) {
      showSuccessToast('Event created successfully.')
      setIsFormSubmitted(true)
    }
  }, [success, isError])
  // const [formSubmitted, isFormSubmitted] = useState(false);
  const handleSubmit = () => {
    if (
      validCustomerName(customerName) &&
      customerPhoneNumber &&
      validPhoneNumber(customerPhoneNumber.toString()) &&
      validEventName(eventName) &&
      validSubEvents(subEvents)
    ) {

      dispatch(
        submitEventFormAPI({
          token: formToken,
          customer_name: customerName,
          sub_events: subEvents,
          event_name: eventName,
          phone_number: '+91' + customerPhoneNumber.toString(),

        }),
      )
    } else setShowError(true)
  }
  const onChangeData = (name: string, value: string) => {
    console.log(value)
    if (name === 'customer_name' && value.length <= 20) setCustomerName(value)
    else if (name === 'customer_contact' && value.length <= 10)
      setCustomerPhoneNumber(value)
    else if (name === 'event_name' && value.length <= 25) setEventName(value)
  }
  const validCustomerName = (name: string) => {
    if (name.length > 0 && name.length < 30) {
      return true
    } else {
      return false
    }
  }
  const validPhoneNumber = (number: string) => {
    const phoneRegex = /^[0-9]{10}$/
    return phoneRegex.test(number)
  }

  const validEventName = (eventNames: string) => {
    if (eventNames.length > 0 && eventNames.length < 40) return true
    else return false
  }

  return (
    <Container>
      <MainConTainer>

        <LogoContainer onClick={() => navigate('/dashboard/')}>
          <LogoImage />

          <TextContainer>Photo King</TextContainer>
        </LogoContainer>
        <Form>
          {isFormSubmitted ? (
            <SubmittedFormContainer>
              <MessageHeader>Thank You for Choosing Us!</MessageHeader>
              <MessageText>
                We appreciate you selecting our studio to capture the special
                moments of your life's event. We're excited to work with you and
                make your memories unforgettable.
              </MessageText>
            </SubmittedFormContainer>
          ) : (
            <>
              {isSubEventModal && (
                <SubEventModal
                  locationList={locationList}
                  setLocationList={setLocationList}
                  currentLength={subEvents.length}
                  addSubEvent={handleAddSubEvents}
                  currentSubEvent={currentSubEvent}
                  onClose={() => setIsSubEventModal(false)}
                />
              )}
              <FormField>
                <InputContainer>
                  <Label>Customer Name</Label>
                  <Input
                    type="text"
                    onChange={(e) => {
                      onChangeData('customer_name', e.target.value)
                    }}
                    value={customerName}
                  />
                </InputContainer>
                <UnderLine width={100} isPercent={true} />
                <Errortext
                  show={showError && !validCustomerName(customerName)}
                  message={'Please provide valid customer name.'}
                />
              </FormField>

              <FormField>
                <InputContainer>
                  <Label htmlFor="phone">Phone Number</Label>
                  <ContactContainer>
                    <CountryCode type="text" readOnly={true} value={'+91'} />
                    <Input
                      type="number"
                      id="phone"
                      name="phone"
                      value={customerPhoneNumber}
                      onChange={(e) =>
                        onChangeData(
                          'customer_contact',
                          e.target.value.toString(),
                        )
                      }
                    />
                  </ContactContainer>
                </InputContainer>
                <UnderLine width={100} isPercent={true} />
                <Errortext
                  show={
                    showError &&
                    !customerPhoneNumber &&
                    !validPhoneNumber(customerPhoneNumber.toString())
                  }
                  message={'Please provide valid customer contact details.'}
                />
              </FormField>
              <FormField>
                <InputContainer>
                  <Label htmlFor="name">Event Name</Label>
                  <Input
                    type="text"
                    id="name"
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
                        <CloseButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveSubEvents(event)
                          }}
                        >
                          &times;
                        </CloseButton>
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
              {loading ? (
                <LoadingDots />
              ) : (
                <Button
                  onClick={() => {
                    handleSubmit()
                  }}
                >
                  Submit
                </Button>
              )}
            </>
          )}
        </Form>

      </MainConTainer>
    </Container>
  )
}

export default EventForm

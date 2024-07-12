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

const Form = styled.div`
  display: flex;
  flex-direction: column;
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
const InputDateContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    color: green;
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
    padding: 8px;
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
const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  cursor: pointer;
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
const EventForm = () => {
  const [customerName, setCustomerName] = useState<string>('')
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState<string>('')
  const [eventName, setEventName] = useState<string>('')
  const [eventLocation, setEventLocation] = useState<string>('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const startDateRef = useRef<HTMLInputElement>(null)
  const [showError, setShowError] = useState(false)
  const endDateRef = useRef<HTMLInputElement>(null)
  const [formToken, setFormToken] = useState('')
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
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
  useEffect(() => {
    if (isError) {
      if (error && error.message) showErrorToast(error.message + " Please Contact your studio owner.")
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
      validDateTime(new Date(startDate), new Date(endDate)) &&
      validateLocation(eventLocation)
    ) {
      const { start_date, start_time } = setEventDate(startDate, endDate)
      console.log('event created.')
      dispatch(
        submitEventFormAPI({
          token: formToken,
          customer_name: customerName,
          event_location: eventLocation,
          event_name: eventName,
          phone_number: '+91' + customerPhoneNumber.toString(),
          event_date: start_date,
          event_time: start_time,
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
    else if (name === 'event_location' && value.length <= 200)
      setEventLocation(value)
    else if (name === 'start_date') setStartDate(value)
    else if (name === 'end_date') setEndDate(value)
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

  return (
    <Container>
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
              <Label htmlFor="name">Event Date</Label>
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
                      onChange={(e) =>
                        onChangeData('start_date', e.target.value)
                      }
                      value={startDate}
                    />
                  </DateContainer>
                  <UnderLine width={100} isPercent={true} />
                </InputDateContainer>
                <InputDateContainer>
                  <DateContainer
                    onClick={() => endDateRef.current?.showPicker()}
                  >
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
                <Label htmlFor="location">Event Location</Label>
                <Input
                  type="text"
                  id="location"
                  name="location"
                  onChange={(e) =>
                    onChangeData('event_location', e.target.value)
                  }
                  value={eventLocation}
                />
              </InputContainer>
              <UnderLine width={100} isPercent={true} />
              <Errortext
                show={showError && !validateLocation(eventLocation)}
                message={'Please provide valid event location.'}
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
    </Container>
  )
}

export default EventForm

// App.js
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import UnderLine from '../../atoms/Login/UnderLine'

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

const Form = styled.form`
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
`
const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  cursor: pointer;
`
const App = () => {
  const [customerName, setCustomerName] = useState<string>('')
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState<number>()
  const [eventName, setEventName] = useState<string>('')
  const [eventLocation, setEventLocation] = useState<string>('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const startDateRef = useRef<HTMLInputElement>(null)
  const endDateRef = useRef<HTMLInputElement>(null)
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log(
      customerName,
      customerPhoneNumber,
      eventName,
      eventLocation,
      startDate,
      endDate,
    )
    // Handle form submission
  }
  const onChangeData = (name: string, value: string) => {
    console.log(value)
    if (name === 'customer_name' && value.length <= 20) setCustomerName(value)
    else if (name === 'customer_contact' && value.length <= 10)
      setCustomerPhoneNumber(parseInt(value))
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
  const setEventDate = (startDateTime: Date, endDateTime: Date) => {
    const startDate = startDateTime.toString().slice(0, 10)
    const endDate = endDateTime.toString().slice(0, 10)
    const startTime = startDateTime.toString().slice(11, 16)
    const endTime = endDateTime.toString().slice(11, 16)

    return { startTime, startDate, endTime, endDate }
  }
  const validDateTime = (startDateTime: Date, endDateTime: Date) => {
    if (
      startDateTime.toString().length == 0 &&
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
      <Form>
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
                required
                value={customerPhoneNumber}
                onChange={(e) =>
                  onChangeData('customer_contact', e.target.value.toString())
                }
              />
            </ContactContainer>
          </InputContainer>
          <UnderLine width={100} isPercent={true} />
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
              required
            />
          </InputContainer>
          <UnderLine width={100} isPercent={true} />
        </FormField>
        <FormField>
          <Label htmlFor="name">Event Date</Label>
          <InputMainDateContainer>
            <InputDateContainer>
              <DateContainer onClick={() => startDateRef.current?.showPicker()}>
                <Label htmlFor="from_date">From</Label>
                <Input
                  type="datetime-local"
                  id="from_date"
                  ref={startDateRef}
                  name="from_date"
                  onChange={(e) => onChangeData('start_date', e.target.value)}
                  value={startDate}
                  required
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
                  required
                />
              </DateContainer>
              <UnderLine width={100} isPercent={true} />
            </InputDateContainer>
          </InputMainDateContainer>
        </FormField>
        <FormField>
          <InputContainer>
            <Label htmlFor="location">Event Location</Label>
            <Input
              type="text"
              id="location"
              name="location"
              onChange={(e) => onChangeData('event_location', e.target.value)}
              value={eventLocation}
              required
            />
          </InputContainer>
          <UnderLine width={100} isPercent={true} />
        </FormField>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  )
}

export default App

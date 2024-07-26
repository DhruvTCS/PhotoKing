import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { UserCreatedEvents } from '../../../../Data/event.dto'
import ViewUserCreatedEventModal from './ViewUserCreatedEventModal'
import { useAppDispatch } from '../../../../Redux/Hooks'
import { setUserCreatedEvent } from '../../../../Redux/Slice/Dashboard/EventSlice'
import { useNavigate } from 'react-router-dom'
import CalendarIconPNG from '../../../../assets/Icons/Sidebar/calendar.png'
import DeleteIconPNG from '../../../../assets/Icons/delete2.png'
import DeletePopup from '../Folder/DeletePopup'
import { createEventAPI, deleteUserCreatedEventAPI } from '../../../../Redux/ApiCalls/Dashboard/EventAPI'
import { createEvent } from '@testing-library/react'
interface UserCreatedEventCardProps {
  userEvent: UserCreatedEvents
}

const UserCreatedEventCard: React.FC<UserCreatedEventCardProps> = ({
  userEvent,
}) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [fullEventModal, setFullEventModal] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isDeletePopUp, setIsDeletePopup] = useState(false)
  const [dropDownMenu, setDropDownMenu] = useState(false)
  const openMenu = (e: React.MouseEvent) => {
    // console.log('called')
    e.stopPropagation()
    setDropDownMenu((pre) => !pre)
  }
  function getEventDates(event: UserCreatedEvents) {
    if (!event.sub_events || event.sub_events.length === 0) {
      return { starting_date: null, ending_date: null }
    }

    let minStartingDate = event.sub_events[0].starting_date
    let maxEndingDate = event.sub_events[0].ending_date

    event.sub_events.forEach((subEvent) => {
      if (subEvent.starting_date < minStartingDate) {
        minStartingDate = subEvent.starting_date
      }
      if (subEvent.ending_date > maxEndingDate) {
        maxEndingDate = subEvent.ending_date
      }
    })

    return {
      starting_date: minStartingDate,
      ending_date: maxEndingDate,
    }
  }
  const handleViewFullEvent = () => {
    dispatch(setUserCreatedEvent(userEvent))
    navigate('/dashboard/events/userCreated/single')
  }
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setDropDownMenu(false)
    }
  }
  useEffect(() => {
    if (dropDownMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropDownMenu])

  const handleDeleteEvent = () => {

    // console.log("delete event")
    // console.log(userEvent)
    dispatch(deleteUserCreatedEventAPI({ event_id: userEvent.id }))
    setIsDeletePopup(false)
  }
  const handleAddCalenderEvent = () => {
    let subEventsData = userEvent.sub_events.map(event => ({
      sub_event_name: event.sub_event_name,
      start_time: event.starting_time,
      end_time: event.ending_time,
      start_date: event.starting_date,
      end_date: event.ending_date,
      location: event.sub_event_location,
      sub_event_member_id: []
    }))

    dispatch(createEventAPI({ title: userEvent.event_name, sub_events: subEventsData }))
    console.log(subEventsData)
  }
  return (
    <Container>

      {isDeletePopUp && (
        <DeletePopup
          text="Are you sure you want to delete this event?"
          cancel={() => setIsDeletePopup(false)}
          Delete={() => handleDeleteEvent()}
          buttonText={'Delete'}
        />
      )}
      <MenuButton
        ref={buttonRef}
        onClick={(e) => {
          openMenu(e)
        }}
      >
        <Dot>.</Dot>
        <Dot>.</Dot>
        <Dot>.</Dot>
      </MenuButton>
      <DropdownMenu menuOpen={dropDownMenu} ref={menuRef}>
        <MenuItem onClick={() => handleAddCalenderEvent()}>
          <ItemIcon src={CalendarIconPNG} />
          <ItemName>Add To Calendar</ItemName>
        </MenuItem>
        <HrMenu />

        <MenuItem onClick={() => setIsDeletePopup(true)}>
          <ItemIcon src={DeleteIconPNG} />
          <ItemName>Delete Event</ItemName>
        </MenuItem>
        <HrMenu />
      </DropdownMenu>
      <HeaderContainer>
        <CustomerNameText>{userEvent.customer_name}</CustomerNameText>
        <CustomerPhoneText>{userEvent.phone_number}</CustomerPhoneText>
      </HeaderContainer>
      <Hr colorData="#00000073" />
      <EventData>
        <EventDateHeader>
          <EventDataHeaderTitle>{userEvent.event_name}</EventDataHeaderTitle>
        </EventDateHeader>
        <EventDataBody>
          {/* <EventLocationContainer>
                        <EventLocationLabel>Location :</EventLocationLabel>
                        <EventLocationText>{userEvent}</EventLocationText>
                    </EventLocationContainer> */}
          <EventDateContainer>
            <EventDateLabel>Dates :</EventDateLabel>
            <DateContainer>
              <FromDateContainer>
                <FromDateLabel>From :</FromDateLabel>
                <Date>{getEventDates(userEvent).starting_date}</Date>
              </FromDateContainer>
              <FromDateContainer>
                <FromDateLabel>To :</FromDateLabel>
                <Date>{getEventDates(userEvent).ending_date}</Date>
              </FromDateContainer>
            </DateContainer>
          </EventDateContainer>
        </EventDataBody>
        <ViewFullEventDiv onClick={() => handleViewFullEvent()}>
          <ViewEventText>See Full Event</ViewEventText>
        </ViewFullEventDiv>
      </EventData>
    </Container>
  )
}

export default UserCreatedEventCard


const Container = styled.div`
  height: 320px;
  width: 280px;
  padding: 15px;
  background-color: #fdfdfd;
  border-radius: 15px;
  margin: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  &:hover {
    // transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  position: relative;
  //  height: 300px;
  // position: relative;
  // width: 254px;
  // padding: 10px;
  // background-color: white;
  // border-radius: 10px;
  // margin: 10px;
  //  transition: transform 0.2s, box-shadow 0.2s;
  // &:hover {
  //   transform: translateY(-5px);
  //   box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  // }
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CustomerNameText = styled.p`
  font-family: 'Urbanist', sans-serif;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: #333;
`;

const CustomerPhoneText = styled.p`
  font-family: 'Urbanist', sans-serif;
  font-size: 16px;
  font-weight: 400;
  margin: 5px 0 10px;
  color: #777;
`;

const Hr = styled.hr<{ colorData: string }>`
  border: 1px solid ${(props) => props.colorData};
  width: 100%;
`;

const EventData = styled.div`
  width: 100%;
  margin-top: 15px;
`;

const EventDateHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EventDataHeaderTitle = styled.p`
  font-family: 'Urbanist', sans-serif;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #444;
`;

const EventDataBody = styled.div`
  margin-top: 10px;
`;

const EventDateContainer = styled.div`
  width: 100%;
`;

const EventDateLabel = styled.p`
  font-family: 'Urbanist', sans-serif;
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  color: gray;
`;

const DateContainer = styled.div`
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  padding: 10px;
  height: 50px;
`;

const FromDateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FromDateLabel = styled.p`
  font-family: 'Urbanist', sans-serif;
  font-size: 16px;
  font-weight: 500;
  margin: 0;
`;

const Date = styled.p`
  font-family: 'Urbanist', sans-serif;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
`;

const ViewFullEventDiv = styled.div`
  width: 93%;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid #a720b9;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  &:hover {
    background-color: #a720b9;
    p{
     color:white !important;
    }
  }
`;

const ViewEventText = styled.p`
  font-family: 'Urbanist', sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: #a720b9;
`;

const MenuButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ffffffb2;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 38px;
  height: 38px;
  cursor: pointer;
  border: none;
  box-shadow: 0px 20px 20px 0px hsla(259, 49%, 33%, 0.15);
  &:hover {
    background: #e6e6e6;
  }
`;

const Dot = styled.span`
  color: hsla(293, 71%, 43%, 1);
  line-height: 7px;
  margin: 0;
  font-size: 2rem;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const DropdownMenu = styled.div<{ menuOpen: boolean }>`
  position: absolute;
  top: 50px;
  right: 10px;
  background: white;
  width: 225px;
  height: 115px;
  z-index: 5;
  border-radius: 10px;
  display: ${({ menuOpen }) => (menuOpen ? 'block' : 'none')};
  animation: ${({ menuOpen }) => (menuOpen ? fadeIn : '')} 0.3s ease-out;
  box-shadow: 0px 4px 24px 0px hsla(0, 0%, 0%, 0.5);
`;

const MenuItem = styled.div`
  padding: 2px 16px;
  height: 50px;
  cursor: pointer;
  color: black;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: background-color 0.2s;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const ItemIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const ItemName = styled.p`
  margin-left: 14px;
  width: 151px;
  height: 23px;
  font-family: 'Urbanist', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 23px;
  text-align: left;
`;

const HrMenu = styled.hr`
  margin: 0;
  color: #5b463e;
`;
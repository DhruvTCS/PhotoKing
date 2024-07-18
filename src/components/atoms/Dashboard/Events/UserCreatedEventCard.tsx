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
import { deleteUserCreatedEventAPI } from '../../../../Redux/ApiCalls/Dashboard/EventAPI'
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
        console.log('called')
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

        console.log("delete event")
        console.log(userEvent)
        dispatch(deleteUserCreatedEventAPI({ event_id: userEvent.id }))
        setIsDeletePopup(false)
    }
    return (
        <Container>
            {fullEventModal && (
                <ViewUserCreatedEventModal
                    userEvent={userEvent}
                    onCancel={() => setFullEventModal(false)}
                />
            )}
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
                <MenuItem>
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
                <EvenDateHeader>
                    <EventDataHeaderTitle>{userEvent.event_name}</EventDataHeaderTitle>
                </EvenDateHeader>
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
  height: 300px;
  position: relative;
  width: 254px;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  margin: 10px;
`
const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const CustomerNameText = styled.p`
  font-family: Urbanist;
  font-size: 18px;
  font-weight: 600;
  line-height: 21.6px;
  margin: 0;
`
const CustomerPhoneText = styled.p`
  font-family: Urbanist;
  font-size: 15px;
  font-weight: 400;
  line-height: 18px;
  margin: 0px 0px 10px 0px;
`

const Hr = styled.hr<{ colorData: string }>`
  border: 1px solid ${(props) => props.colorData};
  width: 100%;
`
const EventData = styled.div`
  width: 100%;
  margin-top: 20px;
`

const EvenDateHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const EventDataHeaderTitle = styled.p`
  font-family: Urbanist;
  font-size: 18px;
  font-weight: 600;
  line-height: 21.6px;
  margin: 0;
`
const EventDataBody = styled.div`
  margin-top: 10px;
`
const EventLocationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  width: 100%;
`

const EventLocationLabel = styled.p`
  font-family: Urbanist;
  font-size: 16px;
  font-weight: 500;
  line-height: 21.6px;
  width: 41%;
  margin: 0;
  color: gray;
`

const EventLocationText = styled.p`
  font-family: Urbanist;
  font-size: 16px;
  font-weight: 500;
  line-height: 21.6px;
  margin: 0;
`

const EventDateContainer = styled.div`
  // margin-top:30px;
  width: 100%;
`

const EventDateLabel = styled.p`
  font-family: Urbanist;
  font-size: 16px;
  font-weight: 500;
  line-height: 21.6px;
  margin: 0;
  color: gray;
`

const DateContainer = styled.div`
  border: 1px solid #00000014;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  padding: 10px;
  height: 40px;
`

const FromDateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
`
const FromDateLabel = styled.p`
  font-family: Urbanist;
  font-size: 16px;
  font-weight: 500;
  line-height: 21.6px;
  margin: 0;
`
const Date = styled.p`
  font-family: Urbanist;
  font-size: 14px;
  font-weight: 500;
  line-height: 21.6px;
  margin: 0;
`
const Time = styled.p`
  font-family: Urbanist;
  font-size: 14px;
  font-weight: 500;
  line-height: 21.6px;
  margin: 0;
`

const ViewFullEventDiv = styled.div`
  width: 91%;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  border: 1px solid #a720b9;
  padding: 10px;
  cursor: pointer;
`
const ViewEventText = styled.p`
  font-family: Urbanist;
  font-size: 16px;
  font-weight: 600;
  line-height: 21.6px;
  margin: 0;
  color: #a720b9;
`

const MenuButton = styled.button`
  position: absolute;
  top: 8px;
  right: 9px;
  background: #ffffffb2;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 38px;
  height: 39px;
  cursor: pointer;
  border: none;
  box-shadow: 0px 20px 20px 0px hsla(259, 49%, 33%, 0.15);
`

const Dot = styled.p`
  color: hsla(293, 71%, 43%, 1);
  line-height: 7px;
  margin: 0px;
  font-size: 2rem;
`
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

const DropdownMenu = styled.div<{ menuOpen: boolean }>`
  position: absolute;
  top: 49px;
  right: 10px;
  background: white;
  width: 225px;
  height: 115px;
  z-index: 5;
  border-radius: 10px;
  display: ${({ menuOpen }) => (menuOpen ? 'block' : 'none')};
  animation: ${({ menuOpen }) => (menuOpen ? fadeIn : '')} 0.3s ease-out;

  box-shadow: 0px 4px 24px 0px hsla(0, 0%, 0%, 0.5);
`
const MenuItem = styled.div`
  padding: 2px 16px;
  height: 50px;

  cursor: pointer;
  color: black;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ItemIcon = styled.img`
  width: 20px;
  height: 20px;
`

const ItemName = styled.p`
  margin-left: 14px;
  width: 151px;
  height: 23px;
  font-family: Urbanist;
  font-size: 14px;
  font-weight: 500;
  line-height: 23px;
  text-align: left;
`
const HrMenu = styled.hr`
  margin: 0;
  color: #5b463e;
`

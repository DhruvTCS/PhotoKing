import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import BackButtonIconPng from '../../../assets/Icons/SingleAlbum/back.png'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../Redux/Hooks'
import { getUserCreatedEventsAPI } from '../../../Redux/ApiCalls/Dashboard/EventAPI'
import { UserCreatedEvents as UserCreatedEventsType } from '../../../Data/event.dto'
import UserCreatedEventCard from '../../atoms/Dashboard/Events/UserCreatedEventCard'
import userEvent from '@testing-library/user-event'
import ShareEventFormLinkPopup from '../../atoms/Dashboard/Navbar/ShareFormLinkPopup'
import LoadingDots from '../../atoms/Utlis/LoadinDots'

const UserCreatedEvents: React.FC = () => {
    const navigate = useNavigate()
    const { isError, error, userCreatedEvents, loading } = useAppSelector(
        (state) => state.event,
    )
    const dispatch = useAppDispatch()
    const [currentEvents, setCurrentEvents] = useState<UserCreatedEventsType[]>(
        [],
    )
    const [isShareFormPopUp, setIsShareFormPopUp] = useState<boolean>(false)
    useEffect(() => {
        if (!userCreatedEvents) {
            console.log('User created events')
            console.log(userCreatedEvents)
            dispatch(getUserCreatedEventsAPI())
        } else {
            setCurrentEvents(userCreatedEvents)
        }
    }, [userCreatedEvents])
    return (
        <Container>
            {isShareFormPopUp && (
                <ShareEventFormLinkPopup onClose={() => setIsShareFormPopUp(false)} />
            )}

            <BackButtonContainer>
                <BackButtonIcon src={BackButtonIconPng} onClick={() => navigate(-1)} />
                <BackButtonText>Back</BackButtonText>
            </BackButtonContainer>
            <HeaderContainer>
                <HeaderTitle>User Events</HeaderTitle>
                <AddUserEventFomButton onClick={() => setIsShareFormPopUp(true)}>
                    Share Form
                </AddUserEventFomButton>
            </HeaderContainer>
            <BodyContainer>
                {loading ? (
                    <NoEventContainer>
                        <LoadingDots />
                    </NoEventContainer>
                ) : userCreatedEvents && userCreatedEvents.length > 0 ? (
                    userCreatedEvents.map((event) => (
                        <UserCreatedEventCard userEvent={event} />
                    ))
                ) : (
                    <NoEventContainer>No events created yet.</NoEventContainer>
                )}
            </BodyContainer>
        </Container>
    )
}

export default UserCreatedEvents

const Container = styled.div`
  padding-left: 32px;
`

const BackButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 98%;
  align-items: center;
  margin-bottom: 16px;
`
const BackButtonIcon = styled.img`
  width: 16px;
  height: 13.8px;
  color: #171717;
  cursor: pointer;
`

const BackButtonText = styled.p`
  height: 23px;
  font-family: Urbanist, sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 22.8px;
  text-align: left;
  color: #171717;
  margin: 0px;
  margin-left: 11px;
`

const HeaderContainer = styled.div`
  width: 96%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
`

const HeaderTitle = styled.p`
  font-family: Urbanist, sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 22.8px;
  text-align: left;
  color: #171717;
  margin: 0px;
`

const BodyContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  max-height: 857px;
  overflow-y: auto;
  overflow-x: hidden;
  align-items: baseline;
  flex-wrap: wrap;
`

const AddUserEventFomButton = styled.button`
  width: 150px;
  height: 45px;
  color: white;
  border: none;
  border-radius: 20px;
  font-family: Urbanist;
  font-size: 15px;
  font-weight: 700;
  line-height: 18px;
  text-align: center;
  cursor: pointer;
  background: linear-gradient(360deg, #7a11a1 0%, #c62bc9 100%);
  box-shadow: 0px 4px 18px 0px #a720b966;
`
const NoEventContainer = styled.div`
width:100%;
display:flex;
align-items: center;
justify-content: center;
`

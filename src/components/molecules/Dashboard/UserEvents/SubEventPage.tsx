import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BackButtonIconPng from '../../../../assets/Icons/SingleAlbum/back.png'
import { useNavigate } from 'react-router-dom'
import { UserCreatedEvents } from '../../../../Data/event.dto'
import { useAppSelector } from '../../../../Redux/Hooks'
import UnderLine from '../../../atoms/Login/UnderLine'
import DateIconPNG from '../../../../assets/Icons/clock.png'
import LocationIconPNG from '../../../../assets/Icons/Location.png'

const SubEventPage: React.FC = () => {
  const [currentEvent, setCurrentEvent] = useState<UserCreatedEvents>()
  const { currentCreatedEvent, isError, error } = useAppSelector(
    (state) => state.event,
  )
  useEffect(() => {
    if (currentCreatedEvent) {
      setCurrentEvent(currentCreatedEvent)
    }
  }, [currentCreatedEvent])
  const navigate = useNavigate()
  return currentCreatedEvent ? (
    <Container>
      <BackButtonContainer>
        <BackButtonIcon src={BackButtonIconPng} onClick={() => navigate(-1)} />
        <BackButtonText>Back</BackButtonText>
      </BackButtonContainer>
      <BodyContainer>
        <HeaderContainer>
          <HeaderTitle>{currentEvent?.event_name}</HeaderTitle>
        </HeaderContainer>
        <SubEventCardListContainer>
          <SubEventCardList>
            {currentEvent?.sub_events.map((event) => (
              <SubEventCard>
                <CardTitleContainer>
                  <CardTitle>{event.sub_event_name}</CardTitle>
                </CardTitleContainer>
                <UnderLine width={100} isPercent={true} />
                <CardBody>
                  <EventDateContainer>
                    <EventDateLabelContainer>
                      <DateIcon src={DateIconPNG} />
                      <EventDateLabel>Dates :</EventDateLabel>
                    </EventDateLabelContainer>
                    <DateContainer>
                      <FromDateContainer>
                        <FromDateLabel>From :</FromDateLabel>
                        <Date>{event.starting_date} at{' '}
                          {event.starting_time}
                        </Date>
                      </FromDateContainer>
                      <FromDateContainer>
                        <FromDateLabel>To :</FromDateLabel>
                        <Date>
                          on &nbsp;{event.ending_date} at {event.ending_time}
                        </Date>
                      </FromDateContainer>
                    </DateContainer>
                  </EventDateContainer>
                  <LocationContainer>
                    <LocationLabelContainer>
                      <LocationIcon src={LocationIconPNG} />
                      <LocationLabel>Location :</LocationLabel>
                    </LocationLabelContainer>
                    <LocationText>
                      {event.sub_event_location}
                    </LocationText>
                  </LocationContainer>
                </CardBody>
              </SubEventCard>
            ))}
          </SubEventCardList>
        </SubEventCardListContainer>
      </BodyContainer>
    </Container>
  ) : null
}

export default SubEventPage

const Container = styled.div`
  height: 100%;
  width: 100%;
  margin-left: 34px;
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

const BodyContainer = styled.div`
  background-color: #ffffff9e;
  border-radius: 15px;
  min-height: 800px;
  padding: 30px;
`

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const HeaderTitle = styled.div`
  font-family: Urbanist, sans-serif;
  font-size: 30px;
  font-weight: 700;
  line-height: 22.8px;
`

const SubEventCardListContainer = styled.div`
  margin-top: 30px;
`

const SubEventCardList = styled.div`
  max-height: 650px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 40px 0px 0px 0px;
`

const SubEventCard = styled.div`
  min-height: 352px;
  width: 28%;
  min-width: 392px;
  background-color: white;
  border: 1px solid black;
  border-radius: 15px;
  margin: 20px;
  padding: 15px;
  border: none;
  opacity: 1;
  box-shadow: 0px 4px 24px 0px hsla(0, 0%, 0%, 0.5);
`
const CardTitleContainer = styled.div`
  font-family: Urbanist, sans-serif;
  font-size: 20px;
  font-weight: 600;
  text-decoration: underline;
  line-height: 22.8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
`

const CardTitle = styled.p``

const CardBody = styled.div`
padding-top:20px;
`

const EventDateContainer = styled.div`
  // margin-top:30px;
  width: 100%;
`

const EventDateLabel = styled.p`
  font-family: Urbanist;
  font-size: 20px;
  font-weight: 600;
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
  font-size: 17px;
  font-weight: 500;
  line-height: 21.6px;
  margin: 0;
`

const LocationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  margin-top:30px;
`
const LocationLabelContainer = styled.div`
display:flex;
align-items: center;

  margin-bottom:10px;
`;
const LocationLabel = styled.p`
  font-family: Urbanist;
  font-size: 20px;
  color: gray;
  font-weight: 500;
  line-height: 21.6px;
  margin: 0;
`

const LocationText = styled.p`
  font-family: Urbanist;
  font-size: 18px;
  font-weight: 500;
  line-height: 21.6px;
  margin: 0;
`

const LocationIcon = styled.img`
    height: 18px;
  width: 18px;
  margin:4px;
`

const DateIcon = styled.img`
  height: 18px;
  width: 18px;
  margin:4px;
`

const EventDateLabelContainer = styled.div`
display:flex;
align-items: center;

  margin-bottom:10px;
`



// src/pages/SubEventPage.tsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BackButtonIconPng from '../../../../assets/Icons/SingleAlbum/back.png';
import { useNavigate } from 'react-router-dom';
import { UserCreatedEvents } from '../../../../Data/event.dto';
import { useAppSelector } from '../../../../Redux/Hooks';
import UnderLine from '../../../atoms/Login/UnderLine';
import DateIconPNG from '../../../../assets/Icons/clock.png';
import LocationIconPNG from '../../../../assets/Icons/Location.png';

const SubEventPage: React.FC = () => {
  const [currentEvent, setCurrentEvent] = useState<UserCreatedEvents>();
  const { currentCreatedEvent } = useAppSelector((state) => state.event);

  useEffect(() => {
    if (currentCreatedEvent) {
      setCurrentEvent(currentCreatedEvent);
    }
  }, [currentCreatedEvent]);

  const navigate = useNavigate();

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
              <SubEventCard key={event.sub_event_name}>
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
                        <Date>
                          {event.starting_date} at {event.starting_time}
                        </Date>
                      </FromDateContainer>
                      <FromDateContainer>
                        <FromDateLabel>To :</FromDateLabel>
                        <Date>
                          {event.ending_date} at {event.ending_time}
                        </Date>
                      </FromDateContainer>
                    </DateContainer>
                  </EventDateContainer>
                  <LocationContainer>
                    <LocationLabelContainer>
                      <LocationIcon src={LocationIconPNG} />
                      <LocationLabel>Location :</LocationLabel>
                    </LocationLabelContainer>
                    <LocationText>{event.sub_event_location}</LocationText>
                  </LocationContainer>
                </CardBody>
              </SubEventCard>
            ))}
          </SubEventCardList>
        </SubEventCardListContainer>
      </BodyContainer>
    </Container>
  ) : null;
};

export default SubEventPage;

const Container = styled.div`
  height: 100%;
  width: 100%;
  margin-left: 34px;
  padding: 20px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
`;

const BackButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const BackButtonIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const BackButtonText = styled.p`
  font-family: Urbanist, sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #171717;
  margin: 0 0 0 10px;
`;

const BodyContainer = styled.div`
  height:80%;
  width: 90%;
  background-color: #ffffffb8;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.1);
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const HeaderTitle = styled.h1`
  font-family: Urbanist, sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #333;
`;

const SubEventCardListContainer = styled.div`
  margin-top: 20px;
`;

const SubEventCardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const SubEventCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.1);
  padding: 20px;
  flex: 1;
  min-width: 300px;
  max-width: 350px;
`;

const CardTitleContainer = styled.div`
  text-align: center;
  margin-bottom: 10px;
`;

const CardTitle = styled.h2`
  font-family: Urbanist, sans-serif;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
`;

const CardBody = styled.div`
  margin-top: 10px;
`;

const EventDateContainer = styled.div`
  margin-bottom: 20px;
`;

const EventDateLabelContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const EventDateLabel = styled.p`
  font-family: Urbanist, sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #555;
  margin: 0 0 0 5px;
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const FromDateContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FromDateLabel = styled.p`
  font-family: Urbanist, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #777;
  margin: 0 5px 0 0;
`;

const Date = styled.p`
  font-family: Urbanist, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin: 0;
`;

const LocationContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LocationLabelContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const LocationLabel = styled.p`
  font-family: Urbanist, sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #555;
  margin: 0 0 0 5px;
`;

const LocationText = styled.p`
  font-family: Urbanist, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin: 0;
`;

const LocationIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const DateIcon = styled.img`
  width: 20px;
  height: 20px;
`;

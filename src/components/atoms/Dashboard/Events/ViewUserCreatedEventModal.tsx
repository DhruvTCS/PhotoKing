import React from 'react'
import styled from 'styled-components'
import { UserCreatedEvents } from '../../../../Data/event.dto';
import UnderLine from '../../Login/UnderLine';


interface ModalProps {
  onCancel: () => void;
  userEvent: UserCreatedEvents
}
const ViewUserCreatedEventModal: React.FC<ModalProps> = ({ onCancel, userEvent }) => {
  return (
    <Modal>
      <ModalContent>
        <CloseButtonContainer>

          <CloseButton onClick={() => onCancel()}>&times;</CloseButton>
        </CloseButtonContainer>
        <ModalHeader>
          <ModalTitle>
            {userEvent.event_name}
          </ModalTitle>
        </ModalHeader>
        <UnderLine width={100} isPercent={true} />
        <ModalBody>
          <SubEventsContainer>
            <SubEventsLabel>Sub Events</SubEventsLabel>
            <SubEventsList>
              {userEvent.sub_events.map(event =>
                <SubEvent>
                  <SubEventInput type='text' value={event.sub_event_name} readOnly />
                </SubEvent>
              )}
            </SubEventsList>
          </SubEventsContainer>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ViewUserCreatedEventModal


const Modal = styled.div`
width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  @media (max-width: 480px) {
    
    padding: 0px;
  }
`;

const ModalContent = styled.div`
 display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  height: 100%;
  max-height: 400px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: 768px) {
    max-width: 85%;
    max-height: 80%;
  }

  @media (max-width: 480px) {
    max-width: 80%;
    max-height: 90%;
    padding: 15px;
  }
`;

const CloseButton = styled.div`
float:right;
width:20px;
cursor:pointer;
color:gray;
text-align:right;
font-size:27px;
`;

const CloseButtonContainer = styled.div`
width:100%;
text-align:right;
`;

const ModalHeader = styled.div`
width:100%;
display: flex;
align-items:center;
justify-content:center;
margin-bottom:20px;

`;
const ModalTitle = styled.div`
font-family: Urbanist;
font-size: 24px;
font-weight: 600;
line-height: 21.6px;
margin:0;
`;
const ModalBody = styled.div`
margin-top:30px;
`;

const SubEventsContainer = styled.div``;

const SubEventsLabel = styled.p`
font-family: Urbanist;
font-size: 16px;
font-weight: 500;
line-height: 21.6px;
margin:0;
`;

const SubEventsList = styled.div`
max-height:200px;
overflow-y: auto;
overflow-x: hidden;
border: 1px solid #CECECE;
padding:10px;
border-radius:10px;
display:flex;
flex-wrap:wrap;
`;


const SubEvent = styled.div`
width:28%;
height:38px;
padding:6px;
border: 1px solid gray;
border-radius:15px;
display:flex;
align-items: center;
justify-content: center;
margin:4px;
`;

const SubEventInput = styled.input`
border: none;
width:90%;
text-align:center;
text-decoration:underline;
&:focus{
outline:none;
}
`;
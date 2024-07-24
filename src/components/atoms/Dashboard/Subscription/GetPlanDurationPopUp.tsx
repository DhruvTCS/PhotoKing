import React, { useState } from 'react'
import styled from 'styled-components'
import PaymentIconPNG from '../../../../assets/Icons/paymentModal.png'
import { SubscriptionType } from '../../../../Data/subscription.dto';
import SelectDurationList from './SelectDurationList';

interface PopupProps {
    Buy: (id: number, duration: number) => void;
    cancel: () => void;
    card: SubscriptionType

}

const Container = styled.div`
display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px; /* Ensure padding for smaller screens */

`;
const Popup = styled.div`
width: 555px;
height: 427px;
padding-top:20px;
background-color: white;
display: flex;
flex-direction: column;
align-items: center;
border-radius:32px;
`;
const IconContainer = styled.div`
width: 90px;
height: 90px;
display: flex;
align-items: center;
justify-content: center;
background: #AC22BB26;
border-radius:50%;
box-shadow: 0px 4px 14px 0px #86169680;

`;
const Icon = styled.img`
width: 58.5px;
height: 65px;


`;

const ButtonContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin-top:20px;
width: 92%;
`;
const CancelButton = styled.button`
width:118px;
height:60px;
background: #EFEFEF;
border-radius:16px;
border:none;
font-family: Urbanist;
font-size: 20px;
font-weight: 700;
line-height: 24px;
text-align: center;
color:black;

cursor:pointer;
`;
const DeleteButton = styled.button`
width:118px;
height:60px;
background: linear-gradient(360deg, #7A11A1 0%, #C62BC9 100%);
border:none;
box-shadow: 0px 4px 18px 0px #A720B966;

border-radius:16px;
font-family: Urbanist;
font-size: 20px;
font-weight: 800;
line-height: 24px;
text-align: center;
color:white;
margin-left:10px;

cursor:pointer;
`;
const BodyContainer = styled.div`
width:100%;
display: flex;
flex-direction: column;
align-items: baseline;
margin-top:30px;
`;
const ItemContainer = styled.div`
display: flex;
align-items: baseline;
justify-content: center;
margin-left:30px;
margin-top:10px;
`
const ItemLabel = styled.p`
font-family: Urbanist;
font-size: 21px;
font-weight: 500;
line-height: 34px;
text-align: center;
color: gray;
margin:0
`;

const ItemText = styled.p`
font-family: Urbanist;
margin:0;
font-size: 21px;
font-weight: 500;
line-height: 34px;
text-align: center;
color: black;
`;
const GetDurationPopup: React.FC<PopupProps> = ({ Buy, cancel, card }) => {
    const [selectedDuration, setSelectedDuration] = useState<number>(1) //
    const handleSelect = (value: string) => {
        setSelectedDuration(parseInt(value.split(' ')[0]))
    };
    return (
        <Container>
            <Popup>
                <IconContainer>
                    <Icon src={PaymentIconPNG} />
                </IconContainer>
                <BodyContainer>
                    <ItemContainer>
                        <ItemLabel>Selected Plan :&nbsp;</ItemLabel>
                        <ItemText>{card.name}</ItemText>
                    </ItemContainer>
                    <ItemContainer>
                        <ItemLabel>Price  :&nbsp;</ItemLabel>
                        <ItemText>₹ {card.price_per_month}  / Month</ItemText>
                    </ItemContainer>
                    <ItemContainer>
                        <ItemLabel>Plan Duration : &nbsp;</ItemLabel>
                        <SelectDurationList
                            options={['1 Month', '3 Months', '6 Months', '12 Months']}
                            onSelect={handleSelect}
                            placeholder="Select Plan Duration"
                        />
                    </ItemContainer>
                    <ItemContainer>
                        <ItemLabel>Total Pay  :&nbsp;</ItemLabel>
                        <ItemText>₹ {parseInt(card.price_per_month) * selectedDuration}  </ItemText>
                    </ItemContainer>
                    <ButtonContainer>
                        <CancelButton onClick={() => cancel()}>Cancel</CancelButton>
                        <DeleteButton onClick={() => Buy(card.id, selectedDuration)}>
                            Buy
                        </DeleteButton>
                    </ButtonContainer>
                </BodyContainer>
            </Popup>
        </Container>
    )
}

export default GetDurationPopup
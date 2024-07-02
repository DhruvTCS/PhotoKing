import React from 'react'
import styled from 'styled-components';
import TickIconPNG from '../../../../assets/Icons/tick.png'
import TransParentIconPNG from '../../../../assets/Icons/transparent-tick.png'
import { SubscriptionType } from '../../../../Data/subscription.dto';

interface CardProps {
    card: SubscriptionType,
    isActivated: boolean;
    onClick1: (id: number) => void;
}
const CardContainer = styled.div<{ isActivated: boolean }>`
width: 292px;
height: 500px;
position: relative;
background-color:transparent;
border-radius:20px;
margin-left:15px;
${props => props.isActivated
        ? `
     transform: translateY(-30px);
      box-shadow: 0px 42px 34px 0px #5243C24B;
    transition: all 0.4s ease-in-out;
      background: #231D4F;

    `: null
    }
`;
const RecommendedButton = styled.div <{ isActivated: boolean }>`
display: flex;
align-items: center;
justify-content: center;
${props => !props.isActivated ? `display:none;` : null}
width: 121px;
height: 27px;
background-color:rgb(64,56,121);
color:white;
margin-top:10px;
margin-right:10px;
text-align:center;
border-radius:12px;
opacity:0.7;
padding-top:3px;
font-family: Urbanist;
font-size: 10px;
font-weight: 800;
line-height: 12px;
letter-spacing: 0.8333333134651184px;

text-align: center;

`
const RecommendeConatiner = styled.div`

display:flex;
position:absolute;

right:-6px;
align-items: center;
justify-content: end;

`
const CardHeader = styled.div<{ isActivated: boolean }>`
display: flex;
flex-direction: column;
margin-left:30px;
color:${props => props.isActivated ? 'white;' : '#1D1D1D;'}
margin-top:${props => props.isActivated ? '30px;' : '20px;'}
`;

const CardStorage = styled.p`
font-family: "Urbanist";
font-size: 36px;
font-weight: 700;
line-height: 46px;
text-align: left;
margin:0px;
`;

const CardPrice = styled.p`
font-family: "Urbanist";
font-size: 17px;
font-weight: 600;
line-height: 20.4px;
text-align: left;
margin:0px;

`;

const PlanType = styled.p`
font-family: "Urbanist";
font-size: 28px;
font-style: italic;
font-weight: 600;
line-height: 33.6px;
text-align: left;
margin:0px;
`;
const CardDescriptionContainer = styled.div`
display:flex;
flex-direction: column;
height: 255px;
margin-left: 26px;
margin-top: 36px;

`;
const DescriptionItemContainer = styled.div`
display: flex;
margin-top:18px;

`;
const ItemIcon = styled.img`
width: 20px;
height: 20px;
`;
const DescriptionItem = styled.p <{ isActivated: boolean }>`
font-family: Urbanist;
font-size: 15px;
font-weight: 500;
line-height: 18px;
text-align: left;
margin: 0px;
margin-left:10px;
color:${props => props.isActivated ? `white` : `#848199`} ;


`;
const ButtonContainer = styled.div`

`;
const SubmitButton = styled.button<{ isActivated: boolean }>`
width: 207px;
height: 45px;
color:white;
border:none;
border-radius:20px;
font-family: Urbanist;
font-size: 15px;
font-weight: 500;
line-height: 18px;
text-align: center;
cursor:pointer;

background:${props => props.isActivated ? 'linear-gradient(360deg, #7A11A1 0%, #C62BC9 100%);' : '#8b85A4'};
${props => props.isActivated ? `box-shadow: 0px 4px 18px 0px #A720B966;` : null}
`;
const SubscriptionCard: React.FC<CardProps> = ({ card, isActivated, onClick1 }) => {
    return (
        <CardContainer isActivated={isActivated} onClick={() => onClick1(card.id)}>
            <RecommendeConatiner>

                <RecommendedButton isActivated={card.description[0] === 'MOST POPULAR'}>Recommended</RecommendedButton>
            </RecommendeConatiner>
            <CardHeader isActivated={isActivated}>
                <CardStorage>
                    {card.storage_size}
                </CardStorage>
                <CardPrice>
                    {card.price_per_month} ₹ / Month
                </CardPrice>
                <PlanType>
                    {card.description[0]}
                </PlanType>
            </CardHeader>
            <CardDescriptionContainer>
                {card ? card.description.slice(1).map((item) =>
                    <DescriptionItemContainer>
                        <ItemIcon src={TickIconPNG} />
                        <DescriptionItem isActivated={isActivated}>
                            {item}
                        </DescriptionItem>
                    </DescriptionItemContainer>
                )

                    : null}



            </CardDescriptionContainer>
            <ButtonContainer>
                <SubmitButton isActivated={isActivated}>Choose Plan</SubmitButton>
            </ButtonContainer>
        </CardContainer>
    )
}

export default SubscriptionCard
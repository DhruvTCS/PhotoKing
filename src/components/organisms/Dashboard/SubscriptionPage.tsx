import React, { useEffect, useState } from 'react'
import SubscriptionCard from '../../atoms/Dashboard/Subscription/SubscriptionCard'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../../Redux/Hooks';
import { subscriptionsPlansAPI } from '../../../Redux/ApiCalls/Dashboard/SubscriptionAPI';
import { SubscriptionType } from '../../../Data/subscription.dto';

const PageContainer = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
width:100%;
height:100%;
`;
const Container = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
width:70%;
`;
const HeadingContainer = styled.div``;
const Heading = styled.p`
font-family: Urbanist;
font-size: 38px;
font-weight: 600;
line-height: 45.6px;
text-align: left;

`;
const SubHeading = styled.p`
font-family: Urbanist;
font-size: 23px;
font-weight: 500;
line-height: 27.6px;
text-align: left;

`;
const PlanContainer = styled.div`
width: 937px;
height: 500px;
background: #FFFFFF80;
margin-top:90px;
border-radius:20px;
display: flex;
`
const SubscriptionPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { subscriptions, loading } = useAppSelector(state => state.subscription);
    const [activeCard, setActiveCard] = useState<number>();
    useEffect(() => {
        if (!subscriptions) {
            dispatch(subscriptionsPlansAPI());
        } else {
            subscriptions.forEach((sub: SubscriptionType) => {
                if (sub.description[0] === 'MOST POPULAR') {
                    setActiveCard(sub.id);
                }
            })
        }

        return () => {

        }
    }, [subscriptions, dispatch]);

    return (
        <PageContainer>
            <Container>

                <HeadingContainer>
                    <Heading>
                        Plans & Pricing
                    </Heading>
                    <SubHeading>
                        Whether your time-saving automation needs are large or small, we’re here to help you scale.
                    </SubHeading>
                </HeadingContainer>
                <PlanContainer>
                    {(!loading && subscriptions) ? subscriptions?.map((subscription) => <SubscriptionCard card={subscription} isActivated={activeCard === subscription.id} onClick1={setActiveCard} />) : null}

                </PlanContainer>
            </Container>
        </PageContainer>
    )
}

export default SubscriptionPage
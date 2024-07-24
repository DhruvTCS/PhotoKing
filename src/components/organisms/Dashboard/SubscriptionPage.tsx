import React, { useEffect, useState } from 'react'
import SubscriptionCard from '../../atoms/Dashboard/Subscription/SubscriptionCard'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../../Redux/Hooks';
import { subscriptionsPlansAPI } from '../../../Redux/ApiCalls/Dashboard/SubscriptionAPI';
import { SubscriptionType } from '../../../Data/subscription.dto';
import LoadingDots from '../../atoms/Utlis/LoadinDots';
import GetDurationPopup from '../../atoms/Dashboard/Subscription/GetPlanDurationPopUp';
import { completePaymentAPI, createOrderAPI } from '../../../Redux/ApiCalls/Dashboard/PaymentAPI';
import CompanyLogoPNG from '../../../assets/images/Logo.png';
import { cancelPayment } from '../../../Redux/Slice/Dashboard/PaymentSlice';
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
const LoadingContainer = styled.div`
height:100%;
width: 100%;
display: flex;
align-items: center;
justify-content: center;
`;
const SubscriptionPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { subscriptions, loading } = useAppSelector(state => state.extra);
    const [activeCard, setActiveCard] = useState<number>();
    const [durationPopup, setDurationPopup] = useState(false)
    const [duration, setDuration] = useState<number>()
    const [currentCard, setCurrentCard] = useState<SubscriptionType>()
    const { order, paymentSuccess } = useAppSelector(state => state.payment)
    const { user } = useAppSelector(state => state.auth)
    useEffect(() => {
        if (!subscriptions) {
            dispatch(subscriptionsPlansAPI());
        } else {
            subscriptions.forEach((sub: SubscriptionType) => {
                if (sub.description[0] === 'MOST POPULAR') {
                    setActiveCard(sub.id);
                    setCurrentCard(sub)
                }
            })
        }

        return () => {

        }
    }, [subscriptions, dispatch]);
    useEffect(() => {

        if (order && !paymentSuccess && currentCard && duration) {
            console.log(order.amount)
            const options = {
                key: 'rzp_test_OcmQGXNlHWXXCM',
                amount: (order.amount * 100),
                currency: 'INR',
                name: 'Phot King',
                logo: { CompanyLogoPNG },
                description: `${currentCard.description}`,
                order_id: order.id,
                handler: async function (response: any) {
                    console.log(response);


                    dispatch(completePaymentAPI({ plan_id: currentCard.id, duration, payment_id: response.razorpay_payment_id, order_id: response.razorpay_order_id, signature: response.razorpay_signature }))

                },
                prefill: {
                    name: `${user?.name}`,
                    email: `${user?.email}`,
                    contact: `${user?.phone_number}`,
                },
                notes: {
                    address: 'Photo King Address.',
                },
                theme: {
                    color: '#AE2AB1',
                },
            };

            const rzp = new (window as any).Razorpay(options);

            rzp.on('payment.failed', (response: any) => {
                console.log('payment failed')
            });

            rzp.on('payment.cancelled', () => {
                alert('Payment cancelled');
                dispatch(cancelPayment())
                // Handle payment cancellation
            });
            rzp.open();
        }
    }, [order, paymentSuccess, dispatch]);
    const handleActiveCard = (id: number) => {
        if (subscriptions) {

            subscriptions.forEach((sub: SubscriptionType) => {
                if (sub.id === id) {
                    setActiveCard(sub.id);
                    setCurrentCard(sub)
                }
            })
        }
    }
    const startPayment = (id: number, duration: number) => {
        setDuration(duration)
        dispatch(createOrderAPI({ storage_plan_id: id, duration }))
    }
    return (
        <PageContainer>
            {durationPopup && currentCard && <GetDurationPopup cancel={() => setDurationPopup(false)} Buy={(id, duration) => { startPayment(id, duration) }} card={currentCard} />}

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
                    {loading ? <LoadingContainer><LoadingDots /></LoadingContainer> :
                        (!loading && subscriptions) ? subscriptions?.map((subscription) => <SubscriptionCard card={subscription} isActivated={activeCard === subscription.id} onClick1={handleActiveCard} setDurationPopup={setDurationPopup} />) : null

                    }

                </PlanContainer>
            </Container>
        </PageContainer>
    )
}

export default SubscriptionPage
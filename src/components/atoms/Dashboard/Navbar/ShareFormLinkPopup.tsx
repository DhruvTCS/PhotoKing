import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import QRCode from 'qrcode.react';
import UnderLine from '../../Login/UnderLine';

import CopyPNG from '../../../../assets/Icons/ShareCode/copy.png'
import { showErrorToast, showSuccessToast } from '../../Utlis/Toast';
import { useAppDispatch, useAppSelector } from '../../../../Redux/Hooks';
import { getEventFormTokenAPI } from '../../../../Redux/ApiCalls/Dashboard/EventAPI';
import LoadingDots from '../../Utlis/LoadinDots';
const ModalOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background-color: white;
color: black;
font-family: Urbanist,sans-serif;

  padding: 20px;
  border-radius: 5px;
  width: 500px;
  height:470px;
  max-width: 80%;
  position: relative;
`;

const CloseButton = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
`;
const ModalHeader = styled.div`
width:100%:
display:flex;
align-items: center;
justify-content: center;
`;

const QrCodeContainer = styled.div`
width: 240px;
height: 240px;
border-radius:70px;
background: #FFFFFF;
box-shadow: 0px 14px 44px 0px #00000026;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
position: relative;



`;

const EventCodeContainer = styled.div`
width:84%;
`;
const CodeContainer = styled.div`
display:flex;
align-items: center;
justify-content: space-between;
`;
const EventCodeText = styled.p``;
const CopyIcon = styled.img`
height:25px;
width: 25px;
cursor: pointer;
`;

const EventCodeLabel = styled.p`
font-family: Urbanist;
font-size: 16px;
font-weight: 500;
line-height: 32px;
text-align: left;
margin-bottom:0;
`;
const QrCodeDiv = styled.div``;
const ModalBody = styled.div`
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top:40px;
`;
const ModalTitle = styled.p`
font-family: Urbanist;
font-size: 20px;
font-weight: 700;
line-height: 32px;
text-align: center;
margin-bottom:0;
`;
const LoadingContainer = styled.div`
display:flex;
align-items:center;
justify-content:center;
height:81%;
width:100%;
`
const LoadingText = styled.p`
font-family: Urbanist;
font-size: 20px;
font-weight: 500;
line-height: 32px;
text-align: center;
margin:0;
`;

interface ShareFormLinkProps {
    onClose: () => void;
}
const ShareEventFormLinkPopup: React.FC<ShareFormLinkProps> = ({ onClose }) => {
    const [url, setUrl] = useState<string>('')
    const dispatch = useAppDispatch();
    const { loading, isError, error, eventFromToken } = useAppSelector(state => state.extra)
    useEffect(() => {
        if (isError) {
            if (error && error.message) {
                showErrorToast(error.message)
            } else {
                showErrorToast("Something went wrong! Please try again later.")
            }
        } else {
            console.log("loading popup.");
            // dispatch(getEventFormTokenAPI());
        }
    }, [isError, error])
    useEffect(() => {
        if (eventFromToken) {
            setUrl(`http://localhost:3000/share/form/${eventFromToken}`)
        }
    }, [eventFromToken])
    const handleCopy = () => {
        // setIsCopy(true);
        navigator.clipboard.writeText(url);
        showSuccessToast("Code copied to clipboard.")
        // alert('Link copied to clipboard!');

    };
    return (
        <ModalOverlay>
            <ModalContent>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <ModalHeader>
                    <ModalTitle>Share Event Form</ModalTitle>
                </ModalHeader>
                {loading ? <LoadingContainer><LoadingText>Generating Form Link</LoadingText><LoadingDots /></LoadingContainer> :

                    <ModalBody>
                        <QrCodeContainer>
                            <QrCodeDiv>
                                <QRCode value={`url`} size={140} />
                            </QrCodeDiv>


                        </QrCodeContainer>
                        <EventCodeContainer>
                            <EventCodeLabel>
                                Event Code
                            </EventCodeLabel>
                            <CodeContainer>
                                <EventCodeText>
                                    {url}
                                </EventCodeText>

                                <CopyIcon src={CopyPNG} onClick={() => handleCopy()} />

                            </CodeContainer>
                            <UnderLine width={100} isPercent={true} />
                        </EventCodeContainer>
                    </ModalBody>
                }
            </ModalContent>
        </ModalOverlay>
    )
}

export default ShareEventFormLinkPopup
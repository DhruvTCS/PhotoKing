import React from 'react'
import styled from 'styled-components'
import BackIconPNG from '../../../assets/Icons/SingleAlbum/back.png'
import UnderLine from '../../atoms/Login/UnderLine';
import ShareButton from '../../atoms/Dashboard/ShareCode/ShareButtonModal';
import QRCode from 'qrcode.react';

const ShareCodeContainer = styled.div`
margin-left:35px;
`;
const ShareCodeHeader = styled.div`
display:flex;
align-items:center;
`;
const BackIcon = styled.img`
width: 19.6px;
height: 16.8px;
`;
const Text1 = styled.p`
font-family: Urbanist;
font-size: 19px;
font-weight: 600;
line-height: 22.8px;
text-align: left;
color: #A720B9;
margin-left:10px;
`;
const Text2 = styled.p`
font-family: Urbanist;
font-size: 19px;
font-weight: 600;
line-height: 22.8px;
text-align: left;
color: #171717;
margin-left:22px;
`;
const MainContainer = styled.div`
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const QrCodeConatiner = styled.div`
width: 401px;
height: 401px;
border-radius:70px;
background: #FFFFFF;
box-shadow: 0px 14px 44px 0px #00000026;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;



`;
const QrCodeDiv = styled.div``;
const EventCodeConatiner = styled.div``;
const CodeContainer = styled.div``;
const EventCodeText = styled.p``;
const CopyButton = styled.img``;

const ShareCodePage: React.FC = () => {
    return (
        <ShareCodeContainer>
            <ShareCodeHeader>
                <BackIcon src={BackIconPNG} />
                <Text1>Dashboard</Text1>
                <Text2>Generate Event Code</Text2>
            </ShareCodeHeader>
            <MainContainer>
                <QrCodeConatiner>
                    <QrCodeDiv>
                        <QRCode value={"http://localhost:3000/dashboard/sharecode"} size={240} />
                    </QrCodeDiv>
                    <ShareButton shareUrl='' />

                </QrCodeConatiner>
                <EventCodeConatiner>
                    <CodeContainer>
                        <EventCodeText>

                        </EventCodeText>

                        <CopyButton>

                        </CopyButton>
                    </CodeContainer>
                    <UnderLine width={100} />
                </EventCodeConatiner>
            </MainContainer>
        </ShareCodeContainer>
    )
}

export default ShareCodePage
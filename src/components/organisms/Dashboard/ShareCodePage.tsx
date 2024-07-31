import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BackIconPNG from '../../../assets/Icons/SingleAlbum/back.png'
import UnderLine from '../../atoms/Login/UnderLine';
import ShareButton from '../../atoms/Dashboard/ShareCode/ShareButtonModal';
import QRCode from 'qrcode.react';
import CopyPNG from '../../../assets/Icons/ShareCode/copy.png'
import { useNavigate, useParams } from 'react-router-dom';
import { showSuccessToast } from '../../atoms/Utlis/Toast';

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
cursor: pointer;
`;
const Text1 = styled.p`
font-family: Urbanist;
font-size: 19px;
font-weight: 600;
line-height: 22.8px;
text-align: left;
color: #A720B9;
margin-left:10px;
cursor:pointer;
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
position: relative;



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

const EventCodeConatiner = styled.div`
width:400px;
margin-top:150px;
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
const CopyButtonConatiner = styled.div`
margin-top:80px;
`;
const CopyButton = styled.button`
width: 273px;
cursor: pointer;
height: 60px;
border-radius: 16px;
background: linear-gradient(360deg, #7A11A1 0%, #C62BC9 100%);
box-shadow: 0px 4px 18px 0px #A720B966;
font-family: Urbanist;
font-size: 18px;
font-weight: 600;
line-height: 21.6px;
text-align: center;
color:white;
border:none;


`

const ShareCodePage: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    useEffect(() => {
        if (params.code)
            setCode(params.code);
    }, [])
    const [isCopy, setIsCopy] = useState(false);

    const handleCopy = () => {
        setIsCopy(true);
        navigator.clipboard.writeText(code);
        showSuccessToast("Code copied to clipboard.")
        // alert('Link copied to clipboard!');

    };
    return (
        <ShareCodeContainer>
            <ShareCodeHeader>
                <BackIcon src={BackIconPNG} onClick={() => navigate(-1)} />
                <Text1 onClick={() => navigate('/dashboard/')}>Dashboard</Text1>
                <Text2>Generate Event Code</Text2>
            </ShareCodeHeader>
            <MainContainer>
                <QrCodeConatiner>
                    <QrCodeDiv>
                        <QRCode value={`http://${window.location.host}/dashboard/sharecode/${params["code"]}`} size={240} />
                    </QrCodeDiv>
                    <ShareButton shareUrl={`http://${window.location.host}/dashboard/sharecode/${params["code"]}`} />

                </QrCodeConatiner>
                <EventCodeConatiner>
                    <EventCodeLabel>
                        Event Code
                    </EventCodeLabel>
                    <CodeContainer>
                        <EventCodeText>
                            {params["code"]}
                        </EventCodeText>

                        <CopyIcon src={CopyPNG} onClick={() => handleCopy()} />

                    </CodeContainer>
                    <UnderLine width={100} isPercent={true} />
                </EventCodeConatiner>
                <CopyButtonConatiner>
                    <CopyButton onClick={() => handleCopy()}>Copy Event Code</CopyButton>
                </CopyButtonConatiner>
            </MainContainer>
        </ShareCodeContainer>
    )
}

export default ShareCodePage
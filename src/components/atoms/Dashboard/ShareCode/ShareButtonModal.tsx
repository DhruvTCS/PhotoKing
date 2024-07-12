import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import { FaWhatsapp, FaFacebook, FaInstagram, FaTelegram, FaCopy } from 'react-icons/fa';
import UnderLine from '../../Login/UnderLine';
import WhatsAppPNG from '../../../../assets/Icons/ShareCode/whatapp.png'
import InstaPNG from '../../../../assets/Icons/ShareCode/instagram.png'
import TelegramPNG from '../../../../assets/Icons/ShareCode/telegram.png'
import FacebookPNG from '../../../../assets/Icons/ShareCode/facebook.png'
import CopyIconPNG from '../../../../assets/Icons/ShareCode/copy.png'
import CopyTickPNG from '../../../../assets/Icons/ShareCode/copy-tick.png'
import ShareCodePNG from '../../../../assets/Icons/ShareCode/share.png'
import { showSuccessToast } from '../../Utlis/Toast';
interface ShareButtonProps {
    shareUrl: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ shareUrl }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCopy, setIsCopy] = useState(false);
    useEffect(() => {
        setIsCopy(false);

        return () => {

        }
    }, [])

    const handleCopy = () => {
        setIsCopy(true);
        navigator.clipboard.writeText(shareUrl);
        showSuccessToast("URL copied to clipboard.")
        // alert('Link copied to clipboard!');

    };

    const handleShare = (platform: string) => {
        let url = '';

        switch (platform) {
            case 'whatsapp':
                url = `https://wa.me/?text=${encodeURIComponent(shareUrl)}`;

                break;
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
                break;
            case 'instagram':
                // Instagram does not support direct URL sharing
                alert('Instagram does not support direct URL sharing.');
                return;
            case 'telegram':
                url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`;
                break;
            default:
                break;
        }

        if (url) {
            window.open(url, '_blank');
        }
    };

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>
                <ShareButtonIcon src={ShareCodePNG} />
                Share
            </Button>
            {isOpen && (
                <Modal>
                    <ModalOverlay>

                        <ModalContent>
                            <CloseButton onClick={() => setIsOpen(false)}>&times;</CloseButton>
                            {/* // <CloseButton onClick={>×</CloseButton> */}
                            <ModalHeading>

                                Share Link</ModalHeading>
                            <ContentDiv>

                                <InputContainer>
                                    <Input type="text" value={shareUrl} readOnly />
                                    <CopyButton onClick={handleCopy}>
                                        <CopyIcon src={CopyIconPNG} />
                                    </CopyButton>
                                </InputContainer>
                                <UnderLine width={70} isPercent={true}></UnderLine>
                                <SocialIcons>
                                    <Icon onClick={() => handleShare('whatsapp')}>
                                        <SocialIcon src={WhatsAppPNG} />
                                    </Icon>
                                    <Icon onClick={() => handleShare('facebook')}>
                                        <SocialIcon src={FacebookPNG} />
                                    </Icon>
                                    <Icon onClick={() => handleShare('telegram')}>
                                        <SocialIcon src={TelegramPNG} />
                                    </Icon>
                                </SocialIcons>
                            </ContentDiv>
                        </ModalContent>
                    </ModalOverlay>
                </Modal>
            )}
        </>
    );
};

export default ShareButton;

// Styled Components
const Button = styled.button`
width: 178px;
height: 60px;
cursor: pointer;
display:flex;
align-items: center;
justify-content: center;
border-radius: 36px;
opacity: 0px;
background: linear-gradient(360deg, #7A11A1 0%, #C62BC9 100%);
box-shadow: 0px 4px 14px 0px #86169680;
font-family: Urbanist;
font-size: 22px;
font-weight: 500;
line-height: 26.4px;
text-align: center;
color: #FFFFFF;
border:none;
position:absolute;
bottom:-25px;
`;
const ShareButtonIcon = styled.img`
height:27px;
width:24px;
margin-right:3px;
`
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
`;
const ModalOverlay = styled.div` width: 492px;
height: 295px;
background-color: white;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
border-radius:32px;`
const ModalContent = styled.div`
height:90%;
width:100%;
`;


const CloseButton = styled.span`
  color: #aaa;
  width:97%;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  text-align:right;
  padding-right:20px;

`;
const ModalHeading = styled.p`
font-family: Urbanist;
font-size: 29px;
font-weight: 700;
line-height: 24px;
text-align: center;
margin-left:10px;
`
const ContentDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const InputContainer = styled.div`
  /* styles for input container */
  display: flex;
  align-items: center;
  justify-content:space-between;
  width:70%;
`;
const Input = styled.input`
border:none;
width:100%;
&:focus{
outline: none;
}

font-family: Urbanist;
font-size: 16px;
font-weight: 500;
line-height: 24px;
text-align: center;
margin-left:10px;

`;

const CopyButton = styled.div`
  /* styles for copy button */
  cursor: pointer;
`;

const SocialIcons = styled.div`
  /* styles for social icons container */
  display: flex;
  justify-content: space-around;
  width:70%;
  margin-top: 20px;
`;

const Icon = styled.div`
  /* styles for individual icons */
  cursor: pointer;
  font-size: 24px;
  color: #000;
  &:hover {
    color: #007bff;
  }
`;

const CopyIcon = styled.img`
height:25px;
width:25px;
`;

const SocialIcon = styled.img`
height:45px;
width:45px;
`
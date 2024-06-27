import React, { useState } from 'react';
import styled from 'styled-components';
import { FaWhatsapp, FaFacebook, FaInstagram, FaTelegram, FaCopy } from 'react-icons/fa';

interface ShareButtonProps {
    shareUrl: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ shareUrl }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
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
            <Button onClick={() => setIsOpen(true)}>Share</Button>
            {isOpen && (
                <Modal>
                    <ModalContent>
                        <CloseButton onClick={() => setIsOpen(false)}>×</CloseButton>
                        <h2>Share this link</h2>
                        <InputContainer>
                            <input type="text" value={shareUrl} readOnly />
                            <CopyButton onClick={handleCopy}>
                                <FaCopy />
                            </CopyButton>
                        </InputContainer>
                        <SocialIcons>
                            <Icon onClick={() => handleShare('whatsapp')}>
                                <FaWhatsapp />
                            </Icon>
                            <Icon onClick={() => handleShare('facebook')}>
                                <FaFacebook />
                            </Icon>
                            <Icon onClick={() => handleShare('instagram')}>
                                <FaInstagram />
                            </Icon>
                            <Icon onClick={() => handleShare('telegram')}>
                                <FaTelegram />
                            </Icon>
                        </SocialIcons>
                    </ModalContent>
                </Modal>
            )}
        </>
    );
};

export default ShareButton;

// Styled Components
const Button = styled.button`
  /* styles for share button */
`;

const Modal = styled.div`
  /* styles for modal */
`;

const ModalContent = styled.div`
  /* styles for modal content */
`;

const CloseButton = styled.button`
  /* styles for close button */
`;

const InputContainer = styled.div`
  /* styles for input container */
  display: flex;
  align-items: center;
`;

const CopyButton = styled.button`
  /* styles for copy button */
`;

const SocialIcons = styled.div`
  /* styles for social icons container */
  display: flex;
  justify-content: space-around;
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


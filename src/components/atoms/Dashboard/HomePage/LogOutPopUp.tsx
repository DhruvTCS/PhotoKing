import React from 'react'
import styled from 'styled-components'
import LogoutPNG from '../../../../assets/Icons/Sidebar/logout.png'

interface PopupProps {
    Delete: () => void;
    cancel: () => void;
}

const Container = styled.div`
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
position: fixed;
top: 0;
left: 0;
z-index: 3;
background-color: rgba(0, 0, 0, 0.5);
`;
const Popup = styled.div`
width: 492px;
height: 295px;
background-color: white;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
border-radius:32px;
`;
const IconContainer = styled.div`
width: 69px;
height: 69px;
display: flex;
align-items: center;
justify-content: center;
border-radius:50%;

`;
const Icon = styled.img`
width: 67px;
height: 65px;


`;
const PopUpText = styled.p`
font-family: Urbanist;
font-size: 21px;
font-weight: 500;
line-height: 34px;
text-align: center;

`;
const ButtonConatiner = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin-top:20px;
`;
const CancleButton = styled.button`
width:110px;
height:60px;
background: #EFEFEF;
border-radius:16px;
border:none;
font-family: Urbanist;
font-size: 20px;
font-weight: 600;
line-height: 24px;
text-align: center;
color:black;
cursor: pointer;
`;
const DeleteButton = styled.button`
width:110px;
height:60px;
background: linear-gradient(360deg, #7A11A1 0%, #C62BC9 100%);
border:none;
box-shadow: 0px 4px 18px 0px #A720B966;

border-radius:16px;
font-family: Urbanist;
font-size: 20px;
font-weight: 600;
line-height: 24px;
text-align: center;
color:white;
margin-left:10px;
cursor:pointer;
`;
const LogoutPopup: React.FC<PopupProps> = ({ Delete, cancel }) => {
    return (
        <Container>
            <Popup>
                <IconContainer>
                    <Icon src={LogoutPNG} />
                </IconContainer>
                <PopUpText>
                    Are you sure you want to
                    Logout ?
                </PopUpText>
                <ButtonConatiner>
                    <CancleButton onClick={() => cancel()}>Cancel</CancleButton>
                    <DeleteButton onClick={() => Delete()}>Logout</DeleteButton>
                </ButtonConatiner>
            </Popup>
        </Container>
    )
}

export default LogoutPopup
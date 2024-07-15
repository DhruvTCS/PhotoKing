import React from 'react'
import styled from 'styled-components'


import BackButtonIconPng from '../../../assets/Icons/SingleAlbum/back.png'
import { useNavigate } from 'react-router-dom'



const UserCreatedEvents: React.FC = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <BackButtonContainer >
                <BackButtonIcon src={BackButtonIconPng} onClick={() => navigate(-1)} />
                <BackButtonText>Back</BackButtonText>
            </BackButtonContainer>
            <HeaderContainer>

            </HeaderContainer>
        </Container>
    )
}

export default UserCreatedEvents

const Container = styled.div`
padding-left:32px;

`;

const BackButtonContainer = styled.div`
display:flex;
flex-direction:row;
width:98%;
align-items:center;
margin-bottom:30px;
`
const BackButtonIcon = styled.img`
width: 16px;
height: 13.8px;
color: #171717;
cursor: pointer;


`;

const BackButtonText = styled.p`
height: 23px;
font-family: Urbanist,sans-serif;
font-size: 16px;
font-weight: 500;
line-height: 22.8px;
text-align: left;
color: #171717;
margin:0px;
margin-left:11px;

`;

const HeaderContainer = styled.div`

`;

const HederTitle = styled.p``;
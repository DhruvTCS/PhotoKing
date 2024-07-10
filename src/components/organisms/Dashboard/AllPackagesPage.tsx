import React from 'react'
import styled from 'styled-components'
import BackButtonIconPng from '../../../assets/Icons/SingleAlbum/back.png'
import { useNavigate } from 'react-router-dom'
import PlusSignIconPNG from '../../../assets/Icons/addIcon.png'

const AllPackagesPage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <BackButtonContainer onClick={() => navigate(-1)} >
                <BackButtonIcon src={BackButtonIconPng} />
                <BackButtonText>Back</BackButtonText>
            </BackButtonContainer>
            <HeaderContainer>

                <Header>
                    <HeaderText>Packages</HeaderText>
                </Header>
                <AddAlbumButton
                    onClick={() => {
                        navigate('/dashboard/package/create/new')
                    }}
                >
                    <PlusSignContainer>
                        <PlusSignIcon src={PlusSignIconPNG}></PlusSignIcon>
                    </PlusSignContainer>
                    <ButtonText>ADD</ButtonText>
                </AddAlbumButton>
            </HeaderContainer>
        </Container>
    )
}

export default AllPackagesPage



const Container = styled.div`
// margin-left:30px;`;
const HeaderContainer = styled.div`
display: flex;
align-items:center;
`;

const BackButtonContainer = styled.div`
display:flex;
flex-direction:row;
width:98%;
margin-left:30px;
align-items:center;
cursor:pointer;

`
const BackButtonIcon = styled.img`
width: 15.6px;
height: 16.8px;
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
const Header = styled.div`
width:90%;
display: flex;
flex-direction:column;
align-items: center;
justify-content: center;
`;
const HeaderText = styled.p`
font-family: Urbanist,sans-serif;
font-size: 24px;
font-weight: 700;
line-height: 22.8px;
text-align: left;
color: #171717;
margin:0px;
// margin-left:11px;
`;

const AddAlbumButton = styled.button`
  border: 1px solid #a720b9;
  width: 80px;
  height: 36px;
  margin-right: 52px;
  border: 1px;
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: none;
  border: 1px solid #a720b9;
  cursor: pointer;
`
const PlusSignContainer = styled.div``
const PlusSignIcon = styled.img`
  height: 21px;
  width: 21px;
`

const ButtonText = styled.div`
  width: 29px;
  height: 17px;
  font-family: 'Urbanist', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 16.8px;
  text-align: left;
  color: #a720b9;
`
import React from 'react'
import styled from 'styled-components'
import AddMemberIconPNG from '../../../assets/Icons/addMemebrIcon.png'
const AllMembersContainer = styled.div`
width: 100%;
height: 900px;
`;
const MembersHeading = styled.p`

`;
const MembersCardContainer = styled.div`
display:grid;
overflow: scroll;
gap:40px 25px;
grid-template-columns: repeat(4, 1fr);

`;
const AddMemeberCard = styled.div`
width: 348px;
height: 310px;
background: #FFFFFF;
border: 1px dashed #AEAEAE;
display:flex;
align-items: center;
justify-content: center;
border-radius:14%;
`;
const AddMemberIconDiv = styled.div`
width: 163px;
height: 164px;
border-radius: 100px;
background: #A720B90F;
display: flex;
align-items: center;
justify-content:center;

`;
const AddMemberIcon = styled.img`
width: 60px;
height: 60px;

`;
const AllMembersPage: React.FC = () => {
  return (
    <AllMembersContainer>
      <MembersHeading>
        Members
      </MembersHeading>
      <MembersCardContainer>
        <AddMemeberCard>
          <AddMemberIconDiv>
            <AddMemberIcon src={AddMemberIconPNG}></AddMemberIcon>
          </AddMemberIconDiv>
        </AddMemeberCard>
        <AddMemeberCard>
          <AddMemberIconDiv>
            <AddMemberIcon src={AddMemberIconPNG}></AddMemberIcon>
          </AddMemberIconDiv>
        </AddMemeberCard>
        <AddMemeberCard>
          <AddMemberIconDiv>
            <AddMemberIcon src={AddMemberIconPNG}></AddMemberIcon>
          </AddMemberIconDiv>
        </AddMemeberCard>
        <AddMemeberCard>
          <AddMemberIconDiv>
            <AddMemberIcon src={AddMemberIconPNG}></AddMemberIcon>
          </AddMemberIconDiv>
        </AddMemeberCard>
        <AddMemeberCard>
          <AddMemberIconDiv>
            <AddMemberIcon src={AddMemberIconPNG}></AddMemberIcon>
          </AddMemberIconDiv>
        </AddMemeberCard>
        <AddMemeberCard>
          <AddMemberIconDiv>
            <AddMemberIcon src={AddMemberIconPNG}></AddMemberIcon>
          </AddMemberIconDiv>
        </AddMemeberCard>
        <AddMemeberCard>
          <AddMemberIconDiv>
            <AddMemberIcon src={AddMemberIconPNG}></AddMemberIcon>
          </AddMemberIconDiv>
        </AddMemeberCard>
        <AddMemeberCard>
          <AddMemberIconDiv>
            <AddMemberIcon src={AddMemberIconPNG}></AddMemberIcon>
          </AddMemberIconDiv>
        </AddMemeberCard>
        <AddMemeberCard>
          <AddMemberIconDiv>
            <AddMemberIcon src={AddMemberIconPNG}></AddMemberIcon>
          </AddMemberIconDiv>
        </AddMemeberCard>
        <AddMemeberCard>
          <AddMemberIconDiv>
            <AddMemberIcon src={AddMemberIconPNG}></AddMemberIcon>
          </AddMemberIconDiv>
        </AddMemeberCard>
        <AddMemeberCard>
          <AddMemberIconDiv>
            <AddMemberIcon src={AddMemberIconPNG}></AddMemberIcon>
          </AddMemberIconDiv>
        </AddMemeberCard>
        <AddMemeberCard>
          <AddMemberIconDiv>
            <AddMemberIcon src={AddMemberIconPNG}></AddMemberIcon>
          </AddMemberIconDiv>
        </AddMemeberCard>
        <AddMemeberCard>
          <AddMemberIconDiv>
            <AddMemberIcon src={AddMemberIconPNG}></AddMemberIcon>
          </AddMemberIconDiv>
        </AddMemeberCard>
        <AddMemeberCard>
          <AddMemberIconDiv>
            <AddMemberIcon src={AddMemberIconPNG}></AddMemberIcon>
          </AddMemberIconDiv>
        </AddMemeberCard>
        <AddMemeberCard>
          <AddMemberIconDiv>
            <AddMemberIcon src={AddMemberIconPNG}></AddMemberIcon>
          </AddMemberIconDiv>
        </AddMemeberCard>
        <AddMemeberCard>
          <AddMemberIconDiv>
            <AddMemberIcon src={AddMemberIconPNG}></AddMemberIcon>
          </AddMemberIconDiv>
        </AddMemeberCard>
        <AddMemeberCard>
          <AddMemberIconDiv>
            <AddMemberIcon src={AddMemberIconPNG}></AddMemberIcon>
          </AddMemberIconDiv>
        </AddMemeberCard>
        <AddMemeberCard>
          <AddMemberIconDiv>
            <AddMemberIcon src={AddMemberIconPNG}></AddMemberIcon>
          </AddMemberIconDiv>
        </AddMemeberCard>
        <AddMemeberCard>
          <AddMemberIconDiv>
            <AddMemberIcon src={AddMemberIconPNG}></AddMemberIcon>
          </AddMemberIconDiv>
        </AddMemeberCard>
        <AddMemeberCard>
          <AddMemberIconDiv>
            <AddMemberIcon src={AddMemberIconPNG}></AddMemberIcon>
          </AddMemberIconDiv>
        </AddMemeberCard>
      </MembersCardContainer>
    </AllMembersContainer>
  )
}

export default AllMembersPage
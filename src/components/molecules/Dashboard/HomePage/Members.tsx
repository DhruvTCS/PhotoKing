import React, { useEffect } from 'react'
import styled from 'styled-components'
import PlusSignIconPNG from '../../../../assets/Icons/addIcon.png'
import MemberCard from '../../../atoms/Dashboard/HomePage/MemberCard';
import { useAppDispatch, useAppSelector } from '../../../../Redux/Hooks';
import { getAllMembers } from '../../../../Redux/ApiCalls/Dashboard/MembersAPI';
import { Member } from '../../../../Data/member.dto';
import { useNavigate } from 'react-router-dom';
const MembersContainer = styled.div`
height:160px;
width:100%;

`;

const MembersHeader = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
margin-left:30px;
`;
const MembersHeaderText = styled.p`
width: 81px;
height: 23px;

font-family: "Urbanist",sans-serif;
font-size: 19px;
font-weight: 600;
line-height: 22.8px;
text-align: left;
color: #171717;


`;

const AddMemberButton = styled.button`
border: 1px solid #A720B9;
width: 80px;
height: 36px;
margin-right: 52px;
border: 1px;
border-radius:10%;
display:flex;
flex-direction: row;
cursor:pointer;
justify-content: center;
align-items: center;
background:none;
border: 1px solid #A720B9;

`;
const PlusSignContainer = styled.div`

`;
const PlusSignIcon = styled.img`
height: 21px;
width: 21px;

`;

const ButtonText = styled.div`
width: 29px;
height: 17px;
font-family: "Urbanist", sans-serif;
font-size: 14px;
font-weight: 600;
line-height: 16.8px;
text-align: left;
COLOR: #A720B9;


`

const MembersListConater = styled.div``
const MemberList = styled.div`
 z-index:100;
 display: flex;
  overflow-x: auto;
  padding-x: 16px;
  background:transparent;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */

  &::-webkit-scrollbar {
     /* Chrome, Safari, and Opera */
    height: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    width: 12px;
    border-radius: 6px;
  }
 &::-webkit-scrollbar-track {
  color: red !important;
}
`
const NoMemberCOnatiner = styled.div`
display:flex;
align-items: center;
justify-content: center;
width: 100%;
`;
const Members: React.FC = () => {
    const { members } = useAppSelector(state => state.member);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {

        dispatch(getAllMembers());
    }, [dispatch])
    return (
        <MembersContainer>
            <MembersHeader >
                <MembersHeaderText >
                    Members
                </MembersHeaderText>
                <AddMemberButton onClick={() => navigate('/dashboard/members/create')}>
                    <PlusSignContainer>
                        <PlusSignIcon src={PlusSignIconPNG}>
                        </PlusSignIcon>
                    </PlusSignContainer>
                    <ButtonText >
                        ADD
                    </ButtonText>
                </AddMemberButton>
            </MembersHeader>
            <MembersListConater>
                <MemberList>
                    {(members && members.length !== 0) ? members.map((member: Member) => <MemberCard key={member.id} member={member}></MemberCard>) : <NoMemberCOnatiner>No Member Found</NoMemberCOnatiner>}
                </MemberList>
            </MembersListConater>
        </MembersContainer>
    )
}

export default Members
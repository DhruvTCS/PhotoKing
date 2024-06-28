import React, { useEffect } from 'react'
import styled from 'styled-components'
import PlusSignIconPNG from '../../../../assets/Icons/addIcon.png'
import MemberCard from '../../../atoms/Dashboard/HomePage/MemberCard'
import { useAppDispatch, useAppSelector } from '../../../../Redux/Hooks'
import { getAllMembers } from '../../../../Redux/ApiCalls/Dashboard/MembersAPI'
import { Member } from '../../../../Data/member.dto'
import { useNavigate } from 'react-router-dom'
import DefaultProfilePNG from '../../../../assets/images/DefaultProfilePic.png'
const MembersContainer = styled.div`
  height: 160px;
  width: 100%;
`

const MembersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 30px;
`
const MembersHeaderText = styled.p`
  width: 81px;
  height: 23px;

  font-family: 'Urbanist', sans-serif;
  font-size: 19px;
  font-weight: 600;
  line-height: 22.8px;
  text-align: left;
  color: #171717;
`

const AddMemberButton = styled.button`
  border: 1px solid #a720b9;
  width: 80px;
  height: 36px;
  margin-right: 52px;
  border: 1px;
  border-radius: 10%;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  background: none;
  border: 1px solid #a720b9;
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

const MembersListConater = styled.div``
const MemberList = styled.div`
  z-index: 100;
  display: flex;
  overflow-x: auto;
  padding: 16px;
  background: transparent;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */

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
  width: 100%;
  display: flex;
  align-items: center;
//   justify-content: center;
`

const MemberCardContainer = styled.div`
  height:91px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
margin: 8px;
min-width: 304px;
max-width: 304px;
border-radius:16px;
background: linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0.2) 73.68%);
border:none;
box-shadow: 0px 4px 24px 0px hsla(0, 0%, 0%, 0.05);
cursor:pointer;
`;

const ProfileImageContainer = styled.div`

`;
const ProfileNameContainer = styled.div`
width:60%;
height:64px;
display:flex;
flex-direction:column;
justify-content:center;
margin-left:14px;
`;
const ProfileName = styled.p`
font-family: "Urbanist",sans-serif;
font-size: 18px;
font-weight: 600;
line-height: 21.6px;
text-align: left;
margin:0px;
margin-bottom:3px;
`;
const ProfilePic = styled.img`
height:64px;
width:64px;
border-radius:50%;

`;

const Members: React.FC = () => {
    const { members } = useAppSelector((state) => state.member)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getAllMembers())
    }, [dispatch])
    return (
        <MembersContainer>
            <MembersHeader>
                <MembersHeaderText>Members</MembersHeaderText>
                <AddMemberButton onClick={() => navigate('/dashboard/members/create')}>
                    <PlusSignContainer>
                        <PlusSignIcon src={PlusSignIconPNG}></PlusSignIcon>
                    </PlusSignContainer>
                    <ButtonText>ADD</ButtonText>
                </AddMemberButton>
            </MembersHeader>
            <MembersListConater>
                <MemberList>
                    {members && members.length !== 0 ? (
                        members.map((member: Member) => (
                            <MemberCard key={member.id} member={member}></MemberCard>
                        ))
                    ) : (
                        <NoMemberCOnatiner>
                            <MemberCardContainer onClick={() => navigate(('/dashboard/members/create'))}>
                                <ProfileImageContainer >
                                    <ProfilePic src={DefaultProfilePNG} />
                                </ProfileImageContainer>
                                <ProfileNameContainer>
                                    <ProfileName>
                                        Add Member
                                    </ProfileName>
                                </ProfileNameContainer>
                            </MemberCardContainer>
                        </NoMemberCOnatiner>
                    )}
                </MemberList>
            </MembersListConater>
        </MembersContainer>
    )
}

export default Members

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import AddMemberIconPNG from '../../../assets/Icons/addMemebrIcon.png'
import MemberCard from '../../atoms/Dashboard/Members/MemberCard';
import { useAppDispatch, useAppSelector } from '../../../Redux/Hooks';
import { useNavigate } from 'react-router-dom';
import { getAllMembers } from '../../../Redux/ApiCalls/Dashboard/MembersAPI';
import { Member } from '../../../Data/member.dto';
import LoadingDots from '../../atoms/Utlis/LoadinDots';
import { clearError, clearFlagsMembers } from '../../../Redux/Slice/Dashboard/MemberSlice';
const AllMembersContainer = styled.div`
width: 100%;
height: 100%;
`;
const MembersHeading = styled.p`
font-family: "Urbanist";
font-size: 19px;
font-weight: 600;
line-height: 22.8px;
text-align: left;
margin-left:30px;0
`;
const MembersCardContainer = styled.div`
display: grid;
margin-left:20px;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px; /* Space between cards */
  overflow-y: auto;
  max-height: 71vh; /* Adjust this as needed to fit your design */
  padding: 10px;

  &::-webkit-scrollbar {
     /* Chrome, Safari, and Opera */
    height: 12px;
    width:3px;
    background:transparent !important;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    width: 3px;
    border-radius: 6px;
  }
 &::-webkit-scrollbar-track {
  color: red !important;
}

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
display: flex;
flex-direction:column;
cursor: pointer;
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
const AddMemberText = styled.p`
font-family: Urbanist;
font-size: 23px;
font-weight: 600;
line-height: 27.6px;
text-align: center;
color: #171717;

`;
const AllMembersPage: React.FC = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { members, loading, isError, success, error } = useAppSelector(state => state.member);
  const [allMembers, setAllMembers] = useState<Member[] | []>([])
  useEffect(() => {

    dispatch(getAllMembers());
    return () => {

    }
  }, [dispatch])
  useEffect(() => {
    setAllMembers(members);

    return () => {

    }
  }, [members])
  useEffect(() => {
    if (isError) {
      if (error) {
        alert(error.message);
      } else {
        alert("Something went wrong! Please try again.")
      }
    }

    return () => {
      dispatch(clearError());
      dispatch(clearFlagsMembers());
    }
  }, [])

  return (
    <AllMembersContainer>
      <MembersHeading>
        Members
      </MembersHeading>
      <MembersCardContainer>
        <AddMemeberCard onClick={() => navigate('/dashboard/members/create')}>
          <AddMemberIconDiv>
            <AddMemberIcon src={AddMemberIconPNG}></AddMemberIcon>

          </AddMemberIconDiv>
          <AddMemberText>
            Add Member
          </AddMemberText>
        </AddMemeberCard>
        {loading ? <LoadingDots /> : (allMembers && allMembers.map(member => <MemberCard member={member} />))}
      </MembersCardContainer>
    </AllMembersContainer>
  )
}

export default AllMembersPage
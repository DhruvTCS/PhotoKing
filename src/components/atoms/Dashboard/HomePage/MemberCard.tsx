import React from 'react'
import styled from 'styled-components'
import { Member } from '../../../../Data/member.dto';
import { useAppDispatch } from '../../../../Redux/Hooks';
import { setCurrentMember } from '../../../../Redux/Slice/Dashboard/MemberSlice';
import { useNavigate } from 'react-router-dom';

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
`;

const ProfileImageContainer = styled.div`
cursor:pointer;
`;
const ProfileNameContainer = styled.div`
width:60%;
height:64px;
display:flex;
flex-direction:column;
justify-content:center;
margin-left:14px;
cursor:pointer;
`;
const ProfileName = styled.p`
font-family: Urbanist,sans-serif;
font-size: 18px;
font-weight: 600;
line-height: 21.6px;
text-align: left;
margin:0px;
margin-bottom:3px;
`;
const ProfileRole = styled.p`
font-family: Urbanist,sans-serif;
font-size: 15px;
font-weight: 400;
line-height: 18px;
text-align: left;
margin:0px;
`;
const ProfilePic = styled.img`
height:64px;
width:64px;
border-radius:50%;

`;
interface MemberCardProps {
    member: Member
}
const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    return (
        <MemberCardContainer >
            <ProfileImageContainer onClick={() => { dispatch(setCurrentMember(member)); navigate(`/dashboard/members/edit/${member.id}`) }} >
                <ProfilePic src={member.profile_image} />
            </ProfileImageContainer>
            <ProfileNameContainer onClick={() => { dispatch(setCurrentMember(member)); navigate(`/dashboard/members/edit/${member.id}`) }}>
                <ProfileName>
                    {member.name}
                </ProfileName>
                <ProfileRole>
                    {member.job_type}
                </ProfileRole>
            </ProfileNameContainer>
        </MemberCardContainer>
    )
}

export default MemberCard
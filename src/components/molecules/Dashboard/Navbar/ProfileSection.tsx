import React from 'react'
import styled from 'styled-components'
import DefaultProfilePic from '../../../../assets/images/DefaultProfilePic.png'
import downIconPNG from '../../../../assets/Icons/downicon.png'
import { useAppSelector } from '../../../../Redux/Hooks';
const ProfileSectionContainer = styled.div`
display:flex;
flex-direction:row;
align-items:center;
justify-content:center;
margin-left:28px;
`;

const ProfilePicture = styled.img`
height:45px;
width:45px;
border: 2px solid #FFFFFF;
border-radius:50%;
`;
const ProfileName = styled.p`
color: #171717;
font-family: Urbanist, sans-serif;
font-size: 20px;
font-weight: 600;
line-height: 24px;
text-align: left;
margin-left:13px;
`;
const DownIconComp = styled.img`

`;

const DownIconContainer = styled.div`
margin-left:18px;
`;
const ProfileSection: React.FC = () => {
    const { user } = useAppSelector(state => state.auth);
    return (
        <ProfileSectionContainer>
            {(user && user.image) ? <ProfilePicture src={user.image} /> : <ProfilePicture src={DefaultProfilePic} />}

            <ProfileName >{user ? user.name : 'Photo King'}</ProfileName>
            <DownIconContainer>

                <DownIconComp src={downIconPNG} height={10} width={20} />
            </DownIconContainer>

        </ProfileSectionContainer>
    )
}

export default ProfileSection
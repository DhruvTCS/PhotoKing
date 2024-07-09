import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import DefaultProfilePic from '../../../../assets/images/DefaultProfilePic.png'
import downIconPNG from '../../../../assets/Icons/downicon.png'
import { useAppSelector } from '../../../../Redux/Hooks';
import ProfileMenu from './ProfileMenu';
const ProfileSectionContainer = styled.div`
display:flex;
flex-direction:row;
align-items:center;
justify-content:center;
margin-left:28px;
position:relative;
transition: all 0.7s ease-in-out;
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
cursor:pointer;
`;
const ProfileSection: React.FC = () => {
    const { user } = useAppSelector(state => state.auth);
    const [menuOpen, setMenuOpen] = useState(false);


    return (
        <ProfileSectionContainer>
            {menuOpen && <ProfileMenu setMenuOpen={setMenuOpen} menuOpen={menuOpen} />}
            {(user && user.image) ? <ProfilePicture src={user.image} /> : <ProfilePicture src={DefaultProfilePic} />}

            <ProfileName >{user ? user.name : 'Photo King'}</ProfileName>
            <DownIconContainer>

                <DownIconComp src={downIconPNG} height={10} width={20} onClick={() => { setMenuOpen(pre => !pre) }} />
            </DownIconContainer>

        </ProfileSectionContainer>
    )
}

export default ProfileSection
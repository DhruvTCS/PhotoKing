import React from 'react'
import styled from 'styled-components'
import SearchBar from '../molecules/Dashboard/Navbar/Searchbar'
import Notification from '../molecules/Dashboard/Navbar/Notification'
import ProfileSection from '../molecules/Dashboard/Navbar/ProfileSection'

const NavbarContainer = styled.div`
height:119px;
position:relative;
width:98%;
display:flex;
align-items:center;
justify-content:space-between;
margin-left:24px;
`
const ProfilerContainer = styled.div`

// position:absolute;
top:30px;
right:20px;
height:50px;
display:flex;
flex-direction:row;
`
const SearchBarContainer = styled.div`
// position:absolute;
top:30px;
left:10px;
`;
const Navbar: React.FC = () => {
    return (
        <NavbarContainer>
            <SearchBarContainer>
                <SearchBar />
            </SearchBarContainer>
            <ProfilerContainer>
                <Notification />
                <ProfileSection />
            </ProfilerContainer>
        </NavbarContainer>
    )
}

export default Navbar
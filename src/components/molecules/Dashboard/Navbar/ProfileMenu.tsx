import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import PhonePNG from "../../../../assets/Icons/Sidebar/changepassword.png"
import EventFormPNG from '../../../../assets/Icons/Sidebar/calendar.png'
import LogOutPNG from '../../../../assets/Icons/Sidebar/logout.png'
import { useLocation, useNavigate } from 'react-router-dom';
import ShareEventFormLinkPopup from '../../../atoms/Dashboard/Navbar/ShareFormLinkPopup';
import UserIconPNG from '../../../../assets/Icons/addMemebrIcon.png'
import { useAppDispatch } from '../../../../Redux/Hooks'
import { clearToken } from '../../../../Redux/Slice/Auth/AuthSlice'
import LogoutPopup from '../../../atoms/Dashboard/HomePage/LogOutPopUp'
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }

`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    
  }
  to {
    opacity: 0;
    
  }

`;
const DropdownMenu = styled.div<{ menuOpen: boolean }>`
  position: absolute;
  top: 49px;
  right: -4px;
  background: white;
  width: 225px;
  height: 171px;
  z-index: 5;
  border-radius: 10px;
  display: ${({ menuOpen }) => (menuOpen ? 'block' : 'none')};
  animation: ${({ menuOpen }) => (menuOpen ? fadeIn : fadeOut)} 0.3s ease-out;
`
const MenuItem = styled.div`
  padding: 2px 16px;
  height: 50px;

  cursor: pointer;
  color: black;
  display: flex;
  flex-direction: row;
  align-items: center;


`

const ItemIcon = styled.img`
  width: 20px;
  height: 20px;
`

const ItemName = styled.p`

  margin-left: 14px;
  width: 151px;
height: 23px;
font-family: Urbanist;
font-size: 14px;
font-weight: 500;
line-height: 23px;
text-align: left;


`
const Hr = styled.hr`
margin:0;
color: #5B463E;

`
const ProfileMenu: React.FC<{ menuOpen: boolean, setMenuOpen: (boolean: boolean) => void }> = ({ setMenuOpen, menuOpen }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isShareFormPopUp, setIsShareFormPopUp] = useState(false);
  const navigate = useNavigate()
  const [logoutPopup, setLogoutPopup] = useState(false);
  const dispatch = useAppDispatch()

  const logoutFunc = () => {
    dispatch(clearToken());
    setLogoutPopup(false);
  }
  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node)

    ) {
      setMenuOpen(false);
    }
  };
  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuOpen])

  return (
    <DropdownMenu menuOpen={menuOpen} ref={menuRef}>
      {logoutPopup && <LogoutPopup Delete={() => logoutFunc()} cancel={() => setLogoutPopup(false)} />}
      <MenuItem onClick={() => navigate('/dashboard/user/changePhoneNumber')}>
        <ItemIcon src={PhonePNG} />
        <ItemName>Change Phone Number</ItemName>
      </MenuItem>
      <Hr />
      <MenuItem onClick={() => navigate('/dashboard/user/profile')}>
        <ItemIcon src={UserIconPNG} />
        <ItemName>Profile</ItemName>
      </MenuItem>
      <Hr />


      <MenuItem onClick={() => setLogoutPopup(true)}>
        <ItemIcon src={LogOutPNG} />
        <ItemName>Log Out</ItemName>
      </MenuItem>
      <Hr />

    </DropdownMenu>

  )
}

export default ProfileMenu
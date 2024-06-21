import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import AlbumBackImage from '../../../../assets/images/Extra/Albumbackimage.png'
import HideIcon from '../../../../assets/Icons/DropDownMenu/hide.png'
import LockIcon from '../../../../assets/Icons/DropDownMenu/Lock.png'
import WatermarkIcon from '../../../../assets/Icons/DropDownMenu/watermark.png'
import GenerateEventIcon from '../../../../assets/Icons/DropDownMenu/generateEvent.png'
import ShareAlbumIcon from '../../../../assets/Icons/DropDownMenu/shareAlbum.png'
import LockAlbumModal from './LockAlbumModal'
import { Albums } from '../../../../Data/album.dto'
import { useAppDispatch } from '../../../../Redux/Hooks'
import { setCurrentAlbum } from '../../../../Redux/Slice/Dashboard/AlbumSlice'
import { useNavigate } from 'react-router-dom'
interface CardProps {
  name: string
  Date: string,
  album: Albums
}

const AlbumCardContainer = styled.div<{ backgroundImage: string }>`
  position: relative;
  background-image: url(${(props) => props.backgroundImage});
  background-size:cover;
  background-position: center;
  width: 440px;
  height: 280px;
  border-radius: 26px;
  box-shadow: 0px 4px 24px 0px hsla(0, 0%, 0%, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
`

const CardContent = styled.div`
  z-index: 2;
  position: absolute;
  bottom: 20px;
  left: 162px;
`

const CardName = styled.h3`
  margin: 0;
  font-family: 'Montserrat', sans-serif;
  font-size: 17px;
  font-weight: 700;
  line-height: 20.72px;
  text-align: center;
  text-decoration: underline;
  &:hover{
    cursor: pointer;
  }
`

const CardDate = styled.p`
  margin: 0;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 500;
  line-height: 19.5px;
  text-align: center;
`

const MenuButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: #ffffffb2;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 45px;
  height: 45px;
  // border: 1px solid white;
  border:none;
  box-shadow: 0px 20px 20px 0px hsla(259, 49%, 33%, 0.15);
`

const DropdownMenu = styled.div`
  position: absolute;
  top: 63px;
  right: 16px;
  background: white;
  width: 208px;
  height: 277px;
  z-index: 3;
  border-radius: 10px;
`

const Dot = styled.p`
  color: hsla(293, 71%, 43%, 1);
  line-height: 8px;
  margin: 0px;
  font-size: 2rem;
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
  width: 140px;
height: 23px;
font-family: "Urbanist",sans-serif;
font-size: 14px;
font-weight: 500;
line-height: 23px;
text-align: left;


`
const Hr = styled.hr`
margin:0;
color: #5B463E;

`
const AlbumLockButton = styled.button`
position: absolute;
  top: 16px;
  left: 16px;
  background: #ffffffb2;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border: 1px solid;
  border-image-source: linear-gradient(
    135deg,
    #ffffff 0%,
    rgba(0, 0, 0, 0) 100%
  );
  box-shadow: 0px 20px 20px 0px hsla(259, 49%, 33%, 0.15);
`;
const LockIconImg = styled.img`
height:17px;
width: 15px;
`
const AlbumCard: React.FC<CardProps> = ({ name, Date, album }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const toggleMenu = () => {
    console.log('calling')
    setMenuOpen(menuOpen => !menuOpen)
  }
  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
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
  }, [menuOpen, showModal])
  return (
    <AlbumCardContainer backgroundImage={album.image ? album.image : AlbumBackImage}>
      <CardContent>
        <CardName onClick={() => {
          dispatch(setCurrentAlbum(album))
          navigate(`/dashboard/singleAlbum/${album.id}`)
        }
        }>{name}</CardName>
        <CardDate>{Date}</CardDate>
      </CardContent>
      {album.is_locked ?
        <AlbumLockButton>
          <LockIconImg src={LockIcon}></LockIconImg>
        </AlbumLockButton> : null}
      <MenuButton ref={buttonRef} onClick={toggleMenu}>
        <Dot>.</Dot>
        <Dot>.</Dot>
        <Dot>.</Dot>
      </MenuButton>
      {menuOpen && (
        <DropdownMenu ref={menuRef}>
          <MenuItem onClick={() => setShowModal(true)}>
            <ItemIcon src={LockIcon} />
            <ItemName>{album.is_locked ? `Unlock Album` : `Lock Album`}</ItemName>

          </MenuItem>
          <Hr />

          <MenuItem>
            <ItemIcon src={ShareAlbumIcon} />
            <ItemName>Sahre Album Code</ItemName>
          </MenuItem>
          <Hr />

          <MenuItem>
            <ItemIcon src={GenerateEventIcon} />
            <ItemName>Generate Event Code</ItemName>
          </MenuItem>
          <Hr />

          <MenuItem>
            <ItemIcon src={HideIcon} />
            <ItemName>Hide Album</ItemName>
          </MenuItem>
          <Hr />

          <MenuItem>
            <ItemIcon src={WatermarkIcon} />
            <ItemName>Add Watermark</ItemName>
          </MenuItem>
          {showModal && (
            <LockAlbumModal
              album={album}
              setShowModal={setShowModal}

            />
          )}
        </DropdownMenu>
      )}
    </AlbumCardContainer>
  )
}

export default AlbumCard

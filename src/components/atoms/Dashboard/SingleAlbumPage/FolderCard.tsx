import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Folder, NewFolder } from '../../../../Data/album.dto';
import TestImageIcon from '../../../../assets/images/Extra/folderIconImage.png'
import { useAppDispatch } from '../../../../Redux/Hooks';
import { setCurrentFolder } from '../../../../Redux/Slice/Dashboard/AlbumSlice';
import { useNavigate } from 'react-router-dom';
import HideIcon from '../../../../assets/Icons/DropDownMenu/hide.png'
interface FolderCardProps {
    folder?: Folder,
    newFolder?: NewFolder,
    onClick?: () => void;
    isNew: boolean;
}
const CardContainer = styled.div`
width: 400px;
height: 165px;
border-radius: 30px;
background: #FFFFFF;
box-shadow: 0px 10px 34px 0px #0000001A;
cursor: pointer;

`;
const FolderName = styled.p`
font-family: "Montserrat";
font-size: 21px;
font-weight: 600;
padding-left:20px;
line-height: 25.6px;
text-align: left;
margin:0;
padding:20px;
cursor:pointer;
text-decoration: underline;

`;
const ImageContainer = styled.div`
`;
const Images = styled.div`
display: flex;
margin-left:20px;
position: relative;
`;
const Image1 = styled.img`
border: 3px solid #FFFFFF;
border-radius:50%;
height:70px;
width:70px;
z-index:0;
position: absolute;

`;
const Image2 = styled.img`
border: 3px solid #FFFFFF;
border-radius:50%;
height:70px;
width:70px;
position: absolute;
left:40px;
z-index:1;
`;
const Image3 = styled.img`
border: 3px solid #FFFFFF;
border-radius:50%;
height:70px;
width:70px;
position: absolute;
z-index:2;
left:77px;
`;
const RemainingImageCountContainer = styled.div`
border: 3px solid #FFFFFF;
border-radius:50%;
height:70px;
width:70px;
background: linear-gradient(360deg, #7A11A1 0%, #C62BC9 100%);
display: flex;
align-items: center;
justify-content: center;
position: absolute;
left:114px;
z-index:3;
`;
const RemainigImagesText = styled.p`
font-family: "Montserrat";
font-size: 21px;
font-weight: 600;
line-height: 25.6px;
text-align: left;
color: #FFFFFF;

`;

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
  cursor: pointer;
  border:none;
  box-shadow: 0px 20px 20px 0px hsla(259, 49%, 33%, 0.15);
`
const Dot = styled.p`
  color: hsla(293, 71%, 43%, 1);
  line-height: 8px;
  margin: 0px;
  font-size: 2rem;
`
const FolderHeader = styled.div`
display:flex;
align-items: center;
justify-content: space-between;
position:relative;
`;
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

const DropdownMenu = styled.div`
  position: absolute;
  top: 63px;
  right: 16px;
  background: white;
  width: 173px;
  height: 121px;
  z-index: 4;
  border-radius: 10px;
  box-shadow: 0px 8px 222px 0px #00000026;

`
const FolderCard: React.FC<FolderCardProps> = ({ folder, newFolder, onClick, isNew }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [menuOpen, setMenuOpen] = useState(false);
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
    const openMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        setMenuOpen(pre => !pre);
    }
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
        <div>
            {folder ?
                <CardContainer onClick={() => {
                    dispatch(setCurrentFolder(folder));
                    navigate(`/dashboard/albums/folder/${folder.id}`)

                }}>



                    {/* <UpdateFolderModal isOpen={updateFolderModal} onRequestClose={() => setUpdateFolderModal(false)} currentFolder={folder} /> */}
                    <FolderHeader>

                        <FolderName >
                            {folder.name}
                        </FolderName>
                        <MenuButton ref={buttonRef} onClick={openMenu}>
                            <Dot>.</Dot>
                            <Dot>.</Dot>
                            <Dot>.</Dot>
                        </MenuButton>
                        {menuOpen &&
                            <DropdownMenu ref={menuRef} onClick={(e) => e.stopPropagation()}>
                                <MenuItem>
                                    <ItemIcon src={HideIcon} />
                                    <ItemName>Delete</ItemName>
                                </MenuItem>
                                <Hr />

                                <MenuItem onClick={() => console.log("Hide Folder")}>
                                    <ItemIcon src={HideIcon} />
                                    <ItemName>Hide</ItemName>
                                </MenuItem>
                                <Hr />



                            </DropdownMenu>
                        }
                    </FolderHeader>
                    <ImageContainer>
                        {folder.images && folder.images.length !== 0 ?
                            <Images>
                                <Image1 src={folder.images[0].image} />
                                {folder.images.length >= 2 ? <Image2 src={folder.images[1].image} /> : null}
                                {folder.images.length >= 3 ? <Image3 src={folder.images[2].image} /> : null}
                                {folder.images.length >= 4 ? <RemainingImageCountContainer >
                                    <RemainigImagesText>+{folder.images.length - 3}</RemainigImagesText>

                                </RemainingImageCountContainer> : null}
                            </Images>
                            :
                            ' No images are in Folder'}

                    </ImageContainer>
                </CardContainer>
                : null}
            {newFolder ?
                <CardContainer onClick={onClick}>

                    <FolderName >
                        {newFolder.name}
                    </FolderName>
                    <ImageContainer>
                        {newFolder.images ?
                            <Images>
                                <Image1 src={newFolder.images[0].image_blob} />
                                {newFolder.images.length >= 2 ? <Image2 src={newFolder.images[1].image_blob} /> : null}
                                {newFolder.images.length >= 3 ? <Image3 src={newFolder.images[2].image_blob} /> : null}
                                {newFolder.images.length >= 4 ? <RemainingImageCountContainer >
                                    <RemainigImagesText>+{newFolder.images.length - 3}</RemainigImagesText>

                                </RemainingImageCountContainer> : null}
                            </Images>
                            :
                            ' No images are in Folder'}

                    </ImageContainer>
                </CardContainer>
                : null}
        </div>
    )
}

export default FolderCard
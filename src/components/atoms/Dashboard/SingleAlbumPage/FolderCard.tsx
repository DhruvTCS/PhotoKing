import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Folder, NewFolder } from '../../../../Data/album.dto'
import TestImageIcon from '../../../../assets/images/Extra/folderIconImage.png'
import { useAppDispatch, useAppSelector } from '../../../../Redux/Hooks'
import { setCurrentFolder } from '../../../../Redux/Slice/Dashboard/AlbumSlice'
import { useNavigate } from 'react-router-dom'
import HideIconPNG from '../../../../assets/Icons/DropDownMenu/hide.png'
import DeletePopup from '../Folder/DeletePopup'
import DeleteIconPNG from '../../../../assets/Icons/SingleAlbum/delete.png'
import HideFolderPopup from '../Folder/HidePopup'
import LockIconPNG from '../../../../assets/Icons/DropDownMenu/Lock.png'
import HideAlbumPNG from '../../../../assets/Icons/DropDownMenu/hideAlbumBig.png'

import {
    deleteFolderAPI,
    hideFolderAPI,
    lockFolderAPI,
    unlockFolderAPI,
} from '../../../../Redux/ApiCalls/Dashboard/FolderApi'
// import LockFolderPopup from '../Folder/LockPopup'
import ReasonModal from '../HomePage/ReasonModal'
import { showErrorToast } from '../../Utlis/Toast'
interface FolderCardProps {
    folder?: Folder
    newFolder?: NewFolder
    onClick?: () => void
    isNew: boolean
}
const CardContainer = styled.div`
  width: 400px;
  height: 165px;
  border-radius: 30px;
  background: #ffffff;
  box-shadow: 0px 10px 34px 0px #0000001a;
  cursor: pointer;
`
const FolderName = styled.p`
  font-family: 'Montserrat';
  font-size: 21px;
  font-weight: 600;
  padding-left: 20px;
  line-height: 25.6px;
  text-align: left;
  margin: 0;
  padding: 20px;
  cursor: pointer;
  text-decoration: underline;
`
const ImageContainer = styled.div`
  text-align: center;
`
const Images = styled.div`
  display: flex;
  margin-left: 20px;
  position: relative;
`
const Image1 = styled.img`
  border: 3px solid #ffffff;
  border-radius: 50%;
  height: 70px;
  width: 70px;
  z-index: 0;
  position: absolute;
`
const Image2 = styled.img`
  border: 3px solid #ffffff;
  border-radius: 50%;
  height: 70px;
  width: 70px;
  position: absolute;
  left: 40px;
  z-index: 1;
`
const Image3 = styled.img`
  border: 3px solid #ffffff;
  border-radius: 50%;
  height: 70px;
  width: 70px;
  position: absolute;
  z-index: 2;
  left: 77px;
`
const RemainingImageCountContainer = styled.div`
  border: 3px solid #ffffff;
  border-radius: 50%;
  height: 70px;
  width: 70px;
  background: linear-gradient(360deg, #7a11a1 0%, #c62bc9 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 114px;
  z-index: 3;
`
const RemainigImagesText = styled.p`
  font-family: 'Montserrat';
  font-size: 21px;
  font-weight: 600;
  line-height: 25.6px;
  text-align: left;
  color: #ffffff;
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
  cursor: pointer;
  border: none;
  box-shadow: 0px 20px 20px 0px hsla(259, 49%, 33%, 0.15);
`
const Dot = styled.p`
  color: hsla(293, 71%, 43%, 1);
  line-height: 8px;
  margin: 0px;
  font-size: 2rem;
`
const FolderHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
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
  width: 22px;
  height: 22px;
`

const HideIcon = styled.img`
  width: 15px;
  height: 15px;
`

const ItemName = styled.p`
  margin-left: 14px;
  width: 140px;
  height: 23px;
  font-family: Urbanist;
  font-size: 16px;
  font-weight: 600;
  line-height: 23px;
  text-align: left;
`
const Hr = styled.hr`
  margin: 0;
  color: #5b463e;
`

const DropdownMenu = styled.div`
  position: absolute;
  top: 63px;
  right: 16px;
  background: white;
  width: 183px;
  height: 173px;
  z-index: 5;
  border-radius: 10px;
  box-shadow: 0px 8px 222px 0px #00000026;
`
const HideFolderIcon = styled.img`
  height: 20px;
  width: 20px;
  // margin-left:10px;
`
const HideContainerIcon = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: #ac22bb26;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LockIconContainer = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: #ac22bb26;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`
const FolderHeaderContainer = styled.div`
  display: flex;
  align-items: center;
`
const FolderCard: React.FC<FolderCardProps> = ({
    folder,
    newFolder,
    onClick,
    isNew,
}) => {
    const [showReasonModal, setShowReasonModal] = useState(false);
    const [reason, setReason] = useState('');
    const [selectedReason, setSelectedReason] = useState(0);
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const menuRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [menuOpen, setMenuOpen] = useState(false)
    const [isDeletePopup, setIsDeletePopup] = useState(false)
    const [isHidePopup, setIsHidePopup] = useState(false)
    const [lockPopup, setLockPopup] = useState(false)
    const { updatedFolderList, uploadFolderProgress } = useAppSelector(state => state.album)
    const handleClickOutside = (event: MouseEvent) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target as Node) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target as Node)
        ) {
            setMenuOpen(false)
        }
    }

    const openMenu = (e: React.MouseEvent) => {
        e.stopPropagation()
        setMenuOpen((prev) => !prev)
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

    const handleDeleteFolder = (id: number) => {
        //  delete folder logic
        dispatch(deleteFolderAPI({ folder_id: id }))
    }

    const handleCardClick = (e: React.MouseEvent, id: number) => {
        if (!menuOpen && folder) {
            if (isUploadProgress(id)) {
                showErrorToast('Please wait for upload progress.')
            } else {
                dispatch(setCurrentFolder(folder))
                navigate(`/dashboard/albums/folder/${folder.id}`)
            }
        }
    }
    const handleHideFolder = (
        projectId: number,
        id: number,
        is_hide: boolean,
    ) => {
        if (is_hide)
            dispatch(
                hideFolderAPI({
                    project_id: projectId,
                    folder_id: id,
                    lock_type: 'unhide',
                }),
            )
        else
            dispatch(
                hideFolderAPI({
                    project_id: projectId,
                    folder_id: id,
                    lock_type: 'hide',
                }),
            )

        setIsHidePopup(false)
    }
    const isUploadProgress = (id: number) => {
        if (
            uploadFolderProgress &&
            uploadFolderProgress.length > 0 &&
            uploadFolderProgress.find((folder) => folder.folderId === id)
        ) {
            return true
        } else return false
    }
    const handleReasonSubmit = (folder_id: number, project_id: number) => {
        console.log(reason, selectedReason)
        if (selectedReason === 4) {
            dispatch(lockFolderAPI({ folder_id: folder_id, project_id, custom_reason: reason, lock_type: 'lock' }))
        } else {
            dispatch(lockFolderAPI({
                folder_id: folder_id, project_id, reason: selectedReason,
                lock_type: 'lock'
            }))

        }
        setShowReasonModal(false);
    }
    const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setSelectedReason(parseInt(e.target.value));
        console.log(e.target.value);


    }
    const handleUnlockFolder = (folder_id: number, project_id: number) => {
        dispatch(unlockFolderAPI({ folder_id, project_id, lock_type: 'unlock' }))
    }
    return (
        <div>
            {folder ? (
                <CardContainer onClick={(e) => handleCardClick(e, folder.id)}>
                    {/* <UpdateFolderModal isOpen={updateFolderModal} onRequestClose={() => setUpdateFolderModal(false)} currentFolder={folder} /> */}
                    <FolderHeader>
                        {isDeletePopup && (
                            <DeletePopup
                                buttonText="Delete"
                                text=" Are you sure you want to delete folder? "
                                cancel={() => setIsDeletePopup(false)}
                                Delete={() => handleDeleteFolder(folder.id)}
                            />
                        )}
                        {isHidePopup && (
                            <HideFolderPopup
                                Hide={() =>
                                    handleHideFolder(folder.project_id, folder.id, folder.is_hide)
                                }
                                cancel={() => setIsHidePopup(false)}
                                is_hide={!folder.is_hide}
                            />
                        )}
                        {showReasonModal && (
                            <ReasonModal selectedReason={selectedReason} handleSubmit={() => handleReasonSubmit(folder.id, folder.project_id)} setShowReasonModal={setShowReasonModal} setReason={setReason} handleReasonChange={handleReasonChange} reason={reason} />
                        )}

                        <FolderHeaderContainer>
                            <FolderName>{folder.name}</FolderName>
                            {folder.is_hide ? (
                                <HideContainerIcon>
                                    <HideFolderIcon src={HideAlbumPNG} />
                                </HideContainerIcon>
                            ) : null}
                            {folder.is_locked ? (
                                <LockIconContainer>
                                    <HideFolderIcon src={LockIconPNG} />
                                </LockIconContainer>
                            ) : null}
                        </FolderHeaderContainer>
                        <MenuButton ref={buttonRef} onClick={openMenu}>
                            <Dot>.</Dot>
                            <Dot>.</Dot>
                            <Dot>.</Dot>
                        </MenuButton>
                        {menuOpen && (
                            <DropdownMenu ref={menuRef} onClick={(e) => e.stopPropagation()}>
                                <MenuItem
                                    onClick={(e: React.MouseEvent) => {
                                        e.stopPropagation()
                                        if (isUploadProgress(folder.id))
                                            showErrorToast('Please wait for image uploading')
                                        else setIsDeletePopup(true)
                                    }}
                                >
                                    <ItemIcon src={DeleteIconPNG} />
                                    <ItemName>Delete Folder</ItemName>
                                </MenuItem>
                                <Hr />
                                {folder.is_hide ? (
                                    <MenuItem onClick={() => setIsHidePopup(true)}>
                                        <HideIcon src={HideIconPNG} />
                                        <ItemName>Unhide Folder</ItemName>
                                    </MenuItem>
                                ) : (
                                    <MenuItem onClick={() => setIsHidePopup(true)}>
                                        <HideIcon src={HideIconPNG} />
                                        <ItemName>Hide Folder</ItemName>
                                    </MenuItem>
                                )}

                                <Hr />
                                {folder.is_locked ? (
                                    <MenuItem onClick={() => handleUnlockFolder(folder.id, folder.project_id)}>
                                        <HideIcon src={LockIconPNG} />
                                        <ItemName>Unlock Folder</ItemName>
                                    </MenuItem>
                                ) : (
                                    <MenuItem onClick={() => setShowReasonModal(true)}>
                                        <HideIcon src={LockIconPNG} />
                                        <ItemName>Lock Folder</ItemName>
                                    </MenuItem>
                                )}

                                <Hr />
                            </DropdownMenu>
                        )}
                    </FolderHeader>
                    <ImageContainer>
                        {folder.images && folder.images.length !== 0 ? (
                            <Images>
                                <Image1 src={folder.images[0].thumbnail} />
                                {folder.images.length >= 2 ? (
                                    <Image2 src={folder.images[1].thumbnail} />
                                ) : null}
                                {folder.images.length >= 3 ? (
                                    <Image3 src={folder.images[2].thumbnail} />
                                ) : null}
                                {folder.images.length >= 4 ? (
                                    <RemainingImageCountContainer>
                                        <RemainigImagesText>
                                            +{folder.images.length - 3}
                                        </RemainigImagesText>
                                    </RemainingImageCountContainer>
                                ) : null}
                            </Images>
                        ) : (
                            ' No images are in Folder'
                        )}
                    </ImageContainer>
                </CardContainer>
            ) : null}
            {newFolder ? (
                <CardContainer onClick={onClick}>
                    <FolderName>{newFolder.name}</FolderName>
                    <ImageContainer>
                        {newFolder.images && newFolder.images.length !== 0 ? (
                            <Images>
                                <Image1 src={newFolder.images[0].image_blob} />
                                {newFolder.images.length >= 2 ? (
                                    <Image2 src={newFolder.images[1].image_blob} />
                                ) : null}
                                {newFolder.images.length >= 3 ? (
                                    <Image3 src={newFolder.images[2].image_blob} />
                                ) : null}
                                {newFolder.images.length >= 4 ? (
                                    <RemainingImageCountContainer>
                                        <RemainigImagesText>
                                            +{newFolder.images.length - 3}
                                        </RemainigImagesText>
                                    </RemainingImageCountContainer>
                                ) : null}
                            </Images>
                        ) : (
                            ' No images are in Folder'
                        )}
                    </ImageContainer>
                </CardContainer>
            ) : null}
        </div>
    )
}

export default FolderCard

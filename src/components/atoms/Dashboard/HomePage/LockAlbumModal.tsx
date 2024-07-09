import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Albums, Folder } from '../../../../Data/album.dto';
import { useAppDispatch, useAppSelector } from '../../../../Redux/Hooks';
import Checkbox from '../../Login/Checkbox';
import SubmitButton from '../../Login/SubmitButton';
import { lockAlbum as lockAlbumAPI, unlockAlbum } from '../../../../Redux/ApiCalls/Dashboard/AlbumAPI';
import LoadingDots from '../../Utlis/LoadinDots';
import ReasonModal from './ReasonModal';
// import { lockAlbum } from './albumSlice'; // Adjust the path to your Redux action
import LockIconPng from '../../../../assets/Icons/DropDownMenu/Lock.png'
import UnderLine from '../../Login/UnderLine';
import { getFoldersForAlbum, lockMultipleFoldersAPI, unlockFolderAPI } from '../../../../Redux/ApiCalls/Dashboard/FolderApi';
import { clearError, clearFlagAlbums } from '../../../../Redux/Slice/Dashboard/AlbumSlice';
import { showErrorToast, showSuccessToast } from '../../Utlis/Toast';

interface LockAlbumModalProps {
    album: Albums;
    setShowModal: (flag: boolean) => void;
}

const ModalOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background-color: white;
color: black;
font-family: Urbanist,sans-serif;

  padding: 20px;
  border-radius: 5px;
  width: 650px;
  height:514px;
  max-width: 80%;
  position: relative;
`;

const CloseButton = styled.button`
width:200px;
height:54px;
border:none;
border-radius: 16px 16px 16px 16px;
font-family: Urbanist, sans-serif;
font-size: 18px;
font-weight: 600;
line-height: 19.2px;
text-align: center;
color: black;
margin-left:30px;
background-color:#bcbaba;

`;

const HeaderContainer = styled.div`
width:100%;
display:flex;
flex-direction: column;
text-align: left;
margin-top:20px;
`

const Title = styled.h2`
  margin: 0;
  margin-left:2px;
`;

const FolderList = styled.ul`
  list-style-type: none;
  padding: 0;
  width:100%;
//   padding-right: 30px;
  height:293px;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: left;
  position: relative;
`;

const FolderItem = styled.li`
  margin-bottom: 10px;
  display:flex;
  align-items: center;
`;



const LockAlbumLabelConatiner = styled.div`
display:flex;
align-items:center;

`
const LockAlbumLabel = styled.label`
font-family:Urbanist;
font-size: 13px;
font-weight: 500;
line-height: 34px;
text-align: left;
margin-left: 5px;
`
const FolderListLable = styled.label`
font-family: Urbanist ,san-serif;
font-size: 23px;
font-weight: 500;
line-height: 34px;
text-align: left;
margin-left:15px;

`

const SubmitButtonContainer = styled.div`
margin-bottom:40px;
`
const LockIcon = styled.img`
  width: 20px;
  height: 20px;`

const LockAlbumIconContainer = styled.div`
display:flex;
justify-content: space-between;
width: 100%;
`
const UnlockFolderButtonContainer = styled.div`
position: absolute;
right:40px;

`;





const LockAlbumModal: React.FC<LockAlbumModalProps> = ({ album, setShowModal }) => {
    const [selectedFolders, setSelectedFolders] = useState<number[]>([]);
    const [showReasonModal, setShowReasonModal] = useState(false);
    const [reason, setReason] = useState('');
    const [selectedReason, setSelectedReason] = useState(0);
    const [lockAlbum, setLockAlbum] = useState(false);
    const [activeButton, setActiveButton] = useState(true);
    const [folders, setFolders] = useState<Folder[] | []>([]);
    const { folderLoading, albums, isError, error, isFolderChange } = useAppSelector(state => state.album);
    const dispatch = useAppDispatch();
    useEffect(() => {

        if (album) {
            dispatch(getFoldersForAlbum(album.id));
        }
        return () => {

        }
    }, [])
    useEffect(() => {
        handleSubmitButtonStatus()
    }, [lockAlbum, selectedFolders])

    useEffect(() => {

        if (isError) {
            console.log("Error in lockAlbum Modal", error);
            if (error && error.message) {
                showErrorToast(error.message);
            } else {
                showErrorToast("Something went wrong! Please try again.")
            }

        }
        return () => {
            dispatch(clearError());
            dispatch(clearFlagAlbums());
        }
    }, [isError])
    useEffect(() => {
        if (isFolderChange && album) {
            dispatch(getFoldersForAlbum(album.id));
        }
        return () => {

        }
    }, [isFolderChange])
    useEffect(() => {
        albums.forEach((loopAlbum: Albums) => {
            if (loopAlbum.id === album.id) {
                if (loopAlbum.folders) {
                    setFolders(loopAlbum.folders);
                }
            }
        })
        return () => {

        }
    }, [albums])

    const handleFolderChange = (folder: number) => {
        if (!lockAlbum)
            setSelectedFolders((prev) => {
                prev = prev.includes(folder) ? prev.filter((f) => f !== folder) : [...prev, folder]


                return prev
            }
            );

    };
    const handleSubmitButtonStatus = () => {
        if (lockAlbum) {
            setActiveButton(false);
        } else {

            if (selectedFolders.length > 0) {
                setActiveButton(false);
            } else {
                setActiveButton(true);
            }
        }
    }
    const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedReason(parseInt(event.target.value));
    };

    const handleReasonSubmit = () => {
        const finalReason = selectedReason === 4 ? reason : selectedReason;
        if (lockAlbum) {
            if (selectedReason === 4) {
                dispatch(lockAlbumAPI({ project_id: album.id, custom_reason: reason }))
            } else {

                dispatch(lockAlbumAPI({ project_id: album.id, reason: selectedReason }))
            }
            showSuccessToast("Your Album has been locked");

        } else {
            // console.log(selectedFolders);
            if (selectedReason === 4) {
                dispatch(lockMultipleFoldersAPI({ folders: selectedFolders, project_id: album.id, custom_reason: reason }))
            } else {
                dispatch(lockMultipleFoldersAPI({ folders: selectedFolders, project_id: album.id, reason: selectedReason }))

                // dispatch(lockFolderAPI({ project_id: album.id, reason: selectedReason }))
            }
            showSuccessToast("Folder has been locked.")
        }
        // dispatch(lockAlbum({ albumName, selectedFolders, reason: finalReason }));

        setShowReasonModal(false)
        setShowModal(false);
    };

    const unlockAlbumFunc = (albumId: number) => {
        dispatch(unlockAlbum(albumId));
    }
    const unlockFolder = (folderId: number) => {
        dispatch(unlockFolderAPI({ folder_id: folderId, project_id: album.id, lock_type: "unlock" }));
    }
    // }
    return (
        <>
            <ModalOverlay>
                <ModalContent>
                    <HeaderContainer>
                        <Title>{album.name}</Title>
                        <LockAlbumLabelConatiner>
                            {
                                album.is_locked ? <LockAlbumIconContainer>
                                    <div>

                                        <LockIcon src={LockIconPng}></LockIcon>
                                        <LockAlbumLabel>Folder Already Locked</LockAlbumLabel>
                                    </div>
                                    <SubmitButton onClick={() => unlockAlbumFunc(album.id)} width={140} height={30} text='Unlock' needArrow={false} active={false} />
                                </LockAlbumIconContainer> : <>
                                    <Checkbox id="lockAlbum" checked={lockAlbum} onChange={() => setLockAlbum(value => !value)} />
                                    <LockAlbumLabel htmlFor='lockAlbum'>Lock Entire Album</LockAlbumLabel>
                                </>
                            }

                        </LockAlbumLabelConatiner>
                    </HeaderContainer>
                    <h3>Lock Selected Folders</h3>
                    {folderLoading ?

                        <LoadingDots />
                        :
                        <FolderList>
                            {folders.map((folder) => (<>
                                <FolderItem key={folder.id}>
                                    {folder.is_locked ? <LockIcon src={LockIconPng}></LockIcon> :

                                        <Checkbox
                                            id={`fodlerCheckbox${folder.id}`}
                                            checked={lockAlbum || selectedFolders.includes(folder.id)}
                                            onChange={() => handleFolderChange(folder.id)}
                                        />
                                    }
                                    <FolderListLable htmlFor={`fodlerCheckbox${folder.id}`}>
                                        {folder.name}
                                    </FolderListLable>
                                    {folder.is_locked ? <UnlockFolderButtonContainer>
                                        <SubmitButton onClick={() => unlockFolder(folder.id)} width={140} height={30} text='Unlock Folder' needArrow={false} active={false} />
                                    </UnlockFolderButtonContainer> : null}
                                </FolderItem>
                                <UnderLine width={657} />
                            </>
                            ))}
                        </FolderList>
                    }

                    <SubmitButtonContainer >
                        {/* {loading ?


                                <LoadingDots position={{ type: "absolute", top: "41px", left: "135px" }} />

                                : */}


                        <SubmitButton onClick={() => setShowReasonModal(true)} width={200} text='Lock' needArrow={false} active={activeButton} />
                        <CloseButton onClick={() => setShowModal(false)} >Cancel</CloseButton>
                        {/* } */}

                    </SubmitButtonContainer>
                </ModalContent>
            </ModalOverlay>

            {showReasonModal && (
                <ReasonModal selectedReason={selectedReason} handleSubmit={handleReasonSubmit} setShowReasonModal={setShowReasonModal} setReason={setReason} handleReasonChange={handleReasonChange} reason={reason} />
            )}
        </>
    );
};

export default LockAlbumModal;

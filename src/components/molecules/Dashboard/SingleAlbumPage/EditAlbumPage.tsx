import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import AddCoverImageIconPng from '../../../../assets/Icons/SingleAlbum/addImage.png'
import UnderLine from '../../../atoms/Login/UnderLine';
import PlusSignIconPNG from '../../../../assets/Icons/addIcon.png'
import SubmitButton from '../../../atoms/Login/SubmitButton';
import { uploadToCloudinary1 } from '../../../../Redux/ApiCalls/Cludinary';
import { Folder, NewAlbum, NewFolder } from '../../../../Data/album.dto';
import { useAppDispatch, useAppSelector } from '../../../../Redux/Hooks';
import { updateAlbumAPI } from '../../../../Redux/ApiCalls/Dashboard/AlbumAPI';
import { useNavigate } from 'react-router-dom';
import { clearError, clearFlagAlbums, setAlbumLoading } from '../../../../Redux/Slice/Dashboard/AlbumSlice';
import LoadingDots from '../../../atoms/Utlis/LoadinDots';
import { createFolderAPI, getFoldersForAlbum } from '../../../../Redux/ApiCalls/Dashboard/FolderApi';
import FolderCard from '../../../atoms/Dashboard/SingleAlbumPage/FolderCard';
import AddFolderModal from '../../../atoms/Dashboard/SingleAlbumPage/CreateFolderModal';
import CancleIconPNG from '../../../../assets/Icons/SingleAlbum/cancleIcon.png'
import { showErrorToast, showSuccessToast } from '../../../atoms/Utlis/Toast';


const AlbumPageContainer = styled.div`
 height:94%;
 margin:30px;
 margin-top:10px;
 background-color: hsla(0, 0%, 100%, 0.8);
 border-radius:10px;
 

`;
const UperContainer = styled.div`
padding:30px;
display:flex;
flex-direction:row;

`;
const UploadImageContainer = styled.div`
display: flex;
flex-direction: column;
cursor:pointer;
position:relative;

`;
const UploadImageIcon = styled.img`
width: 69px;
height: 57px;
`;
const UploadImageText = styled.p`
font-family: "Montserrat";
font-size: 14px;
font-weight: 500;
line-height: 17.07px;
text-align: left;
`;
const UploadImageIconText = styled.p`
`;


const UploadImageIconContainer = styled.div`
width: 384px;
height: 225px;
background: hsla(0, 0%, 0%, 0.04);
border-radius:10px;
display: flex;
flex-direction:column;
justify-content: center;
align-items: center;

`;
const UplaodDataContainer = styled.div`
margin-left:80px;
display: flex;
flex-direction: column;
justify-content: space-between;
`;
const InputContainer = styled.div`
width:478px;
display: flex;
text-align: left;
flex-direction: column;
padding-top:16px;

`;


const InputLabel = styled.label`
font-family: "Montserrat",sans-serif;
font-size: 14px;
font-weight: 500;
line-height: 17.07px;
text-align: left;
color:  #424242;


`;
const Input = styled.input`
margin-top:20px;
background-color: transparent;
font-family: "Montserrat";
font-size: 16px;
font-weight: 500;
line-height: 19.5px;
text-align: left;
cursor: pointer;
border:none;
&:focus{
outline:none;
}
`;
const PlusSignContainer = styled.div`

`;
const PlusSignIcon = styled.img`
height: 21px;
width: 21px;

`;

const ButtonText = styled.div`
width: 29px;
height: 17px;
font-family: Urbanist, sans-serif;
font-size: 14px;
font-weight: 600;
line-height: 16.8px;
text-align: left;
COLOR: #A720B9;


`

const AddMemberButton = styled.button`
border: 1px solid #A720B9;
width: 80px;
height: 36px;
margin-right: 52px;
border: 1px;
border-radius:12px;
display:flex;
flex-direction: row;
cursor:pointer;
justify-content: center;
align-items: center;
background:none;
border: 1px solid #A720B9;

`;
const FoldersContainer = styled.div`
display:flex;
flex-direction: column;
height:450px;
`;
const FoldersHeader = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
margin:20px 30px 0px 30px;
`;

const FolderHeadertext = styled.p`

`;

const FoldersHeaderText = styled.p``;
const FolderListContainer = styled.div`
height:100%;
width:96%;
margin-left:46px;


`;
const FolderList = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 50px;
width: 100%;
height: 100%;
`;
const NoFolderTextContainer = styled.div`
height:100%;
width:100%;
display: flex;
align-items: center;
justify-content: center;

`;

const SubmitButtonContainer = styled.div`
cursor:pointer;

`;
const CoverImagePreview = styled.img`
width:384px;
height:225px;
border-radius:10px;
`;

const RemoveButtonConatiner = styled.div`
  position: absolute;
  top: 13px;
  right:11px;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  background: #FF3333;
  box-shadow: 0px 4px 14px 0px #00000080;


height:19px;
width:21px;
`;
const CancleIcon = styled.img`
height:10px;
width:12px;
`
const ImagePreviewConatiner = styled.div`
position: relative;
`;

const EditAlbumPage: React.FC = () => {

    const [album, setAlbum] = useState<NewAlbum>({ name: "", date: "", media_type: 1, image: "" });
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [slectedImage, setSelectedImage] = useState<File | null>(null);
    const [loadFirstTime, setLoadingFirstTime] = useState(true);
    const [activeButton, setActiveButton] = useState(true);
    const [folders, setFolders] = useState<Folder[] | []>([]);
    const dispatch = useAppDispatch();
    const dateRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [currentFolder, setCurrentFolder] = useState<NewFolder | null>(null)
    const { isUpdate, isError, error, loading, currentAlbum, folderLoading, isFolderChange } = useAppSelector(state => state.album)
    const [createFolderModal, setCreateFolderModal] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (isUpdate) {
            showSuccessToast("Album Edited.");
            navigate('/dashboard/');
        }

        return () => {

        }
    }, [isUpdate])
    useEffect(() => {
        if (!currentAlbum) {
            navigate('/dashboard/');
        } else {
            setAlbum(album => {
                album.name = currentAlbum.name;
                album.date = currentAlbum.date;
                album.image = currentAlbum.image;

                return album;
            });
            setImagePreview(album.image);
            if (currentAlbum.folders && currentAlbum.folders.length > 0)
                setFolders(currentAlbum.folders);
            else
                dispatch(getFoldersForAlbum(currentAlbum.id));
        }

        return () => {

        }
    }, [currentAlbum])
    useEffect(() => {
        if (currentAlbum && isFolderChange) {
            dispatch(getFoldersForAlbum(currentAlbum.id));

        }
    }, [isFolderChange])
    useEffect(() => {
        if (isError) {
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
    }, [isError, dispatch])

    useEffect(() => {
        // This function will be called every time `state` changes
        if (!loadFirstTime)
            isValidAlbum(album);
    }, [slectedImage, album]);
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLoadingFirstTime(false)
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                // setAlbum({ ...album, image: file });
                setSelectedImage(prefile => {

                    return file;
                })
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            isValidAlbum(album);
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target;
        setLoadingFirstTime(false)
        // isValidAlbum(album);
        setAlbum(album => {
            // album = { ...album, [name]: value }
            if (name == "date" || (name == 'name' && value.length < 25)) {
                // console.log(name == "date" || (name == 'name' && value.length < 25 && value !== album.name))
                album = { ...album, [name]: value }
            }
            // isValidAlbum(album);
            return album;
        });
    }
    const isValidAlbum = (album: NewAlbum) => {
        // console.log(isValidDate(album.date));
        if ((isValidDate(album.date) || (album.name.length > 3 && album.name !== currentAlbum?.name)) && (album.image.length !== 0 || slectedImage)) {
            setActiveButton(false);
        } else {
            setActiveButton(true);
        }
    }
    const sendImageToCloudinary = async () => {
        if (slectedImage) {
            // console.log(slectedImage);
            const result = uploadToCloudinary1(slectedImage).then((data) => {
                album.image = data;
            }).catch(err => console.log(err));
            console.log(result);
            return result;
        }
        return 'false';
    }
    const isValidDate = (dateString: string): boolean => {
        // Check the format with a regular expression
        const regex = /^(\d{4})\-(\d{2})\-(\d{2})$/;
        const match = dateString.match(regex);

        console.log(dateString === currentAlbum?.date)
        if (!match || currentAlbum?.date === dateString) {
            return false;
        }

        // Extract the day, month, and year from the date string
        return true;
    };
    const handleDivClick = () => {
        fileInputRef.current?.click();
    };
    const handleSubmit = async () => {
        if (currentAlbum) {
            const formData = new FormData();
            console.log(album);
            dispatch(setAlbumLoading())
            if (slectedImage) {
                formData.append('image', slectedImage);
            }
            formData.append('project_id', `${currentAlbum?.id}`);
            formData.append('name', album.name);
            formData.append('date', album.date);
            dispatch(updateAlbumAPI(formData));

        }

    }
    const handleFolderCreation = (folder: NewFolder) => {
        // console.log(folder);
        if (folder.name.trim().length === 0) {
            showErrorToast("Please enter folder name");

        } else {
            const formData = new FormData();
            formData.append("project_id", `${currentAlbum?.id}`);
            formData.append("name", folder.name);
            folder.images.forEach(image => {
                formData.append('files', image.image);
                formData.append('media_types', "1");
            })
            dispatch(createFolderAPI(formData));
        }
    }
    const removeImageandPreview = () => {
        setImagePreview(null)
        setAlbum(album => {
            album.image = '';
            return album;
        })
        setSelectedImage(img => {
            isValidAlbum(album);
            return null;
        });
    }

    return (
        <AlbumPageContainer>
            <UperContainer>
                <UploadImageContainer >
                    <UploadImageText>Cover Photo</UploadImageText>
                    {imagePreview ? <ImagePreviewConatiner>
                        {/* <CancleButtonContainer onClick={() => removeImageandPreview()}>
                            <CancleButton>+</CancleButton>
                        </CancleButtonContainer> */}
                        <RemoveButtonConatiner onClick={() => removeImageandPreview()}>
                            <CancleIcon src={CancleIconPNG} />
                        </RemoveButtonConatiner>
                        <CoverImagePreview src={imagePreview} onClick={() => handleDivClick()} />
                    </ImagePreviewConatiner> : (< div onClick={() => handleDivClick()}>
                        <UploadImageIconContainer >

                            <UploadImageIcon src={AddCoverImageIconPng} />
                            <UploadImageIconText >Add Cover Photo</UploadImageIconText>
                        </UploadImageIconContainer>
                    </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                    />
                </UploadImageContainer>
                <UplaodDataContainer>
                    <InputContainer>
                        <InputLabel>Name</InputLabel>
                        <Input type="text" name="name" placeholder='Photo King' onChange={onChange} value={album.name} />
                        <UnderLine width={478} />
                    </InputContainer>
                    <InputContainer onClick={() => { dateRef.current?.showPicker() }}>
                        <InputLabel>Creation Date</InputLabel>
                        <Input type="date" name='date' ref={dateRef} placeholder='dd/mm/yyyy' onChange={onChange} value={album.date} />
                        <UnderLine width={478} />
                    </InputContainer>
                </UplaodDataContainer>
            </UperContainer>
            <UnderLine width={98} isPercent={true} />
            <FoldersContainer>
                <AddFolderModal isOpen={createFolderModal} onRequestClose={() => setCreateFolderModal(false)} currentFolder={null} setCurrentFolder={setCurrentFolder} onSubmit={handleFolderCreation} />
                <FoldersHeader>
                    <FolderHeadertext>Folders</FolderHeadertext>
                    <AddMemberButton onClick={() => setCreateFolderModal(true)}>
                        <PlusSignContainer>
                            <PlusSignIcon src={PlusSignIconPNG}>
                            </PlusSignIcon>
                        </PlusSignContainer>
                        <ButtonText>
                            ADD
                        </ButtonText>
                    </AddMemberButton>
                </FoldersHeader>
                <FolderListContainer>
                    {folderLoading ? <LoadingDots ></LoadingDots> :
                        folders.length > 0 ? <FolderList>

                            {folders.map((folder: Folder) => <>  <FolderCard folder={folder} isNew={false} /></>)}

                        </FolderList> :
                            <NoFolderTextContainer>`No any folder created yet!`</NoFolderTextContainer>

                    }
                </FolderListContainer>
            </FoldersContainer>
            <SubmitButtonContainer>
                {loading ? <LoadingDots /> :
                    <SubmitButton width={291} text='Submit' needArrow={false} onClick={() => handleSubmit()} active={activeButton} ></SubmitButton>
                }
            </SubmitButtonContainer>
        </AlbumPageContainer>
    )
}

export default EditAlbumPage
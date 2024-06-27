import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import AddCoverImageIconPng from '../../../../assets/Icons/SingleAlbum/addImage.png'
import UnderLine from '../../../atoms/Login/UnderLine';
import PlusSignIconPNG from '../../../../assets/Icons/addIcon.png'
import SubmitButton from '../../../atoms/Login/SubmitButton';
import { uploadToCloudinary1 } from '../../../../Redux/ApiCalls/Cludinary';
import { Folder, NewAlbum, NewFolder } from '../../../../Data/album.dto';
import { useAppDispatch, useAppSelector } from '../../../../Redux/Hooks';
import { createAlbumAPI } from '../../../../Redux/ApiCalls/Dashboard/AlbumAPI';
import { useNavigate } from 'react-router-dom';
import { clearError, clearFlagAlbums, setAlbumLoading } from '../../../../Redux/Slice/Dashboard/AlbumSlice';
import LoadingDots from '../../../atoms/Utlis/LoadinDots';
import AddFolderModal from '../../../atoms/Dashboard/SingleAlbumPage/CreateFolderModal';
import FolderCard from '../../../atoms/Dashboard/SingleAlbumPage/FolderCard';
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
font-family: "Urbanist", sans-serif;
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
border-radius:10%;
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
const FolderList = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 50px;
width: 100%;
height: 100%;
`;
const SubmitButtonContainer = styled.div`
cursor:pointer;

`;
const CoverImagePreview = styled.img`
width:418px;
height:300px;
border-radius:10px;
`;
const FolderListContainer = styled.div`
height:100%;
width:96%;
margin-left:46px;
`;

const NoFolderTextContainer = styled.div`
height:100%;
width:100%;
display: flex;
align-items: center;
justify-content: center;

`;
const CreateNewAlbumPage: React.FC = () => {

    const [album, setAlbum] = useState<NewAlbum>({ name: "", date: "", media_type: 1, image: "" });
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [activeButton, setActiveButton] = useState(true);
    const [folders, setFolders] = useState<NewFolder[] | []>([]);
    const [createFolderModal, setCreateFolderModal] = useState(false);
    const dispatch = useAppDispatch();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { isUpdate, isError, error, loading } = useAppSelector(state => state.album);
    const [currentFolder, setCurrentFolder] = useState<NewFolder | null>(null)
    const navigate = useNavigate();
    useEffect(() => {
        if (isUpdate) {
            showSuccessToast("New Album Created.");
            navigate('/dashboard/');
        }

        return () => {

        }
    }, [isUpdate])

    useEffect(() => {
        console.log(isError)
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
    }, [isError])

    useEffect(() => {
        // This function will be called every time `state` changes
        isValidAlbum(album);
    }, [selectedImage, album]);
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
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
        // isValidAlbum(album);
        setAlbum(album => {
            album = { ...album, [name]: value }
            isValidAlbum(album);
            return album;
        });
    }
    const isValidAlbum = (album: NewAlbum) => {
        console.log(isValidDate(album.date) && album.name.length > 3 && selectedImage !== null);
        if (isValidDate(album.date) && album.name.length > 3 && selectedImage) {
            setActiveButton(false);
        } else {
            setActiveButton(true);
        }
    }
    const sendImageToCloudinary = async () => {
        if (selectedImage) {
            console.log(selectedImage);
            const result = uploadToCloudinary1(selectedImage).then((data) => {
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
        console.log(dateString)
        if (!match) {
            return false;
        }

        // Extract the day, month, and year from the date string
        return true;
    };
    const handleDivClick = () => {
        fileInputRef.current?.click();
    };
    const handleSubmit = async () => {
        // dispatch(setAlbumLoading())
        // sendImageToCloudinary().then(() => dispatch(createAlbumAPI({ project: album })));
        if (selectedImage) {

            setAlbum(album => {
                album.folders = folders
                return album;
            })
            console.log(folders);
            const formData = new FormData();
            formData.append('project[name]', album.name);
            formData.append('project[date]', album.date);
            formData.append('project[media_type]', "1");
            // formData.append('image', JSON.stringify(form1));
            formData.append('project_image', selectedImage);

            folders.forEach((folder, folderIndex) => {
                formData.append(`folders[${folderIndex}][name]`, folder.name);
                folder.images.forEach((image, imageIndex) => {
                    formData.append(`folders[${folderIndex}][images][${imageIndex}][image]`, image.image); // Assuming image is a File object
                    formData.append(`folders[${folderIndex}][images][${imageIndex}][media_type]`, image.media_type.toString());
                    console.log(formData.get(`folders[${folderIndex}][images][${imageIndex}][image]`));
                    console.log(image.image);
                });
            });
            console.log(folders)
            console.log(formData.get("project_image"));
            dispatch(createAlbumAPI(formData));
        }
    }
    const handleAddFolder = (folder: NewFolder) => {
        setFolders((prevFolders) => {
            const folderIndex = prevFolders.findIndex((f) => f.name.toLowerCase() === folder.name.toLowerCase());
            if (folderIndex !== -1) {
                // Update existing folder
                const updatedFolders = [...prevFolders];
                updatedFolders[folderIndex] = folder;
                return updatedFolders;
            } else {
                // Add new folder
                return [...prevFolders, folder];
            }
        });
        showSuccessToast('Folder added successfully.');
    };

    return (
        <AlbumPageContainer>
            <UperContainer>
                <UploadImageContainer onClick={() => handleDivClick()}>
                    {imagePreview ? <CoverImagePreview src={imagePreview} /> : (<>
                        <UploadImageText>Cover Photo</UploadImageText>
                        <UploadImageIconContainer >

                            <UploadImageIcon src={AddCoverImageIconPng} />
                            <UploadImageIconText >Add Cover Photo</UploadImageIconText>
                        </UploadImageIconContainer>
                    </>
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
                        <Input type="text" name="name" placeholder='Photo King' onChange={onChange} />
                        <UnderLine width={478} />
                    </InputContainer>
                    <InputContainer>
                        <InputLabel>Creation Date</InputLabel>
                        <Input type="date" name='date' placeholder='dd/mm/yyyy' onChange={onChange} />
                        <UnderLine width={478} />
                    </InputContainer>
                </UplaodDataContainer>
            </UperContainer>
            <UnderLine width={1430} />
            <FoldersContainer>
                <AddFolderModal isOpen={createFolderModal} onRequestClose={() => { setCreateFolderModal(false); setCurrentFolder(null) }} onSubmit={handleAddFolder} currentFolder={currentFolder ? currentFolder : null} setCurrentFolder={setCurrentFolder} />
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


                    {
                        folders.length > 0 ? <FolderList> {folders.map((folder) => <FolderCard newFolder={folder} isNew={true} onClick={() => { setCreateFolderModal(pre => { setCurrentFolder(folder); return true }); }} />)} </FolderList> :
                            <NoFolderTextContainer>No any folder created yet!</NoFolderTextContainer>
                    }

                </FolderListContainer>
            </FoldersContainer>
            <SubmitButtonContainer>
                {loading ? <LoadingDots /> :
                    <SubmitButton width={110} text='Submit' needArrow={false} onClick={() => handleSubmit()} active={activeButton} ></SubmitButton>
                }
            </SubmitButtonContainer>
        </AlbumPageContainer>
    )
}

export default CreateNewAlbumPage
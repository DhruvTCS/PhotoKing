import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import AddCoverImageIconPng from '../../../../assets/Icons/SingleAlbum/addImage.png'
import UnderLine from '../../../atoms/Login/UnderLine';
import PlusSignIconPNG from '../../../../assets/Icons/addIcon.png'
import SubmitButton from '../../../atoms/Login/SubmitButton';
import { uploadToCloudinary1 } from '../../../../Redux/ApiCalls/Cludinary';
import { NewAlbum, NewFolder } from '../../../../Data/album.dto';
import { useAppDispatch, useAppSelector } from '../../../../Redux/Hooks';
import { createAlbumAPI } from '../../../../Redux/ApiCalls/Dashboard/AlbumAPI';
import { useNavigate } from 'react-router-dom';
import { clearError, setAlbumLoading } from '../../../../Redux/Slice/Dashboard/AlbumSlice';
import LoadingDots from '../../../atoms/Utlis/LoadinDots';


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
width:418px;
height:300px;
border-radius:10px;
`;
const CreateNewAlbumPage: React.FC = () => {

    const [album, setAlbum] = useState<NewAlbum>({ name: "", date: "", media_type: 1, image: "" });
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [slectedImage, setSelectedImage] = useState<File | null>(null);
    const [activeButton, setActiveButton] = useState(true);
    const [folders, setFolders] = useState<NewFolder[] | []>([]);
    const dispatch = useAppDispatch();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { isUpdate, isError, error, loading } = useAppSelector(state => state.album)
    const navigate = useNavigate();
    useEffect(() => {
        if (isUpdate) {
            navigate('/dashboard/');
        }

        return () => {

        }
    }, [isUpdate])

    useEffect(() => {
        console.log(isError)
        if (isError && error && error.message) {
            alert(error.message);
        }

        return () => {
            dispatch(clearError());
        }
    }, [isError])

    useEffect(() => {
        // This function will be called every time `state` changes
        isValidAlbum(album);
    }, [slectedImage, album]);
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
        console.log(isValidDate(album.date) && album.name.length > 3 && slectedImage !== null);
        if (isValidDate(album.date) && album.name.length > 3 && slectedImage) {
            setActiveButton(false);
        } else {
            setActiveButton(true);
        }
    }
    const sendImageToCloudinary = async () => {
        if (slectedImage) {
            console.log(slectedImage);
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
        dispatch(setAlbumLoading())
        sendImageToCloudinary().then(() => dispatch(createAlbumAPI({ project: album })));

    }

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
                <FoldersHeader>
                    <FolderHeadertext>Folders</FolderHeadertext>
                    <AddMemberButton>
                        <PlusSignContainer>
                            <PlusSignIcon src={PlusSignIconPNG}>
                            </PlusSignIcon>
                        </PlusSignContainer>
                        <ButtonText>
                            ADD
                        </ButtonText>
                    </AddMemberButton>
                </FoldersHeader>
                <FolderList>
                    {
                        folders.length > 0 ? null :
                            `No any folder created yet!`
                    }
                </FolderList>
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
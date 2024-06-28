// src/components/AddFolderModal.tsx
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import imageCompression from 'browser-image-compression';
import { showSuccessToast, showErrorToast } from './../../Utlis/Toast';
import HeaderIconPNG from '../../../../assets/Icons/SingleAlbum/addFolderIcon.png'
import AddImageIconPNG from '../../../../assets/Icons/SingleAlbum/addImage.png'
import SubmitButton from '../../Login/SubmitButton';
import UnderLine from '../../Login/UnderLine';
import { NewFolder } from '../../../../Data/album.dto';
import CancleIconPNG from '../../../../assets/Icons/SingleAlbum/cancleIcon.png'
import LoadingDots from '../../Utlis/LoadinDots';

interface AddFolderModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onSubmit: (folder: NewFolder) => void;
    currentFolder: NewFolder | null;
    setCurrentFolder: (data: NewFolder | null) => void;
}

const AddFolderModal: React.FC<AddFolderModalProps> = ({ isOpen, onRequestClose, onSubmit, currentFolder, setCurrentFolder }) => {
    const [folderName, setFolderName] = useState('');
    const [newFolderImages, setNewFolderImages] = useState<File[]>([]);
    const [previewImageString, setPreviewImageString] = useState<string[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [compresedImageLoading, setCompresedImageLoading] = useState(false);
    useEffect(() => {
        console.log(currentFolder);
        if (currentFolder) {
            setFolderName(currentFolder.name);
            setNewFolderImages(pre => currentFolder.images.map(image => image.image));
            // setPreviewImageString(pre => currentFolder.images.map(image => URL.createObjectURL(image.image)));

        } else {
            setFolderName('');
            setNewFolderImages([]);
        }

        return () => {
            setCurrentFolder(null);

        }
    }, [isOpen])
    const blobToFile = (blob: Blob, fileName: string): File => {
        return new File([blob], fileName, { type: blob.type });
    };
    const compressImage = async (file: File): Promise<Blob> => {
        const options = {
            maxSizeMB: 3,          // Maximum size in MB
            maxWidthOrHeight: 1920, // Max width or height
            useWebWorker: true      // Use web worker for faster compression
        };

        try {
            const compressedBlob = await imageCompression(file, options);
            return compressedBlob;
        } catch (error) {
            console.error('Error compressing image:', error);
            throw error;
        }
    };
    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setCompresedImageLoading(true);
        const files = event.target.files;
        if (!files) return;

        const acceptedFiles = Array.from(files);
        console.log(acceptedFiles);
        const compressedFiles = await Promise.all(
            acceptedFiles.map(async (file) => {

                try {
                    if (file.size / 1024 / 1024 > 3) {
                        const compressedBlob = await compressImage(file); // Your image compression function
                        const compressedFile = blobToFile(compressedBlob, file.name);
                        return compressedFile;
                    } else {
                        return file;
                    }

                } catch (error) {
                    console.error('Error compressing file:', error);
                    showErrorToast('Error compressing file');
                    return undefined; // Return undefined if there's an error
                }
            })
        );

        // Filter out any undefined values
        const validCompressedFiles = compressedFiles.filter((file): file is File => file !== undefined);
        setCompresedImageLoading(false);
        if (validCompressedFiles.length + newFolderImages.length > 20) {
            showErrorToast('You can only upload up to 20 images at Folder creation time later you can upload more images.');
            return;
        }

        setNewFolderImages((prev) => [...prev, ...validCompressedFiles]);
    };

    const handleRemoveImage = (index: number) => {
        setNewFolderImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleCreateFolder = () => {
        if (!folderName.trim()) {
            showErrorToast('Folder name cannot be empty.');
            return;
        }
        if (newFolderImages.length === 0) {
            showErrorToast('You must add at least one image.');
            return;
        }
        const folder: NewFolder = {
            name: folderName,
            images: newFolderImages.map((file) => ({ image: file, image_blob: URL.createObjectURL(file), media_type: 1 })),
        };
        onSubmit(folder);
        onRequestClose();
        setFolderName('');
        setNewFolderImages([]);


    };

    if (!isOpen) {
        return null;
    }

    return (
        <ModalOverlay>
            <ModalContent>
                <ModalHeader>
                    <HeaderIconConatiner>

                        <HerderIcon src={HeaderIconPNG} />
                    </HeaderIconConatiner>
                    <HeaderText>
                        Create Folder
                    </HeaderText>
                </ModalHeader>
                <ModalBody>

                    <InputConatiner>

                        <Inputlabel>
                            Folder's Name
                        </Inputlabel>
                        <InputName type='text' onChange={(e) => setFolderName(e.target.value)} placeholder='Engagement Photos' value={folderName} />
                        <UnderLine width={830} />
                    </InputConatiner>
                    <PhotContainer>
                        <PhotoLabel>
                            Photos
                        </PhotoLabel>
                        <ImageConatiner>

                            <ImageUploadContainer onClick={() => { fileInputRef?.current?.click() }}>

                                <DefaultImage src={AddImageIconPNG} alt="Click to upload" />
                                <AddImageLabel>Add Images</AddImageLabel>
                                <input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    ref={fileInputRef}
                                    onChange={handleImageUpload}
                                    style={{ display: 'none' }}
                                />
                            </ImageUploadContainer>
                            {compresedImageLoading ? <LoadingDots /> :
                                <>{
                                    newFolderImages.map((file, index) => (
                                        <ImagePreview key={index}>
                                            <PreviewImage src={URL.createObjectURL(file)} alt="preview" />
                                            <RemoveButtonConatiner onClick={() => handleRemoveImage(index)}>
                                                <CancleIcon src={CancleIconPNG} />
                                            </RemoveButtonConatiner>
                                        </ImagePreview>
                                    ))
                                }
                                </>
                            }


                        </ImageConatiner>
                    </PhotContainer>
                </ModalBody>
                <ButtonContainer>
                    <SubmitButton text={'Create'} width={100} height={56} needArrow={false} onClick={() => handleCreateFolder()} active={!(newFolderImages.length > 0)} />
                    <CancelButton onClick={onRequestClose}> Cancel</CancelButton>
                </ButtonContainer>
            </ModalContent>
        </ModalOverlay>
    );
};

export default AddFolderModal;

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;




`;

const ModalContent = styled.div`
  position: relative;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  width: 834px;
height: 788px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;
const ModalHeader = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

`
const HeaderIconConatiner = styled.div`
width: 82px;
height: 85px;
display: flex;
align-items:center;
justify-content: center;
background: #A720B926;
border-radius:50%;

`;
const HeaderText = styled.p`
font-family: Urbanist;
font-size: 20px;
font-weight: 600;
line-height: 30px;
text-align: center;

`;
const HerderIcon = styled.img`
width: 61px;
height: 61.04px;

`;

const PhotContainer = styled.div`
margin-top:30px;
min-height:400px;
`;
const ModalBody = styled.div`
display:flex;
flex-direction: column;

`;
const InputConatiner = styled.div`
display: flex;
flex-direction: column;

`;
const Inputlabel = styled.label`
font-family: Urbanist;
font-size: 15px;
font-weight: 500;
line-height: 18px;
text-align: left;
margin-bottom:10px;
`;
const InputName = styled.input`
border: none;
&:focus{
outline: none;
}

`;
const PhotoLabel = styled.label`
text-align: left;
font-family: Urbanist;
font-size: 15px;
font-weight: 500;
line-height: 18px;
text-align: left;
color: #424242;

`;
const ImageConatiner = styled.div`
display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;
const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
   border: 2px dashed #ccc;
  border-radius: 8px;
  background: #0000000D;

  cursor: pointer;
  width: 99px;
height: 99px;
border-radius: 19px;

`;
const AddImageLabel = styled.p`
color: #929292;
font-family: Urbanist;
font-size: 13px;
font-weight: 600;
line-height: 12px;
text-align: left;

`

const DefaultImage = styled.img`
  width: 43px;
  height: 41px;
 
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ImagePreview = styled.div`
  position: relative;
`;
const PreviewImage = styled.img`
height:100px;
width:100px;
border-radius: 4px;
`

const RemoveButtonConatiner = styled.div`
  position: absolute;
  top: 0;
  right: 0;
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
const ButtonContainer = styled.div`
button{
font-size:22px;
}
`
const CancelButton = styled.button`
width: 100px;
    border: none;
    border-radius: 16px 16px 16px 16px;
    font-family: "Urbanist", sans-serif;
    font-size: 22px;
    font-weight: 500;
    line-height: 19.2px;
    text-align: center;
    height: 56px;
    color: #FFFFFF;
    background-color: #bcbaba;
    color: black;
    margin-left:30px;
`;

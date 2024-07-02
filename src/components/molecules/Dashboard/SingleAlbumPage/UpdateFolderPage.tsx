import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../../../Redux/Hooks';
import { useNavigate } from 'react-router-dom';
import { showErrorToast } from '../../../atoms/Utlis/Toast';
import BackIconPNG from '../../../../assets/Icons/SingleAlbum/back.png'
import { Folder } from '../../../../Data/album.dto';
import UnderLine from '../../../atoms/Login/UnderLine';
import AddImageIconPNG from '../../../../assets/Icons/SingleAlbum/addImage.png'
import imageCompression from 'browser-image-compression';
import CancleIconPNG from '../../../../assets/Icons/SingleAlbum/cancleIcon.png'
import LoadingDots from '../../../atoms/Utlis/LoadinDots';
import SelectedIconPNG from '../../../../assets/Icons/tick.png'
import DeletePopup from '../../../atoms/Dashboard/Folder/DeletePopup';
import { deleteFolderImagesAPI, getSingleFolderAPI, updateFolderAPI } from '../../../../Redux/ApiCalls/Dashboard/FolderApi';
import DiscardPopUp from '../../../atoms/Dashboard/Folder/DiscardSelectedImagesPopup';
const PageConatiner = styled.div`
margin-left: 30px;
`;
const PageHeader = styled.div`
display:flex;
align-items: center;
`;
const BackIcon = styled.img`
height:20px;
width:20px;
cursor:pointer;
`;
const BackText = styled.p`
font-family: Urbanist;
font-size: 19px;
font-weight: 600;
line-height: 22.8px;
text-align: left;
margin-left: 10px;
cursor:pointer;
`;
const PageBoady = styled.div`

min-height: 700px;
 width:98%;

 margin-top:10px;
 background-color: hsla(0, 0%, 100%, 0.8);
 border-radius:10px;
position:relative;
 hr{
 margin-top:40px;
 opacity:0.4;
 width:98%;
 }
`;
const Conatiner1 = styled.div`
 
hr{
  margin:0;
  margin-left:30px;
  opacity:1;
  width:400px;
 }
`;
const InputNameConatiner = styled.div`
display:flex;
flex-direction: column;
align-items: flex-start;
padding:30px 30px 0px 30px;
`;
const InputName = styled.input`
font-family: Urbanist;
font-size: 19px;
font-weight: 600;
line-height: 22.8px;
text-align: left;
margin-top:20px;
width:500px;
border:none;
background:transparent;
 &:focus{
  outline:none;
 }
`;
const InputFolderLabel = styled.label`
font-family: Urbanist;
font-size: 19px;
font-weight: 600;
line-height: 22.8px;
text-align: left;
opacity: 0.5;

`;
const Conatiner2 = styled.div`
margin-left:30px;
display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  overflow-y: scroll;
   max-height: 500px;
  //  min-height: 500px;
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
const ImagePreview = styled.div`
  position: relative;
  cursor: pointer;
`;
const PreviewImage = styled.img`
height:100px;
width:100px;
border-radius: 4px;
`

const RemoveButtonConatiner = styled.div`
  position: absolute;
  top: 3px;
  right: 3px;
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

const SelectedIconContainer = styled.div`
  position: absolute;
  top: 3px;
  right: 3px;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  
  box-shadow: 0px 4px 14px 0px #00000080;


height:19px;
width:19px;
`;
const SelectedIcon = styled.img`
height:19px;
width:19px;
`
const ButtonContainer = styled.div`
position: absolute;
bottom: 30px;
left:46%;
`;
const UpdateButton = styled.button`
width:291px;
height:50px;
border-radius: 11px;
font-family: Urbanist;
font-size: 19px;
font-weight: 500;
line-height: 26.4px;
text-align: center;
color:white;
background: linear-gradient(360deg, #7A11A1 0%, #C62BC9 100%);
border:none;
cursor:pointer;
&:disabled{
 background:#bcbaba;
    color:black;
}

`;
const DeleteButton = styled.button`
width:291px;
height:50px;
border-radius: 11px;
border:none;
margin-left:20px;
background-color:red;
font-family: Urbanist;
font-size: 19px;
font-weight: 500;
line-height: 26.4px;
text-align: center;
color:white;

cursor:pointer;
&:disabled{
 background-color:#bcbaba;
    color:black;
}
`;
const LoadingContainer = styled.div`

min-height: 700px;
 width:98%;

 margin-top:10px;
 background-color: hsla(0, 0%, 100%, 0.8);
 border-radius:10px;
 display: flex;
 align-items: center;
 justify-content: center;
`;
const InputContainer = styled.div`
display: flex;
width: 100%;
align-items: center;

`;

const SelectImageRadioConatiner = styled.div`
width:100%;
text-align:right;
margin-right:30px;
cursor:pointer;
`;
const SelectImageLabel = styled.label<{ isCheck: boolean }>`
font-family: Urbanist;
font-size: 16px;
font-weight: 500;
line-height: 26.4px;
text-align: center;
cursor:pointer;
color:${props => props.isCheck ? 'black' : 'grey'}

`;
const SlectImageRadio = styled.input``;

const UpdateFolderPage = () => {
  const dispatch = useAppDispatch();
  const { currentFolder, isError, isFolderChange, folderLoading, error } = useAppSelector(state => state.album)
  const [folder, setFolder] = useState<Folder>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newFolderImages, setNewFolderImages] = useState<File[]>([]);
  const [folderName, setFolderName] = useState<string>();
  const [selectedFolderImages, setSelectedFolderImages] = useState<number[]>([]);
  const [folderImages, setFolderImages] = useState<{ id: number, project_id: number, image: string, media_type: number }[]>()
  const [compresedImageLoading, setCompresedImageLoading] = useState(false);
  const [activeUploadButton, setActiveUploadButton] = useState(true);
  const [deletModal, setDeleteModal] = useState(false);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [popUpFunction, setPopUpFunction] = useState<{ fun: () => void }>();
  const [discardPopup, setDiscardPopup] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentFolder) {
      navigate(-1);

    } else {
      setFolder(currentFolder)
      setNewFolderImages([]);
      setFolderName(currentFolder.name);
      setFolderImages(currentFolder.images);
      setSelectedFolderImages([])
    }
  }, [currentFolder]);
  useEffect(() => {
    if (isError && error && error.message) {
      showErrorToast(error.message)
    }

  }, [isError, error]);

  useEffect(() => {

    isUploadActiveButton();
  }, [newFolderImages, folderName])
  useEffect(() => {
    // console.log("calling ++++")
    if (isFolderChange && currentFolder) {

      setSelectedFolderImages([])
      setIsUpdate(false);
      setIsImageSelected(false);
      setNewFolderImages([]);
      dispatch(getSingleFolderAPI({ folder_id: currentFolder?.id }))
    }
  }, [isFolderChange])

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
    // console.log("calling")
    setCompresedImageLoading(true);
    const files = event.target.files;
    if (!files) return;

    const acceptedFiles = Array.from(files);
    // console.log(acceptedFiles);
    const compressedFiles = await Promise.all(
      acceptedFiles.map(async (file) => {

        try {
          if (file.size / 1024 / 1024 > 5) {

            const compressedBlob = await compressImage(file); // Your image compression function
            const compressedFile = blobToFile(compressedBlob, file.name);
            // console.log("compressed")
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
      showErrorToast('You can only upload up to 20 images at a time.');
      return;
    }

    setNewFolderImages((prev) => [...prev, ...validCompressedFiles]);
  };
  const handleRemoveImage = (index: number) => {
    setNewFolderImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSelectedImage = (id: number, url: string) => {
    setSelectedFolderImages((prev) =>
      prev.includes(id) ? prev.filter((imageId) => imageId !== id) : [...prev, id]
    )
  }
  const isUploadActiveButton = () => {
    if (folderName !== folder?.name || newFolderImages.length !== 0) {
      setActiveUploadButton(false);
    } else {
      setActiveUploadButton(true);
    }
  }
  const handleUpdateFolder = () => {
    const formData = new FormData();
    formData.append('project_id', `${folder?.project_id}`)
    formData.append('folder_id', `${folder?.id}`);
    if (folderName)
      formData.append('folder_name', folderName);
    else
      formData.append('folder_name', `${folder?.name}`);
    newFolderImages.forEach((image, index) => {
      formData.append(`media[${index}][image]`, image);
      formData.append(`media[${index}][media_type]`, "1");
    })
    dispatch(updateFolderAPI(formData));
  }
  const deleteFolderImages = () => {
    dispatch(deleteFolderImagesAPI({ media_ids: selectedFolderImages }));
    setSelectedFolderImages([]);
    setNewFolderImages([]);
    setDeleteModal(false);
  }
  const SelectCheckbox = () => {
    // console.log(isImageSelected)
    if (!isImageSelected) {
      if (newFolderImages.length > 0 || currentFolder?.name !== folderName) {

        // setIsImageSelected(true);
        setDiscardPopup(true);
      } else {
        setIsUpdate(false);
        setIsImageSelected(true)
      }
    } else {
      setIsImageSelected(false);
      setSelectedFolderImages([]);
      // console.log(selectedFolderImages)
    }
  }
  const ImageUploadCheck = () => {
    if (isImageSelected) {
      if (selectedFolderImages.length > 0) {
        setDiscardPopup(true);
      } else {
        setIsImageSelected(false);
        fileInputRef?.current?.click()
        setIsUpdate(true);

      }
    } else {
      fileInputRef?.current?.click()
      setIsUpdate(true);
    }
  }
  const DiscardAllChanges = () => {
    setIsUpdate(false);
    setFolderName(currentFolder?.name);
    setSelectedFolderImages([]);
    setNewFolderImages([]);
    setIsImageSelected(false);
    setDiscardPopup(false);
  }
  const folderNameChange = (name: string) => {
    if (name.length <= 30) {

      if (name !== currentFolder?.name) {

        if (isImageSelected) {
          if (selectedFolderImages.length > 0) {
            setDiscardPopup(true);
          } else {
            setIsImageSelected(false)
            setFolderName(name);
            setIsUpdate(true);

          }
        } else {
          // fileInputRef?.current?.click()
          setIsUpdate(true);
          setFolderName(name);
        }
      } else {
        setIsUpdate(false);
        setFolderName(currentFolder?.name);
        // setFolderName(name);

      }
    }
  }
  return (
    <PageConatiner>
      {discardPopup && <DiscardPopUp cancel={() => setDiscardPopup(false)} Delete={() => DiscardAllChanges()} />}
      <PageHeader>
        <BackIcon src={BackIconPNG} onClick={() => navigate(-1)} />
        <BackText onClick={() => navigate(-1)}>Back</BackText>
      </PageHeader>
      {folderLoading ? <LoadingContainer><LoadingDots /> </LoadingContainer> :
        <PageBoady>
          <Conatiner1>
            {deletModal && <DeletePopup cancel={() => setDeleteModal(false)} Delete={() => deleteFolderImages()} />}
            <InputNameConatiner >
              <InputFolderLabel>Folder</InputFolderLabel>

              <InputName type='text' value={folderName} onChange={(e) => folderNameChange(e.target.value)} />
            </InputNameConatiner>
            <UnderLine width={400} />
          </Conatiner1>
          <UnderLine width={900} />
          <InputContainer>
            <SelectImageRadioConatiner>
              <SlectImageRadio type='checkbox' id="selecheck" onChange={() => SelectCheckbox()} checked={isImageSelected} />
              <SelectImageLabel htmlFor='selecheck' isCheck={isImageSelected}>Select Images</SelectImageLabel>
            </SelectImageRadioConatiner>
          </InputContainer>
          <Conatiner2>
            <ImageUploadContainer onClick={() => { ImageUploadCheck() }}>

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
                {
                  folderImages && folderImages.length !== 0 ?
                    folderImages.map((image, index) => (
                      <ImagePreview key={index} onClick={() => { if (isImageSelected) handleSelectedImage(image.id, image.image) }}>
                        <PreviewImage src={image.image} alt="preview" />
                        {
                          isImageSelected && <SelectedIconContainer  >
                            {
                              selectedFolderImages.includes(image.id) && <SelectedIcon src={SelectedIconPNG} />
                            }

                          </SelectedIconContainer>
                        }

                      </ImagePreview>
                    )) : null
                }
              </>
            }

          </Conatiner2>
          <ButtonContainer>
            {isUpdate && !isImageSelected &&
              <UpdateButton disabled={activeUploadButton} onClick={handleUpdateFolder}>
                Update
              </UpdateButton>}

            {
              isImageSelected && !isUpdate &&
              <DeleteButton disabled={selectedFolderImages.length === 0} onClick={() => setDeleteModal(true)}>
                Delete {selectedFolderImages.length !== 0 ? `(${selectedFolderImages.length})` : null}
              </DeleteButton>
            }


          </ButtonContainer>
        </PageBoady>
      }
    </PageConatiner>

  )
}

export default UpdateFolderPage



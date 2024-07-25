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
import { removeCurrentFolder } from '../../../../Redux/Slice/Dashboard/AlbumSlice';
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
   max-height: 400px;
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
const LoadingPreviewConatiner = styled.div`
height: 50px;
width: 50px;
border:1px solid gray;
`
const PreviewImage = styled.img`
height:100px;
width:100px;
border-radius: 4px;
border: 0.5px solid #d1d1d1;
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
  text-align: center;

height:19px;
width:21px;
`;
const CancleIcon = styled.img`
height:16px;
margin-top:3px;
margin-right:1px;
width:14px;
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
width:100%;
display:flex;
align-items: center;
justify-content: center;
bottom: 30px;
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

 width:98%;

 margin-top:40px;
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
let urls: string[] = [];
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
  const [previewImageUrl, setPreviewImageUrl] = useState<string[]>([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [discardPopup, setDiscardPopup] = useState(false);
  const [displayedImages, setDisplayImages] = useState<{ id: number, project_id: number, image: string, media_type: number }[]>([])
  const navigate = useNavigate();
  useEffect(() => {
    console.log(urls);
    if (!currentFolder) {
      navigate(-1);

    } else {
      setFolder(currentFolder)
      setNewFolderImages([]);
      setFolderName(currentFolder.name);
      setFolderImages(currentFolder.images);
      setDisplayImages(currentFolder.images.slice(0, 40))
      setSelectedFolderImages([])
      setPreviewImageUrl([]);
    }

  }, [currentFolder]);
  useEffect(() => {
    if (isError && error && error.message) {
      showErrorToast(error.message)
    }
    return () => {
      setPreviewImageUrl([])
    }

  }, [isError, error]);

  useEffect(() => {

    isUploadActiveButton();
  }, [newFolderImages, folderName])
  useEffect(() => {
    // // console.log("calling ++++")
    if (isFolderChange && currentFolder) {

      setSelectedFolderImages([])
      setIsUpdate(false);
      setIsImageSelected(false);
      setNewFolderImages([]);
      dispatch(getSingleFolderAPI({ folder_id: currentFolder?.id }))
    }
  }, [isFolderChange])
  useEffect(() => {
    return () => {
      urls.forEach(link => URL.revokeObjectURL(link))
    }
  }, [])

  const blobToFile = (blob: Blob, fileName: string): File => {
    return new File([blob], fileName, { type: blob.type });
  };

  const compressImage = async (file: File): Promise<Blob> => {
    const options = {
      maxSizeMB: 2,          // Maximum size in MB
      maxWidthOrHeight: 1920, // Max width or height
      useWebWorker: false      // Use web worker for faster compression
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
    // // console.log("calling")
    const files = event.target.files;
    if (!files) return;
    if (files.length + newFolderImages.length > 100) {
      showErrorToast('You can only select up to 100 images at a time.');
      return;
    }
    setCompresedImageLoading(true);
    const acceptedFiles = Array.from(files);
    // // console.log(acceptedFiles);

    const compressedFiles = await Promise.all(
      acceptedFiles.map(async (file) => {

        try {
          if (file.size / 1024 / 1024 > 3) {

            const compressedBlob = await compressImage(file);
            const compressedFile = blobToFile(compressedBlob, file.name);
            // // console.log("compressed")
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
    let previewURL = validCompressedFiles.map(file => URL.createObjectURL(file))
    setPreviewImageUrl(pre => {
      urls = [...pre, ...previewURL]
      return [...pre, ...previewURL]
    })

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
    console.log(newFolderImages.length)
    formData.append('project_id', `${folder?.project_id}`)
    if (folder)
      dispatch(updateFolderAPI({ project_id: folder.project_id, id: folder?.id, folder_name: folder.name, folderImages: newFolderImages }));
    // formData.append('folder_id', `${folder?.id}`);
    // if (folderName)
    //   formData.append('folder_name', folderName);
    // else
    //   formData.append('folder_name', `${folder?.name}`);
    // newFolderImages.forEach((image, index) => {
    //   formData.append(`media[${index}][image]`, image);
    //   formData.append(`media[${index}][media_type]`, "1");
    // })

  }
  const deleteFolderImages = () => {
    dispatch(deleteFolderImagesAPI({ media_ids: selectedFolderImages }));

    setDeleteModal(false);
  }
  const SelectCheckbox = () => {
    // // console.log(isImageSelected)
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
      // // console.log(selectedFolderImages)
    }
  }
  const ImageUploadCheck = () => {
    if (isImageSelected) {
      if (selectedFolderImages.length > 0) {
        setDiscardPopup(true);
      } else {
        setIsImageSelected(false);
        if (fileInputRef.current)
          fileInputRef.current.value = '';
        fileInputRef?.current?.click()
        setIsUpdate(true);

      }
    } else {
      if (fileInputRef.current)
        fileInputRef.current.value = '';
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
  const loadMoreImages = () => {
    const currentLength = displayedImages.length;
    if (folderImages && currentLength < folderImages.length) {
      console.log("called", currentLength)
      const moreImages = folderImages.slice(currentLength, currentLength + 40);
      setDisplayImages([...displayedImages, ...moreImages]);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      loadMoreImages()
    }
  };
  return (
    <PageConatiner>
      {discardPopup && <DiscardPopUp cancel={() => setDiscardPopup(false)} Delete={() => DiscardAllChanges()} />}
      <PageHeader>
        <BackIcon src={BackIconPNG} onClick={() => navigate(-1)} />
        <BackText onClick={() => navigate(-1)}>Back</BackText>
      </PageHeader>

      <PageBoady>
        <Conatiner1>
          {deletModal && <DeletePopup buttonText='Delete' cancel={() => setDeleteModal(false)} Delete={() => deleteFolderImages()} text={'Are you sure you want to remove from favorites?'} />}
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
        <Conatiner2 onScroll={handleScroll}>
          <ImageUploadContainer onClick={() => { if (!compresedImageLoading) ImageUploadCheck() }}>
            {
              compresedImageLoading ?
                <LoadingDots /> :
                <>
                  <DefaultImage src={AddImageIconPNG} alt="Click to upload" />
                  <AddImageLabel>{compresedImageLoading ? 'Please Wait...' : "Add Images"}</AddImageLabel>
                </>
            }
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
          {compresedImageLoading ? null :
            <>{
              newFolderImages.map((file, index) => (
                <ImagePreview key={index}>
                  <PreviewImage src={previewImageUrl[index]} alt="preview" />
                  <RemoveButtonConatiner onClick={() => handleRemoveImage(index)}>
                    <CancleIcon src={CancleIconPNG} />
                  </RemoveButtonConatiner>
                </ImagePreview>
              ))
            }</>


          }
          {
            folderImages && folderImages.length !== 0 && displayedImages.length !== 0 ?
              displayedImages.map((image, index) => (
                <ImagePreview key={index} onClick={() => { if (isImageSelected) handleSelectedImage(image.id, image.image) }}>
                  <PreviewImage src={image.image} alt="preview" loading='lazy' />
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

        </Conatiner2>
        <ButtonContainer>
          {folderLoading ? <LoadingContainer><LoadingDots /> </LoadingContainer> :
            <>
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
            </>


          }
        </ButtonContainer>
      </PageBoady>
    </PageConatiner>

  )
}

export default UpdateFolderPage



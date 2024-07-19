import React, { useEffect, useRef, useState, useCallback } from 'react'
import styled from 'styled-components'
import imageCompression from 'browser-image-compression'
import LazyLoad from 'react-lazyload'
import { showSuccessToast, showErrorToast } from './../../Utlis/Toast'
import HeaderIconPNG from '../../../../assets/Icons/SingleAlbum/addFolderIcon.png'
import AddImageIconPNG from '../../../../assets/Icons/SingleAlbum/addImage.png'
import SubmitButton from '../../Login/SubmitButton'
import UnderLine from '../../Login/UnderLine'
import { NewFolder } from '../../../../Data/album.dto'
import CancleIconPNG from '../../../../assets/Icons/SingleAlbum/cancleIcon.png'
import LoadingDots from '../../Utlis/LoadinDots'

interface AddFolderModalProps {
  isOpen: boolean
  onRequestClose: () => void
  onSubmit: (folder: NewFolder) => void
  currentFolder: NewFolder | null
  imageLimit: number
  setCurrentFolder: (data: NewFolder | null) => void

  totalFoldersLength: number;
}

const AddFolderModal: React.FC<AddFolderModalProps> = ({
  isOpen,
  onRequestClose,
  onSubmit,
  imageLimit,
  totalFoldersLength,
  currentFolder,
  setCurrentFolder,
}) => {
  const [folderName, setFolderName] = useState('')
  const [newFolderImages, setNewFolderImages] = useState<File[]>([])
  const [limit, setLimit] = useState(20);
  const [folderId, setFolderId] = useState<number>(-1)
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [compressedImageLoading, setCompressedImageLoading] = useState(false)
  const [isUpdate, setIsUpDate] = useState(false);

  useEffect(() => {
    // console.log(imageLimit)
    setLimit(imageLimit);
    if (currentFolder) {
      setIsUpDate(true);
      setFolderName(currentFolder.name)

      setFolderId(currentFolder.id)
      setNewFolderImages(currentFolder.images.map((image) => image.image))
      setImageUrls(
        currentFolder.images.map((image) => URL.createObjectURL(image.image)),
      )
    } else {
      setFolderName('')
      setFolderId(totalFoldersLength + 1)
      setIsUpDate(false)
      setNewFolderImages([])
    }

    return () => {
      setCurrentFolder(null)

      // Revoke all object URLs when the modal is closed
      imageUrls.forEach((url) => URL.revokeObjectURL(url))
      setImageUrls([])
    }
  }, [isOpen])

  const blobToFile = (blob: Blob, fileName: string): File => {
    return new File([blob], fileName, { type: blob.type })
  }

  const compressImage = async (file: File): Promise<Blob> => {
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    }

    try {
      const compressedBlob = await imageCompression(file, options)
      return compressedBlob
    } catch (error) {
      console.error('Error compressing image:', error)
      throw error
    }
  }

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files
    if (!files) return

    const acceptedFiles = Array.from(files)
    const batchSize = 5
    let compressedFiles: File[] = []
    if (newFolderImages.length + acceptedFiles.length > 20)
      showErrorToast('You can upload max 20 images at once.')
    else if (acceptedFiles.length > limit)
      showErrorToast('You can upload max 20 while creating album.')
    else {
      setCompressedImageLoading(true)

      for (let i = 0; i < acceptedFiles.length; i += batchSize) {
        const batch = acceptedFiles.slice(i, i + batchSize)
        const compressedBatch = await Promise.all(
          batch.map(async (file) => {
            try {
              if (file.size / 1024 / 1024 > 3) {
                const compressedBlob = await compressImage(file)
                const compressedFile = blobToFile(compressedBlob, file.name)
                return compressedFile
              } else {
                return file
              }
            } catch (error) {
              console.error('Error compressing file:', error)
              showErrorToast('Error compressing file')
              return undefined
            }
          }),
        )
        compressedFiles = [
          ...compressedFiles,
          ...compressedBatch.filter((file): file is File => file !== undefined),
        ]
      }

      setCompressedImageLoading(false)

      setNewFolderImages((prev) => [...prev, ...compressedFiles])
      setLimit(pre => pre - compressedFiles.length);
      const newUrls = compressedFiles.map((file) => URL.createObjectURL(file))
      setImageUrls((prev) => [...prev, ...newUrls])
    }
  }

  const handleRemoveImage = (index: number) => {
    URL.revokeObjectURL(imageUrls[index])
    setNewFolderImages((prev) => prev.filter((_, i) => i !== index))
    setImageUrls((prev) => prev.filter((_, i) => i !== index))
  }

  const handleCreateFolder = () => {
    if (!folderName.trim()) {
      showErrorToast('Folder name cannot be empty.')
      return
    }

    const folder: NewFolder = {
      name: folderName,
      id: folderId,
      images: newFolderImages.map((file) => ({
        image: file,
        image_blob: URL.createObjectURL(file),
        media_type: 1,
      })),
    }
    onSubmit(folder)
    onRequestClose()
    setFolderName('')
    setNewFolderImages([])
  }

  if (!isOpen) {
    return null
  }

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <HeaderIconContainer>
            <HeaderIcon src={HeaderIconPNG} />
          </HeaderIconContainer>
          <HeaderText>Create Folder</HeaderText>
        </ModalHeader>
        <ModalBody>
          <InputContainer>
            <InputLabel>Folder's Name</InputLabel>
            <InputName
              type="text"
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Engagement Photos"
              value={folderName}
            />
            <UnderLine width={830} />
          </InputContainer>
          <PhotoContainer>
            <LabelContainer>

              <PhotoLabel>Photos</PhotoLabel>
              {imageLimit === 0 && (
                <Span>You can upload max 20 images while creating album.</Span>
              )}
            </LabelContainer>

            <ImageContainer>
              {imageLimit !== 0 && (
                <ImageUploadContainer
                  onClick={() => {
                    if (fileInputRef.current) fileInputRef.current.value = ''
                    fileInputRef?.current?.click()
                  }}
                >
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
              )}
              {compressedImageLoading ? (
                <LoadingDots />
              ) : (
                <>
                  {newFolderImages.map((file, index) => (
                    <LazyLoad height={100} offset={100} key={index}>
                      <ImagePreview>
                        <PreviewImage src={imageUrls[index]} alt="preview1" />
                        <RemoveButtonContainer
                          onClick={() => handleRemoveImage(index)}
                        >
                          <CancelIcon src={CancleIconPNG} />
                        </RemoveButtonContainer>
                      </ImagePreview>
                    </LazyLoad>
                  ))}
                </>
              )}
            </ImageContainer>
          </PhotoContainer>
        </ModalBody>
        <ButtonContainer>
          <SubmitButton
            text={isUpdate ? 'Update' : 'Create'}
            width={200}
            height={56}
            needArrow={false}
            onClick={() => handleCreateFolder()}
            active={!(folderName.length > 0)}
          />
          <CancelButton onClick={onRequestClose}> Cancel</CancelButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  )
}

export default AddFolderModal

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
  padding: 10px;
`

const ModalContent = styled.div`
  position: relative;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 834px;
  height: 100%;
  max-height: 788px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 1rem;
    max-width: 90%;
    max-height: 80%;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    max-width: 100%;
    max-height: 100%;
  }
`

const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const HeaderIconContainer = styled.div`
  width: 82px;
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #a720b926;
  border-radius: 50%;
`

const HeaderText = styled.p`
  font-family: Urbanist;
  font-size: 25px;
  font-weight: 700;
  line-height: 30px;
  text-align: center;
`

const HeaderIcon = styled.img`
  width: 61px;
  height: 61.04px;
  cursor: pointer;
`

const PhotoContainer = styled.div`
  margin-top: 30px;
  min-height: 400px;
`

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const InputLabel = styled.label`
  font-family: Urbanist;
  font-size: 19px;
  font-weight: 500;
  line-height: 18px;
  text-align: left;
  margin-bottom: 10px;
`

const InputName = styled.input`
  border: none;
  height: 35px;
  &:focus {
    outline: none;
  }
`

const PhotoLabel = styled.label`
  text-align: left;
  font-family: Urbanist;
  font-size: 19px;
  font-weight: 500;
  line-height: 18px;
  text-align: left;
  color: #424242;
`

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
`

const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px dashed #ccc;
  border-radius: 8px;
  background: #0000000d;

  cursor: pointer;
  width: 99px;
  height: 99px;
  border-radius: 19px;
`

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
`

const ImagePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`

const ImagePreview = styled.div`
  position: relative;
`

const PreviewImage = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 4px;
`

const RemoveButtonContainer = styled.div`
      position: absolute;
    top: 4px;
    right: 4px;
    color: white;
    border: none;
    border-radius: 132px;
    cursor: pointer;
    background: #ff3333;
    box-shadow: 0px 4px 14px 0px #00000080;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 19px;
    width: 19px;
`

const CancelIcon = styled.img`
  height: 16px;
  width: 14px;
  margin-top: 4px;
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    font-size: 22px;
  }
`

const CancelButton = styled.button`
  width: 200px;
  border: none;
  border-radius: 16px 16px 16px 16px;
  font-family: Urbanist, sans-serif;
  font-size: 22px;
  font-weight: 600;
  line-height: 19.2px;
  text-align: center;
  height: 56px;
  color: #ffffff;
  background-color: #bcbaba;
  color: black;
  margin-left: 30px;
  cursor: pointer;
`
const Span = styled.span`
font-family: Urbanist, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 15.2px;
  text-align: Left;

`
const LabelContainer = styled.div`
display:flex;
flex-direction: column;
align-items: baseline;
`
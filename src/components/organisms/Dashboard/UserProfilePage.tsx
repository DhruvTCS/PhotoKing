import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import imageCompression from 'browser-image-compression'
import UnderLine from '../../atoms/Login/UnderLine'
import DefaultImagePNG from '../../../assets/images/DefaultProfilePic.png'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../Redux/Hooks'
import BackButtonIconPNG from '../../../assets/Icons/SingleAlbum/back.png'
import UseIconPNG from '../../../assets/Icons/Member/memberDpIcon.png'
import PhoneIconPNg from '../../../assets/Icons/phone.svg'
import InputComponent from '../../atoms/Login/InputComponent'
import SubmitButton from '../../atoms/Login/SubmitButton'
import UserNameIconPNG from '../../../assets/Icons/SignupPage/name.png'
import EmailIconPNG from '../../../assets/Icons/SignupPage/email.png'
import FaceBookIconPNG from '../../../assets/Icons/SocialMedia/facebookIcon.png'
import InstaIconPNG from '../../../assets/Icons/SocialMedia/instaIcon.png'
import WebsiteIconPNG from '../../../assets/Icons/SocialMedia/websiteIcon.png'
import YoutubeIconPNG from '../../../assets/Icons/SocialMedia/youtubeIcon.png'
import { getBusinessDetailsAPI, updateUserDetailsAPI, verifyEmailLinkAPI } from '../../../Redux/ApiCalls/Auth/user'
import Errortext from '../../atoms/Utlis/Errortext'
import LoadingDots from '../../atoms/Utlis/LoadinDots'
const UserProfilePage: React.FC = () => {
    const { user, SocialLinks, isSocialChanged, loading } = useAppSelector((state) => state.auth)
    const [profileImage, setProfileImage] = useState('')
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userContact, setUserContact] = useState('')
    const [imagePreview, setImagePreview] = useState('')
    const [userWebsite, setUserWebsite] = useState<string>()
    const [userInsta, setUserInsta] = useState<string>()
    const [userFacebook, setUserFacebook] = useState<string>()
    const [userYoutube, setUserYoutube] = useState<string>()
    const [dataChange, setDataChange] = useState(false)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [showError, setShowError] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (user) {
            setUserName(user.name)
            setUserEmail(user.email)
            setUserContact(user.phone_number)
            if (user.image) setImagePreview(user.image)
        }
        if (Object.keys(SocialLinks).length > 0) {
            if (SocialLinks.website) setUserWebsite(SocialLinks.website)
            if (SocialLinks.facebook_link) setUserFacebook(SocialLinks.facebook_link)
            if (SocialLinks.insta_link) setUserInsta(SocialLinks.insta_link)
            if (SocialLinks.youtube_link) setUserYoutube(SocialLinks.youtube_link)
        }
    }, [user, SocialLinks])

    useEffect(() => {
        if (isSocialChanged) {
            dispatch(getBusinessDetailsAPI())
        }
    }, [isSocialChanged])

    useEffect(() => {
        console.log("callinmg data change")
        if (isDataChange() || isInstaChange() || isWebsiteChange() || isFaceBookChange() || isYoutubeChange() || selectedImage !== null) {
            setDataChange(true);
        } else {
            setDataChange(false);
        }

    }, [userWebsite, userFacebook, userInsta, userYoutube, userName, userEmail, selectedImage])

    const blobToFile = (blob: Blob, fileName: string): File => {
        return new File([blob], fileName, { type: blob.type })
    }
    const handleDivClick = () => {
        fileInputRef.current?.click()
    }
    const compressImage = async (file: File): Promise<Blob> => {
        const options = {
            maxSizeMB: 1, // Maximum size in MB
            maxWidthOrHeight: 1920, // Max width or height
            useWebWorker: false, // Use web worker for faster compression
        }

        try {
            const compressedBlob = await imageCompression(file, options)
            return compressedBlob
        } catch (error) {
            console.error('Error compressing image:', error)
            throw error
        }
    }
    const handleImageChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        // console.log(event.target.files)
        if (event.target.files && event.target.files[0]) {
            let file = event.target.files[0]

            if (file.size / 1024 / 1024 > 2) {
                const compressedBlob = await compressImage(file) // Your image compression function
                file = blobToFile(compressedBlob, file.name)
                // console.log(file);
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onloadend = () => {
                    // setAlbum({ ...album, image: file });
                    setSelectedImage(file)

                    setImagePreview(reader.result as string)
                }
            } else {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onloadend = () => {
                    // setAlbum({ ...album, image: file });
                    setSelectedImage(file)
                    setImagePreview(reader.result as string)
                }
            }
        }
    }
    const onChangeData = (name: string, value: string) => {
        if (name === 'name') {
            if (value.length < 25) setUserName(value)
        }
        else if (name === "email") {
            if (value.length < 25) setUserEmail(value)
        } else if (name === 'email') {
            if (true) setUserEmail(value)
        } else if (name === 'website') {
            setUserWebsite(value)
        } else if (name === 'insta') {
            setUserInsta(value)
        } else if (name === 'facebook') {
            setUserFacebook(value)
        } else if (name === 'youtube') {
            setUserYoutube(value)
        }
    }

    function isValidURL(url: string) {
        const pattern = new RegExp(
            '^(https?:\\/\\/)?' + // protocol
            "((([a-zA-Z0-9$_.+!*',;?&=-]|%[0-9a-fA-F]{2})+:)*([a-zA-Z0-9$_.+!*',;?&=-]|%[0-9a-fA-F]{2})+@)?" + // username:password@
            '((\\[(|((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))\\])|' + // IP address
            "(([a-zA-Z0-9$_.+!*',;?&=-]|%[0-9a-fA-F]{2})+\\.)*[a-zA-Z0-9](([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\\.)+" + // subdomain
            '[a-zA-Z0-9-]{2,63}\\.?)' + // domain name
            '(:\\d{1,5})?' + // port
            "(\\/([a-zA-Z0-9$_.+!*',;:@&=-]|%[0-9a-fA-F]{2})*)*" + // path
            "(\\?[a-zA-Z0-9$_.+!*',;:@&=-]*(\\([a-zA-Z0-9$_.+!*',;:@&=-]|%[0-9a-fA-F]{2})*\\))*" + // query string
            "(#([a-zA-Z0-9$_.+!*',;:@&=-]|%[0-9a-fA-F]{2})*)?$",
            'i',
        ) // fragment locator

        return pattern.test(url)
    }
    const isDataChange = () => {
        if (userName !== user?.name || userEmail !== user?.email) return true
        else return false
    }
    const isValidEmail = (value: string) => {
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (value.match(validRegex)) return true;
        else return false;
    }
    const isValidData = (name: string) => {
        if (name == "name") {
            if (userName.length > 0) return true
            else return false
        } else if (name === "email") {
            if (userEmail.length > 0 && isValidEmail(userEmail)) return true;
            else return false;
        } else if (name === "website") {
            if (userWebsite && userWebsite.length > 0 && isValidURL(userWebsite)) return true
            else return false

        } else if (name === "insta" && userInsta) {
            if (userInsta && userInsta.length > 0 && isValidURL(userInsta)) return true
            else return false

        } else if (name === "facebook" && userFacebook) {
            if (userFacebook && userFacebook.length > 0 && isValidURL(userFacebook)) return true
            else return false

        } else if (name === "youtube" && userYoutube) {
            if (userYoutube && userYoutube.length > 0 && isValidURL(userYoutube)) return true
            else return false

        } else return true;
    }

    // const isSocialChange = () => {
    //     if (
    //         (SocialLinks.website && SocialLinks.website !== userWebsite) ||
    //         (SocialLinks.facebook_link && SocialLinks.facebook_link !== userInsta) ||
    //         (SocialLinks.insta_link && SocialLinks.insta_link !== userInsta) ||
    //         (SocialLinks.youtube_link && SocialLinks.youtube_link !== userYoutube)
    //     ) {
    //         return true;
    //     }
    //     else return false;
    // }

    const isWebsiteChange = () => {
        if (SocialLinks.website) {
            if (SocialLinks.website !== userWebsite) return true;
            else return false;
        } else {
            if (userWebsite && userWebsite.length > 0) return true;
            else return false;
        }
    }
    const isInstaChange = () => {
        if (SocialLinks.insta_link) {
            if (SocialLinks.insta_link !== userInsta) return true;
            else return false;
        } else {
            if (userInsta && userInsta.length > 0) return true;
            else return false;
        }
    }
    const isFaceBookChange = () => {
        if (SocialLinks.facebook_link) {
            if (SocialLinks.facebook_link !== userFacebook) return true;
            else return false;
        } else {
            if (userFacebook && userFacebook.length > 0) return true;
            else return false;
        }
    }
    const isYoutubeChange = () => {
        if (SocialLinks.youtube_link) {
            if (SocialLinks.youtube_link !== userYoutube) return true;
            else return false;
        } else {
            if (userYoutube && userYoutube.length > 0) return true;
            else return false;
        }
    }

    function handleSubmit(): void {
        if (isValidData("name") && isValidData("youtube") && isValidData("email") && isValidData("insta") && isValidData("facebook") && isValidData("website")) {
            const formData = new FormData();

            formData.append("name", userName)
            if (userEmail !== user?.email)
                formData.append("email", userEmail)
            if (userWebsite)
                formData.append("website", userWebsite)
            if (userInsta)
                formData.append("insta_link", userInsta)
            if (userFacebook)
                formData.append("facebook_link", userFacebook)
            if (userYoutube)
                formData.append("youtube_link", userYoutube)
            if (selectedImage)
                formData.append("image", selectedImage)

            dispatch(updateUserDetailsAPI(formData))

        } else {
            setShowError(true);
        }
    }

    const handleVerifyEmail = (email: string) => {
        console.log(email)
        dispatch(verifyEmailLinkAPI({ email }))
    }
    if (!user)
        return null;
    return (
        <Container>
            <BackButtonContainer>
                <BackButtonIcon src={BackButtonIconPNG} onClick={() => navigate(-1)} />
                <BackButtonText>Profile</BackButtonText>
            </BackButtonContainer>
            <BodyContainer>
                <ImageContainer onClick={handleDivClick}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                    />
                    <UserImage
                        src={
                            imagePreview && imagePreview.length > 0
                                ? imagePreview
                                : DefaultImagePNG
                        }
                    />
                    <ImageIconContainer>
                        <AddUserIcon src={UseIconPNG} />
                    </ImageIconContainer>
                </ImageContainer>
                <DataContainer>
                    <InputContainer>
                        <InputDataContainer>
                            <Label>Name</Label>
                            <InputDiv>
                                <InputIcon src={UserNameIconPNG} />
                                <Input
                                    value={userName}
                                    onChange={(e) => onChangeData('name', e.target.value)}
                                />
                            </InputDiv>
                        </InputDataContainer>
                        <UnderLine width={99} isPercent={true} />
                        <Errortext message='Please provide valid name' show={showError && !isValidData("name")} />
                    </InputContainer>
                    <InputContainer>
                        <InputDataContainer>
                            <LabelContainer>

                                <Label>Email </Label>
                                <VerifyButton onClick={() => handleVerifyEmail(user.email)}>{user?.is_email_verified ? `Verified` : 'Verify Email'}</VerifyButton>
                            </LabelContainer>
                            <InputDiv>
                                <InputIcon src={EmailIconPNG} />
                                <Input value={userEmail} onChange={(e) => onChangeData('email', e.target.value)} />
                            </InputDiv>
                        </InputDataContainer>
                        <UnderLine width={100} isPercent={true} />
                        <Errortext message='Please provide valid email' show={showError && !isValidData("email")} />
                    </InputContainer>
                    {/* <InputContainer>
                        <InputDataContainer>
                            <Label ></Label>

                            <Input value={userName} />

                        </InputDataContainer>
                        <UnderLine width={100} isPercent={true} />

                    </InputContainer> */}
                    <PhoneContainer>
                        <InputFields>
                            <Label htmlFor="contactNo">Phone Number</Label>
                            <InputContainerContact>
                                <CountryCodeContainer>
                                    <CountryCode>
                                        <PhoneImage src={PhoneIconPNg} />
                                        <CountryCodeText>
                                            <InputComponent
                                                id="countryCode"
                                                width={60}
                                                value={'+91'}
                                                onChange={() => console.log('phone number')}
                                                name="countryCode"
                                                placeholder=""
                                                type="text"
                                                readOnly={true}
                                            />
                                        </CountryCodeText>
                                    </CountryCode>
                                    <UnderLine width={80} />
                                </CountryCodeContainer>

                                <InputContact>
                                    <InputComponent
                                        id="contactNo"
                                        width={370}
                                        value={userContact}
                                        onChange={(e) => console.log('')}
                                        name="contact"
                                        placeholder="123456789"
                                        type="number"
                                        readOnly={true}
                                    />
                                    <UnderLine width={402} />
                                </InputContact>
                            </InputContainerContact>
                        </InputFields>
                    </PhoneContainer>
                    <InputContainer>
                        <InputDataContainer>
                            <Label>Website</Label>
                            <InputDiv>
                                <InputIcon src={WebsiteIconPNG} />
                                <Input
                                    value={userWebsite}
                                    onChange={(e) => onChangeData('website', e.target.value)}
                                />
                            </InputDiv>
                        </InputDataContainer>
                        <UnderLine width={99} isPercent={true} />
                        <Errortext message='Please provide valid website link' show={showError && !isValidData("website")} />
                    </InputContainer>
                    <InputContainer>
                        <InputDataContainer>
                            <Label>Instagram</Label>
                            <InputDiv>
                                <InputIcon src={InstaIconPNG} />
                                <Input
                                    value={userInsta}
                                    onChange={(e) => onChangeData('insta', e.target.value)}
                                />
                            </InputDiv>
                        </InputDataContainer>
                        <UnderLine width={99} isPercent={true} />
                        <Errortext message='Please provide valid instagram link' show={showError && !isValidData("insta")} />
                    </InputContainer>
                    <InputContainer>
                        <InputDataContainer>
                            <Label>Facebook</Label>
                            <InputDiv>
                                <InputIcon src={FaceBookIconPNG} />
                                <Input
                                    value={userFacebook}
                                    onChange={(e) => onChangeData('facebook', e.target.value)}
                                />
                            </InputDiv>
                        </InputDataContainer>
                        <UnderLine width={99} isPercent={true} />
                        <Errortext message='Please provide valid facebook' show={showError && !isValidData("facebook")} />
                    </InputContainer>
                    <InputContainer>
                        <InputDataContainer>
                            <Label>YouTube</Label>
                            <InputDiv>
                                <InputIcon src={YoutubeIconPNG} />
                                <Input
                                    value={userYoutube}
                                    onChange={(e) => onChangeData('youtube', e.target.value)}
                                />
                            </InputDiv>
                        </InputDataContainer>
                        <UnderLine width={99} isPercent={true} />
                        <Errortext message='Please provide valid youtube' show={showError && !isValidData("youtube")} />
                    </InputContainer>
                </DataContainer>

                <SubmitButtonContainer>
                    {loading ? <LoadingDots /> :
                        dataChange &&
                        <SubmitButton
                            width={291}
                            text="Submit"
                            needArrow={false}
                            onClick={() => handleSubmit()}
                        />

                    }
                </SubmitButtonContainer>
            </BodyContainer>
        </Container>
    )
}

export default UserProfilePage

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const BackButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 98%;
  margin-left: 30px;
  align-items: center;
`
const BackButtonIcon = styled.img`
  width: 19.6px;
  height: 16.8px;
  color: #171717;
  cursor: pointer;
`

const BackButtonText = styled.p`
  height: 23px;
  font-family: Urbanist, sans-serif;
  font-size: 19px;
  font-weight: 600;
  line-height: 22.8px;
  text-align: left;
  color: #171717;
  margin: 0px;
  margin-left: 11px;
`

const BodyContainer = styled.div`
  width: 96%;
  height: 725px;
  border-radius: 10px;
  background: #ffffffcc;
  margin-top: 20px;
`

const ImageContainer = styled.div`
  margin-top: 30px;
  margin-left: 30px;
  width: 130.42px;
  height: 130.42px;
  position: relative;
  cursor: pointer;
`
const UserImage = styled.img`
  width: 121.42px;
  height: 121.42px;
  border-radius: 50%;
`
const ImageIconContainer = styled.div`
  width: 42.92px;
  height: 42.92px;
  border-radius: 46px;
  background: linear-gradient(360deg, #7a11a1 0%, #c62bc9 100%);
  box-shadow: 0px 4px 18px 0px #a720b966;
  position: absolute;
  left: 82px;
  top: 91px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const AddUserIcon = styled.img`
  width: 21px;
  height: 21px;
`
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 100px;
  padding-right: 30px;
  align-items: baseline;
`

const Input = styled.input`
  background-color: transparent;
  font-family: 'Montserrat';
  font-size: 16px;
  font-weight: 500;
  line-height: 19.5px;
  text-align: left;
  width: 350px;

  border: none;
  &:focus {
    outline: none;
  }

  &::placeholder {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 17.07px;
    text-align: left;
    margin: 0;
    color: black;
  }
`
const JobTypeContainer = styled.div`
  margin-left: 60px;
`
const InputDataContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const DataContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 30px;
  justify-content: space-between;
`
const SubmitButtonContainer = styled.div`
  display: flex;
  align-tems: center;
  justify-content: center;
  margin-top: 30px;
  margin-left: 30px;
`
const InputFields = styled.div`
  text-align: left;
`
const LabelContainer = styled.div`

display:flex;
align-items: baseline;
width: 92%;
justify-content: space-between;
`;

const VerifyButton = styled.button`
background-color:transparent;
border:1px solid #AE2AB1;
border-radius:10px;
color:#AE2AB1;
padding:4px;
cursor:pointer;
font-family: Urbanist, sans-serif;
  font-size: 13px;
  font-weight: 500;
  margin-left:20px;
`;
const Label = styled.label`
  font-family: Urbanist, sans-serif;
  font-size: 15px;
  font-weight: 500;
  line-height: 20px;

  padding-bottom: 10px;
  color: #737373;
`
const InputContainerContact = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`

const CountryCode = styled.div`
  display: flex;
  flex-direction: row;
`
const PhoneImage = styled.img`
  margin-right: 5px;
`

const CountryCodeText = styled.div`
  font-family: Urbanist, sans-serif;
  font-size: 18px;

  line-height: 32px;
  text-align: left;
  color: #292929;
  margin: 0px;
`
const CountryCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const InputContact = styled.div``

const PhoneContainer = styled.div``

const InputIcon = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 15px;
  margin-left: 5px;
`
const InputDiv = styled.div`
  display: flex;
  align-items: center;
`

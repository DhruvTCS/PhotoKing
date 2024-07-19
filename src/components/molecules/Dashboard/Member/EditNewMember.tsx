import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import BackButtonIconPng from '../../../../assets/Icons/SingleAlbum/back.png'
import { useNavigate } from 'react-router-dom';
import DefaultImagePNG from '../../../../assets/images/DefaultProfilePic.png'
import MemberIconPNG from '../../../../assets/Icons/Member/memberDpIcon.png'
import UnderLine from '../../../atoms/Login/UnderLine';
import SubmitButton from '../../../atoms/Login/SubmitButton';
import InputComponent from '../../../atoms/Login/InputComponent';
import phoneIcon from '../../../../assets/Icons/phone.svg'
import { useAppDispatch, useAppSelector } from '../../../../Redux/Hooks';
import { createNewMemberAPI, updateMemberAPI } from '../../../../Redux/ApiCalls/Dashboard/MembersAPI';
import { clearFlagsMembers } from '../../../../Redux/Slice/Dashboard/MemberSlice';
import LoadingDots from '../../../atoms/Utlis/LoadinDots';
import { showErrorToast } from '../../../atoms/Utlis/Toast';

import imageCompression from 'browser-image-compression';
const NewMemberPageContainer = styled.div`
height:100%;
width:100%;
display:flex;
flex-direction:column;
align-items:center;
`;

const BackButtonContainer = styled.div`
display:flex;
flex-direction:row;
width:98%;
margin-left:30px;
align-items:center;

`
const BackButtonIcon = styled.img`
width: 19.6px;
height: 16.8px;
color: #171717;
cursor: pointer;


`;

const BackButtonText = styled.p`
height: 23px;
font-family: Urbanist,sans-serif;
font-size: 19px;
font-weight: 600;
line-height: 22.8px;
text-align: left;
color: #171717;
margin:0px;
margin-left:11px;

`;


const BodyContainer = styled.div`
width: 96%;
height: 530px;
border-radius: 10px;
background: #FFFFFFCC;
margin-top:20px;


`;

const ImageContainer = styled.div`
margin-top:30px;
margin-left:30px;
width: 130.42px;
height: 130.42px;
position: relative;
cursor:pointer;
`;
const MemberImage = styled.img`
width: 121.42px;
height: 121.42px;
border-radius: 50%;
`;
const ImageIconContainer = styled.div`
width: 42.92px;
height: 42.92px;
border-radius: 46px;
background: linear-gradient(360deg, #7A11A1 0%, #C62BC9 100%);
box-shadow: 0px 4px 18px 0px #A720B966;
position:absolute;
left:82px;
top:91px;
display:flex;
align-items: center;
justify-content: center;
`;
const AddMemberIcon = styled.img`
width: 21px;
height: 21px;

`;
const InputContainer = styled.div`
display: flex;
margin-top:80px;
margin-left:40px;
height:100px;
`;

const Input = styled.input`
background-color: transparent;
font-family: "Montserrat";
font-size: 16px;
font-weight: 500;
line-height: 19.5px;
text-align: left;
width:350px;

border:none;
&:focus{
outline:none;
}

&::placeholder{
font-family: "Montserrat",sans-serif;
font-size: 14px;
font-weight: 500;
line-height: 17.07px;
text-align: left;
margin:0;
color:black;
}
`;
const JobTypeContainer = styled.div`
margin-left:60px;
`;
const NameDataContainer = styled.div`

`

const JobTypeSelect = styled.select`
width:475px;
border:none;
background-color: transparent;
font-family: "Montserrat",sans-serif;
font-size: 14px;
font-weight: 500;
line-height: 17.07px;
text-align:left;
&:focus{
outline:none;
}
`
const SelectionOption = styled.option`
font-family: "Montserrat",sans-serif;
font-size: 14px;
font-weight: 500;
line-height: 17.07px;
`
const SubmitButtonContainer = styled.div`
display:flex;
align-tems: center;
justify-content: center;
margin-top:30px;
margin-left:30px;
`
const InputFields = styled.div`
text-align: left;
`
const Label = styled.label`
font-family: Urbanist, sans-serif;
font-size: 15px;
font-weight: 500;
line-height: 20px;

padding-bottom:10px;
color: #737373;
`
const InputContainerContact = styled.div`
display:flex;
flex-direction: row;
margin-top:10px;
`

const CountryCode = styled.div`
display:flex;
flex-direction: row;

`
const PhoneImage = styled.img`

`

const CountryCodeText = styled.div`
font-family: Urbanist, sans-serif;
font-size: 18px;

line-height: 32px;
text-align: left;
color: #292929;
margin:0px;


`
const CountryCodeContainer = styled.div`
display:flex;
flex-direction: column;

`
const InputContact = styled.div`

`


const PhoneContainer = styled.div`
margin-left:42px;
`;
const EditMemberPage: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [jobType, setJobType] = useState<string>('');
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState<File>();
    const [imagePreview, setImagePreview] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [countryCode, setCountryCode] = useState<string>('+91');
    const [contact, setContact] = useState<string>('');
    const [activeButton, setActiveButton] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { loading, isError, success, error, currentMember } = useAppSelector(state => state.member)
    useEffect(() => {

        isValidData();
    }, [selectedImage, name, jobType, contact, countryCode])
    const handleDivClick = () => {

        fileInputRef.current?.click();
    };
    const blobToFile = (blob: Blob, fileName: string): File => {
        return new File([blob], fileName, { type: blob.type });
    };
    const compressImage = async (file: File): Promise<Blob> => {
        const options = {
            maxSizeMB: 1,          // Maximum size in MB
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

    useEffect(() => {
        if (success) {
            navigate('/dashboard/members/all');
        } else if (isError) {
            if (error && error.message) {

                showErrorToast(error.message)

            } else {
                showErrorToast("Something went wrong! Please try again later.")
            }
        }
        return () => {
            dispatch(clearFlagsMembers())
        }

    }, [success, isError, dispatch])
    useEffect(() => {
        if (currentMember) {
            setName(currentMember.name)
            setJobType(currentMember.job_type);
            setContact(currentMember.phone_number);
            setCountryCode(currentMember.country_code);
            setImagePreview(currentMember.profile_image);
        }

    }, [currentMember])
    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.target.files)
        if (event.target.files && event.target.files[0]) {
            let file = event.target.files[0]

            if (file.size / 1024 / 1024 > 2) {

                const compressedBlob = await compressImage(file); // Your image compression function
                file = blobToFile(compressedBlob, file.name);
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
    const isValidData = () => {
        // // console.log("validate calling");
        if (name.length > 0 && jobType.length > 0 && (selectedImage || currentMember?.profile_image) && validatePhoneNumber(contact) && countryCode.length > 0 && countryCode.length <= 4) {
            if (currentMember?.name !== name || currentMember.job_type !== jobType || currentMember.country_code !== countryCode || currentMember.phone_number !== contact || selectedImage)
                setActiveButton(true);
            else
                setActiveButton(false);
        } else
            setActiveButton(false);
    }
    const validatePhoneNumber = (phoneNumber: string): boolean => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phoneNumber);
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('country_code', countryCode);
        formData.append('phone_number', contact);
        formData.append('job_type', jobType);
        formData.append('id', `${currentMember?.id}`)
        formData.append('name', name)
        if (selectedImage)
            formData.append('profile_image', selectedImage);

        dispatch(updateMemberAPI(formData))
    }
    return (
        <NewMemberPageContainer>
            <BackButtonContainer >
                <BackButtonIcon src={BackButtonIconPng} onClick={() => navigate(-1)} />
                <BackButtonText>Update member</BackButtonText>
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
                    <MemberImage src={(imagePreview && imagePreview.length > 0) ? imagePreview : DefaultImagePNG} />
                    <ImageIconContainer >
                        <AddMemberIcon src={MemberIconPNG} />
                    </ImageIconContainer>
                </ImageContainer>
                <InputContainer>
                    <NameDataContainer>
                        <div style={{ "display": "flex" }}>
                            {/* <NameLabel >Name</NameLabel> */}
                            <Input onChange={(e) => { if (e.target.value.length <= 20) setName(e.target.value) }} value={name} placeholder='Name' />
                        </div>
                        <UnderLine width={478} />
                    </NameDataContainer>
                    <JobTypeContainer>
                        <div style={{ "display": "flex" }}>
                            <JobTypeSelect onChange={(e) => { setJobType(e.target.value) }} >
                                {/* <SelectionOption value="Job Type" selected disabled >Job Type</SelectionOption> */}
                                <SelectionOption value="Camera Man" selected={jobType === "Camera Man"}>Camera Man</SelectionOption>
                                <SelectionOption value="Studio Manager" selected={jobType === "Studio Manager"}>Studio Manager</SelectionOption>
                                <SelectionOption value="Studio Owner" selected={jobType === "Studio Owner"}>Studio Owner</SelectionOption>
                            </JobTypeSelect>
                        </div>
                        <UnderLine width={478} />
                    </JobTypeContainer>
                </InputContainer>
                <PhoneContainer>
                    <InputFields>
                        <Label htmlFor="contactNo">Phone Number</Label>
                        <InputContainerContact>
                            <CountryCodeContainer>
                                <CountryCode>
                                    <PhoneImage src={phoneIcon} />
                                    <CountryCodeText >
                                        <InputComponent id="countryCode" width={60} value={countryCode} onChange={(e) => { if (e.target.value.length <= 4) setCountryCode(e.target.value) }} name='countryCode' placeholder='' type='text' />
                                    </CountryCodeText>
                                </CountryCode>
                                <UnderLine width={80} />
                            </CountryCodeContainer>

                            <InputContact>
                                <InputComponent id="contactNo" width={370} value={contact} onChange={(e) => { if (e.target.value.length <= 10) setContact(e.target.value) }} name='contact' placeholder='123456789' type='number' />
                                <UnderLine width={402} />
                            </InputContact>
                        </InputContainerContact>
                    </InputFields>
                </PhoneContainer>
                <SubmitButtonContainer>
                    {loading ? <LoadingDots /> :

                        <SubmitButton width={291} text='Submit' needArrow={false} onClick={() => handleSubmit()} active={!activeButton} />
                    }
                </SubmitButtonContainer>
            </BodyContainer>
        </NewMemberPageContainer>
    )
}

export default EditMemberPage
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
import { uploadToCloudinary1 } from '../../../../Redux/ApiCalls/Cludinary';
import { useAppDispatch, useAppSelector } from '../../../../Redux/Hooks';
import { createNewMemberAPI } from '../../../../Redux/ApiCalls/Dashboard/MembersAPI';
import { clearFlagsMembers } from '../../../../Redux/Slice/Dashboard/MemberSlice';
import LoadingDots from '../../../atoms/Utlis/LoadinDots';
import { showErrorToast, showSuccessToast } from '../../../atoms/Utlis/Toast';
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


`;

const BackButtonText = styled.p`
height: 23px;
font-family: "Urbanist",sans-serif;
font-size: 19px;
font-weight: 600;
line-height: 22.8px;
text-align: left;
color: #171717;
margin:0px;
margin-left:11px;

`;


const BoadyContainer = styled.div`
width: 96%;
height: 530px;
border-radius: 10px;
opacity: 0.7;
background: #FFFFFFCC;
margin-top:20px;


`;

const ImageContainer = styled.div`
margin-top:30px;
margin-left:30px;
width: 130.42px;
height: 130.42px;
position: relative;
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
align-tems: left;
margin-top:30px;
margin-left:30px;
`
const InputFields = styled.div`
text-align: left;
`
const Label = styled.label`
font-family: "Urbanist", sans-serif;
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
font-family: "Urbanist", sans-serif;
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
const CreateNewMemberPage: React.FC = () => {
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
    const { loading, isError, success, error } = useAppSelector(state => state.member)
    useEffect(() => {

        isValidData();
    }, [selectedImage, name, jobType, contact, countryCode])
    const handleDivClick = () => {
        fileInputRef.current?.click();
    };
    useEffect(() => {
        if (success) {
            showSuccessToast("Member added successfully");
            navigate('/dashboard/members/all');
        } else if (isError) {
            if (error && error.message) {

                showErrorToast(error.message)
                // alert(error.message)
            } else {
                showErrorToast("Something went wrong! Please try again later.")
            }
        }
        return () => {
            dispatch(clearFlagsMembers())
        }

    }, [success, isError, dispatch])

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

        }
    };
    const isValidData = () => {
        if (name.length > 0 && jobType.length > 0 && selectedImage && validatePhoneNumber(contact) && countryCode.length > 0 && countryCode.length <= 4) {
            setActiveButton(true);
        } else
            setActiveButton(false);
    }
    const validatePhoneNumber = (phoneNumber: string): boolean => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phoneNumber);
    };
    const sendImageToCloudinary = async () => {
        if (selectedImage) {
            console.log(selectedImage);
            const result = uploadToCloudinary1(selectedImage).then((data) => {
                return data;
            }).catch(err => console.log(err));

            return result;
        }
        return 'false';
    }
    const handleSubmit = () => {
        sendImageToCloudinary().then((data) => {
            if (data)
                dispatch(createNewMemberAPI({ name, phone_number: contact, profile_image: data, country_code: countryCode, job_type: jobType }))

        })
    }
    return (
        <NewMemberPageContainer>
            <BackButtonContainer >
                <BackButtonIcon src={BackButtonIconPng} onClick={() => navigate(-1)} />
                <BackButtonText>Add new member</BackButtonText>
            </BackButtonContainer>
            <BoadyContainer>
                <ImageContainer onClick={handleDivClick}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                    />
                    <MemberImage src={imagePreview.length > 0 ? imagePreview : DefaultImagePNG} />
                    <ImageIconContainer >
                        <AddMemberIcon src={MemberIconPNG} />
                    </ImageIconContainer>
                </ImageContainer>
                <InputContainer>
                    <NameDataContainer>
                        <div style={{ "display": "flex" }}>
                            {/* <NameLabel >Name</NameLabel> */}
                            <Input onChange={(e) => setName(e.target.value)} placeholder='Name' />
                        </div>
                        <UnderLine width={478} />
                    </NameDataContainer>
                    <JobTypeContainer>
                        <div style={{ "display": "flex" }}>
                            <JobTypeSelect onChange={(e) => { setJobType(e.target.value) }} >
                                <SelectionOption value="Job Type" selected disabled >Job Type</SelectionOption>
                                <SelectionOption value="Cemera Man" >Cemera Man</SelectionOption>
                                <SelectionOption value="Studio Manager" >Studio Manager</SelectionOption>
                                <SelectionOption value="Studio Owner" >Studio Owner</SelectionOption>
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
                                        <InputComponent id="countryCode" width={60} value={countryCode} onChange={(e) => setCountryCode(e.target.value)} name='countryCode' placeholder='' type='text' />
                                    </CountryCodeText>
                                </CountryCode>
                                <UnderLine width={80} />
                            </CountryCodeContainer>

                            <InputContact>
                                <InputComponent id="contactNo" width={370} value={contact} onChange={(e) => setContact(e.target.value)} name='contact' placeholder='123456789' type='text' />
                                <UnderLine width={402} />
                            </InputContact>
                        </InputContainerContact>
                    </InputFields>
                </PhoneContainer>
                <SubmitButtonContainer>
                    {loading ? <LoadingDots /> :

                        <SubmitButton width={100} text='Submit' needArrow={false} onClick={() => handleSubmit()} active={!activeButton} />
                    }
                </SubmitButtonContainer>
            </BoadyContainer>
        </NewMemberPageContainer>
    )
}

export default CreateNewMemberPage
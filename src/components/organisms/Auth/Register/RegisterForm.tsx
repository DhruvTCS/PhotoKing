import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import phoneIcon from '../../../../assets/Icons/phone.svg'
import UnderLine from '../../../atoms/Login/UnderLine'
import InputComponent from '../../../atoms/Login/InputComponent'
import { useAppDispatch, useAppSelector } from '../../../../Redux/Hooks'
import { useNavigate } from 'react-router-dom'
import UserNameIcon from '../../../../assets/Icons/SignupPage/name.png'
import EmailIcon from '../../../../assets/Icons/SignupPage/email.png'
import Checkbox from '../../../atoms/Login/Checkbox'
import LoadingDots from '../../../atoms/Utlis/LoadinDots'
import SubmitButton from '../../../atoms/Login/SubmitButton'
import { clearError, setIsRegister, setRemeberMe } from '../../../../Redux/Slice/Auth/AuthSlice'
import { loginUser } from '../../../../Redux/ApiCalls/Auth/login'
import { showErrorToast, showSuccessToast } from '../../../atoms/Utlis/Toast'


const RegisterFormContainer = styled.div`
width: 548px;
height: 637px;
background-color:white;
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;
border: 2px solid #FFFFFF1A;
border-radius: 32px 32px 32px 32px;

`
const Form = styled.form`
display:flex;
flex-direction: column;
`
const UpperBox = styled.div`
width:  ;
height: 8px;
position: absolute;
top:0px;
gap: 0px;
border-radius: 0px 0px 50px 50px;
opacity: 0px;
background: #A720B9;


`

const FormHeading = styled.p`

height: 56px;
position: absolute;
top: 0px;
left:224px;
font-family: "Urbanist", sans-serif;
font-size: 32px;
font-weight: 600;
line-height: 56px;
text-align: center;
`

const SubHeadingText = styled.p`
width: 290px;
height: 16px;
position: absolute;
top:53px;
left:137px;
font-family: "Urbanist", sans-serif;
font-size: 20px;
font-weight: 500;
line-height: 56px;
text-align: center;
`
const InputFields = styled.div`
position: absolute;
top:148px;
left:52px;
`

const EmailContainer = styled.div`
display:flex;
flex-direction: column;

font-family: "Urbanist",sans-serif;
font-size: 15px;
font-weight: 500;
line-height: 20px;
text-align: left;
margin-bottom:20px;

`

const NameContainer = styled.div`
display:flex;
flex-direction: column;
margin-bottom:20px;
font-family: "Urbanist",sans-serif;
font-size: 15px;
font-weight: 500;
line-height: 20px;
text-align: left;


`
const EmailLabel = styled.label`
width: 54px;
height: 20px;
margin-bottom:15px;
font-family: "Urbanist",sans-serif;
font-size: 15px;
font-weight: 500;
line-height: 20px;
text-align: left;


`
const EmailInputContainer = styled.div`
display:flex;
flex-direction: row;
justify-content: center;
align-items: center;
`

const EmailInput = styled.input`
border:none;
width:100%;
margin-left:10px;
font-family: "Urbanist", sans-serif;
font-size: 18px;
font-weight: 600;
line-height: 32px;
text-align: left;
color: #292929;

&::placeholder{
    font-family: "Urbanist", sans-serif;
    font-size: 18px;
    font-weight: 600;
    line-height: 32px;
    text-align: left;
    color: #746b74;
opacity:50%;
}

&:focus{
 outline:none;
}
`
const PhoneContainer = styled.div`
position:relative;

text-align: left;
`
const Icon = styled.img`
width: 20px;
height: 20px;
`
const Label = styled.label`

width: 54px;
height: 20px;
margin-bottom:15px;
font-family: "Urbanist",sans-serif;
font-size: 15px;
font-weight: 500;
line-height: 20px;
`
const InputContainer = styled.div`
display:flex;
flex-direction: row;
position: absolute;
top:35px;
`

const CountryCode = styled.div`
display:flex;
flex-direction: row;

`
const PhoneImage = styled.img`
width: 22px;
height: 22px;
position:absolute;
top:6px;
left:0;
`

const CountryCodeText = styled.div`
font-family: "Urbanist", sans-serif;
font-size: 18px;

line-height: 32px;
text-align: left;
color: #292929;
margin:0px;
position:absolute;
left:30px;

`
const CountryCodeContainer = styled.div`
display:flex;
flex-direction: column;
`
const Input = styled.div`
position:absolute;
top:-5px;
left:130px;
`
const CheckBoxContainer = styled.div`
position:absolute;
bottom:-120px;
display:flex;
flex-direction: row;
align-items: center;
justify-content: center;


`
const CheckBoxLabel = styled.label`
width: 113px;
height: 32px;
font-family: "Urbanist", sans-serif;
font-size: 17px;
font-weight: 600;
line-height: 32px;
text-align: left;
color: #292929;
margin-left:21px;


`
const SubmitButtonContainer = styled.div`
position: absolute;
bottom:-207px;
left:82px;
`
const RegisterForm: React.FC = () => {

    const [isChecked, setIsChecked] = useState(false);
    const [contact, setContact] = useState('')
    const [countryCode, setCountryCode] = useState('+91');
    const [activeButton, setActiveButton] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const { apiStatus, loading, error, isError } = useAppSelector(state => state.auth)
    useEffect(() => {

        if (apiStatus === true) {
            showSuccessToast("Otp sent successfully.")
            navigate('/auth/otp')
        }
        return () => {
            dispatch(clearError())
        }
    }, [navigate, apiStatus])
    useEffect(() => {

        if (isError) {
            if (error.status === 402) {
                alert("Please Register first");
            }
            else if (error.message) {
                showSuccessToast(error.message);
            } else {
                showErrorToast("something went wrong! Please try again.")
            }
        }

        return () => {
            dispatch(clearError());
        }
    }, [isError])

    const handlePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
        setActiveButtonSatus(event.target.value, name, email, countryCode);
        setContact(event.target.value);


    }
    const setActiveButtonSatus = (contact: string, name: string, email: string, country_code: string) => {
        console.log(contact.length === 10 && name.length > 2 && email.length > 6 && country_code.length > 0 && country_code.length <= 4 && validatePhoneNumber(contact))
        console.log("in active button ")
        if (contact.length === 10 && name.length > 2 && email.length > 6 && country_code.length > 0 && country_code.length <= 4 && validatePhoneNumber(contact)) {
            setActiveButton(true);

        } else {
            setActiveButton(false);
        }

    }

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (isChecked) {
            dispatch(setRemeberMe(true));
        }
        dispatch(setIsRegister({ name, phone_number: contact, email, country_code: countryCode }));
        dispatch(loginUser({ phone_number: countryCode + contact }));
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };
    const validatePhoneNumber = (phoneNumber: string): boolean => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phoneNumber);
    };
    return (
        <RegisterFormContainer>
            <UpperBox />
            <Form>
                <FormHeading>Sign Up</FormHeading>
                <SubHeadingText>Enter your details</SubHeadingText>
                <InputFields>
                    <NameContainer >
                        <EmailLabel>Name</EmailLabel>
                        <EmailInputContainer>
                            <Icon src={UserNameIcon}></Icon>
                            <EmailInput type='text' id="name" name="name" placeholder='Photo King' required={true} onChange={(e) => { setName(e.target.value); setActiveButtonSatus(contact, e.target.value, email, countryCode) }} />
                        </EmailInputContainer>
                        <UnderLine width={400} />
                    </NameContainer>
                    <EmailContainer >
                        <EmailLabel>Email ID</EmailLabel>
                        <EmailInputContainer>
                            <Icon src={EmailIcon}></Icon>
                            <EmailInput type='email' id="email" name="email" placeholder='dummyemail@example.com' required={true} onChange={(e) => { setEmail(e.target.value); setActiveButtonSatus(contact, name, e.target.value, countryCode) }} />
                        </EmailInputContainer>
                        <UnderLine width={400} />
                    </EmailContainer>
                    <PhoneContainer>
                        <Label htmlFor="contactNo">Phone Number</Label>
                        <InputContainer>
                            <CountryCodeContainer>
                                <CountryCode>
                                    <PhoneImage src={phoneIcon} />
                                    <CountryCodeText >
                                        <InputComponent id="countryCode" width={60} value={countryCode} onChange={(e) => setCountryCode(e.target.value)} name='countryCode' placeholder='' type='text' />
                                    </CountryCodeText>
                                </CountryCode>
                                <UnderLine width={111} position={{ type: "absolute", top: 30, left: 0 }} />
                            </CountryCodeContainer>

                            <Input>
                                <InputComponent id="contactNo" width={314} value={contact} onChange={handlePhone} name='contact' placeholder='123456789' type='text' />
                                <UnderLine width={314} />
                            </Input>
                        </InputContainer>

                    </PhoneContainer>
                    <CheckBoxContainer>
                        <Checkbox id="checkbox" onChange={handleCheckboxChange} checked={isChecked} />
                        <CheckBoxLabel htmlFor='checkbox'>Remember me</CheckBoxLabel>

                    </CheckBoxContainer>
                    <SubmitButtonContainer >
                        {loading ?


                            <LoadingDots position={{ type: "absolute", top: "-20px", left: "135px" }} />

                            :


                            <SubmitButton onClick={handleSubmit} width={291} text='Send' needArrow={true} active={loading ? true : !activeButton} />
                        }

                    </SubmitButtonContainer>
                </InputFields>
            </Form>
        </RegisterFormContainer>
    )
}

export default RegisterForm
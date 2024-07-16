import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import phoneIcon from '../../../../assets/Icons/phone.svg'
import UnderLine from '../../../atoms/Login/UnderLine'
import Checkbox from '../../../atoms/Login/Checkbox'
import InputComponent from '../../../atoms/Login/InputComponent'
import SubmitButton from '../../../atoms/Login/SubmitButton'
import { useAppDispatch, useAppSelector } from '../../../../Redux/Hooks'
import { useNavigate } from 'react-router-dom'
import { setContactNumber, clearError, setRemeberMe } from '../../../../Redux/Slice/Auth/AuthSlice'
import { loginUser } from '../../../../Redux/ApiCalls/Auth/login'
import LoadingDots from '../../../atoms/Utlis/LoadinDots'
import { showErrorToast, showSuccessToast } from '../../../atoms/Utlis/Toast'


const LoginFormContainer = styled.div`
width: 548px;
height: 537px;
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
width: 227px;
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
top: 37px;
left:238px;
font-family: Urbanist, sans-serif;
font-size: 32px;
font-weight: 600;
line-height: 56px;
text-align: center;
`

const SubHeadingText = styled.p`
width: 290px;
height: 56px;
position: absolute;
top:84px;
left:129px;
font-family: Urbanist, sans-serif;
font-size: 20px;
font-weight: 500;
line-height: 56px;
text-align: center;
`
const InputFields = styled.div`
position: absolute;
top:205px;
left:52px;
`
const Label = styled.label`
font-family: Urbanist, sans-serif;
font-size: 15px;
font-weight: 500;
line-height: 20px;


color: #737373;
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
font-family: Urbanist, sans-serif;
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
position:absolute;
top:14px
`
const Input = styled.div`
position:absolute;
top:10px;
left:130px;
`

const CheckBoxContainer = styled.div`
position:absolute;
top:115px;
display:flex;
flex-direction: row;
align-items: center;
justify-content: center;


`
const CheckBoxLabel = styled.label`
width: 113px;
height: 32px;
font-family: Urbanist, sans-serif;
font-size: 17px;
font-weight: 600;
line-height: 32px;
text-align: left;
color: #292929;
margin-left:21px;


`
const SubmitButtonContainer = styled.div`
position: absolute;
top:190px;
left:82px;
`

const LoginForm: React.FC = () => {

    const [isChecked, setIsChecked] = useState(true);
    const [contact, setContact] = useState('')
    const [countryCode, setCountryCode] = useState('+91');
    const [activeButton, setActiveButton] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { apiStatus, loading, error, isError } = useAppSelector(state => state.auth)


    useEffect(() => {

        if (apiStatus === true) {
            showSuccessToast("OTP sent successfully.")
            navigate('/auth/otp')
        }
        return () => {
            dispatch(clearError())
        }
    }, [navigate, apiStatus])
    useEffect(() => {

        if (isError) {
            if (error) {
                if (error.status === 402) {
                    navigate('/auth/signup')
                } else if (error.status == 401) {

                }
                else if (error && error.message) {
                    showErrorToast(error.message)
                }
            } else {
                // showErrorToast("Something went wrong! Please try again.")
            }
        }

        return () => {
            dispatch(clearError());
        }
    }, [isError])

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 10) {
            setContact(event.target.value);

            if (event.target.value.length === 10) {
                setActiveButton(true);

            } else {
                setActiveButton(false);
            }
        }
    }
    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (validatePhoneNumber(contact)) {
            // console.log(contact);
            // setContact((contact) => );
            if (isChecked) {
                dispatch(setRemeberMe(true));
            }
            dispatch(setContactNumber({ phone_number: contact, countryCode }));
            dispatch(loginUser({ phone_number: countryCode + contact }));

        } else {
            // console.log("invalid phone number");
        }
    }
    const validatePhoneNumber = (phoneNumber: string): boolean => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phoneNumber);
    };
    return (
        <LoginFormContainer>
            <UpperBox />
            <Form>
                <FormHeading>Log In</FormHeading>
                <SubHeadingText>Enter login credential to continue</SubHeadingText>
                <InputFields>
                    <Label htmlFor="contactNo">Phone Number</Label>
                    <InputContainer>
                        <CountryCodeContainer>
                            <CountryCode>
                                <PhoneImage src={phoneIcon} />
                                <CountryCodeText >
                                    <InputComponent id="countryCode" width={60} value={countryCode} onChange={(e) => { if (e.target.value.length <= 4) setCountryCode(e.target.value) }} name='countryCode' placeholder='' type='text' />
                                </CountryCodeText>
                            </CountryCode>
                            <UnderLine width={111} position={{ type: "absolute", top: 30, left: 0 }} />
                        </CountryCodeContainer>

                        <Input>
                            <InputComponent id="contactNo" width={314} value={contact} onChange={handleChange} name='contact' placeholder='123456789' type='number' />
                            <UnderLine width={314} />
                        </Input>
                    </InputContainer>
                    <CheckBoxContainer>
                        <Checkbox id="checkbox" onChange={handleCheckboxChange} checked={isChecked} />
                        <CheckBoxLabel htmlFor='checkbox'>Remember me</CheckBoxLabel>

                    </CheckBoxContainer>
                    <SubmitButtonContainer >
                        {loading ?


                            <LoadingDots position={{ type: "absolute", top: "41px", left: "135px" }} />

                            :


                            <SubmitButton onClick={handleSubmit} width={291} text='Send' needArrow={true} active={loading ? true : !activeButton} />
                        }

                    </SubmitButtonContainer>
                </InputFields>
            </Form>
        </LoginFormContainer>
    )
}

export default LoginForm
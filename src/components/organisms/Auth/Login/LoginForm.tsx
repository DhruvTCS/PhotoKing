import React, { useState } from 'react'
import styled from 'styled-components'
import phoneIcon from '../../../../assets/images/Icons/phone.svg'
import UnderLine from '../../../atoms/Login/UnderLine'
import Checkbox from '../../../atoms/Login/Checkbox'
import InputComponent from '../../../atoms/Login/InputComponent'
import SubmitButton from '../../../atoms/Login/SubmitButton'




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
font-family: "Urbanist", sans-serif;
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
font-family: "Urbanist", sans-serif;
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
font-family: "Urbanist", sans-serif;
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
top:190px;
left:82px;
`

const LoginForm: React.FC = () => {

    const [isChecked, setIsChecked] = useState(false);
    const [contact, setContact] = useState('')
    const [countryCode, setCountryCode] = useState('+91');
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (validatePhoneNumber(contact)) {
            console.log(contact);

        } else {
            console.log("invalid phone number");
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
                                    <InputComponent id="countryCode" width={60} value={countryCode} onChange={(e) => setCountryCode(e.target.value)} name='countryCode' placeholder='' type='text' />
                                </CountryCodeText>
                            </CountryCode>
                            <UnderLine width={111} position={{ type: "absolute", top: 30, left: 0 }} />
                        </CountryCodeContainer>

                        <Input>
                            <InputComponent id="contactNo" width={314} value={contact} onChange={(e) => setContact(e.target.value)} name='contact' placeholder='123456789' type='text' />
                            <UnderLine width={314} />
                        </Input>
                    </InputContainer>
                    <CheckBoxContainer>
                        <Checkbox id="checkbox" onChange={handleCheckboxChange} checked={isChecked} />
                        <CheckBoxLabel htmlFor='checkbox'>Remember me</CheckBoxLabel>

                    </CheckBoxContainer>
                    <SubmitButtonContainer >
                        <SubmitButton onClick={handleSubmit} width={291} text='Submit' needArrow={true} />

                    </SubmitButtonContainer>
                </InputFields>
            </Form>
        </LoginFormContainer>
    )
}

export default LoginForm
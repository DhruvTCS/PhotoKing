import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import InputComponent from '../../atoms/Login/InputComponent';
import UnderLine from '../../atoms/Login/UnderLine';
import { useAppDispatch, useAppSelector } from '../../../Redux/Hooks';
import { changePhoneNumberAPI, chnagePhoneNumberOtpAPI } from '../../../Redux/ApiCalls/Auth/user';
import { showErrorToast, showSuccessToast } from '../../atoms/Utlis/Toast';
import SubmitButton from '../../atoms/Login/SubmitButton';
import Errortext from '../../atoms/Utlis/Errortext';
import { clearError, removeOrderId } from '../../../Redux/Slice/Dashboard/ExtraSlice';
import { setUserPhoneNumber } from '../../../Redux/Slice/Auth/AuthSlice';
import LoadingDots from '../../atoms/Utlis/LoadinDots';

const Conatiner = styled.div`
margin-left:30px;
margin-top:60px;
`;
const ChangePhoneHeader = styled.div``;
const ChangePhonetext = styled.p`
font-family: Urbanist;
font-size: 19px;
font-weight: 600;
line-height: 22.8px;
text-align: left;

`;
const InputContainer = styled.div`
display:flex;
// align-items: center;
flex-wrap: wrap;
justify-content: space-between;
margin-top:50px;
min-height:500px;
`;
const InputFeild = styled.div`
width:30%;
height:100px;
margin-right:20px;
display:flex;
flex-direction: column;
align-items: start;
`;
const Input = styled.input`
border:none;
width:98%;
font-family: Montserrat;
font-size: 16px;
font-weight: 500;
line-height: 25px;
text-align: left;
margin-top:5px;
color: #292929;
&::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

background-color: transparent;
&::placeholder{
font-family: Urbanist, sans-serif;
font-size: 18px;
font-weight: 600;
line-height: 32px;
text-align: left;
color: black;
opacity:50%;
}

&:focus{
 outline:none;
 background-color:transparent;
}
`;
const InputLabel = styled.label`
margin-bottom:10px;
font-family: Montserrat;
font-size: 14px;
font-weight: 500;
line-height: 17.07px;
text-align: left;

`;
const InputContact = styled.p`
display:flex;
align-items:center;
margin:0;
`;
const CountryCode = styled.input`
border:none;
width:12%;
font-family: Montserrat;
font-size: 16px;
font-weight: 500;
line-height: 25px;
text-align: left;
margin-top:5px;
color: #292929;
&::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

background-color: transparent;


&:focus{
 outline:none;
 background-color:transparent;
}
`;
const SubmitButtonContainer = styled.div`
width: 100%;
display:flex;
align-items: center;
justify-content: center;
`;

const ChangePhoneNumber: React.FC = () => {
    const [currentNumber, setCurrentNumber] = useState("+91");
    const [newNumber, setNewNumber] = useState("");
    const [changeNumberButton, setChangeNumberButton] = useState(false);
    const [sendOTPButton, setSendOTPButton] = useState(false);
    const [isSend, setIsSend] = useState(false);
    const [showError, setShowError] = useState(false);
    const [otp, setOtp] = useState("");
    const { loading, isError, error, isPhoneNumberChange, changePhonenumberOrderId } = useAppSelector(state => state.extra)
    const { user } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isError) {
            if (error && error.message) {
                showErrorToast(error.message)
            } else {
                showErrorToast("Something went wrong! Please try again later.")
            }
        }
        else if (isPhoneNumberChange) {
            dispatch(setUserPhoneNumber({ number: newNumber }))
            dispatch(removeOrderId());
        }
    }, [isPhoneNumberChange, isError, error])
    useEffect(() => {
        if (changePhonenumberOrderId) {
            showSuccessToast("OTP sent to +91 " + newNumber);
        }

    }, [changePhonenumberOrderId])
    useEffect(() => {
        validateChangeNumberButton();
        validateSendOtpButton();
    }, [newNumber, otp])
    useEffect(() => {
        if (user) {
            setCurrentNumber(user.phone_number);
            setNewNumber("");
            setOtp("");
            setShowError(false);
        }
        return () => {
            dispatch(removeOrderId());
        }
    }, [user])
    const validateChangeNumberButton = () => {
        if (handleValidateOTP() && validatePhoneNumber()) {
            setChangeNumberButton(true)
        } else
            setChangeNumberButton(false);
    }
    const validateSendOtpButton = () => {
        if (validatePhoneNumber()) {
            setSendOTPButton(true);
        } else
            setSendOTPButton(false);
    }
    const handleValidateOTP = () => {
        if (otp.length === 4)
            return true;
        else
            return false;
    }
    const validatePhoneNumber = (): boolean => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(newNumber);
    };
    const handleSendOTP = () => {
        console.log("click")
        if (!sendOTPButton) {
            setShowError(true);
        } else {
            dispatch(chnagePhoneNumberOtpAPI({ phone_number: "+91" + newNumber }))
            setSendOTPButton(false);
        }
    }
    const handleSubmit = () => {
        if (changePhonenumberOrderId) {

            if (!changeNumberButton) {
                setShowError(true);
            } else {
                dispatch(changePhoneNumberAPI({ new_phone_number: newNumber, new_country_code: "+91", otp, orderId: changePhonenumberOrderId }))
            }
        }
    }

    return (
        <Conatiner>
            <ChangePhoneHeader>
                <ChangePhonetext>
                    Change Phone Number
                </ChangePhonetext>
            </ChangePhoneHeader>
            <InputContainer>
                <InputFeild>

                    <InputLabel>
                        Current Phone Number
                    </InputLabel>
                    <Input readOnly={true} id='current_number' name='current_number' type='text' value={"+91   " + currentNumber} />
                    <UnderLine width={100} isPercent={true} />
                </InputFeild>


                <InputFeild>
                    <InputLabel>
                        New Phone Number
                    </InputLabel>
                    <InputContact>
                        <CountryCode readOnly={true} id='countryCode' name='countryCode' type='text' value={"+91"} />
                        <Input id='new_number' name='current_number' type='number' value={newNumber} onChange={(e) => { if (e.target.value.length <= 10) setNewNumber(e.target.value) }} readOnly={changePhonenumberOrderId ? true : false} />
                    </InputContact>
                    <UnderLine width={100} isPercent={true} />
                    <Errortext show={showError && !validatePhoneNumber()} message={'Provide valid phone number.'} />
                </InputFeild>


                <InputFeild>
                    <InputLabel>
                        OTP
                    </InputLabel>
                    <Input id='current' name='current_number' type='number' value={otp} onChange={(e) => { if (e.target.value.length <= 4 && changePhonenumberOrderId) setOtp(e.target.value) }} />
                    <UnderLine width={100} isPercent={true} />
                    <Errortext show={(changePhonenumberOrderId ? true : false) && showError && !handleValidateOTP()} message={'Provide valid 4 digit OTP.'} />
                </InputFeild>

            </InputContainer>
            <SubmitButtonContainer>
                {loading ? <LoadingDots /> : changePhonenumberOrderId ? <SubmitButton width={291} text='Submit' needArrow={false} onClick={() => handleSubmit()} /> : <SubmitButton width={291} text='Send OTP' needArrow={false} onClick={() => handleSendOTP()} />}



            </SubmitButtonContainer>
        </Conatiner>
    )
}

export default ChangePhoneNumber
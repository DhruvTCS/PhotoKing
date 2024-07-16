import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import SubmitButton from "../../../atoms/Login/SubmitButton";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearError } from "../../../../Redux/Slice/Auth/AuthSlice";
import { resendOTP, verifyOTP } from "../../../../Redux/ApiCalls/Auth/login";
import LoadingDots from "../../../atoms/Utlis/LoadinDots";
import { registerUser } from "../../../../Redux/ApiCalls/Auth/signup";
import { showErrorToast, showSuccessToast } from "../../../atoms/Utlis/Toast";
import { useAppDispatch, useAppSelector } from "../../../../Redux/Hooks";

interface otpTextProps {
  isActivated: boolean;
}

const OtplVerificationFormContainer = styled.div`
  width: 100%;
  max-width: 548px;
  height: auto;
  background-color: white;
  border: 2px solid #ffffff1a;
  border-radius: 32px;
  padding: 20px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormHeading = styled.p`
  font-family: Urbanist, sans-serif;
  font-size: 30px;
  font-weight: 600;
  line-height: 1.5;
  text-align: center;
`;

const SubHeadingText = styled.p`
  width: 100%;
  max-width: 364px;
  font-family: Urbanist, sans-serif;
  font-size: 20px;
  font-weight: 500;
  line-height: 25px;
  text-align: center;
`;

const InputFields = styled.div`
  margin-top: 30px;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const OtpInput = styled.input`
  width: 50px;
  height: 50px;
  margin: 0 10px;
  text-align: center;
  font-size: 24px;
  border: none;
  border-bottom: 1px solid black;

  &:focus {
    border-color: #a720b9;
    outline: none;
  }
`;

const ResendOtpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const ResesndOtpText = styled.p<otpTextProps>`
  font-family: Urbanist, sans-serif;
  font-size: 17px;
  font-weight: 600;
  line-height: 32px;
  color: #a720b9;
  cursor: ${(props) => (props.isActivated ? "pointer" : "default")};
  margin-left: 25px;
  text-decoration: ${(props) => (props.isActivated ? "underline" : "none")};
`;

const Timer = styled.p`
  font-family: Urbanist, sans-serif;
  font-size: 17px;
  font-weight: 600;
  line-height: 32px;
`;

const SubmitButtonContainer = styled.div`
  margin-top: 30px;
`;

const OtplVerificationForm: React.FC = () => {
  const [timer, setTimer] = useState<number>(60);
  const [showResendLink, setShowResendLink] = useState<boolean>(false);
  const [activeButton, setActiveButton] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isError, phone_number, country_code, error, user, isAuthticated, loading, orderId, isRegister, temp_user } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setShowResendLink(true);
    }
  }, [timer]);

  useEffect(() => {
    if (!orderId) {
      navigate('/auth/otp');
    }
    return () => {
      dispatch(clearError());
    };
  }, [orderId]);

  useEffect(() => {
    if (isError) {
      if (error.status === 401) {
        showErrorToast("Please Register first");
      } else if (error.message) {
        showErrorToast(error.message);
      } else {
        showErrorToast("Something went wrong! Please try again later.");
      }
    }
    if (isAuthticated === true && user && Object.keys(user).length !== 0) {
      showSuccessToast("User verified.");
      navigate('/dashboard');
    }
    return () => {
      dispatch(clearError());
    };
  }, [isError, isAuthticated, user]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 4 || otp.some((digit) => !/^\d$/.test(digit))) {
      console.log("Inappropriate OTP value: " + otpValue);
    } else {
      console.log("Submitted OTP:", otpValue);
      if (isRegister) {
        if (temp_user) {
          dispatch(registerUser({
            name: temp_user.name, email: temp_user.email, orderId: orderId, phone_number: temp_user.phone_number, country_code: temp_user.country_code,
            role: 3,
            otp: otpValue
          }));
        }
      } else {
        dispatch(verifyOTP({
          phone_number,
          country_code,
          orderId: orderId,
          otp: otpValue,
        }));
      }
    }
  };

  const handleResendOtp = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.preventDefault();
    console.log("Resend OTP");
    dispatch(resendOTP({ orderId }));
    setTimer(60);
    setShowResendLink(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/^\d$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (newOtp.join('').length === 4) {
        setActiveButton(true);
      }
      if (value !== "" && index < 3) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        let finalIndex = index - 1;
        inputsRef.current[finalIndex].focus();
      }
      setActiveButton(false);
    }
  };

  return (
    <OtplVerificationFormContainer>
      <Form>
        <FormHeading>Verification Code</FormHeading>
        <SubHeadingText>
          Please enter the OTP received via SMS on the mobile number you have provided
        </SubHeadingText>
        <InputFields>
          <InputContainer>
            {otp.map((digit, index) => (
              <OtpInput
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputsRef.current[index] = el!)}
              />
            ))}
          </InputContainer>
          <ResendOtpContainer>
            {showResendLink ? (
              <ResesndOtpText isActivated={true} onClick={handleResendOtp}>
                Resend OTP
              </ResesndOtpText>
            ) : (
              <>
                <ResesndOtpText isActivated={false}>Resend OTP</ResesndOtpText>
                <Timer>00:{timer >= 10 ? timer : `0${timer}`}</Timer>
              </>
            )}
          </ResendOtpContainer>
          <SubmitButtonContainer>
            {loading ?
              <LoadingDots /> :
              <SubmitButton
                onClick={handleSubmit}
                width={291}
                text="Verify"
                needArrow={true}
                active={loading ? true : !activeButton}
              />
            }
          </SubmitButtonContainer>
        </InputFields>
      </Form>
    </OtplVerificationFormContainer>
  );
};

export default OtplVerificationForm;

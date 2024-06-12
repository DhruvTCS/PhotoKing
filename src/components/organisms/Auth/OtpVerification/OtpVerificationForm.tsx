import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import SubmitButton from "../../../atoms/Login/SubmitButton";

interface otpTextProps {
  isActivated: boolean;
}

const OtplVerificationFormContainer = styled.div`
  width: 548px;
  height: 537px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid #ffffff1a;
  border-radius: 32px 32px 32px 32px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const UpperBox = styled.div`
  width: 227px;
  height: 8px;
  position: absolute;
  top: 0px;
  gap: 0px;
  border-radius: 0px 0px 50px 50px;
  opacity: 0px;
  background: #a720b9;
`;

const FormHeading = styled.p`
  height: 56px;
  position: absolute;
  top: 37px;
  left: 158px;
  font-family: "Urbanist", sans-serif;
  font-size: 30px;
  font-weight: 600;
  line-height: 56px;
  text-align: center;
`;

const SubHeadingText = styled.p`
  width: 364px;
  height: 56px;
  position: absolute;
  top: 92px;
  left: 89px;
  font-family: "Urbanist", sans-serif;
  font-size: 20px;
  font-weight: 500;
  line-height: 25px;
  text-align: center;
`;
const InputFields = styled.div`
  position: absolute;
  top: 205px;
  left: 52px;
`;
const Label = styled.label`
  font-family: "Urbanist", sans-serif;
  font-size: 15px;
  font-weight: 500;
  line-height: 20px;

  color: #737373;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 35px;
`;

const SubmitButtonContainer = styled.div`
  position: absolute;
  top: 223px;
  left: 82px;
`;
const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OtpInput = styled.input`
  width: 50px;
  height: 50px;
  margin: 0 25px;
  text-align: center;
  font-size: 24px;
  border: none;
  border-bottom: 1px solid black;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;
const ResendOtpContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  top: 118px;
  left: 148px;
  align-items: center;
  justify-content: center;
`;
const ResesndOtpText = styled.p<otpTextProps>`
  width: 100px;
  height: 32px;
  font-family: "Urbanist", sans-serif;
  font-size: 17px;
  font-weight: 600;
  line-height: 32px;
  color: #a720b9;
  margin-left: ${(props) => (props.isActivated ? "25px" : "0px")};
  text-decoration: ${(props) => (props.isActivated ? "underline" : "none")};
`;

const Timer = styled.p`
  width: 43px;
  height: 32px;
  font-family: "Urbanist", sans-serif;
  font-size: 17px;
  font-weight: 600;
  line-height: 32px;
`;

const OtplVerificationForm: React.FC = () => {
  const [timer, setTimer] = useState<number>(60);
  const [showResendLink, setShowResendLink] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const inputsRef = useRef<HTMLInputElement[]>([]);

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

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 4 || otp.some((digit) => !/^\d$/.test(digit))) {
      // Error of inappropriate otp value
      console.log("inappropriate otp value: " + otpValue);
    } else {
      console.log("Submitted OTP:", otpValue);
      // Handle OTP submission logic here
    }
  };

  const handleResendOtp = () => {
    console.log("Resend OTP");
    // Handle resend OTP logic here
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
        let finalIdex = index - 1;
        inputsRef.current[finalIdex].focus();
        console.log(finalIdex);
      }
    }
  };


  return (
    <OtplVerificationFormContainer>
      <UpperBox />
      <Form>
        <FormHeading>Verification Code</FormHeading>
        <SubHeadingText>
          Please enter the OTP received via SMS on the mobile number you have
          provided
        </SubHeadingText>
        <InputFields>
          <Label htmlFor="contactNo">OTP</Label>
          <InputContainer>
            <FormContainer>
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
            </FormContainer>
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
            <SubmitButton
              onClick={handleSubmit}
              width={291}
              text="Verify"
              needArrow={true}
            />
          </SubmitButtonContainer>
        </InputFields>
      </Form>
    </OtplVerificationFormContainer>
  );
};

export default OtplVerificationForm;

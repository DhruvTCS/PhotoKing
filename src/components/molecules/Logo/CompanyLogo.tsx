import React from "react";
import styled from "styled-components";
import LogoImage from "../../atoms/Utlis/LogoImage";
import { useNavigate } from "react-router-dom";



const LogoContainer = styled.div`
  width: 89%;
  height: 48px;
  top:34px;
  gap: 0px;
  opacity: 0px;
  margin-top: 30px;
  display:flex;
  flex-direction:row;
`;

const TextContainer = styled.div`
  width: 162px;
  height: 43px;
  gap: 0px;
  opacity: 0px;
 font-family: "Leckerli One", cursive;
  font-style: normal;
  font-size: 32px;
  font-weight: 400;
  line-height: 43.04px;
  text-align: center;
 
`;


const CompanyLogo: React.FC = () => {
  const navigate = useNavigate();
  return (
    <LogoContainer onClick={() => navigate('/dashboard/')}>
      <LogoImage />

      <TextContainer>Photo King</TextContainer>
    </LogoContainer>
  );
};

export default CompanyLogo;

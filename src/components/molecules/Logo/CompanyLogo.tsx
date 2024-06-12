import React from "react";
import styled from "styled-components";
import LogoImage from "../../atoms/Logo/LogoImage";



const LogoContainer = styled.div`
  width: 244px;
  height: 48px;
  position:absolute;
  top:34px;
  gap: 0px;
  opacity: 0px;
  display:flex;
  direction:row;
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
  return (
    <LogoContainer>
      <LogoImage />

      <TextContainer>Photo King</TextContainer>
    </LogoContainer>
  );
};

export default CompanyLogo;

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import BackButtonIconPng from '../../../../assets/Icons/SingleAlbum/back.png'
import { useNavigate } from 'react-router-dom';
import UnderLine from '../../../atoms/Login/UnderLine';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const AddNewPackagePage: React.FC = () => {
  const [packageName, setPackageName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const onchangePackage = (name: string, value: string) => {
    if (name === "name") {
      setPackageName(value);
    } else if (name === "price") {
      setPrice(value);
    }
  }
  useEffect(() => {
    console.log(description)
  }, [description])
  const navigate = useNavigate();
  return (
    <MainContainer>
      <BackButtonContainer onClick={() => navigate(-1)} >
        <BackButtonIcon src={BackButtonIconPng} />
        <BackButtonText>Back</BackButtonText>
      </BackButtonContainer>
      <MainForm>
        <Header>
          <HeaderText>Add Package</HeaderText>
        </Header>
        <Form>
          <FormUpperContainer>
            <InputContainer>
              <InputLabel>Package Name</InputLabel>
              <Input placeholder="" type='text' />
              <UnderLine width={100} isPercent={true} />
            </InputContainer>
            <InputContainer>
              <InputLabel>Package Price</InputLabel>
              <Input placeholder="" type='text' />
              <UnderLine width={100} isPercent={true} />
            </InputContainer>
          </FormUpperContainer>
          <FormLowerContainer>
            <InputContainerDescription>
              <InputLabel>Package Description</InputLabel>
              <DescriptionTab>

                <StyledDescriptionContainer
                  value={description}
                  onChange={setDescription}
                  modules={{
                    toolbar: [
                      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                      [{ size: [] }],
                      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                      ['link'],
                      ['clean']
                    ]
                  }}
                />
              </DescriptionTab>
            </InputContainerDescription>
          </FormLowerContainer>
        </Form>
      </MainForm>
    </MainContainer>
  )
}

export default AddNewPackagePage

const MainContainer = styled.div``;

const BackButtonContainer = styled.div`
display:flex;
flex-direction:row;
width:98%;
margin-left:30px;
align-items:center;
cursor:pointer;

`
const BackButtonIcon = styled.img`
width: 15.6px;
height: 16.8px;
color: #171717;
cursor: pointer;


`;

const BackButtonText = styled.p`
height: 23px;
font-family: Urbanist,sans-serif;
font-size: 16px;
font-weight: 500;
line-height: 22.8px;
text-align: left;
color: #171717;
margin:0px;
margin-left:11px;

`;
const MainForm = styled.div`
 height: 600px;
 width:97%;
  margin: 30px;
  margin-top: 10px;
  background-color: hsla(0, 0%, 100%, 0.8);
  border-radius: 10px;
`;

const Header = styled.div`
width:100%;
height:100px;
// margin-top: 50px;
display: flex;
flex-direction:column;
align-items: center;
justify-content: center;
`;
const HeaderText = styled.p`
font-family: Urbanist,sans-serif;
font-size: 24px;
font-weight: 700;
line-height: 22.8px;
text-align: left;
color: #171717;
margin:0px;
// margin-left:11px;
`;
const Form = styled.div`
width:97%;
padding-left:30px;
padding-rigth:30px;
`;
const FormUpperContainer = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`;
const InputContainer = styled.div`
display: flex;
width:40%;
flex-direction: column;
align-items: baseline;

`;
const InputContainerDescription = styled.div`
display: flex;
width:50%;
flex-direction: column;
align-items: baseline;

`;
const InputLabel = styled.label``;
const Input = styled.input`
width:100%;
border:none;
background: transparent;

font-family: Montserrat;
font-size: 16px;
font-weight: 500;
line-height: 25px;
text-align: left;
margin-top:5px;
color: #292929;
&:focus{
outline: none;
}
`;
const FormLowerContainer = styled.div`
width:100%;
padding-top:40px;
`;
const DescriptionTab = styled.div`
margin-top:10px;
`
const StyledDescriptionContainer = styled(ReactQuill)`

  .ql-container {
    height: 250px; /* Adjust based on toolbar height and desired editor height */
  }
`
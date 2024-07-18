import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import BackButtonIconPng from '../../../../assets/Icons/SingleAlbum/back.png'
import { useNavigate } from 'react-router-dom';
import UnderLine from '../../../atoms/Login/UnderLine';
import ReactQuill from 'react-quill';
import DOMPurify from 'dompurify'
import 'react-quill/dist/quill.snow.css';
import SubmitButton from '../../../atoms/Login/SubmitButton';
import Errortext from '../../../atoms/Utlis/Errortext';
import { useAppDispatch, useAppSelector } from '../../../../Redux/Hooks';
import { createPackageAPI, updatePackageAPI } from '../../../../Redux/ApiCalls/Dashboard/PackageAPI';
import LoadingDots from '../../../atoms/Utlis/LoadinDots';
import { showErrorToast } from '../../../atoms/Utlis/Toast';


const AddNewPackagePage: React.FC = () => {
  const [packageName, setPackageName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [pureDescription, setPureDescription] = useState('');
  const [showError, setShowError] = useState(false);
  const [activeButton, setActiveButton] = useState(false);
  const [isShowTextEditor, setIsShowTextEditor] = useState(true);
  const [isPackageChange, setIsPackageChange] = useState(false);
  const navigate = useNavigate();
  const quillRef = useRef<ReactQuill>(null);
  const { loading, error, isError, currentPackage, isPackageUpdate } = useAppSelector(state => state.package);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isError) {
      if (error && error.message) showErrorToast(error.message);
      else showErrorToast("Something went wrong! Please try again later.");
    }
    if (currentPackage) {
      setPackageName(currentPackage.title);
      setPrice(currentPackage.price.toString());
      setDescription(currentPackage.description);
      setIsShowTextEditor(false);
      setPureDescription(DOMPurify.sanitize(currentPackage.description));
    }
  }, [])
  useEffect(() => {
    handleActiveButton();
    if (currentPackage)
      handlePackageChange();
  }, [packageName, price, description])

  useEffect(() => {

    if (isPackageUpdate) {
      navigate('/dashboard/packages/all');
    }

  }, [isPackageUpdate])
  const handleSubmit = () => {
    if (!activeButton) {
      setShowError(true);
    } else {
      // // console.log("send package data");

      dispatch(createPackageAPI({ title: packageName, price: parseInt(price), description }))
    }
  }

  const handleUpdate = () => {
    if (!activeButton) {
      setShowError(true);
    } else {
      // // console.log("send package data");
      if (currentPackage)
        dispatch(updatePackageAPI({ title: packageName, price: parseInt(price), description, package_id: currentPackage.id }))
    }
  }
  const validatePackageName = (packageName: string) => {
    if (packageName.length > 0 && packageName.length < 40) {
      return true;
    } else
      return false;
  }
  const validatePrice = (price: string) => {
    if (price.length > 0 && price.length < 8) {
      return true;
    } else
      return false;
  }
  const validateDescription = (description: string) => {
    if (description.length > 0 && description !== '<p><br></p>') {
      // console.log(description)
      return true;

    }
    else return false;
  }
  const onchangePackage = (name: string, value: string) => {
    if (name === "name" && (value.length === 0 || validatePackageName(value))) {
      setPackageName(value);
    } else if (name === "price" && (value.length === 0 || validatePrice(value))) {
      setPrice(value);
    } else if (name === "description" && (value.length === 0 || validateDescription(value))) {
      setDescription(value);
    }
  }
  const handlePackageChange = () => {
    if (currentPackage) {

      if (packageName !== currentPackage.title || parseInt(price) !== currentPackage.price || description !== currentPackage.description) {
        setIsPackageChange(true);
      } else {
        setIsPackageChange(false);

      }
    }
  }
  const handleActiveButton = () => {
    if (packageName.length > 0 && packageName.length < 40 && price.length > 0 && price.length < 8 && description.length > 0) {
      setActiveButton(true);
    } else {
      setActiveButton(false);
    }
  }


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
              <InputLabel>Package Name : </InputLabel>
              <Input placeholder="Name" value={packageName} type='text' onChange={(e) => onchangePackage("name", e.target.value)} />
              <UnderLine width={100} isPercent={true} />
              <Errortext show={showError && !validatePackageName(packageName)} message={'Please provide valid package name.'} />
            </InputContainer>
            <InputContainer>
              <InputLabel>Package Price :</InputLabel>
              <Input placeholder="" type='number' value={price} onChange={(e) => onchangePackage("price", e.target.value)} />
              <UnderLine width={100} isPercent={true} />
              <Errortext show={showError && !validatePrice(price)} message='Please provide valid price' />
            </InputContainer>
          </FormUpperContainer>
          <FormLowerContainer>
            <InputContainerDescription>
              <InputLabel>Package Description :</InputLabel>
              <DescriptionTab>
                {isShowTextEditor ?

                  <StyledDescriptionContainer
                    value={description}
                    ref={quillRef}
                    theme="snow"
                    onChange={(e) => { onchangePackage("description", e) }}
                    modules={{
                      toolbar: [
                        [{ 'header': [1, 2, 3, 4, 5, 6] }, { 'font': [] }],
                        [{ size: ['small', false, 'large', 'huge'] }],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { "indent": -1 }, { "indent": +1 }],
                        ['link'],
                      ]
                    }} />
                  :
                  <DescriptionConatiner onClick={() => setIsShowTextEditor(true)} >

                    <div dangerouslySetInnerHTML={{ __html: pureDescription }}></div>
                  </DescriptionConatiner>
                  // <div >{pureDescription}</div>
                }
                {/* <DraftEditorComponent onEditorStateChange={handleEditorStateChange} editorState={editorState} /> */}
                {/* <TipTapTextEditor onChange={(e) => // console.log(e)} /> */}
              </DescriptionTab>

              <Errortext show={showError && !validateDescription(description)} message='Please provide valid description' />
            </InputContainerDescription>
            {/* <div>
            </div> */}
          </FormLowerContainer>
        </Form>
        <ButtonContainer>
          {loading ? <LoadingDots /> :
            currentPackage ?
              isPackageChange && <SubmitButton width={250} onClick={() => handleUpdate()} needArrow={false} text='Update' />
              :
              <SubmitButton width={250} onClick={() => handleSubmit()} needArrow={false} text='Create' />
          }
        </ButtonContainer>
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
 height: 800px;
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
width:96%;
padding-left:30px;
padding-right:30px;
`;
const FormUpperContainer = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
flex-wrap: wrap;
`;
const InputContainer = styled.div`
display: flex;
width:40%;
min-width:400px;
flex-direction: column;
align-items: baseline;

`;
const InputContainerDescription = styled.div`
display: flex;
width:50%;
flex-direction: column;
align-items: baseline;

`;
const InputLabel = styled.label`
font-family: Montserrat;
font-size: 14px;
font-weight: 500;
line-height: 17.07px;
text-align: left;
color: #969595;

`;
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
&::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

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
height:400px;
width:83%;

`
const StyledDescriptionContainer = styled(ReactQuill)`

  .ql-container {
  background-color:white;
    min-width:400px;
    height: 250px; /* Adjust based on toolbar height and desired editor height */
  }
`
const ButtonContainer = styled.div`
display:flex;
margin-top:40px;
align-items: center;
justify-content: center;
`
const DescriptionConatiner = styled.div`
background-color:white;
width:100%;
height:300px;
padding:10px;
border-radius:10px;
overflow:auto;
`;
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
import { getBusinessDetailsAPI } from '../../../../Redux/ApiCalls/Auth/user';
import FacebookIconPNG from '../../../../assets/Icons/SocialMedia/facebookIcon.png'
import InstaIconPNG from '../../../../assets/Icons/SocialMedia/instaIcon.png'
import WebsiteIconPNG from '../../../../assets/Icons/SocialMedia/websiteIcon.png'
import YoutubeIconPNG from '../../../../assets/Icons/SocialMedia/youtubeIcon.png'
const AddNewPackagePage: React.FC = () => {
  const [packageName, setPackageName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [pureDescription, setPureDescription] = useState('');
  const [showError, setShowError] = useState(false);
  const [activeButton, setActiveButton] = useState(false);
  const [isShowTextEditor, setIsShowTextEditor] = useState(true);
  const [packageWebsite, setPackageWebsite] = useState<string>();
  const [packageInsta, setPackageInsta] = useState<string>();
  const [packageFacebook, setPackageFacebook] = useState<string>();
  const [packageYoutube, setPackageYoutube] = useState<string>();
  const [isPackageChange, setIsPackageChange] = useState(false);
  const navigate = useNavigate();
  const { user, SocialLinks } = useAppSelector(state => state.auth)
  const quillRef = useRef<ReactQuill>(null);
  const { loading, error, isError, currentPackage, isPackageUpdate } = useAppSelector(state => state.package);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isError) {
      if (error && error.message) showErrorToast(error.message);
      else showErrorToast("Something went wrong! Please try again later.");
    }
    else if (currentPackage) {
      setPackageName(currentPackage.title);
      setPrice(currentPackage.price.toString());
      setDescription(currentPackage.description);
      setIsShowTextEditor(false);
      setPureDescription(DOMPurify.sanitize(currentPackage.description));
      if (currentPackage.website)
        setPackageWebsite(currentPackage.website);
      if (currentPackage.facebook_link)
        setPackageFacebook(currentPackage.facebook_link);
      if (currentPackage.insta_link)
        setPackageInsta(currentPackage.insta_link);
      if (currentPackage.youtube_link)
        setPackageYoutube(currentPackage.youtube_link);
    } else {

      if (Object.keys(SocialLinks).length <= 0) {
        dispatch(getBusinessDetailsAPI())
      } else {
        if (SocialLinks.website) setPackageWebsite(SocialLinks.website)
        if (SocialLinks.facebook_link) setPackageFacebook(SocialLinks.facebook_link)
        if (SocialLinks.insta_link) setPackageInsta(SocialLinks.insta_link)
        if (SocialLinks.youtube_link) setPackageYoutube(SocialLinks.youtube_link)

      }
    }
  }, [SocialLinks])
  useEffect(() => {
    handleActiveButton();
    if (currentPackage)
      handlePackageChange();
  }, [packageName, price, description, packageWebsite, packageFacebook, packageInsta, packageYoutube])

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

      dispatch(createPackageAPI({ title: packageName, price: parseInt(price), description, website: packageWebsite, facebook_link: packageFacebook, insta_link: packageInsta, youtube_link: packageYoutube }))
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
    } else if (name === "website" && value.length < 45) {
      setPackageWebsite(value);
    } else if (name === "insta" && value.length < 45) {
      setPackageInsta(value);
    } else if (name === "facebook" && value.length < 45) {
      setPackageFacebook(value);
    } else if (name === "youtube" && value.length < 45) {
      setPackageYoutube(value);
    }
  }
  const isWebsiteChange = () => {
    if (currentPackage && currentPackage.website) {
      if (currentPackage.website !== packageWebsite) return true;
      else return false;
    } else {
      if (packageWebsite && packageWebsite.length > 0) return true;
      else return false;
    }
  }
  const isInstaChange = () => {
    if (currentPackage && currentPackage.insta_link) {
      if (currentPackage.insta_link !== packageInsta) return true;
      else return false;
    } else {
      if (packageInsta && packageInsta.length > 0) return true;
      else return false;
    }
  }
  const isFaceBookChange = () => {
    if (currentPackage && currentPackage.facebook_link) {
      if (currentPackage.facebook_link !== packageFacebook) return true;
      else return false;
    } else {
      if (packageFacebook && packageFacebook.length > 0) return true;
      else return false;
    }
  }
  const isYoutubeChange = () => {
    if (currentPackage && currentPackage.youtube_link) {
      if (currentPackage.youtube_link !== packageYoutube) return true;
      else return false;
    } else {
      if (packageYoutube && packageYoutube.length > 0) return true;
      else return false;
    }
  }
  const handlePackageChange = () => {

    if (currentPackage) {

      if (packageName !== currentPackage.title || parseInt(price) !== currentPackage.price || description !== currentPackage.description || isWebsiteChange() || isYoutubeChange() || isInstaChange() || isFaceBookChange()) {
        console.log("++++++++++++")
        console.log(isWebsiteChange())
        console.log("++++++++++++")
        setIsPackageChange(true);
      } else {
        setIsPackageChange(false);

      }
    }
  }
  const handleActiveButton = () => {
    if (packageName.length > 0 && packageName.length < 40 && price.length > 0 && price.length < 8 && description.length > 0 && isValidSocialData("insta") && isValidSocialData("website") && isValidSocialData("facebook") && isValidSocialData("youtube")) {
      setActiveButton(true);
    } else {
      setActiveButton(false);
    }
  }
  function isValidURL(url: string) {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      "((([a-zA-Z0-9$_.+!*',;?&=-]|%[0-9a-fA-F]{2})+:)*([a-zA-Z0-9$_.+!*',;?&=-]|%[0-9a-fA-F]{2})+@)?" + // username:password@
      '((\\[(|((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))\\])|' + // IP address
      "(([a-zA-Z0-9$_.+!*',;?&=-]|%[0-9a-fA-F]{2})+\\.)*[a-zA-Z0-9](([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\\.)+" + // subdomain
      '[a-zA-Z0-9-]{2,63}\\.?)' + // domain name
      '(:\\d{1,5})?' + // port
      "(\\/([a-zA-Z0-9$_.+!*',;:@&=-]|%[0-9a-fA-F]{2})*)*" + // path
      "(\\?[a-zA-Z0-9$_.+!*',;:@&=-]*(\\([a-zA-Z0-9$_.+!*',;:@&=-]|%[0-9a-fA-F]{2})*\\))*" + // query string
      "(#([a-zA-Z0-9$_.+!*',;:@&=-]|%[0-9a-fA-F]{2})*)?$",
      'i',
    ) // fragment locator

    return pattern.test(url)
  }
  const isValidSocialData = (name: string) => {
    if (name === "website" && packageWebsite) {
      if (packageWebsite && packageWebsite.length > 0 && isValidURL(packageWebsite)) return true
      else return false

    } else if (name === "insta" && packageInsta) {
      if (packageInsta && packageInsta.length > 0 && isValidURL(packageInsta)) return true
      else return false

    } else if (name === "facebook" && packageFacebook) {
      if (packageFacebook && packageFacebook.length > 0 && isValidURL(packageFacebook)) return true
      else return false

    } else if (name === "youtube" && packageYoutube) {
      if (packageYoutube && packageYoutube.length > 0 && isValidURL(packageYoutube)) return true
      else return false

    } else return true;
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
            <SocialContainer>
              <InputSocialContainer>
                <InputLabel>Website  : </InputLabel>
                <SocialInputContainer>
                  <SocialIcon src={WebsiteIconPNG} />
                  <SocialInput value={packageWebsite} type='text' onChange={(e) => onchangePackage("website", e.target.value)} />
                </SocialInputContainer>
                <UnderLine width={100} isPercent={true} />
                <Errortext show={showError && !isValidSocialData("website")} message={'Please provide valid website link.'} />
              </InputSocialContainer>
              <InputSocialContainer>
                <InputLabel>Instagram : </InputLabel>
                <SocialInputContainer>
                  <SocialIcon src={InstaIconPNG} />
                  <SocialInput value={packageInsta} type='text' onChange={(e) => onchangePackage("insta", e.target.value)} />
                </SocialInputContainer>
                <UnderLine width={100} isPercent={true} />
                <Errortext show={showError && !isValidSocialData("insta")} message={'Please provide valid instagram link.'} />
              </InputSocialContainer>
              <InputSocialContainer>
                <InputLabel>Facebook : </InputLabel>
                <SocialInputContainer >
                  <SocialIcon src={FacebookIconPNG} />
                  <SocialInput value={packageFacebook} type='text' onChange={(e) => onchangePackage("facebook", e.target.value)} />
                </SocialInputContainer>
                <UnderLine width={100} isPercent={true} />
                <Errortext show={showError && !isValidSocialData("facebook")} message={'Please provide valid facebook link.'} />
              </InputSocialContainer>
              <InputSocialContainer>
                <InputLabel>Youtube : </InputLabel>
                <SocialInputContainer>
                  <SocialIcon src={YoutubeIconPNG} />
                  <SocialInput value={packageYoutube} type='text' onChange={(e) => onchangePackage("youtube", e.target.value)} />
                </SocialInputContainer>
                <UnderLine width={100} isPercent={true} />
                <Errortext show={showError && !isValidSocialData("youtube")} message={'Please provide valid youtube link.'} />
              </InputSocialContainer>
            </SocialContainer>
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
const InputSocialContainer = styled.div`
display: flex;
width:87%;
min-width:400px;
flex-direction: column;
align-items: baseline;
margin-bottom:16px;

`
const InputContainerDescription = styled.div`
display: flex;
width:79%;
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
const SocialInput = styled.input`
width:100%;
border:none;
background: transparent;

font-family: Montserrat;
font-size: 16px;
font-weight: 400;
line-height: 25px;
text-align: left;
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
display: flex;
justify-content:space-between;
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
const SocialContainer = styled.div`
width:68%;
display:flex;
flex-direction:column;
align-items:end;
`;
const SocialInputContainer = styled.div`
display:flex;
align-items:center;
margin-top:6px;
width:100%;

`;
const SocialIcon = styled.img`
height:23px;
width:23px;
margin-right:10px;
`;
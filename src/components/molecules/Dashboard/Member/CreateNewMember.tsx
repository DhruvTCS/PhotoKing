import React from 'react'
import styled from 'styled-components'
import BackButtonIconPng from '../../../../assets/Icons/SingleAlbum/back.png'
import { useNavigate } from 'react-router-dom';
import DefaultImagePNG from '../../../../assets/images/DefaultProfilePic.png'
import MemberIconPNG from '../../../../assets/Icons/Member/memberDpIcon.png'
import UnderLine from '../../../atoms/Login/UnderLine';
import SubmitButton from '../../../atoms/Login/SubmitButton';
const NewMemberPageContainer = styled.div`
height:100%;
width:100%;
display:flex;
flex-direction:column;
align-items:center;
`;

const BackButtonContainer = styled.div`
display:flex;
flex-direction:row;
width:98%;
margin-left:30px;
align-items:center;

`
const BackButtonIcon = styled.img`
width: 19.6px;
height: 16.8px;
color: #171717;


`;

const BackButtonText = styled.p`
height: 23px;
font-family: "Urbanist",sans-serif;
font-size: 19px;
font-weight: 600;
line-height: 22.8px;
text-align: left;
color: #171717;
margin:0px;
margin-left:11px;

`;


const BoadyContainer = styled.div`
width: 96%;
height: 511px;
border-radius: 10px;
opacity: 0.7;
background: #FFFFFFCC;
margin-top:20px;


`;

const ImageContainer = styled.div`
margin-top:30px;
margin-left:30px;
width: 130.42px;
height: 130.42px;
position: relative;
`;
const MemberImage = styled.img`
width: 121.42px;
height: 121.42px;
border-radius: 50%;
`;
const ImageIconContainer = styled.div`
width: 42.92px;
height: 42.92px;
border-radius: 46px;
background: linear-gradient(360deg, #7A11A1 0%, #C62BC9 100%);
box-shadow: 0px 4px 18px 0px #A720B966;
position:absolute;
left:82px;
top:91px;
display:flex;
align-items: center;
justify-content: center;
`;
const AddMemberIcon = styled.img`
width: 21px;
height: 21px;

`;
const InputContainer = styled.div`
display: flex;
margin-top:80px;
margin-left:40px;
height:199px;
`;
const NameLabel = styled.label`
font-family: "Montserrat",sans-serif;
font-size: 14px;
font-weight: 500;
line-height: 17.07px;
text-align: left;
margin:0;
`;
const Input = styled.input`
background-color: transparent;
font-family: "Montserrat";
font-size: 16px;
font-weight: 500;
line-height: 19.5px;
text-align: left;
width:350px;

border:none;
&:focus{
outline:none;
}
`;
const JobTypeContainer = styled.div`
margin-left:60px;
`;
const NameDataContainer = styled.div`

`

const JobTypeSelect = styled.select`
width:475px;
border:none;
background-color: transparent;
font-family: "Montserrat",sans-serif;
font-size: 14px;
font-weight: 500;
line-height: 17.07px;
text-align:left;
&:focus{
outline:none;
}
`
const SelectionOption = styled.option`
font-family: "Montserrat",sans-serif;
font-size: 14px;
font-weight: 500;
line-height: 17.07px;
`
const SubmitButtonContainer = styled.div`
display:flex;
margin-left:30px;
align-items: left;
`

const CreateNewMemberPage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <NewMemberPageContainer>
            <BackButtonContainer >
                <BackButtonIcon src={BackButtonIconPng} onClick={() => navigate('/dashboard/members/all')} />
                <BackButtonText>Add new member</BackButtonText>
            </BackButtonContainer>
            <BoadyContainer>
                <ImageContainer>
                    <MemberImage src={DefaultImagePNG} />
                    <ImageIconContainer >
                        <AddMemberIcon src={MemberIconPNG} />
                    </ImageIconContainer>
                </ImageContainer>
                <InputContainer>
                    <NameDataContainer>
                        <div style={{ "display": "flex" }}>
                            <NameLabel >Name</NameLabel>
                            <Input />
                        </div>
                        <UnderLine width={478} />
                    </NameDataContainer>
                    <JobTypeContainer>
                        <div style={{ "display": "flex" }}>
                            <JobTypeSelect >
                                <SelectionOption value="Job Type" selected disabled >Job Type</SelectionOption>
                                <SelectionOption value="Cemera Man" >Cemera Man</SelectionOption>
                                <SelectionOption value="Cemera Man" >Cemera Man</SelectionOption>
                                <SelectionOption value="Cemera Man" >Cemera Man</SelectionOption>
                            </JobTypeSelect>
                        </div>
                        <UnderLine width={478} />
                    </JobTypeContainer>
                </InputContainer>
                <SubmitButtonContainer>

                    <SubmitButton width={100} text='Submit' needArrow={false} onClick={() => { }} />
                </SubmitButtonContainer>
            </BoadyContainer>
        </NewMemberPageContainer>
    )
}

export default CreateNewMemberPage
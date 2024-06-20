import React from 'react'
import styled from 'styled-components'
import MemberImagePNG from '../../../../assets/images/Extra/memberImage.png'
import { Member } from '../../../../Data/member.dto';
interface MembercardProps {
    member: Member

}
const MemberCardContainer = styled.div`
width: 347px;
height: 311px;
border-radius: 35px;
background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.2) 100%);

border-image-source: linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0.5) 100%);

box-shadow: 0px 4px 24px 0px #0000001A;
display:flex;
flex-direction: column;

align-items: center;
justify-content: center;
border-radius:14%;
`;

const MemberImageContainer = styled.div``;
const MemberImage = styled.img`
width: 142px;
height: 142px;
border-radius: 100px;
border: 6px solid #FFFFFF;
box-shadow: 0px 4px 44px 0px #00000040;

`;
const MemberDataContainer = styled.div`
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-top:20px;

`;
const MemberName = styled.p`
font-family: "Urbanist",sans-serif;
font-size: 18px;
font-weight: 600;
line-height: 21.6px;

margin:0;
`;
const MemberRole = styled.p`
font-family: "Urbanist",sans-serif;
font-size: 15px;
font-weight: 400;
line-height: 18px;
text-align: left;
margin:0;
margin-top:3px;
`;
const MemberCard: React.FC<MembercardProps> = ({ member }) => {
    return (
        <MemberCardContainer>
            <MemberImageContainer>
                <MemberImage src={member.profile_image} />
            </MemberImageContainer>
            <MemberDataContainer>
                <MemberName >
                    {member.name}
                </MemberName>
                <MemberRole>
                    {member.job_type}
                </MemberRole>
            </MemberDataContainer>
        </MemberCardContainer>
    )
}

export default MemberCard
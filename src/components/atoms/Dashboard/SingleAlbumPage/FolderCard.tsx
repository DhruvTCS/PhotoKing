import React from 'react'
import styled from 'styled-components'
import { Folder } from '../../../../Data/album.dto';
import TestImageIcon from '../../../../assets/images/Extra/folderIconImage.png'
interface FolderCardProps {
    folder: Folder
}
const CardContainer = styled.div`
width: 400px;
height: 165px;
border-radius: 30px;
background: #FFFFFF;
box-shadow: 0px 10px 34px 0px #0000001A;


`;
const FolderName = styled.p`
font-family: "Montserrat";
font-size: 21px;
font-weight: 600;
padding-left:20px;
line-height: 25.6px;
text-align: left;

`;
const ImageContainer = styled.div`
`;
const Images = styled.div`
display: flex;
margin-left:20px;
position: relative;
`;
const Image1 = styled.img`
border: 3px solid #FFFFFF;
border-radius:50%;
height:70px;
width:70px;
z-index:0;
position: absolute;

`;
const Image2 = styled.img`
border: 3px solid #FFFFFF;
border-radius:50%;
height:70px;
width:70px;
position: absolute;
left:40px;
z-index:1;
`;
const Image3 = styled.img`
border: 3px solid #FFFFFF;
border-radius:50%;
height:70px;
width:70px;
position: absolute;
z-index:2;
left:77px;
`;
const RemainingImageCountContainer = styled.div`
border: 3px solid #FFFFFF;
border-radius:50%;
height:70px;
width:70px;
background: linear-gradient(360deg, #7A11A1 0%, #C62BC9 100%);
display: flex;
align-items: center;
justify-content: center;
position: absolute;
left:114px;
z-index:3;
`;
const RemainigImagesText = styled.p`
font-family: "Montserrat";
font-size: 21px;
font-weight: 600;
line-height: 25.6px;
text-align: left;
color: #FFFFFF;

`;
const FolderCard: React.FC<FolderCardProps> = ({ folder }) => {
    return (
        <CardContainer>
            <FolderName>
                {folder.name}
            </FolderName>
            <ImageContainer>
                {folder.images ?
                    <Images>
                        <Image1 src={TestImageIcon} />
                        {folder.images.length >= 2 ? <Image2 src={TestImageIcon} /> : null}
                        {folder.images.length >= 3 ? <Image3 src={TestImageIcon} /> : null}
                        {folder.images.length >= 4 ? <RemainingImageCountContainer >
                            <RemainigImagesText>+{folder.images.length - 3}</RemainigImagesText>

                        </RemainingImageCountContainer> : null}
                    </Images>
                    :
                    ' No images are in Folder'}

            </ImageContainer>
        </CardContainer>
    )
}

export default FolderCard
import React, { useState } from 'react'
import styled from 'styled-components'
import { Folder, NewFolder } from '../../../../Data/album.dto';
import TestImageIcon from '../../../../assets/images/Extra/folderIconImage.png'
import { useAppDispatch } from '../../../../Redux/Hooks';
import { setCurrentFolder } from '../../../../Redux/Slice/Dashboard/AlbumSlice';
import { useNavigate } from 'react-router-dom';
interface FolderCardProps {
    folder?: Folder,
    newFolder?: NewFolder,
    onClick?: () => void;
    isNew: boolean;
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
margin:0;
padding:20px;
cursor:pointer;
text-decoration: underline;

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
const FolderCard: React.FC<FolderCardProps> = ({ folder, newFolder, onClick, isNew }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <div>
            {folder ?
                <CardContainer>
                    {/* <UpdateFolderModal isOpen={updateFolderModal} onRequestClose={() => setUpdateFolderModal(false)} currentFolder={folder} /> */}
                    <FolderName onClick={() => {
                        dispatch(setCurrentFolder(folder));
                        navigate(`/dashboard/albums/folder/${folder.id}`)

                    }}>
                        {folder.name}
                    </FolderName>
                    <ImageContainer>
                        {folder.images.length !== 0 ?
                            <Images>
                                <Image1 src={folder.images[0].image} />
                                {folder.images.length >= 2 ? <Image2 src={folder.images[1].image} /> : null}
                                {folder.images.length >= 3 ? <Image3 src={folder.images[2].image} /> : null}
                                {folder.images.length >= 4 ? <RemainingImageCountContainer >
                                    <RemainigImagesText>+{folder.images.length - 3}</RemainigImagesText>

                                </RemainingImageCountContainer> : null}
                            </Images>
                            :
                            ' No images are in Folder'}

                    </ImageContainer>
                </CardContainer>
                : null}
            {newFolder ?
                <CardContainer>

                    <FolderName onClick={onClick}>
                        {newFolder.name}
                    </FolderName>
                    <ImageContainer>
                        {newFolder.images ?
                            <Images>
                                <Image1 src={newFolder.images[0].image_blob} />
                                {newFolder.images.length >= 2 ? <Image2 src={newFolder.images[1].image_blob} /> : null}
                                {newFolder.images.length >= 3 ? <Image3 src={newFolder.images[2].image_blob} /> : null}
                                {newFolder.images.length >= 4 ? <RemainingImageCountContainer >
                                    <RemainigImagesText>+{newFolder.images.length - 3}</RemainigImagesText>

                                </RemainingImageCountContainer> : null}
                            </Images>
                            :
                            ' No images are in Folder'}

                    </ImageContainer>
                </CardContainer>
                : null}
        </div>
    )
}

export default FolderCard
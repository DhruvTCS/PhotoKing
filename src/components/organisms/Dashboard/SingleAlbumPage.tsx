import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useAppSelector } from '../../../Redux/Hooks'
import { useNavigate, useParams } from 'react-router-dom'
import BackButtonIconPng from '../../../assets/Icons/SingleAlbum/back.png'
import CreateNewAlbumPage from '../../molecules/Dashboard/SingleAlbumPage/CreateNewAlbumPage'
import EditAlbumPage from '../../molecules/Dashboard/SingleAlbumPage/EditAlbumPage'
const SingleAlbumPageContainer = styled.div`
width:100%;
height:97%;
margin-top:20px;

`
// 96 88 

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
cursor: pointer;


`;

const BackButtonText = styled.p`
width: 140px;
height: 23px;
font-family: Urbanist,sans-serif;
font-size: 19px;
font-weight: 600;
line-height: 22.8px;
text-align: left;
color: #171717;
margin:0px;
margin-left:11px;

`;

const SingleAlbum: React.FC = () => {
    const { currentAlbum } = useAppSelector(state => state.album)
    const navigate = useNavigate();
    const params = useParams()
    useEffect(() => {
        console.log(params)
        if (params.new !== 'true') {

            if (!currentAlbum) {
                navigate('/dashboard/');
            }
        }

        return () => {

        }
    }, [])

    return (
        <SingleAlbumPageContainer>
            <BackButtonContainer >
                <BackButtonIcon src={BackButtonIconPng} onClick={() => navigate(-1)} />
                <BackButtonText>{params.new !== 'true' && currentAlbum ? `Update Album` : `Create Album`}</BackButtonText>
            </BackButtonContainer>
            {
                params.new === 'true' ?
                    <CreateNewAlbumPage />
                    :
                    <EditAlbumPage />
            }

        </SingleAlbumPageContainer>
    )
}

export default SingleAlbum
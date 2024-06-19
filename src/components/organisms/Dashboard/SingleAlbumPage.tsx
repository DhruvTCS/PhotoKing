import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useAppSelector } from '../../../Redux/Hooks'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import BackButtonIconPng from '../../../assets/Icons/SingleAlbum/back.png'
import CreateNewAlbumPage from '../../molecules/Dashboard/SingleAlbumPage/CreateNewAlbumPage'
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


`;

const BackButtonText = styled.p`
width: 119px;
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

const SingleAlbum: React.FC = () => {
    const { currentAlbum } = useAppSelector(state => state.album)
    const navigate = useNavigate();
    const params = useParams()
    useEffect(() => {
        console.log(params)
        if (params.new !== 'true') {

            if (!currentAlbum) {
                navigate('/');
            }
        }

        return () => {

        }
    }, [])

    return (
        <SingleAlbumPageContainer>
            <BackButtonContainer >
                <BackButtonIcon src={BackButtonIconPng} />
                <BackButtonText>Create Album</BackButtonText>
            </BackButtonContainer>
            <CreateNewAlbumPage />

        </SingleAlbumPageContainer>
    )
}

export default SingleAlbum
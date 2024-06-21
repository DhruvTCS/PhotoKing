import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PlusSignIconPNG from '../../../../assets/Icons/addIcon.png'
import AlbumCard from '../../../atoms/Dashboard/HomePage/AlbumCard';
import Pagination from '../../../atoms/Dashboard/HomePage/Pagination';
import { useAppDispatch, useAppSelector } from '../../../../Redux/Hooks';
import { getAllAlbums } from '../../../../Redux/ApiCalls/Dashboard/AlbumAPI';
import LoadingDots from '../../../atoms/Utlis/LoadinDots';
import { clearError } from '../../../../Redux/Slice/Auth/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { clearFlagAlbums } from '../../../../Redux/Slice/Dashboard/AlbumSlice';
const AblumContainer = styled.div`
width:98%;
margin-top:48px;
margin-left:30px;
position:relative;


`;


const AlbumsHeader = styled.div`
display:flex;
justify-content:space-between;
align-items:center;

`;
const AlbumsHeaderText = styled.p`
width: 81px;
height: 23px;

font-family: "Urbanist",sans-serif;
font-size: 19px;
font-weight: 600;
line-height: 22.8px;
text-align: left;
color: #171717;


`;

const AddAlbumButton = styled.button`
border: 1px solid #A720B9;
width: 80px;
height: 36px;
margin-right: 52px;
border: 1px;
border-radius:10%;
display:flex;
flex-direction: row;
justify-content: center;
align-items: center;
background:none;
border: 1px solid #A720B9;
cursor:pointer;
`;
const PlusSignContainer = styled.div`

`;
const PlusSignIcon = styled.img`
height: 21px;
width: 21px;

`;

const ButtonText = styled.div`
width: 29px;
height: 17px;
font-family: "Urbanist", sans-serif;
font-size: 14px;
font-weight: 600;
line-height: 16.8px;
text-align: left;
COLOR: #A720B9;


`
const AlbumsListContainer = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 50px;
width: 100%;
overflow:auto;
 &::-webkit-scrollbar {
     /* Chrome, Safari, and Opera */
    height: 12px;
    width:3px;
    background:transparent !important;
  }
`
const NoAlbumFoundContainer = styled.div`
width: 100%;
position: absolute;
height:100%;
text-align: center;
`
const Albums: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const albumsPerPage = 6;
    const [totalAlbums, setTotalAlbums] = useState(0);
    const { albums, loading, total_projects, isUpdate, isSearchData } = useAppSelector(state => state.album);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getAllAlbums(1));
        console.log(albums);
        if (!loading && albums.length > 0) {
            console.log("setting total pages" + total_projects);
            setTotalAlbums(total_projects);


        }
    }, [dispatch])

    useEffect(() => {
        if (isUpdate) {
            dispatch(getAllAlbums(currentPage));
        }

        return () => {
            dispatch(clearError());
            dispatch(clearFlagAlbums());
        }
    }, [isUpdate, dispatch])


    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        dispatch(getAllAlbums(page));
    };

    return (

        <AblumContainer>
            <AlbumsHeader >
                <AlbumsHeaderText >
                    Albums
                </AlbumsHeaderText>
                <AddAlbumButton onClick={() => { navigate('/dashboard/singleAlbum/true') }}>
                    <PlusSignContainer>
                        <PlusSignIcon src={PlusSignIconPNG}>
                        </PlusSignIcon>
                    </PlusSignContainer>
                    <ButtonText>
                        ADD
                    </ButtonText>
                </AddAlbumButton>
            </AlbumsHeader>
            <AlbumsListContainer>
                {loading ? <LoadingDots position={{
                    type: "absolute", top: "366px", left: "662px"
                }} /> :
                    (albums && albums.length !== 0 ? albums.map(album => <AlbumCard album={album} name={album.name} Date='02/04/2023' backgroundImage='' />) : <NoAlbumFoundContainer>No Album found</NoAlbumFoundContainer>)
                }

            </AlbumsListContainer>
            {(loading || albums.length === 0 || albums.length > 6 || isSearchData) ? null : <Pagination currentPage={currentPage} totalPages={Math.ceil(total_projects / albumsPerPage)} onPageChange={handlePageChange} />}
        </AblumContainer>
    )
}

export default Albums
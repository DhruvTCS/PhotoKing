import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../../../Redux/Hooks'
import { removeCurrentFolder, setIsRedeemUserUpdates } from '../../../../Redux/Slice/Dashboard/AlbumSlice'
import { getAllRedeemUserAPI, removeRedeemUserAPI } from '../../../../Redux/ApiCalls/Dashboard/AlbumAPI'
import { User } from '../../../../Data/user.dto'
import DefaultImagePNG from '../../../../assets/images/DefaultProfilePic.png'
import BackButtonIconPng from '../../../../assets/Icons/SingleAlbum/back.png'
import { useNavigate } from 'react-router-dom'
import DeletePopup from '../Folder/DeletePopup'
import LoadingDots from '../../Utlis/LoadinDots'

const RedeemUser: React.FC = () => {
    const { currentAlbum, isError, error, redeemUsers, loading, isRedeemUserUpdates } = useAppSelector(state => state.album)
    const dispatch = useAppDispatch();
    const [currentRedeemUsers, setCurrentRedeemUsers] = useState<User[]>([]);
    const [removeUserPopup, setRemoveUserPopup] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User>();
    const navigate = useNavigate();
    useEffect(() => {
        if (currentAlbum) {
            dispatch(getAllRedeemUserAPI({ album_id: currentAlbum.id }));
        }

        return () => {
            dispatch(removeCurrentFolder())
            // dispatch(setIsRedeemUserUpdates(true));
        }
    }, [currentAlbum])
    useEffect(() => {
        if (currentAlbum && isRedeemUserUpdates) {

            dispatch(getAllRedeemUserAPI({ album_id: currentAlbum.id }));
        }
    }, [isRedeemUserUpdates])
    useEffect(() => {
        setCurrentRedeemUsers(redeemUsers)
    }, [redeemUsers])

    const handleRemoveRedeemUser = (user_id: number, album_id: number) => {
        // console.log(user_id, album_id);
        dispatch(removeRedeemUserAPI({ album_id: album_id, user_id: user_id }))
        setRemoveUserPopup(false);
    }
    return (
        currentAlbum && loading ? <LoadingDots /> : <MainContainer>
            <BackButtonContainer onClick={() => navigate(-1)} >
                <BackButtonIcon src={BackButtonIconPng} />
                <BackButtonText>Back</BackButtonText>
            </BackButtonContainer>
            <Header>
                <HeaderText>{currentAlbum?.name}</HeaderText>
                <HeaderSubText>{'(Redeem Code Users)'}</HeaderSubText>
            </Header>
            <UserContainer>

                {removeUserPopup && selectedUser && currentAlbum && <DeletePopup buttonText='Remove' cancel={() => setRemoveUserPopup(false)} Delete={() => handleRemoveRedeemUser(selectedUser.id, currentAlbum.id)} text='Are you sure you want to remove redeem user?' />}
                {currentAlbum && currentRedeemUsers?.length > 0 ? currentRedeemUsers?.map((user) => <>
                    <Container>
                        <Icon src={user.image ? user.image : DefaultImagePNG} />
                        <DataContainer>
                            <UserName>
                                {user.name}
                            </UserName>
                            <UserContact>
                                {`${user.country_code} ${user.phone_number}`}
                            </UserContact>
                        </DataContainer>
                        <ActionButtonContainer>
                            <DeleteButton onClick={() => { setSelectedUser(user); setRemoveUserPopup(true) }}>Remove</DeleteButton>

                        </ActionButtonContainer>
                    </Container>
                    <Hr />
                </>

                ) : <div style={{ "height": "100%", "width": "100%", "display": "flex", "alignItems": "center", "justifyContent": "center" }}>

                    <HeaderText>No User Found.</HeaderText>
                </div>
                }
            </UserContainer>

        </MainContainer>

    )
}

export default RedeemUser

const MainContainer = styled.div`
padding-top:30px;
`;
const ProfileDiv = styled.div``;

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
const Header = styled.div`
width:100%;
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
const HeaderSubText = styled.p`
font-family: Urbanist,sans-serif;
font-size: 14px;
font-weight: 500;
line-height: 22.8px;
text-align: left;
color: #171717;
margin:0px;
margin-left:11px;
`;

const Container = styled.div`
display:flex;

width:96%;
margin-left:30px;
align-items:center;
`;
const DataContainer = styled.div`
width:80%;
`;
const UserContainer = styled.div`
height:700px;
overflow-y: auto;

padding-top:37px;
`;
const Hr = styled.hr`
width:95%;
margin:14px auto 14px auto;
color:black;
`;
const Icon = styled.img`
width: 50px;
height: 50px;
margin-right:10px;
border-radius:50%;
`;
const UserName = styled.p`
font-family: Urbanist;
font-size: 16px;
font-weight: 500;
line-height: 19.2px;
text-align: left;
margin:0;
`;
const UserContact = styled.p`
font-family: Urbanist;
font-size: 14px;
font-weight: 500;
line-height: 19.2px;
text-align: left;
margin:0;
`;
const ActionButtonContainer = styled.div`
width:14%;
// border:1px solid black;
display:flex;
align-items: center;
justify-content: center;
`;
const DeleteButton = styled.button`
    width: 106px;
    height: 47px;
    border: none;
    border-radius: 22px;
    font-family: Urbanist,sans-serif;
    font-size: 17px;
    font-weight: 600;
    line-height: 19.2px;
    text-align: center;
    cursor: pointer;
    // background: red;

background: linear-gradient(360deg, #7A11A1 0%, #C62BC9 100%);
    color: white;

`;

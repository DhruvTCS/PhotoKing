import React, { useEffect } from 'react'
import styled from 'styled-components'
import Sidebar from '../../templates/Sidebar'
import Navbar from '../../templates/Navbar'
import { useAppDispatch, useAppSelector } from '../../../Redux/Hooks'
import { getUserByToken } from '../../../Redux/ApiCalls/Auth/login'
import { Outlet, useNavigate } from 'react-router-dom'
import { clearError } from '../../../Redux/Slice/Auth/AuthSlice'

const DashboardContainer = styled.div`
display:flex;
flex-direction:row;
background: #F8EDFA;
position: relative;
overflow: hidden;
`
const MainSection = styled.div`

display:flex;
width: 81%;
flex-direction:column;
overflow: hidden;
`
const GradientDiv1 = styled.div`
width: 661px;
height: 661px;
position:absolute;
top: -273px;
left: 1413px;
opacity: 50%;
background: radial-gradient(50% 50% at 50% 50%, rgba(251, 79, 255, 0.4) 0%, rgba(251, 79, 255, 0) 100%);
overflow: hidden;

`
const GradientDiv2 = styled.div`
width: 661px;
height: 661px;
position:absolute;
top: 757px;
left: 70px;
opacity: 50%;
background: radial-gradient(50% 50% at 50% 50%, rgba(251, 79, 255, 0.4) 0%, rgba(251, 79, 255, 0) 100%);
overflow: hidden;

`

const GradientDiv3 = styled.div`
width: 900px;
height: 900px;
position:absolute;
top: 119px;
left: 600px;
gap: 0px;
opacity: 0.4;
background: radial-gradient(50% 50% at 50% 50%, rgba(90, 81, 191, 0.7) 0%, rgba(90, 81, 191, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;

`
const MainPage = styled.div`
height:100%;
z-index:1;
`
const Dashboard: React.FC = () => {
    const { isAuthticated, user, access_token, refresh_token, isError, error } = useAppSelector(state => state.auth);
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (isError) {
            console.log("error in loadind dashboard")
            console.log(error)
            navigate('/auth/login')
        }
        //   check user is Auth ?
        // 1. yes then fetch data from user redux object 
        // 2. no then check there is accesstoken pr not in localstorage 
        console.log(!isAuthticated && !user && !access_token)
        // 3. If there is no acces token or isAuthenticated is true the redirect to loginpage
        if (!isAuthticated && !user && !access_token) {
            if (localStorage.getItem('access_token')) {
                dispatch(getUserByToken());
            } else {
                navigate('/auth/login');
            }
        }
        return () => {
            // dispatch(clearError());
        }
    }, [isError, dispatch])

    return (
        <DashboardContainer>
            <GradientDiv3 />
            <GradientDiv1 />
            <GradientDiv2 />
            <Sidebar></Sidebar>
            <MainSection>

                <Navbar />
                <MainPage>
                    <Outlet />
                </MainPage>
            </MainSection>
        </DashboardContainer>
    )
}

export default Dashboard
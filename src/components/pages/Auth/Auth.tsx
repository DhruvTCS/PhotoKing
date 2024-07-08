import React from 'react'
import styled from 'styled-components'
import AuthLeftImageContainer from '../../organisms/Auth/AuthLeftImageContainer'

import FooterImage from '../../atoms/Login/FooterImage'
import { Outlet } from 'react-router-dom'

const AuthContainer = styled.div`
width:100%;
height:100%;
background: #F8EDFA;
display: flex;
flex-direction: column;
overflow-x:hidden;
overflow-y:hidden;
position: relative;


`
const AuthPageContainer = styled.div`
width:100%;
height:80%;
background: #F8EDFA;
gap: 0px;
opacity: 0px;
display: flex;
flex-direction: row;
overflow: hidden;
`
const FormContainer = styled.div`
display:flex;
flex-direction: column;
position: absolute;
top: 140px;
left: 1100px;
`
const BottomtextContainer = styled.div`
margin:25px;
`
const StyledLink = styled.a`
font-family: Urbanist, sans-serif;
font-size: 23px;
font-weight: 600;
line-height: 25px;
text-align: center;
text-decoration: underline;
margin:24px;
`
const GradientDiv1 = styled.div`
width: 892px;
height: 892px;
position:absolute;
top: 119px;
left: 1028px;
gap: 0px;
opacity: 0.5;
background: radial-gradient(50% 50% at 50% 50%, rgba(90, 81, 191, 0.7) 0%, rgba(90, 81, 191, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;

`
const GradientDiv2 = styled.div`
width: 661px;
height: 661px;
position: relative;
top: 784px;
left: 1215px;
opacity: 50%;
background: radial-gradient(50% 50% at 50% 50%, rgba(251, 79, 255, 0.4) 0%, rgba(251, 79, 255, 0) 100%);
overflow: hidden;

`
const GradientDiv3 = styled.div`

width: 516px;
height: 516px;
display: inline-block;
position: relative;
top: -301px;
left: 1622px;
opacity: 50%;
background: radial-gradient(50% 50% at 50% 50%, rgba(251, 79, 255, 0.4) 0%, rgba(251, 79, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;

`
const Login: React.FC = () => {
    return (
        <AuthContainer>

            <GradientDiv1 />
            <GradientDiv2 />
            <GradientDiv3 />
            <AuthPageContainer>

                <AuthLeftImageContainer />
                <FormContainer>

                    <Outlet />
                    <BottomtextContainer >
                        <StyledLink>Privacy Policy</StyledLink>
                        <StyledLink>Terms of Use</StyledLink>
                    </BottomtextContainer>
                </FormContainer>


            </AuthPageContainer>
            <FooterImage />
        </AuthContainer>
    )
}

export default Login
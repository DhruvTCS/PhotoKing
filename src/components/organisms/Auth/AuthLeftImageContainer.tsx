import React from 'react'
import styled from 'styled-components'
import CompanyLogo from '../../molecules/Logo/CompanyLogo'
import ImageContainer from '../../molecules/Login/ImageContainer'


const MainLeftContainer = styled.div`

width: 845px;
height: 854px;
position: relative;
// position: absolute;
// top:0px;
// left:200px;
// gap: 0px;
border: 11px 0px 0px 0px;
border-radius: 100px 0px 0px 0px;
`



const AuthLeftImageContainer: React.FC = () => {
    return (
        <MainLeftContainer>
            <CompanyLogo />
            <ImageContainer />
        </MainLeftContainer>
    )
}

export default AuthLeftImageContainer
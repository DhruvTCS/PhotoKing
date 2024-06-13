import React from 'react'
import styled from 'styled-components'
import Logo from '../../../assets/images/Logo.png'

const LogoImageContainer = styled.img`
width: 69px;
height: 47.2px;
gap: 0px;
opacity: 0px;

`

const LogoImage: React.FC = () => {
    return (
        <LogoImageContainer src={Logo} />
    )
}

export default LogoImage
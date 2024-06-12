import React from 'react'
import styled from 'styled-components'
import img from '../../../assets/images/footerImage.png'

const FooterImageStyle = styled.img`
width: 1275.34px;
height: 265.02px;
position: absolute;
top:814px;
left:354px;
gap: 0px;
z-index:0;
opacity: 0.5;

`
const FooterImage: React.FC = () => {
  return (
    <FooterImageStyle src={img} />
  )
}

export default FooterImage
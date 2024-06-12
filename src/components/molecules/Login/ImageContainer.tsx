import React from 'react'
import styled from 'styled-components'
import topLeft from './../../../assets/images/SignupPageImages/topLeft.png'
import topRight from './../../../assets/images/SignupPageImages/topRight.png'
import bottomLeft from './../../../assets/images/SignupPageImages/bottomLeft.png'
import bottomRight from './../../../assets/images/SignupPageImages/bottomRight.png'
import center from './../../../assets/images/SignupPageImages/center.png'

const TopLeftImage = styled.img`
width: 306.81px;
height: 306.81px;
position: absolute;
top: 149.91px;
left: 47px;
gap: 0px;
border-radius: 100px 0px 0px 0px;
border: 11px 0px 0px 0px;
opacity: 0px;


`

const TopRightImage = styled.img`
width: 306.81px;
height: 306.81px;
position: absolute;
top: 87.67px;
left: 418.77px;
gap: 0px;
border-radius: 100px 0px 0px 0px;
border: 11px 0px 0px 0px;
opacity: 0px;


`

const BottomLeftImage = styled.img`
width: 306.81px;
height: 306.81px;
position: absolute;
top: 532.49px;
left: 98.17px;
gap: 0px;
border-radius: 100px 0px 0px 0px;
border: 11px 0px 0px 0px;
opacity: 0px;

`


const BottomRightImage = styled.img`
width: 306.81px;
height: 306.81px;
position: absolute;
top: 472.43px;
left: 474.23px;
gap: 0px;
border-radius: 100px 0px 0px 0px;
border: 11px 0px 0px 0px;
opacity: 0px;
z-index: 2;


`
const CenterImage = styled.img`
width: 306.81px;
height: 306.81px;
position: absolute;
top: 307px;
left: 237px;
gap: 0px;
border-radius: 100px 0px 0px 0px;
border: 11px 0px 0px 0px;
opacity: 0px;
`


const ImageContainer: React.FC = () => {
    return (
        <div>
            <TopLeftImage src={topLeft} />
            <TopRightImage src={topRight} />
            <BottomLeftImage src={bottomLeft} />
            <BottomRightImage src={bottomRight} />
            <CenterImage src={center} />
        </div>
    )
}

export default ImageContainer
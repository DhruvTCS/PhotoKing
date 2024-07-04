import React from 'react'
import styled from 'styled-components'
import Arrow from '../../../assets/Icons/Arrow.png'
const Button = styled.button<ButtonStyleProps>`
width: ${props => props.width}px;
border:none;
border-radius: 16px 16px 16px 16px;
font-family: "Urbanist", sans-serif;
font-size: 20px;
font-weight: 800;
line-height: 19.2px;
text-align: center;
cursor: pointer;

height: ${props => props.height ? props.height : 54}px;
color: #FFFFFF;

${props => props.flag === true ? `
    background-color:#bcbaba;
    color:black;
    `: `
    background: linear-gradient(360deg, #7A11A1 0%, #C62BC9 100%);
    box-shadow: 0px 4px 14px 0px #86169680;
    `}
    




`
const ArrowImage = styled.img`
width: 14px;
height: 12px;
border-radius: 30px 0px 0px 0px;


`
const ArrowContainer = styled.div`
width: 30px;
height: 30px;
background-color: #FFFFFF4D;
border-radius: 40%;
align-items: center;
display:flex;
justify-content: center;
position: absolute;
right:10px;
top:10px;
`
interface ButtonProps {
    text: string;
    width: number;
    needArrow: boolean;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    active?: boolean;
    height?: number;
}

interface ButtonStyleProps {
    width: number;
    flag?: boolean;
    height?: number;
}
const SubmitButton: React.FC<ButtonProps> = ({ text, width, needArrow, onClick, active, height }) => {

    return (
        <Button width={width} height={height} flag={active} disabled={active} onClick={onClick} >
            {text}
            {
                needArrow ? (<ArrowContainer>
                    <ArrowImage src={Arrow} />
                </ArrowContainer>) : null
            }

        </Button>
    )
}

export default SubmitButton
import React from 'react'
import styled from 'styled-components'
import Arrow from '../../../assets/images/Icons/Arrow.png'
const Button = styled.button<ButtonStyleProps>`
width: ${props => props.width}px;
height: 54px;
border:none;
border-radius: 16px 16px 16px 16px;
background: linear-gradient(360deg, #7A11A1 0%, #C62BC9 100%);
box-shadow: 0px 4px 14px 0px #86169680;
font-family: "Urbanist", sans-serif;;
font-size: 16px;
font-weight: 500;
line-height: 19.2px;
text-align: center;
color: #FFFFFF;



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
}

interface ButtonStyleProps {
    width: number;
}
const SubmitButton: React.FC<ButtonProps> = ({ text, width, needArrow,onClick }) => {
    return (
        <Button width={width} onClick={onClick}>
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
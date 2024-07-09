import React from 'react'
import styled from 'styled-components'


const InputStyle = styled.input<InputStyleProps>`
border:none;
width:${props => props.width}px;
font-family: Urbanist, sans-serif;
font-size: 18px;
font-weight: 600;
line-height: 32px;
text-align: left;
color: #292929;
&::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

background-color: transparent;
&::placeholder{
font-family: Urbanist, sans-serif;
font-size: 18px;
font-weight: 600;
line-height: 32px;
text-align: left;
color: #746b74;
opacity:50%;
}

&:focus{
 outline:none;
 background-color:transparent;
}
`

interface InputProps {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string;
  name: string;
  width: number;
  readOnly?: boolean;
  id: string;

}
interface InputStyleProps {
  width: number;
}
const InputComponent: React.FC<InputProps> = ({ name, value, onChange, placeholder, type, width, id, readOnly }) => {
  return (
    <InputStyle id={id} width={width} name={name} onChange={onChange} placeholder={placeholder} type={type} value={value} readOnly={readOnly} />
  )
}

export default InputComponent
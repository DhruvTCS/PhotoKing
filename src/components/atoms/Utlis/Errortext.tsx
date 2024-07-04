import React from 'react'
import styled from 'styled-components'


const ErrorSpan = styled.span`
font-size:13px;
color: red;
text-align:left;
`
interface TextProps {
  show: boolean;
  message: string;
}
const Errortext: React.FC<TextProps> = ({ show, message }) => {
  return (
    show ? <ErrorSpan>{message}</ErrorSpan> : null
  )
}

export default Errortext
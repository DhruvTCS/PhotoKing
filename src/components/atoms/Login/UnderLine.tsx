import React from 'react'
import styled from 'styled-components';
const UnderLineStyle = styled.hr< UnderLineProps>`
width: ${(props) => props.width}px;
height: 1px;
background: #CECECE;
 ${(props) =>
        props.position &&
        `
    position: ${props.position.type};
    top:${props.position.top}px;
    left:${props.position.left}px;
  `}


`

interface UnderLineProps {
    width: number,
    position?: {
        type?: string;
        top?: number;
        left?: number;

    };

}
const UnderLine: React.FC<UnderLineProps> = (props) => {
    return (
        props.position ?
            <UnderLineStyle position={props.position} width={props.width} ></UnderLineStyle>
            :
            <UnderLineStyle width={props.width} />
    )
}

export default UnderLine
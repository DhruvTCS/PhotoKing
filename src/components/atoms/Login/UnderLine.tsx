import React from 'react'
import styled from 'styled-components';
const UnderLineStyle = styled.hr< UnderLineProps>`
width: ${(props) => props.isPercent ? `${props.width}%` : `${props.width}px`};
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
    isPercent?: boolean,
    position?: {
        type?: string;
        top?: number;
        left?: number;

    };

}
const UnderLine: React.FC<UnderLineProps> = (props) => {
    return (
        props.position ?
            <UnderLineStyle position={props.position} width={props.width} isPercent={props.isPercent} ></UnderLineStyle>
            :
            <UnderLineStyle width={props.width} isPercent={props.isPercent} />
    )
}

export default UnderLine
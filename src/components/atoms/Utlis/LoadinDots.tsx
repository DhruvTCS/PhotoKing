import React from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingProps {
    position?: {
        type: string;
        left?: string;
        top?: string;
    }
}

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const LoadingWrapper = styled.div<LoadingProps>`        
  display: flex;
  ${props => props.position ? `
    position: ${props.position.type};
    top:${props.position.top};
    left:${props.position.left};
    `: null}
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Dot = styled.div<{ delay: number }>`
  width: 8px;
  height: 8px;
  margin: 0 4px;
  border-radius: 50%;
  background-color: black;
  animation: ${bounce} 0.6s infinite;
  animation-delay: ${({ delay }) => delay}s;
`;

const LoadingDots: React.FC<LoadingProps> = ({ position }) => {
    return (
        <LoadingWrapper position={position}>
            <Dot delay={0} />
            <Dot delay={0.1} />
            <Dot delay={0.2} />
        </LoadingWrapper>
    );
};

export default LoadingDots;

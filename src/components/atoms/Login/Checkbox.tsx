// src/components/atoms/Checkbox.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import CheckboxPNG from '../../../assets/Icons/checkbox.png'
interface CheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
}

const StyledCheckbox = styled.input`
 width: 20px;
  height: 20px;
  cursor: pointer;
  border: 2px solid #A720B9;
  border-radius: 5px;
  position: relative;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #fff;

  &:checked {
    background-color: #A720B9;
    border-color: #A720B9;
  }

  &:checked::after {
    content: '';
    position: absolute;
    top: -1px;
    left: 5px;
    width: 6px;
    height: 12px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;
const CheckboxImage = styled.img`
width: 25px;
height: 25px;
`;

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, id }) => {
  return (

    <StyledCheckbox id={id} type="checkbox" checked={checked} onChange={onChange} />

  );
};

export default Checkbox;

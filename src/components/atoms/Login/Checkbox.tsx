// src/components/atoms/Checkbox.tsx
import React from 'react';
import styled from 'styled-components';

interface CheckboxProps {
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    id: string;
}

const StyledCheckbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
  border-color:#A720B9;
  border-radius:5px;
`;

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, id }) => {
    return (
        <StyledCheckbox id={id} type="checkbox" checked={checked} onChange={onChange} />
    );
};

export default Checkbox;

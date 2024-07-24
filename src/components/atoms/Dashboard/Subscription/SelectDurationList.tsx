// Dropdown.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import DownIconPNG from '../../../../assets/Icons/downArrow.png'
interface DropdownProps {
    options: string[];
    onSelect: (value: string) => void;
    placeholder?: string;
}

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  width: 200px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  margin: 0;
  padding: 0;
  list-style: none;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
`;

const DropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
const DownArrowIcon = styled.img`
height:17px;
width:17px;
float:right;
`;

const SelectDurationList: React.FC<DropdownProps> = ({ options, onSelect, placeholder = 'Select Plan Duration' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>("1 Month");

    const handleButtonClick = () => setIsOpen(prev => !prev);

    const handleItemClick = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false);
        onSelect(option);
    };

    return (
        <DropdownContainer>
            <DropdownButton onClick={handleButtonClick}>
                {selectedOption || placeholder} <DownArrowIcon src={DownIconPNG} />
            </DropdownButton>
            {isOpen && (
                <DropdownMenu>
                    {options.map(option => (
                        <DropdownItem key={option} onClick={() => handleItemClick(option)}>
                            {option}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            )}
        </DropdownContainer>
    );
};

export default SelectDurationList;

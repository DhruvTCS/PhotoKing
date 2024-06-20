import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa'; // Install react-icons if not already installed
import { useAppDispatch } from '../../../../Redux/Hooks';
import { SearchData } from '../../../../Redux/ApiCalls/Dashboard/SearchAPI';

// Styled Components
const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  padding: 5px 10px;
  width: 300px;
  background-color: #fff;
  width: 498px;
height: 50px;

border-radius:8px;


`;

const Input = styled.input`
  border: none;
  outline: none;
  flex-grow: 1;
  padding: 5px;
  border-radius: 25px;
  font-size: 16px;
`;

const Icon = styled(FaSearch)`
  color: #ccc;
  font-size: 20px;
  margin-left: 10px;
`;

const SearchBar: React.FC = () => {
  const [inputData, setInputData] = useState('');
  const dispatch = useAppDispatch();
  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (inputData.length >= 4)
        await SearchData(inputData);
    }, 2000)

    return () => {
      clearTimeout(searchTimeout);
    }
  }, [inputData])

  return (
    <SearchBarContainer>
      <Input type="text" placeholder="Search" onChange={(e) => (setInputData(e.target.value))} />
      <Icon />
    </SearchBarContainer>
  );
};

export default SearchBar;

import React from 'react';
import styled from 'styled-components';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationContainer = styled.div`
  width:100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 38px 0px 0px 0px;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  color: #333;

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;

const PageNumber = styled.button<{ isActive: boolean }>`
  background: ${({ isActive }) => (isActive ? 'hsla(293, 71%, 43%, 1);' : 'none')};
  border: none;
  font-size: 1em;
  margin: 0 4px;
  padding: 8px 12px;
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? 'white' : '#333')};
  border-radius: 4px;

  &:hover {
    border:1px solid #A720B9;
  }
`;

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pagesToShow = 3;
  const firstPageToShow = Math.max(1, currentPage - pagesToShow);
  const lastPageToShow = Math.min(totalPages, firstPageToShow + pagesToShow - 1);
  const pageNumbers = [];
  // // console.log(firstPageToShow, lastPageToShow)
  for (let i = firstPageToShow; i <= lastPageToShow; i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationContainer>
      <ArrowButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        &lt;
      </ArrowButton>
      {pageNumbers.map((page) => (
        <PageNumber
          key={page}
          isActive={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageNumber>
      ))}
      <ArrowButton onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        &gt;
      </ArrowButton>
    </PaginationContainer>
  );
};

export default Pagination;

import React, { useState } from "react";
import styled from "styled-components";


function PaginationComponent({ currentPage, totalPages, setCurrentPage }) {

    return (
        <ComponentContainer>
            <Pagination>
                {currentPage > 2 && (
                    <PageButton onClick={() => setCurrentPage(1)}>1</PageButton>
                )}

                {currentPage > 3 && <Ellipsis>...</Ellipsis>}

                {currentPage > 1 && (
                    <PageButton onClick={() => setCurrentPage(currentPage - 1)}>
                        {currentPage - 1}
                    </PageButton>
                )}

                <PageButton active>{currentPage}</PageButton>

                {currentPage < totalPages && (
                    <PageButton onClick={() => setCurrentPage(currentPage + 1)}>
                        {currentPage + 1}
                    </PageButton>
                )}

                {currentPage < totalPages - 2 && <Ellipsis>...</Ellipsis>}

                {currentPage < totalPages - 1 && (
                    <PageButton onClick={() => setCurrentPage(totalPages)}>
                        {totalPages}
                    </PageButton>
                )}
            </Pagination>
        </ComponentContainer>
    );
}

export default PaginationComponent;

const ComponentContainer = styled.div`
    background-color: red;
    z-index:5;
`

const Pagination = styled.div`
  position: absolute;
  bottom: 20px;
  display: flex;
  justify-content: center;
  gap: 8px;
  scroll-x: auto;
`;

const PageButton = styled.button`
  justify-content: center;
  border: none;
  font-size: 15px;
  width: 10px;
  height: 10px;
  background-color: ${({ active }) => (active ? "#001F3F" : "#eee")};
  color: ${({ active }) => (active ? "#fff" : "#000")};
  border-radius: 50px;
  cursor: pointer;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
`;

const Ellipsis = styled.span`
  padding: 4px 10px;
  color: #666;
`;
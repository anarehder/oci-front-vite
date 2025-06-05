import React from "react";
import styled from "styled-components";

function PaginationComponent({ total, currentPage, totalPages, setCurrentPage, itemsPerPage, setItemsPerPage, setTotalPages }) {

//   setCurrentItems(eventsInfo.slice(startIndex, endIndex));
    const handleChange = (event) => {
        setItemsPerPage(Number(event.target.value));
        setTotalPages(Math.ceil(total/itemsPerPage));
        setCurrentPage(1);
    };

    return (
        <ComponentContainer>
            <SelectContainer>
                <div>
                    <label htmlFor="items-select">Items por página: </label>
                    <Select id="items-select" value={itemsPerPage} onChange={handleChange}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={30}>30</option>
                        <option value={50}>50</option>
                    </Select>
                </div>
                Exibindo {itemsPerPage} de um total de {total} registros...
            </SelectContainer>
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

                <PageButton $active="true">{currentPage}</PageButton>

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
    bottom: 10px;
    width: 90%;
    position: absolute;
    justify-content: space-between;
    z-index:5;
    height: 60px;
`

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    scroll-x: auto;
    width: 300px;    
`;

const PageButton = styled.button`
  justify-content: center;
  border: none;
  font-size: 16px;
  width: 40px;
  height: 30px;
  background-color: ${({ $active }) => ($active === "true" ? "#001F3F" : "#eee")};
  color: ${({ $active }) => ($active === "true" ? "#fff" : "#000")};
  border-radius: 50px;
  cursor: pointer;
  font-weight: ${({ $active }) => ($active === "true" ? "bold" : "normal")};
`;

const Ellipsis = styled.span`
  padding: 5px 10px;
  color: #666;
`;

const Select = styled.select`
  padding: 5px 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-left: 10px;
  font-size: 12px;
`;

const SelectContainer = styled.div`
    flex-direction: column;
    width: 300px;
    font-size: 12px;
    align-items: center;
    gap: 5px;
    div{
        justify-content: center;
    }
`
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaEdit } from "react-icons/fa";
import { TbFilterEdit } from "react-icons/tb";

function ComputeInstancesComponent({ computeInstancesInfo }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInstances, setFilteredInstances] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 8;
  const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredInstances.slice(startIndex, endIndex);
  useEffect(() => {
    setFilteredInstances(computeInstancesInfo);
    setTotalPages(Math.ceil(computeInstancesInfo.length / itemsPerPage));
  }, [computeInstancesInfo]);

  useEffect(() => {
    const filtered = computeInstancesInfo.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredInstances(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  }, [searchTerm, computeInstancesInfo]);

  return (
    <ComponentContainer>
      <SearchBar>
        <TbFilterEdit size={30} />
        <input
          type="text"
          placeholder="Filtrar por qualquer campo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchBar>

      <List>
        <RowHeader>
          <Info><span>Nome</span></Info>
          <Info><span>Tenancy</span></Info>
          <Info><span>Região</span></Info>
          <Info><span>Shape</span></Info>
          <Info><span>OCPU</span></Info>
          <Info><span>Memória</span></Info>
          <Info><span>Status</span></Info>
          <Info><span>Custo/Dia</span></Info>
          <Info><span>Ações</span></Info>
        </RowHeader>

        {currentItems.map((item, index) => (
          <Row key={index}>
            <Info>{item.display_name}</Info>
            <Info>{item.tenancy_name}</Info>
            <Info>{item.region}</Info>
            <Info>{item.shape}</Info>
            <Info>{item.ocpus}</Info>
            <Info>{item.memory_in_gbs}</Info>
            <Info>{item.lifecycle_state}</Info>
            <Info>R$ {(item.hourly_cost * 24).toFixed(2)}</Info>
            <Info>
              <EditButton
                onClick={() =>
                  alert(`Editar ${item.display_name}, ${item.tenancy_name}`)
                }
              >
                <FaEdit size={24}/>
              </EditButton>
            </Info>
            </Row>
        ))}
            </List>
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

export default ComputeInstancesComponent;

// Styled Components

const ComponentContainer = styled.div`
    width: calc(100vw - 220px);
    margin-left: 200px;
    margin-top: 120px;

    flex-direction: column;
    justify-content: flex-start;
    gap: 20px;

    color: #021121;
    overflow-y: auto;
    overflow-x: hidden;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  position: absolute;
  right: 50px;
  width: 250px;
  align-items: flex-end;
  gap: 10px;

  input {
    padding: 6px 10px;
    font-size: 14px;
    width: 300px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
`;

const List = styled.div`
  display: flex;
  margin-top: 50px;
  flex-direction: column;
  gap: 5px;
  width: 95%;
  font-size: 20px;
`;

const RowHeader = styled.div`
  background-color: #001F3F;
  display: flex;
   height: 45px;
  border-radius: 5px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const Row = styled.div`
  background: white;
  border-radius: 5px;
  display: flex;
  height: 45px;
  align-items: center;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const Info = styled.div`
  width: 11%;
  height: 50px;
  justify-content: center;
  text-align: center;
  word-break: break-word;
  font-size: 16px;

  span {
    font-weight: bold;
    color: white;
  }

  &:nth-of-type(1) {
    width: 18%;
  }

  &:nth-of-type(2) {
    width: 13%;
  }
    &:nth-of-type(5) {
        width: 8%;
    }
    &:nth-of-type(6) {
        width: 8%;
    }
  &:nth-of-type(8) {
    width: 10%;
  }

  &:nth-of-type(9) {
    width: 7%;
  }
`;

const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #001F3F;
  font-size: 16px;
`;


const Pagination = styled.div`
  margin-top: 20px;
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
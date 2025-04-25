import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { FaEdit } from "react-icons/fa";
import { TbFilterEdit } from "react-icons/tb";
import PaginationComponent from "./fixedComponents/PaginationComponent";
import { MdOutlineArrowDropUp, MdOutlineArrowDropDown } from 'react-icons/md';

function ComputeInstancesComponent({ computeInstancesInfo }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInstances, setFilteredInstances] = useState(computeInstancesInfo);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentItems, setCurrentItems] = useState(computeInstancesInfo.slice(0,10));
  console.log(filteredInstances.length);
  const sortOptions = [null, 'asc', 'desc'];

  const getNextDirection = (currentDirection) => {
    const currentIndex = sortOptions.indexOf(currentDirection);
    const nextIndex = (currentIndex + 1) % sortOptions.length;
    return sortOptions[nextIndex];
  };

  const handleSort = (key) => {
    const newDirection = sortConfig.key === key ? getNextDirection(sortConfig.direction) : 'asc';
    setSortConfig({ key, direction: newDirection });
    setCurrentPage(1); // opcional: resetar para a primeira página após sort
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    if (sortConfig.direction === 'asc') return <MdOutlineArrowDropUp size={22} color="white"/>;
    if (sortConfig.direction === 'desc') return <MdOutlineArrowDropDown size={22} color="white"/>;
    return null;
  };
  useEffect(() => {
    // Passo 1: filtrar
    const filtered = computeInstancesInfo.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  
    setFilteredInstances(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage((prev) => Math.min(prev, Math.ceil(filtered.length / itemsPerPage))); // evita página inválida
  
    // Passo 2: sort
    let sorted = [...filtered];
    if (sortConfig.key && sortConfig.direction) {
      sorted.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
  
    // Passo 3: paginar
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentItems(sorted.slice(startIndex, endIndex));
  }, [computeInstancesInfo, searchTerm, sortConfig, currentPage, itemsPerPage]);

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

      <ListHeader>
        <RowHeader>
          <Info onClick={() => handleSort('display_name')}><span>Nome</span>{renderSortIcon('display_name')}</Info>
          <Info onClick={() => handleSort('tenancy_name')}><span>Tenancy</span>{renderSortIcon('tenancy_name')}</Info>
          <Info onClick={() => handleSort('region')}><span>Região</span>{renderSortIcon('region')}</Info>
          <Info onClick={() => handleSort('shape')}><span>Shape</span>{renderSortIcon('shape')}</Info>
          <Info onClick={() => handleSort('ocpus')}><span>OCPU</span>{renderSortIcon('ocpus')}</Info>
          <Info onClick={() => handleSort('memory_in_gbs')}><span>Memória</span>{renderSortIcon('memory_in_gbs')}</Info>
          <Info onClick={() => handleSort('lifecycle_state')}><span>Status</span>{renderSortIcon('lifecycle_state')}</Info>
          <Info onClick={() => handleSort('monthly_cost')}><span>Custo/Dia </span>{renderSortIcon('monthly_cost')}</Info>
          <Info><span>Ações</span></Info>
        </RowHeader>
        </ListHeader>
        <List>
        {currentItems.map((item, index) => (
          <Row key={index}>
            <Info>{item.display_name}</Info>
            <Info>{item.tenancy_name}</Info>
            <Info>{item.region}</Info>
            <Info>{item.shape}</Info>
            <Info>{item.ocpus}</Info>
            <Info>{item.memory_in_gbs}</Info>
            <Info>{item.lifecycle_state}</Info>
            <Info>R$ {(item.monthly_cost ?? 0).toFixed(2).replace('.', ',')}</Info>
            <Info>
              <EditButton
                onClick={() =>
                  alert(`Editar ${item.display_name}, ${item.tenancy_name}`)
                }
              >
                <FaEdit size={24} />
              </EditButton>
            </Info>
          </Row>
        ))}
      </List>
      {/* <Pagination>
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
      </Pagination> */}
      <PaginationComponent total={filteredInstances.length} currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} setTotalPages={setTotalPages}/>
    </ComponentContainer>
  );
}

export default ComputeInstancesComponent;

// Styled Components

const ComponentContainer = styled.div`
    width: calc(100vw - 220px);
    height: 100vh;
    margin-left: 200px;
    margin-top: 90px;
    position: relative;

    flex-direction: column;
    justify-content: flex-start;

    color: #021121;
    overflow-y: hidden;
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

const ListHeader = styled.div`
  display: flex;
  margin-top: 50px;
  flex-direction: column;
  gap: 5px;
  width: 95%;
  font-size: 20px;
`

const List = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: flex-start;
  height: 70%;
  flex-direction: column;
  gap: 10px;
  width: 95%;
  font-size: 20px;
  overflow-y: auto;
  scroll-y: auto;
  margin: 10px 0;
`;

const RowHeader = styled.div`
  background-color: #001F3F;
  display: flex;
  height: 45px;
  border-radius: 5px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  div:nth-of-type(9){
    margin-right: 15px;
  }
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
  width: 12%;
  height: 50px;
  justify-content: center;
  text-align: center;
  word-break: break-word;
  font-size: 16px;
  align-items: center;
  
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